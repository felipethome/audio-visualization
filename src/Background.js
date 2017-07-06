/*
 * The Background is a rectangle that fills the whole canvas and it's drawn
 * behind everything else.
 */

export default class Background {
  constructor(ctx, options, constants) {
    this.ctx = ctx;

    // Shallow copy the color array.
    this.color = options.color.slice();

    // Shallow copy the constants.
    this.constants = Object.assign({}, constants);
  }

  draw(intensity) {
    const {ctx, color} = this;
    const {width, height} = this.constants;

    ctx.fillStyle =
      `rgba(${color[0]}, ${color[1]}, ${color[2]}, ${intensity / 50})`;
    ctx.fillRect(0, 0, width, height);
  }
}