'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var marked = require('marked');

// convert README from markdown to HTML
var readmeMD = fs.readFileSync(path.join(__dirname, '../README.md'), 'utf8');
var readmeHTML = marked(readmeMD);

/**
 * GET home page.
 */
router.get('/', function(req, res, next) {
    res.render('index', {
        title: 'CORSmirror',
        readme: readmeHTML
    });
});

/**
 * Export router.
 */
module.exports = router;
