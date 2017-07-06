/*
 * An image of our beautiful planet is drawn on the canvas.
 */

export default class Earth {
  constructor(ctx, options) {
    this.ctx = ctx;

    this.x = options.cx - (options.width / 2);
    this.y = options.cy - (options.height / 2);
    this.width = options.width;
    this.height = options.height;
  }

  draw() {
    const {ctx, x, y, width, height} = this;
    const earthImg = document.getElementById('earth-img');

    ctx.drawImage(
      earthImg,
      x,
      y,
      width,
      height
    );
  }
}