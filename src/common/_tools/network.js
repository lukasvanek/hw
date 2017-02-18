import fetch from 'isomorphic-fetch';

export function Request(url, options = {}) {
  return new Promise((resolve, reject) => {
    if (!url) reject(new Error('URL parameter required'));

    const defaultOptions = {
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    };

    options = Object.assign(options, defaultOptions);

    fetch(url, options)
      .then(res =>
        res.text().then(text => ({
          status: res.status,
          text,
        })
      ))
      .then(res => {
        try {
          return { status: res.status, json: JSON.parse(res.text) };
        } catch (err) {
          return { status: res.status, json: null };
        }
      })
      .then(({ status, json }) => {
        if (status >= 200 && status < 300) resolve(json);
        else {
          if (json) {
            reject(json.error);
          } else {
            reject('no json in response');
          }
        }
      })
      .catch((e) => {
        console.log('Request failed', e);
        reject(e);
      });
  });
}

function buildURL(urlParts) {
  let subdom = 'api';
  if (urlParts.subdom) subdom = urlParts.subdom;
  let endpoint = `https://${subdom}.sinesquare.com`;
  if (urlParts.endpoint) endpoint = urlParts.endpoint;
  return `${endpoint}/${urlParts.path}`;
}

export function Get(urlParts, cookie) {
  let opts = { method: 'GET' };
  if (cookie) {
    opts.headers = { cookie };
  }
  return Request(buildURL(urlParts), opts);
}

export function Post(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'POST',
    body: JSON.stringify(body),
  });
}

export function Edit(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'PUT',
    body: JSON.stringify(body),
  });
}

export function Delete(urlParts, body = {}) {
  return Request(buildURL(urlParts), {
    method: 'DELETE',
    body: JSON.stringify(body),
  });
}
