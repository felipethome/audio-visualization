/*
 * The Sky painted on the canvas.
 */

import Utils from './Utils';

export default class Sky {
  constructor(ctx, options, constants) {
    this.ctx = ctx;

    this.nOfStars = options.nOfStars;
    this.starMaxSize = options.starMaxSize;

    // Shallow copy the constants.
    this.constants = Object.assign({}, constants);

    this.stars = [];

    this.starImageNames = [
      'star-opacity-9-img',
      'star-opacity-8-img',
      'star-opacity-7-img',
      'star-opacity-6-img',
      'star-opacity-5-img',
    ];

    for (let i = 0; i < this.nOfStars; i++) {
      const x = Utils.getRandomInteger(this.constants.width);
      const y = Utils.getRandomInteger(this.constants.height);
      const size = Utils.getRandomInteger(this.starMaxSize);
      this.stars.push({
        fileName: Utils.getRandomElement(this.starImageNames),
        x: x,
        y: y,
        size: size,
      });
    }
  }

  draw() {
    const {ctx, nOfStars, stars} = this;

    for (let i = 0; i < nOfStars; i++) {
      const starImg = document.getElementById(stars[i].fileName);
      ctx.drawImage(
        starImg,
        stars[i].x,
        stars[i].y,
        stars[i].size,
        stars[i].size
      );
    }
  }
}