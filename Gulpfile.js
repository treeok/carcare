/**
 * Created by claire on 2015/4/16.
 */
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    header = require('gulp-header'),
    footer = require('gulp-footer'),
    jade = require('gulp-jade'),
    bump = require('gulp-bump');

gulp.task('uncompressedCss', function () {
    return gulp.src(['./src/**/*.css', '!./src/*.css'])
        .pipe(stylus({import: '../variables.styl'}))
        .pipe(autoprefixer())
        .pipe(gulp.dest('./dist/uncompressed'));
});

gulp.task('default', function () {
    return gulp.src('./view/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./public/page'));
});
