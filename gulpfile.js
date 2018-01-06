/* eslint-disable no-console */

const browserify = require('browserify');
const connect = require('gulp-connect');
const cssmin = require('gulp-cssmin');
const merge = require('merge-stream');
const notify = require('gulp-notify');
const concat = require('gulp-concat');
const gulp = require('gulp');
const gulpif = require('gulp-if');
const gutil = require('gulp-util');
const ghPages = require('gulp-gh-pages');
const source = require('vinyl-source-stream');
const streamify = require('gulp-streamify');
const uglify = require('gulp-uglify');
const watchify = require('watchify');

const files = {
  dependencies: [],

  browserify: [
    './src/main.js',
  ],

  css: [
    'src/styles/base.css',
  ],
};

const browserifyTask = function (options) {
  let bundler = browserify({
    entries: [options.src],
    transform: [
      ['babelify', {
        presets: ['es2015', 'stage-1'],
        plugins: ['transform-class-properties'],
      }],
    ],
    debug: options.development,
    cache: {}, // Requirement of watchify
    packageCache: {}, // Requirement of watchify
    fullPaths: options.development,
    extensions: ['.js', '.json'],
  });

  const rebundle = function () {
    const start = Date.now();
    console.log('Building APP bundle');
    return bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source(options.output))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .on('error', gutil.log)
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, connect.reload()))
      .pipe(notify(() => {
        console.log(`APP bundle built in ${Date.now() - start}ms`);
      }));
  };

  bundler.external(files.dependencies);

  if (options.development) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  return rebundle();
};

const browserifyDepsTask = function (options) {
  const vendorsBundler = browserify({
    debug: options.development,
    require: files.dependencies,
  });

  const start = new Date();
  console.log('Building VENDORS bundle');
  return vendorsBundler
    .bundle()
    .on('error', gutil.log)
    .pipe(source(options.output))
    .pipe(gulpif(!options.development, streamify(uglify())))
    .on('error', gutil.log)
    .pipe(gulp.dest(options.dest))
    .pipe(notify(() => {
      console.log(`VENDORS bundle built in ${Date.now() - start}ms`);
    }));
};

const cssTask = function (options) {
  const start = new Date();
  console.log('Building CSS bundle');
  return gulp.src(options.src)
    .pipe(concat(options.output))
    .pipe(gulpif(!options.development, cssmin()))
    .pipe(gulp.dest(options.dest))
    .pipe(gulpif(options.development, connect.reload()))
    .pipe(notify(() => {
      console.log(`CSS bundle built in ${Date.now() - start}ms`);
    }));
};

gulp.task('ghpages', ['deploy'], () => {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', () => {
  process.env.NODE_ENV = 'production';

  const browserifyDepsOpt = {
    development: false,
    src: files.dependencies,
    output: 'vendors.js',
    dest: './build/scripts',
  };

  const browserifyOpt = {
    development: false,
    src: files.browserify,
    output: 'bundle.js',
    dest: './build/scripts',
  };

  const cssOpt = {
    development: false,
    src: files.css,
    output: 'styles.css',
    dest: './build/styles',
  };

  return merge(
    browserifyDepsTask(browserifyDepsOpt),
    browserifyTask(browserifyOpt),
    cssTask(cssOpt)
  );
});

gulp.task('default', () => {
  process.env.NODE_ENV = 'development';

  const browserifyDepsOpt = {
    development: true,
    src: files.dependencies,
    output: 'vendors.js',
    dest: './build/scripts',
  };

  const browserifyOpt = {
    development: true,
    src: files.browserify,
    output: 'bundle.js',
    dest: './build/scripts',
  };

  const cssOpt = {
    development: true,
    src: files.css,
    output: 'styles.css',
    dest: './build/styles',
  };

  const serverOpt = {
    root: './build',
    port: 8080,
    livereload: true,
  };

  connect.server(serverOpt);

  gulp.watch(files.css, () => {
    cssTask(cssOpt);
  });

  return merge(
    browserifyDepsTask(browserifyDepsOpt),
    browserifyTask(browserifyOpt),
    cssTask(cssOpt)
  );
});