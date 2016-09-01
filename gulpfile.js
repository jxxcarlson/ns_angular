
var gulp = require('gulp')
var notify = require('gulp-notify');
var growl = require('gulp-notify-growl');
var jscs = require('gulp-jscs');
var jshint = require('gulp-jshint');

var environments = require('gulp-environments')

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

// https://www.npmjs.com/package/gulp-replace
var replace = require('gulp-replace');

gulp.task('prod', function(){
  console.log('\n    Configuring for production\n')
  gulp.src(['app/topLevel/index.js'])
    .pipe(replace("development", "production"))
    .pipe(gulp.dest('tmp/'));
    gulp.src(['tmp/index.js'])
      .pipe(gulp.dest('app/topLevel/'))
    // .pipe(gulp.dest('build/file.txt'));
});

gulp.task('dev', function(){
  console.log('\n    Configuring for development\n')
  gulp.src(['app/topLevel/index.js'])
    .pipe(replace("production", "development"))
    .pipe(gulp.dest('tmp/'));
  gulp.src(['tmp/index.js'])
     .pipe(gulp.dest('app/topLevel/'))
});

gulp.task('foo', function(){
  console.log('\n    Task foo\n')
  gulp.src(['file.txt'])
    .pipe(replace('bar', 'foo'))
    .pipe(gulp.dest('build/'));
});

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
