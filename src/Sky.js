/*
 * The Sky painted on the canvas.
 */

import Utils from './Utils';

export default class Sky {
  constructor(ctx, options, constants) {
    this.ctx = ctx;

    this.nOfStars = options.nOfStars;
    this.starMaxSize = options.starMaxSize;

    // Shallow copy the star color.
    this.starColor = options.starColor.slice();

    // Shallow copy the constants.
    this.constants = Object.assign({}, constants);

    this.stars = [];

    for (let i = 0; i < this.nOfStars; i++) {
      const x = Utils.getRandomInteger(this.constants.width);
      const y = Utils.getRandomInteger(this.constants.height);
      const size = Utils.getRandomInteger(this.starMaxSize);
      const color = this.starColor;
      const opacity = Utils.getRandomInteger(10) / 10;
      this.stars.push({
        x: x,
        y: y,
        size: size,
        color: `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${opacity})`,
      });
    }
  }

  draw() {
    this.ctx.save();
    this.ctx.shadowColor = 'rgba(255, 255, 255, 1)';
    this.ctx.shadowBlur = this.starMaxSize;

    for (let i = 0; i < this.nOfStars; i++) {
      this.ctx.fillStyle = this.stars[i].color;
      this.ctx.fillRect(
        this.stars[i].x,
        this.stars[i].y,
        this.stars[i].size,
        this.stars[i].size
      );
    }
    this.ctx.restore();
  }
}