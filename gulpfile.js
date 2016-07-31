
var gulp = require('gulp')
var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

//    var sass = require('gulp-ruby-sass')

var connect = require('gulp-connect')
// requires browserify and vinyl-source-stream
var browserify = require('browserify')
var source = require('vinyl-source-stream')

var connect = require('gulp-connect')

// https://github.com/AveVlad/gulp-connect/issues/100
// var cors = require('cors');

var cors = function (req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Headers', '*  ');
  next();
};

gulp.task('connect', function() {
  connect.server({
    root: 'public',
    port: 4000,
    middleware: function() {
        return [cors];
    }
  });
});

/*
gulp.task('connect', function () {
	connect.server({
		    root: 'public',
		    port: 4000
	})
})
*/

gulp.task('browserify', function() {
  // Grabs the app.js file
  return browserify('./app/app.js')
  // bundles it and creates a file called main.js
  .bundle()
  .pipe(source('main.js'))
  // saves it the public/js/ directory
  .pipe(gulp.dest('./public/js/'));
})

gulp.task('watch', function() {
	gulp.watch('app/**/*.js', ['browserify'])
})

gulp.task('default', ['connect', 'watch'])


gulp.task('jshint', function () { });

gulp.task('jscs', function() {
    gulp.src('js/**/*.js')
        .pipe(jscs())
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!'
        }))

        /* Alternatively for Windows users
        .pipe(notify({
            title: 'JSCS',
            message: 'JSCS Passed. Let it fly!',
            notifier: growlNotifier
        }))
        */
});

gulp.task('lint', function() {
    gulp.src('js/**/*.js')
        .pipe(jshint('.jshintrc'))
        .pipe(jshint.reporter('jshint-stylish'))
        .pipe(jshint.reporter('fail'))
        .pipe(notify({
            title: 'JSHint',
            message: 'JSHint Passed. Let it fly!',
        }))
});

gulp.task('build', ['jscs', 'lint'], function() {
    gulp.src('js/**/*.js')
        //pipe through other tasks such as sass or coffee compile tasks
        .pipe(notify({
            title: 'Task Builder',
            message: 'Successfully built application'
        }))
});

