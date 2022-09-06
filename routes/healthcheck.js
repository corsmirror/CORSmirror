const router = require('express').Router();

/**
 * GET /healthcheck.
 *
 * Returns 200 OK response.
 */
module.exports = router.get('/healthcheck', (request, response) => {
  response.send('OK');
});
