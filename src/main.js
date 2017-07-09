import AudioConfig from './AudioConfig';
import BrowserDetection from './BrowserDetection';
import Background from './Background';
import Sky from './Sky';
import Earth from './Earth';
import Particle from './Particle';
import Utils from './Utils';
import throttle from './throttle';

const canvas = document.getElementById('canvas');
const ctx = canvas.getContext('2d');

let audioConfig;

let sky;
let background;
let earth;
let particles;
let constants;

const setup = function () {
  constants = {
    // The canvas dimensions.
    width: window.innerWidth,
    height: window.innerHeight,

    // The minimum radius of the particles.
    particleRadius: 15,
    // The closest distance the particles can get to the border of the Earth.
    particleDistance: 60,
    // The maximum distance the particles can get from their initial point.
    particleMaxDistance: 100,
    // Number of particles. For better results choose a divisor of 360.
    nOfParticles: 30,

    // The radius of the Earth image.
    mainRadius: 150,

    // The center of the canvas. I want the constants to be "flat" so it can
    // easily be cloned. That is why this is not an object with shape
    // {x: Number, y: Number}.
    mainCenterX: Math.ceil(window.innerWidth / 2),
    mainCenterY: Math.ceil(window.innerHeight / 2),

    gravity: 1,
  };

  canvas.width = constants.width;
  canvas.height = constants.height;

  background = new Background(ctx, {
    color: [183, 28, 28],
  }, constants);

  sky = new Sky(ctx, {
    nOfStars: 800,
    starMaxSize: 6,
  }, constants);

  earth = new Earth(ctx, {
    cx: constants.mainCenterX,
    cy: constants.mainCenterY,
    width: 2 * constants.mainRadius,
    height: 2 * constants.mainRadius,
  });

  particles = [];

  for (let i = 0; i < 360; i += parseInt(360 / constants.nOfParticles)) {
    let center = Utils.getPointOnArc(
      constants.mainRadius + constants.particleDistance, i, {
        x: constants.mainCenterX,
        y: constants.mainCenterY,
      }
    );

    particles.push(new Particle(ctx, {
      angle: i,
      cx: center.x,
      cy: center.y,
      radius: constants.particleRadius,
      vx: center.x - constants.mainCenterX,
      vy: center.y - constants.mainCenterY,
    }, constants));
  }
};

const init = function () {
  setup();

  // Add a throttled resize event.
  throttle('resize', 'optimizedResize');
  window.addEventListener('optimizedResize', setup);

  // Hide the progress indicator.
  document.getElementById('progress').classList.toggle('hidden');
};

const accumulateFrequencies = function (frequencies, index) {
  if (frequencies.length < constants.nOfParticles) {
    return index >= frequencies.length ? 0 : frequencies[index];
  }

  const length = Math.floor(frequencies.length / constants.nOfParticles);
  const start = index * length;
  const end = start + length;
  return Utils.getAverage(frequencies, start, end);
};

const update = function (frequencies) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const average = Utils.getAverage(frequencies);
  // Frequencies are in the interval 0..256 (so it's their average).
  // Remap tha average to the interval 0..10.
  const intensity = Utils.remapNumber(average, {max: 256}, {max: 10});

  background.draw(intensity);
  sky.draw();

  for (let i = 0; i < particles.length; i++) {
    const frequency = accumulateFrequencies(frequencies, i);
    const distance = Utils.remapNumber(
      frequency, {max: 256}, {max: constants.particleMaxDistance}
    );
    particles[i].move(distance, intensity);
  }

  earth.draw();
};

document.getElementById('play-button').addEventListener('click', (event) => {
  // Hide the play button.
  event.currentTarget.classList.toggle('hidden');
  // Show the progress indicator.
  document.getElementById('progress').classList.toggle('hidden');

  audioConfig = new AudioConfig({
    buckets: 512,
    smoothingTimeConstant: 0.3,
    bufferSize: 2048,
  }, update);

  // Safari has a buggy implementation of the decodeAudioData function. Because
  // of that you need to supply a raw mp3 file without cover art if you want it
  // to execute this animation.
  if (BrowserDetection.isSafari(navigator.userAgent)) {
    audioConfig.loadFromURL('audio/audiobinger-rise-and-shine.mp3').then(init);
  }
  else {
    audioConfig.loadFromURL('audio/audiobinger-rise-and-shine.ogg').then(init);
  }
});