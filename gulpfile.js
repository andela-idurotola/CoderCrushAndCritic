var gulp = require('gulp'),
    path = require('path'),
    jade = require('gulp-jade'),
    less = require('gulp-less'),
    bower = require('gulp-bower'),
    karma = require('gulp-karma'),
    concat = require('gulp-concat'),
    supervisor = require('gulp-supervisor');

var paths = {
  jade : 'app/**/*jade',
  scripts: ['app/**/*js','app/js/*js'],
  public: 'public/**/*.*',
  styles: ['app/styles/application.less',
           'app/styles/sidenav.less'],
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
    'public/lib/angularfire/dist/angularfire.min.js',
    'public/lib/a0-angular-storage/dist/angular-storage.min.js',
    'public/lib/firebase/firebase.js',
    'public/lib/angular-cookies/angular-cookies.min.js',
    'public/views/**/*.html',
    'public/js/index.js',
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

// default group tasks 
gulp.task('heroku:production', ['build']);
// gulp.task('heroku:staging',    ['build']);
gulp.task('build', ['bower','scripts','jade', 'less']);
gulp.task('default', ['build', 'supervisor', 'watch']);