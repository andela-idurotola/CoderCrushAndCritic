global._    = require('lodash');
global.t    = require('moment');
var express = require('express');
var path    = require('path');
var favicon = require('serve-favicon');
var logger  = require('morgan');
var routes  = require('./server/routes/index');
var users   = require('./server/routes/users');
var models       = require('./server/models/');
var controllers  = require('./server/controllers');
var cookieParser = require('cookie-parser');
var bodyParser   = require('body-parser');
var app     = express();

// use static page
app.use(express.static(path.join(__dirname, './public')));

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());

// use this routes
app.use('/', routes);
// this would be not be used by default 
// unless we comment the upper one out
controllers(app);
app.use('/users', users);

// load backend routes
controllers(app);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
    var err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handlers
// development error handler
if (app.get('env') === 'development') {
    app.use(function(err, req, res, next) {
        res.status(err.status || 500);
       // res.redirect('/error_404');
       // console.log("ERROR : ",req);
    });
}

// create database and fire up server
models.sequelize.sync().then(function() { console.log('CREATED RUN SERVER');
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    var host = server.address().address;
    console.log('Coder Crush And Critics app listening at http://%s:%s', host, port);
  });
});


module.exports = app;
