var gulp = require('gulp');
var jade = require('gulp-jade');
var bower = require('gulp-bower');
var concat = require('gulp-concat');
var app = require('./app.js');
var less = require('gulp-less');
var path = require('path');
var supervisor = require('gulp-supervisor');
// var nodemon = require('gulp-nodemon');

var paths = {
  jade : 'app/**/*jade',
  scripts: ['app/**/*js','app/js/*js'],
  public: 'public/**/*.*',
  styles: [
    'app/styles/application.less',
    // 'app/styles/directives.less',
    // 'app/styles/animations.less'
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

// running the server with nodemon
// gulp.task('dev-server', function() {
//   nodemon({script: './bin/www', env: {'NODE_ENV': 'development'}})
//     .on('restart');
// });

// gulp supervisor should watch the files and run server when done
gulp.task('supervisor', function() {
  supervisor('npm start',{
    args: [],
    watch: [ "test" ],
    ignore: [ "tasks" ],
    pollInterval: 500,
    extensions: [ "js" ],
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

// gulp runner for the default launching of the app
gulp.task('dev-server', function() {
  var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Coder Crush And Critics app listening at http://%s:%s', host, port);
  });
});

// default group tasks 
gulp.task('build', ['bower','scripts','jade','less']);
gulp.task('default', ['build', 'dev-server', 'watch']);