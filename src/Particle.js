/*
 * A particle is the object that floats around the earth. They can fall towards
 * the center in which case a gravity constant is used to increase the falling
 * velocity, or they can launch towards the canvas border. The direction they
 * move is defined by a direction vector. We use the vector form of the
 * equation of a line to calculate the next position of the particle.
 */

import Utils from './Utils';

export default class Particle {
  constructor(ctx, options, constants) {
    this.ctx = ctx;

    // This variables will not change throughout the particle's life cycle. So
    // cx and cy will always be the initial position.
    this.angle = options.angle;
    this.cx = options.cx;
    this.cy = options.cy;
    this.radius = options.radius;

    // Shallow copy the constants.
    this.constants = Object.assign({}, constants);

    // Normalized direction vector. 
    const magnitude = Math.sqrt(options.vx ** 2 + options.vy ** 2);
    this.direction = {x: options.vx / magnitude, y: options.vy / magnitude};

    // This are the positions of the particle. The "current" object represents
    // current position and the "arrival" object represents which position
    // the particle must get during the "launching" execution.
    this.arrival = {x: options.cx, y: options.cy};
    this.current = {x: options.cx, y: options.cy};

    // Origin here is not the origin of the canvas, but the reference point
    // from which the calculations relative to the particles are made.
    this.origin = {x: constants.mainCenterX, y: constants.mainCenterY};

    // The closest distance the particles can get to the origin.
    this.minDistance = Utils.euclideanDistance2d(this.current, this.origin);

    this.fallVelocity = 0;
  }

  move(distance, intensity) {
    this.intensity = intensity;

    // Remember the vector form of the equation of a line? This is it.
    this.arrival.x = this.cx + (distance * this.direction.x);
    this.arrival.y = this.cy + (distance * this.direction.y);

    const arrivalDist = Utils.euclideanDistance2d(this.arrival, this.origin);
    const currentDist = Utils.euclideanDistance2d(this.current, this.origin);

    // If the particle is further than the arrival point let it keep falling.
    if (currentDist >= arrivalDist) {
      if (this.wasLanching) this.fallVelocity = 0;
      this.wasLanching = false;
      if (currentDist > this.minDistance) this.fall();
      else this.draw();
    }
    // Otherwise launch it to the arrival point.
    else {
      this.wasLanching = true;
      this.launch(this.intensity);
    }
  }

  fall() {
    // S = Si + (Vi * t) + (0.5 * a * t^2). Since t = 1 for consecutive frames,
    // Vi is our previous velocity and Si is our previous position then gravity
    // becomes just the addition/subtraction of a constant.
    this.fallVelocity += this.constants.gravity;

    this.current.x -= (this.fallVelocity * this.direction.x);
    this.current.y -= (this.fallVelocity * this.direction.y);

    this.draw();
  }

  launch() {
    this.current.x += (this.intensity * this.direction.x);
    this.current.y += (this.intensity * this.direction.y);

    this.draw();
  }

  draw() {
    const {ctx, current, radius, intensity, constants} = this;
    const color = Utils.getRandomColor(0.6);

    // Draw the line connecting the particles to the canvas center.
    ctx.save();
    ctx.beginPath();
    ctx.strokeStyle = color;
    ctx.moveTo(constants.mainCenterX, constants.mainCenterY);
    ctx.lineTo(current.x, current.y);
    ctx.stroke();
    ctx.restore();

    // Draw the circle around the particle. Its size is a linear function of
    // the intensity.
    ctx.beginPath();
    ctx.arc(
      current.x,
      current.y,
      radius + (6 * intensity),
      0,
      2 * Math.PI,
      false
    );
    ctx.fillStyle = color;
    ctx.fill();

    // Draw the particle/image. Its size is a linear function of the intensity.
    const img = document.getElementById('particle-img');
    const imgWidth = radius * 2;
    const imgHeight = radius * 2;
    ctx.drawImage(
      img,
      current.x - (imgWidth / 2),
      current.y - (imgHeight / 2),
      imgWidth + (2.2 * intensity),
      imgHeight + (2.2 * intensity)
    );
  }
}