import {get} from './Request';

export default class AudioConfig {
  constructor(options, callback) {
    // Fourier Transform options.
    this.buckets = options.buckets;
    this.smoothingTimeConstant = options.smoothingTimeConstant;

    this.audioCtx = new AudioContext();

    // It contains the audio data.
    this.sourceNode = this.audioCtx.createBufferSource();

    // It will provide real time information about the audio frequencies.
    this.analyserNode = this.audioCtx.createanalyserNode();

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

  loadFromURL(audioURL) {
    return get(audioURL, 'arraybuffer').then((response) => {
      this.audioCtx.decodeAudioData(response, (buffer) => {
        this.setup(buffer);
      });
    });
  }
}