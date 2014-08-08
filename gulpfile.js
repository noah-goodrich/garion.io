// Include gulp
var gulp = require('gulp');

// Include Our Plugins
var clean = require('gulp-clean');
var concat = require('gulp-concat');
var html2js = require('gulp-html2js');
var jshint = require('gulp-jshint');
var rename = require('gulp-rename');
var sass = require('gulp-sass');
var uglify = require('gulp-uglify');

var paths = {
  index: './public/src/index.html',
  html: ['./public/src/html/*.html', './public/src/html/**/*.html'],
  scss: './public/src/scss/*.scss',
  scripts: ['./public/src/js/app.js', './public/src/js/**/*.js']
};

// Lint Task
gulp.task('lint', function() {
    return gulp.src(paths.scripts)
        .pipe(jshint())
        .pipe(jshint.reporter('default'));
});

// Clean Task
gulp.task('clean', function() {
  return gulp.src('public/dist', { read: false})
    .pipe(clean());
});

// Compile html2js
gulp.task('html', function () {
  return gulp.src(paths.html)
    .pipe(html2js({
      base: 'public/src',
      outputModuleName: 'garion',
      useStrict: true
    }))
    .pipe(concat('templates.js'))
    .pipe(gulp.dest('./public/dist/js'));
});

// Copy index.html
gulp.task('index', function() {
  return gulp.src(paths.index)
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
      .src(paths.scss)
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
      //'./public/bower/bootstrap-sass/dist/js/bootstrap.js',
      './public/bower/angular/angular.js',
      './public/bower/angular-route/angular-route.js',
      './public/bower/angular-sanitize/angular-sanitize.js',
      './public/bower/angular-data/dist/angular-data.js'
    ])
    .pipe(concat('plugins.js'))
    .pipe(gulp.dest('./public/dist/js'));

  return gulp.src(paths.scripts)
        .pipe(concat('app.js'))
        .pipe(gulp.dest('./public/dist/js'));
});

// Default Task
gulp.task('default', ['lint', 'html', 'index', 'sass', 'scripts']);

// Watch Files For Changes
gulp.task('watch', ['default'], function() {
  gulp.watch(paths.html, ['html']);
  gulp.watch(paths.index, ['index']);
  gulp.watch(paths.scripts, ['lint', 'scripts']);
  gulp.watch(paths.sass, ['sass']);
});
