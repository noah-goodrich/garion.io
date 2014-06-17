// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

// Lint Task
gulp.task('lint', function() {
    return gulp.src('./public/src/js/**/*.js')
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Clean Task
gulp.task('clean', function() {
  return gulp.src('public/dist', { read: false})
    .pipe(clean());
});

// Copy index.html
gulp.task('index', function() {
  return gulp.src('./public/src/index.html')
    .pipe(gulp.dest('./public/dist'));
});

// Compile Our Sass
gulp.task('sass', function() {
  var bootstrap = function() {
    return gulp
      .src('./public/bower/bootstrap-sass/lib/*.scss')
      .pipe(sass())
      .pipe(concat('bootstrap.css'))
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
    gulp.watch('./public/src/index.html', ['index']);
    gulp.watch('./public/src/js/**/*.js', ['lint', 'scripts']);
    gulp.watch('./public/src/scss/*.scss', ['sass']);
});

gulp.task('watch', ['default', 'watch']);

// Default Task
gulp.task('default', ['lint', 'index', 'sass', 'scripts']);
