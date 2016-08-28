'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();

/**
 * GET home page.
 */
router.get('/', function(req, res, next) {
    res.render('index', { title: 'CORSmirror' });
});

/**
 * Export router.
 */
module.exports = router;
