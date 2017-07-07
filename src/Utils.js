export default class Utils {
  static getRandomInteger = function (upperLimit, lowerLimit = 0) {
    const random = Math.floor(Math.random() * (upperLimit - lowerLimit));
    return random + lowerLimit;
  };

  static getRandomElement = function (arr) {
    return arr[this.getRandomInteger(arr.length)];
  };

  static getRandomColor = function (opacity = 1) {
    const colors = [
      // Dark red.
      `rgba(183, 28, 28, ${opacity})`,
      // Dark pink.
      `rgba(136, 14, 79, ${opacity})`,
      // Dark orange.
      `rgba(230, 81, 0, ${opacity})`,
      // Dark dark orange.
      `rgba(191, 54, 12, ${opacity})`,

      // Cold colors like blue and green.
      // `rgba(27, 94, 32, ${opacity})`,
      // `rgba(13, 71, 161, ${opacity})`,
      // `rgba(26, 35, 126, ${opacity})`,
      // `rgba(24, 94, 32, ${opacity})`,
    ];

    return Utils.getRandomElement(colors);
  };

  static getAverage = function (arr, start = 0, end = arr.length) {
    let acc = 0;
    let count = 0;

    for (let i = start; i < end && i < arr.length; i++) {
      acc += arr[i];
      count++;
    }

    return acc / count;
  };

  static euclideanDistance2d = function (point1, point2) {
    return Math.sqrt((point1.x - point2.x) ** 2 + (point1.y - point2.y) ** 2);
  };

  static toRadians = function (angle) {
    return angle * (Math.PI / 180);
  };

  static getPointOnArc = function (
    radius, angle, {x: originX = 0, y: originY = 0} = {x: 0, y: 0}
  ) {
    return {
      x: radius * Math.cos(this.toRadians(angle)) + originX,
      y: radius * Math.sin(this.toRadians(angle)) + originY,
    };
  };

  static remapNumber = function (
    value, {min: oldMin = 0, max: oldMax}, {min: newMin = 0, max: newMax}
  ) {
    const oldLength = oldMax - oldMin;
    const newLength = newMax - newMin;
    return (value - oldMin) / oldLength * newLength + newMin;
  };
}