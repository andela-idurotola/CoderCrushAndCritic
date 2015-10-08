var gulp = require('gulp');
var jade = require('gulp-jade');
var concat = require('gulp-concat');
var app = require('./app.js');
var supervisor = require('gulp-supervisor');

var paths = {
  jade : 'app/**/*jade',
  scripts: 'app/**/*js'
};

// gulp runner for templates
gulp.task('jade', function() {
  gulp.src(paths.jade)
    .pipe(jade())
    .pipe(gulp.dest('./public/'));
});

// gulp runner to concat scripts into one file
gulp.task('scripts', function() {
  gulp.src(paths.scripts)
    .pipe(concat('index.js'))
    .pipe(gulp.dest('./public/js'));
});

// gulp runner for the back end tests
gulp.task('server:test', function() {
  console.log('here to run server test');
});

// gulp runner for npm install
gulp.task('bower', function() {
  console.log('here to run npm install');
});

// gulp runner for the default launching of the app
gulp.task('default', function() {
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Coder Crush And Critics app listening at http://%s:%s', host, port);
  });
});