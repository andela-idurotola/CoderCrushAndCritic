var gulp = require('gulp');
var app = require('./app.js');

// gulp runner for the default launching of the app
gulp.task('default', function() {
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
  });
});

// gulp runner for the back end tests
gulp.task('server:test', function() {
  // place code for your default task here
  console.log('here to run server test');
});

// gulp runner for bower
gulp.task('bower', function() {
  // place code for your default task here
  console.log('here to run  bower');
});

// gulp runner for npm install
gulp.task('bower', function() {
  // place code for your default task here
  console.log('here to run npm install');
});