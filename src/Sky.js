import Utils from './Utils';

export default class Sky {
  constructor(ctx, options, constants) {
    this.ctx = ctx;

    this.nOfStars = options.nOfStars;
    this.starMaxSize = options.starMaxSize;

    this.constants = Object.assign({}, constants);

    this.stars = [];

    for (let i = 0; i < this.nOfStars; i++) {
      const x = Utils.getRandomInteger(this.constants.width);
      const y = Utils.getRandomInteger(this.constants.height);
      const size = Utils.getRandomInteger(this.starMaxSize);
      const color = `rgba(255, 255, 255, ${Utils.getRandomInteger(10) / 10})`;
      this.stars.push({x: x, y: y, size: size, color: color});
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