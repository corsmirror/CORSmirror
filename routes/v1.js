const router = require('express').Router();
const request = require('request');
const contentType = require('content-type');

/**
 * GET /v1/cors
 *
 * CORS mirror API.
 * Route supports all HTTP verbs.
 */
module.exports = router.all('/cors', (req, res) => {
  const url = req.query.url;
  // non-overridable blacklist for HTTP header fields
  const blacklist = /^(url)$/;

  // check query parameter `url`
  // Express will decode the encoded value
  if (url) {
    const options = {
      method: req.method,
      url: url,
    };

    // make a request to the url
    // and respond with the status, headers, and body
    request(options, (error, response, body) => {
      if (error) {
        return res.status(500).send(error.message);
      }

      // exclude response CORS headers to prevent existing
      // CORS headers from getting overridden
      // https://developer.mozilla.org/en-US/docs/Web/HTTP/Access_control_CORS
      const headers = {};
      Object.keys(response.headers).forEach((header) => {
        if (header.indexOf('access-control-') !== 0) {
          headers[header] = response.headers[header];
        }
      });

      // check for additional querystring fields
      let fieldName;
      let fieldValue;

      for (fieldName in req.query) {
        fieldValue = req.query[fieldName];
        fieldName = fieldName.toLowerCase();

        if (fieldValue && !blacklist.test(fieldName)) {
          // handle invalid "content-type"
          if (fieldName === 'content-type') {
            try {
              contentType.parse(fieldValue);
              // TypeError: invalid media type
            } catch (error) {
              res.status(500);
              res.send('Invalid "Content-Type" parameter.');
              return;
            }
          }

          // set or override header field
          headers[fieldName] = fieldValue;
        }
      }

      res.status(response.statusCode);
      res.set(headers);
      res.send(body);
    });

    // return or else you will get the following:
    // Error: Can't set headers after they are sent.
    return;
  }

  res.status(404);
  res.send('Please specify a valid `url` query parameter.');
});
