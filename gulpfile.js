'use strict';
var gulp = require('gulp');
var nsp = require('gulp-nsp');
var babel = require('gulp-babel');
var del = require('del');

gulp.task('nsp', function (cb) {
  nsp('package.json', cb);
});

gulp.task('babel', ['clean'], function () {
  return gulp.src('lib/**/*.js')
    .pipe(babel())
    .pipe(gulp.dest('dist'));
});

gulp.task('clean', function () {
  return del('dist');
});

gulp.task('prepublish', ['nsp', 'babel']);
