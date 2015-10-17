global._ = require('lodash');
global.t = require('moment');
var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var routes = require('./server/routes/index');
var users = require('./server/routes/users');
var env = process.env.NODE_ENV || 'development';
var app = express();

(function run(dir) {

  // use static page
  app.use(express.static(path.join(__dirname, './public')));

  // view engine setup
  app.set('views', path.join(__dirname, 'views'));
  app.set('view engine', 'jade');

  // uncomment after placing your favicon in /public
  app.use(logger('dev'));
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));
  app.use(cookieParser());
  app.use('/', routes);
  app.use('/users', users);

  // catch 404 and forward to error handler
  app.use(function(req, res, next) {
      var err = new Error('Not Found');
      err.status = 404;
      next(err);
  });

  // development error handler
  if (app.get('env') === 'development') {
      app.use(function(err, req, res, next) {
          res.status(err.status || 500);
         // res.redirect('/error_404');
         // console.log("ERROR : ",req);
      });
  }

  var server = app.listen(process.env.PORT || 3000, function() {
    console.log('Listening on port %d', server.address().port);
  });

})(process.cwd());



module.exports = app;
