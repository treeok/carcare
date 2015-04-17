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
    bump = require('gulp-bump'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('public', {read: false}).pipe(clean());
});

gulp.task('uncompressedCss',['clean'], function () {
    return gulp.src(['./src/**/*.css', './src/*.css'])
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/'));
});

gulp.task('uncompressedScript',['clean'], function () {
    return gulp.src(['./src/**/*.js', './src/*.js'])
        .pipe(gulp.dest('./public/'));
});

gulp.task('default',['uncompressedCss','uncompressedScript'], function () {
    return gulp.src('./view/jade/*.jade')
        .pipe(jade())
        .pipe(gulp.dest('./public'));
});
