'use strict';

/**
 * Module dependencies.
 */
var path = require('path');
var logger = require('morgan');
var express = require('express');
var app = express();

/**
 * View engine.
 */
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

/**
 * Middleware.
 */
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, 'public')));

/**
 * Routes.
 */
app.use('/', require('./routes/index'));
app.use('/v1', require('./routes/v1'));

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
