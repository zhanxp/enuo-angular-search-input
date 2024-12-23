var gulp = require('gulp');
var templateCache = require('gulp-angular-templatecache');
var browserSync = require('browser-sync');
var uglifyjs = require('gulp-uglify');
var concat = require("gulp-concat");
var ngAnnotate = require('gulp-ng-annotate');
var less = require('gulp-less');

gulp.task('ngTemplate', function () {
  return gulp.src('./src/*.html')
    .pipe(templateCache({
      standalone: true,
      module: 'search.input',
      root: 'search/input/templates'
    }))
    .pipe(gulp.dest('./src'));
});

gulp.task('build', function () {
  return gulp.src([
    "./src/templates.js",
    "./src/searchInput.js",
    "./src/searchProItem.js",
    "./src/*.js"
  ])
    .pipe(ngAnnotate())
    .pipe(uglifyjs({
      output: {
        max_line_len: 100000
      }
    }))
    .pipe(concat('search-input.js'))
    .pipe(gulp.dest("./dist"));
});

gulp.task('sass', function () {
  return gulp.src("./src/*.scss")
    .pipe(less())
    .pipe(concat('search-input.css'))
    .on('error', less.logError)
    .pipe(gulp.dest("./dist"));
});

gulp.task('watch', ['ngTemplate', 'build', 'sass'], function () {
  gulp.watch([
    "./*.html",
    './dist/*.js'
  ], function (event) {
    browserSync.reload();
  });

  gulp.watch("./src/*.html", ['ngTemplate'], function (event) {

  });

  gulp.watch("./src/*.js", ['build'], function (event) {

  });

  gulp.watch("./src/*.scss", ['sass'], function (event) {

  });
});

gulp.task('serve', ['watch'], function () {
  var baseDir = "./";
  var server = {
    baseDir: baseDir
  };
  browserSync.instance = browserSync.init({
    startPath: '/test.html',
    server: server,
    port: 3013,
    ui: {
      port: 3014
    },
    browser: 'default',
    ghostMode: false
  });
});

gulp.task('default', ['watch'], function () {
  console.log("it works!");
});