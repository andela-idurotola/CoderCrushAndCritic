global._    = require('lodash');
global.t    = require('moment');
var express = require('express'),
    path    = require('path'),
    app     = express(),
    favicon = require('serve-favicon'),
    logger  = require('morgan'),
    routes  = require('./server/routes/index'),
    users   = require('./server/routes/users'),
    models       = require('./server/models/'),
    controllers  = require('./server/controllers'),
    cookieParser = require('cookie-parser'),
    bodyParser   = require('body-parser');
    

// use static page
app.use(express.static(path.join(__dirname, './public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// use this routes by default 
app.use('/', routes);
controllers(app);
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
  });
}

// create database and fire up server
models.sequelize.sync().then(function() {
  var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    var host = server.address().address;
    console.log('Coder Crush And Critics app listening at http://%s:%s', host, port);
  });
});


module.exports = app;
