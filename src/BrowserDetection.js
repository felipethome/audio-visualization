/*
 * https://developer.mozilla.org/en-US/docs/Web/HTTP/Browser_detection_using_the_user_agent
 */

export default class BrowserDetection {
  static isSafari(userAgent) {
    return userAgent.indexOf('Safari/') !== -1 &&
      userAgent.indexOf('Chrome') === -1 &&
      userAgent.indexOf('Chromium') === -1;
  }
}