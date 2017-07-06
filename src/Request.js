const buildRequest = function (url, method, responseType, headers) {
  const internalHeaders = headers || {};

  return new Promise((resolve, reject) => {
    const req = new XMLHttpRequest();
    req.responseType = responseType;
    req.open(method.toUpperCase(), url);

    Object.keys(internalHeaders).forEach((headerKey) => {
      req.setRequestHeader(headerKey, internalHeaders[headerKey]);
    });

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

const get = function (url, responseType, headers) {
  if (!url) {
    console.error(`URL can't be ${url}.`);
  }

  return _buildRequest(url, 'GET', responseType, headers);
};

export {get};