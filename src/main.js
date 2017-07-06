import {get} from './Request';
import Background from './Background';
import Sky from './Sky';
import Particle from './Particle';
import Utils from './Utils';

const canvas = document.getElementById('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const particles = [];
let sky;
let background;

const constants = {
  // The number of buckets returned from the Fourier Transform.
  buckets: 512,

  width: canvas.width,
  height: canvas.height,

  // The minimum radius of the particles.
  particleRadius: 15,
  // The closest distance the particles will be relative to the center.
  particleDistance: 160,
  // Number of particles. For better results choose a divisor of 360.
  nOfParticles: 30,

  // The radius of the Earth image.
  mainRadius: 50,

  // The center of the canvas. I want the constants to be "flat" so it can
  // easily be cloned. That is why this is not an object with shape
  // {x: Number, y: Number}.
  mainCenterX: Math.ceil(canvas.width / 2),
  mainCenterY: Math.ceil(canvas.height / 2),

  // The maximum distance the particles can get from their initial point.
  maxDistance: 100,

  gravity: 1,
};

const audioCtx = new AudioContext();
const sourceNode = audioCtx.createBufferSource();
const analyser = audioCtx.createAnalyser();
const javascriptNode = audioCtx.createScriptProcessor(2048, 1, 1);

const loadAudioFromURL = function (url) {
  return get(url, 'arraybuffer').then((response) => {
    audioCtx.decodeAudioData(response, (buffer) => {
      sourceNode.buffer = buffer;
      sourceNode.start();
    });
  });
};

const setup = function () {
  analyser.fftSize = constants.buckets * 2;
  analyser.smoothingTimeConstant = 0.3;

  sourceNode.connect(analyser);
  analyser.connect(javascriptNode);
  javascriptNode.connect(audioCtx.destination);
  sourceNode.connect(audioCtx.destination);

  background = new Background(ctx, {
    color: [183, 28, 28],
  }, constants);

  sky = new Sky(ctx, {
    nOfStars: 800,
    starMaxSize: 3,
  }, constants);

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

const accumulateFrequencies = function (frequencies, index) {
  if (frequencies.length < constants.nOfParticles) {
    return index >= frequencies.length ? 0 : frequencies[index];
  }

  const length = Math.floor(frequencies.length / constants.nOfParticles);
  const start = index * length;
  const end = start + length;
  return Utils.getAverage(frequencies, start, end);
};

/**
 * Remove too high and too low frequencies.
 * @param  {Uint8Array} frequencies Array of frequencies.
 * @return {Uint8Array}             Array of filtered frequencies.
 */
const filterFrequencies = function (frequencies) {
  const length = frequencies.length - 200;
  const newFrequencies = new Uint8Array(length);

  for (let i = 50; i < frequencies.length - 150; i++) {
    newFrequencies[i - 50] = frequencies[i];
  }

  return newFrequencies;
};

const update = function (frequencies) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  const average = Utils.getAverage(frequencies);
  // Frequencies are in the interval 0..256 (so it's their average).
  // Remap them to the interval 0..10.
  const intensity = Utils.remapNumber(average, {max: 256}, {max: 10});

  background.draw(intensity);
  sky.draw();

  for (let i = 0; i < particles.length; i++) {
    const frequency = accumulateFrequencies(frequencies, i);
    const distance = Utils.remapNumber(
      frequency, {max: 256}, {max: constants.maxDistance}
    );
    particles[i].move(distance, intensity);
  }

  const earthImg = document.getElementById('earth-img');
  const earthImgWidth = 6 * constants.mainRadius;
  const earthImgHeight = 6 * constants.mainRadius;
  ctx.drawImage(
    earthImg,
    constants.mainCenterX - (earthImgWidth / 2),
    constants.mainCenterY - (earthImgHeight / 2),
    earthImgWidth,
    earthImgHeight
  );
};

javascriptNode.onaudioprocess = () => {
  const frequencies =  new Uint8Array(analyser.frequencyBinCount);
  analyser.getByteFrequencyData(frequencies);
  update(filterFrequencies(frequencies));
};

loadAudioFromURL('audio/audiobinger-rise-and-shine.mp3').then(() => {
  setup();
});