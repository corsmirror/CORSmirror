const cors = require('cors');
const express = require('express');
const path = require('path');
const logger = require('morgan');

const app = express();

/**
 * View engine.
 */
app.set('views', path.resolve(__dirname, 'views'));
app.set('view engine', 'html');
app.engine('html', require('hbs').__express);

/**
 * Middleware.
 */
app.use(logger('dev'));
app.use(express.static(path.resolve(__dirname, 'public')));
app.use(cors());
app.disable('x-powered-by');

/**
 * Routes.
 */
app.use('/', require('./routes/index'));
app.use('/v1', require('./routes/v1'));
app.get('/heartbeat', (request, response) => {
  response.status(200).json({
    status: 200,
    message: 'OK',
  });
});

/**
 * Catch 404 and forward to error handler.
 */
app.use((request, response, next) => {
  const error = new Error('Not Found');
  error.status = 404;
  next(error);
});

/**
 * Development error handler.
 * Stacktrace will be printed.
 */
if (app.get('env') === 'development') {
  app.use((error, request, response) => {
    response.status(error.status || 500);
    response.render('error', {
      message: error.message,
      error,
    });
  });
}

/**
 * Production error handler.
 * Stacktrace will not be leaked.
 */
app.use((error, request, response) => {
  response.status(error.status || 500);
  response.render('error', {
    message: error.message,
    error: {},
  });
});

module.exports = app;
