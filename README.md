# Audio Visualization

## The idea behind this animation

The idea is to show the music going on around the Earth. If the music is "louder" then the music notes are further away. The Earth keeps always atracting the music to itself with its gravity.

The frequencies of the audio are captured in real time. Each frequency corresponds to one floating sphere. Higher the frequency further these spheres will be from the canvas center. The size of the spheres are related to the average of all frequencies. If the average is a big number so the spheres will be big too. Same thing for the velocity they move away: larger the average higher the speed.

The spheres come back to their original point because of the implemented gravity.

## What does this animation uses?

This animation uses the Web Audio API and HTML canvas element.
The code uses ES6, but it is transpiled using Babel.

## Compatibility

Up to date Chrome, Firefox or Edge will definitely work.
Up to date Safari (Webkit) will work, but their decodeAudioData function is buggy, so I do not guarantee that.
Internet Explorer: No.

[Web Audio API compatibility table](https://caniuse.com/#search=web%20audio%20api)
[Canvas compatibility table](https://caniuse.com/#search=canvas)

## How can I try it?

Clone this repo:

    git clone github.com/felipethome/audio-visualization

Install dependencies:

    npm install

For a development version:

    npm run dev

Then check localhost:8889.

For a production version (minimized and compiled with NODE_ENV setted to "production"):

    npm run deploy

## LICENSE

BSD-3