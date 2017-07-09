/*
 * Based on MDN implementation:
 * https://developer.mozilla.org/en-US/docs/Web/Events/resize
 *
 * Throttles the event to avoid too many calls to the callback function.
 */

const throttle = function (type, name, obj = window) {
  let running = false;

  const func = function () {
    if (running) return;
    running = true;

    requestAnimationFrame(() => {
      obj.dispatchEvent(new CustomEvent(name));
      running = false;
    });
  };

  obj.addEventListener(type, func);
};

export default throttle;