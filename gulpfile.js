// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var jshint = require('gulp-jshint');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var rename = require('gulp-rename');
var concat = require('gulp-concat');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./public/src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Compile Our Sass
gulp.task('sass', function() {
  var bootstrap = function() {
    return gulp
      .src('./public/bower/bootstrap-sass/lib/*.scss')
      .pipe(sass())
      .pipe(concat('bootstrap.css'))
      .pipe(gulp.dest('./public/src/scss'))
      .pipe(gulp.dest('./public/dist/css'));
  };

  var site = function() {
    return gulp
      .src('./public/src/scss/*.scss')
      .pipe(sass())
      .pipe(concat('site.css'))
      .pipe(gulp.dest('./public/dist/css'));
  };

  return bootstrap().on('end', site);
});

// Concatenate & Minify JS
gulp.task('scripts', function() {

  gulp
    .src([
      './public/bower/jquery/query.js',
      './public/bower/angular/angular.js',
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./public/dist/js'));

  return gulp.src('./public/src/js/**/*.js')
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist/js'));
});

// Watch Files For Changes
gulp.task('watch', function() {
    gulp.watch('./public/src/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('./public/src/scss/*.scss', ['sass']);
});

// Default Task
gulp.task('default', ['lint', 'sass', 'scripts', 'watch']);
