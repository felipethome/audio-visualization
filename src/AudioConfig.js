/*
 * The main tasks of the objects of this class is to configure the audio
 * routing graph, retrieve the audio frequencies, filter these frequencies
 * and pass them to a user callback. This callback is called at a rate
 * specified by the user.
 *
 * With filtering frequencies is meant that too high and too low frequencies
 * are more likely to not be used, or to be used too much. So in the filtering
 * process frequencies from the extremes of the array are removed.
 */

import {get} from './Request';

export default class AudioConfig {
  constructor(options, callback) {
    const AudioContext = window.AudioContext || window.webkitAudioContext;

    // Fourier Transform options.
    this.buckets = options.buckets;
    this.smoothingTimeConstant = options.smoothingTimeConstant;

    this.audioCtx = new AudioContext();

    // It contains the audio data.
    this.sourceNode = this.audioCtx.createBufferSource();

    // It will provide real time information about the audio frequencies.
    this.analyserNode = this.audioCtx.createAnalyser();

    // Whenever the buffer has bufferSize data served by the input data node
    // (in this case the analyser) the callback "onaudioprocess" is called.
    // When this callback is called the user's callback is called too.
    this.javascriptNode = this.audioCtx.createScriptProcessor(
      options.bufferSize, 1, 1
    );

    // This is the user's callback.
    this.callback = callback;
  }

  setup(buffer) {
    // Configure the Fourier Transform.
    this.analyserNode.fftSize = this.buckets * 2;
    this.analyserNode.smoothingTimeConstant = this.smoothingTimeConstant;

    // Connect the audio nodes to build the routing graph.
    this.sourceNode.connect(this.analyserNode);
    this.analyserNode.connect(this.javascriptNode);
    this.javascriptNode.connect(this.audioCtx.destination);
    this.sourceNode.connect(this.audioCtx.destination);

    this.javascriptNode.onaudioprocess = () => {
      const frequencies =  new Uint8Array(this.analyserNode.frequencyBinCount);
      this.analyserNode.getByteFrequencyData(frequencies);
      this.callback(this.filterFrequencies(frequencies));
    };

    // Assign the audio data.
    this.sourceNode.buffer = buffer;

    // Play the sound immediately.
    this.sourceNode.start();
  }

  filterFrequencies(frequencies) {
    const length = frequencies.length - 200;
    const newFrequencies = new Uint8Array(length);

    for (let i = 50; i < frequencies.length - 150; i++) {
      newFrequencies[i - 50] = frequencies[i];
    }

    return newFrequencies;
  }

  loadFromURL(audioURL, progressCb) {
    return get(audioURL, 'arraybuffer', {}, progressCb).then((response) => {
      this.audioCtx.decodeAudioData(response, (buffer) => {
        this.setup(buffer);
      });
    });
  }
}