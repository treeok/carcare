/**
 * Created by claire on 2015/4/16.
 */
var gulp = require('gulp'),
    stylus = require('gulp-stylus'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('public', {read: false}).pipe(clean());
});

gulp.task('uncompressedCss',['clean'] , function () {
    return gulp.src(['./src/**/*.css', './src/*.css'])
        .pipe(autoprefixer())
        .pipe(gulp.dest('./public/'))
        .pipe(livereload());
});

gulp.task('uncompressedScript',['clean'] , function () {
    return gulp.src(['./src/**/*.js', './src/*.js'])
        .pipe(gulp.dest('./public/'))
        .pipe(livereload());
});

gulp.task('uncompressedHtml',['uncompressedCss','uncompressedScript'], function () {
    return gulp.src('./view/jade/*.jade')
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

gulp.task('default',['uncompressedHtml'], function () {
    livereload.listen();
    gulp.watch(['./src/**/*.js', './src/*.js','./src/**/*.css', './src/*.css','./view/jade/*.jade'],['uncompressedCss','uncompressedScript','uncompressedHtml']);
});

