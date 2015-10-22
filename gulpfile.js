var gulp = require('gulp');
var jade = require('gulp-jade');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var karma = require('gulp-karma');
// var app = require('./app.js');
var less = require('gulp-less');
var path = require('path');
var supervisor = require('gulp-supervisor');
// var nodemon = require('gulp-nodemon');

var paths = {
  jade : 'app/**/*jade',
  scripts: ['app/**/*js','app/js/*js'],
  public: 'public/**/*.*',
  styles: ['app/styles/application.less'],
  clientTests: [
    'public/lib/jquery/dist/jquery.min.js',
    'public/lib/angular/angular.min.js',
    'public/lib/angular-mocks/angular-mocks.js',
    'public/lib/jquery-ui/jquery-ui.min.js',
    'public/lib/lodash/lodash.min.js',
    'public/lib/angular-route/angular-route.min.js',
    'public/lib/moment/min/moment-with-locales.min.js',
    'public/lib/angular-ui-router/release/angular-ui-router.min.js',
    'public/lib/angular-animate/angular-animate.min.js',
    'public/lib/angular-aria/angular-aria.min.js',
    'public/lib/angular-material/angular-material.min.js',
    'public/lib/velocity/velocity.js',
    'public/js/index.js',
    'public/views/**/*.html',
    'test/client/*.js'
  ]
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

// gulp runner to concat scripts into one file
gulp.task('less', function () {
  gulp.src(paths.styles)
    .pipe(less({
      paths: [ path.join(__dirname, 'styles') ]
    }))
    .pipe(gulp.dest('./public/css'));
});

// should run server and watch the files for changes
gulp.task('supervisor', function() {
  supervisor('./app.js',{
    args: [],
    watch: paths.scripts,
    ignore: [ "test" ],
    pollInterval: 500,
    extensions: [ "js","jade" ],
    exec: "node",
    debug: true,
    debugBrk: false,
    harmony: true,
    noRestartOn: false,
    forceWatch: true,
    quiet: false
  });
});

// gulp runner for the back end tests
gulp.task('server:test', function() {
  console.log('here to run server test');
});

// Rerun the task when a file changes
gulp.task('watch', function() {
  gulp.watch(paths.scripts,['scripts']);
  gulp.watch(paths.jade, ['jade']);
  gulp.watch(paths.styles, ['less']);
  gulp.watch(paths.public).on('change', function(file) {
    // console.log('FILE PATH: ',file.path);
  });
});

// gulp runner for npm install
gulp.task('bower', function() {
  return bower()
    .pipe(gulp.dest('public/lib/'));
});

// run the client test with karma
gulp.task('client:test', ['scripts'], function() {
  return gulp.src(paths.clientTests)
  .pipe(karma({
    configFile: 'karma.conf.js',
    action: 'run'
  }));
});

// gulp runner for the default launching of the app
gulp.task('dev-server', function() {
  var server = app.listen(process.env.PORT || 3000, function () {
    var port = server.address().port;
    var host = server.address().address;
    console.log('Coder Crush And Critics app listening at http://%s:%s', host, port);
  });
});

// default group tasks 
gulp.task('build', ['bower','scripts','jade','less']);
gulp.task('default', ['build', 'supervisor', 'watch']);
gulp.task('heroku:production', ['build']);