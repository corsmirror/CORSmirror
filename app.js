'use strict';

/**
 * Module dependencies.
 */
var express = require('express');
var path = require('path');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var app = express();

/**
 * View engine.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Middleware.
 */
// uncomment after placing your favicon in `/public`
//app.use(require('serve-favicon')(path.join(__dirname, 'public/favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', require('./routes/index'));

/**
 * Catch 404 and forward to error handler.
 */
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

/**
 * Development error handler.
 * Stacktrace will be printed.
 */
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
        res.render('error', {
            message: err.message,
            error: err
        });
    });
}

/**
 * Production error handler.
 * Stacktrace will not be leaked.
 */
app.use(function(err, req, res, next) {
    res.status(err.status || 500);
    res.render('error', {
        message: err.message,
        error: {}
    });
});

/**
 * Export app.
 */
module.exports = app;
