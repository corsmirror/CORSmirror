'use strict';

/**
 * Module dependencies.
 */
var router = require('express').Router();
var request = require('request');

/**
 * CORS mirror API.
 * Route supports all HTTP verbs.
 */
router.all('/cors', function(req, res, next) {
    var url = req.query.url;

    // check query parameter `url`
    // Express will decode the encoded value
    if (url) {
        var options = {
            method: req.method,
            url: url
        };

        // make a request to the url
        // and respond with the status, headers, and body
        request(options, function(error, response, body) {
            if (error) {
                return next(error);
            }

            res.status(response.statusCode);
            res.set(response.headers);
            res.send(body);
        });

        // return or else you will get the following:
        // Error: Can't set headers after they are sent.
        return;
    }

    next();
});

/**
 * Export router.
 */
module.exports = router;
