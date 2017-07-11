/*
 * Helper functions to build XMLHttpRequests using Promises.
 */

const buildRequest = function (url, method, responseType, headers, progressCb) {
  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.responseType = responseType;
    req.open(method.toUpperCase(), url);

    Object.keys(headers).forEach((headerKey) => {
      req.setRequestHeader(headerKey, headers[headerKey]);
    });

    req.onprogress = (event) => {
      if (event.lengthComputable) {
        const percentage = event.loaded / event.total;
        if (progressCb) progressCb(percentage);
      }
      else {
        console.error('Unable to compute progress');
      }
    };

    req.onload = () => {
      if (req.status >= 200 && req.status <= 299) {
        resolve(req.response);
      }
      else {
        reject(req);
      }
    };

    req.onerror = () => {
      console.error('Network error.');
    };

    req.send();
  });
};

const get = function (url, responseType, headers = {}, progressCb) {
  if (!url) {
    console.error(`URL can't be ${url}.`);
  }

  return buildRequest(url, 'GET', responseType, headers, progressCb);
};

export {get};