global._    = require('lodash');
global.t    = require('moment');

var express = require('express'),
    path    = require('path'),
    logger  = require('morgan'),
    favicon = require('serve-favicon'),
    models  = require('./server/models/'),
    users   = require('./server/routes/users'),
    session = require('express-session'),
    local   = require('./server/config/local'),
    Firebase     = require("firebase"),
    bodyParser   = require('body-parser'),
    cookieParser = require('cookie-parser'),
    controllers  = require('./server/routes/index'),
    passport     = require('passport'),
    LocalStrategy = require('passport-local').Strategy,
    app     = express();

// use static page
app.use(express.static(path.join(__dirname, './public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// // set the express session here
app.use(session({
  secret: 'keyboard cat',
  resave: false,
  saveUninitialized: true,
  cookie: { secure: true }
}));

// use passport here to handle authentication
app.use(passport.initialize());
app.use(passport.session());

// use this routes by default 
controllers(app, passport);
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
models.sequelize.sync({force: true}).then(function() {
  var server = app.listen(process.env.PORT || 3000, function() {
    var port = server.address().port;
    var host = server.address().address;
    console.log('Coder Crush And Critics app listening at http://%s:%s', host, port);
  });
});

local();

module.exports = app;
