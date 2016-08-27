'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();

/**
 * CORS mirror API.
 * Route supports all HTTP verbs.
 */
router.all('/cors', function(req, res, next) {
    var url = req.query.url;

    if (url) {
        res.send(req.method + ': ' + req.query.url);
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
