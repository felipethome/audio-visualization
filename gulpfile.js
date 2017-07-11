/* eslint-disable no-console, no-var, prefer-arrow-callback, prefer-template */

var browserify = require('browserify');
var connect = require('gulp-connect');
var cssmin = require('gulp-cssmin');
var merge = require('merge-stream');
var notify = require('gulp-notify');
var concat = require('gulp-concat');
var gulp = require('gulp');
var gulpif = require('gulp-if');
var gutil = require('gulp-util');
var ghPages = require('gulp-gh-pages');
var source = require('vinyl-source-stream');
var streamify = require('gulp-streamify');
var uglify = require('gulp-uglify');
var watchify = require('watchify');

var files = {
  dependencies: [],

  browserify: [
    './src/main.js',
  ],

  css: [
    'src/styles/base.css',
  ],
};

var browserifyTask = function (options) {
  var bundler = browserify({
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

  var rebundle = function () {
    var start = Date.now();
    console.log('Building APP bundle');
    return bundler
      .bundle()
      .on('error', gutil.log)
      .pipe(source(options.output))
      .pipe(gulpif(!options.development, streamify(uglify())))
      .on('error', gutil.log)
      .pipe(gulp.dest(options.dest))
      .pipe(gulpif(options.development, connect.reload()))
      .pipe(notify(function () {
        console.log('APP bundle built in ' + (Date.now() - start) + 'ms');
      }));
  };

  bundler.external(files.dependencies);

  if (options.development) {
    bundler = watchify(bundler);
    bundler.on('update', rebundle);
  }

  return rebundle();
};

var browserifyDepsTask = function (options) {
  var vendorsBundler = browserify({
    debug: options.development,
    require: files.dependencies,
  });

  var start = new Date();
  console.log('Building VENDORS bundle');
  return vendorsBundler
    .bundle()
    .on('error', gutil.log)
    .pipe(source(options.output))
    .pipe(gulpif(!options.development, streamify(uglify())))
    .on('error', gutil.log)
    .pipe(gulp.dest(options.dest))
    .pipe(notify(function () {
      console.log('VENDORS bundle built in ' + (Date.now() - start) + 'ms');
    }));
};

var cssTask = function (options) {
  var start = new Date();
  console.log('Building CSS bundle');
  return gulp.src(options.src)
    .pipe(concat(options.output))
    .pipe(gulpif(!options.development, cssmin()))
    .pipe(gulp.dest(options.dest))
    .pipe(gulpif(options.development, connect.reload()))
    .pipe(notify(function () {
      console.log('CSS bundle built in ' + (Date.now() - start) + 'ms');
    }));
};

gulp.task('ghpages', ['deploy'], function () {
  return gulp.src('./build/**/*')
    .pipe(ghPages());
});

gulp.task('deploy', function () {
  process.env.NODE_ENV = 'production';

  var browserifyDepsOpt = {
    development: false,
    src: files.dependencies,
    output: 'vendors.js',
    dest: './build/scripts',
  };

  var browserifyOpt = {
    development: false,
    src: files.browserify,
    output: 'bundle.js',
    dest: './build/scripts',
  };

  var cssOpt = {
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

gulp.task('default', function () {
  process.env.NODE_ENV = 'development';

  var browserifyDepsOpt = {
    development: true,
    src: files.dependencies,
    output: 'vendors.js',
    dest: './build/scripts',
  };

  var browserifyOpt = {
    development: true,
    src: files.browserify,
    output: 'bundle.js',
    dest: './build/scripts',
  };

  var cssOpt = {
    development: true,
    src: files.css,
    output: 'styles.css',
    dest: './build/styles',
  };

  var serverOpt = {
    root: './build',
    port: 8889,
    livereload: true,
  };

  connect.server(serverOpt);

  gulp.watch(files.css,
    function () {
      cssTask(cssOpt);
    }
  );

  return merge(
    browserifyDepsTask(browserifyDepsOpt),
    browserifyTask(browserifyOpt),
    cssTask(cssOpt)
  );
});