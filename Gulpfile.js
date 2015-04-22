/**
 * Created by claire on 2015/4/16.
 */
var gulp = require('gulp'),
    uglify = require("gulp-uglify"),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    minifyCSS = require('gulp-minify-css'),
    autoprefixer = require('gulp-autoprefixer'),
    livereload = require('gulp-livereload'),
    watch = require('gulp-watch'),
    jade = require('gulp-jade'),
    imagemin = require('gulp-imagemin'),
    pngquant = require('imagemin-pngquant'),
    clean = require('gulp-clean');

gulp.task('clean', function () {
    return gulp.src('public', {read: false}).pipe(clean());
});

//样式
gulp.task('css', function () {
    return gulp.src(['./src/**/*.css', './src/*.css'])
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(gulp.dest('./public/'))
        .pipe(concat('carcare.css'))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(minifyCSS())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/dist/css'))
        .pipe(livereload());
});

gulp.task('js', function () {
    return gulp.src(['./src/**/*.js', './src/*.js'])
        .pipe(gulp.dest('./public/'))
        .pipe(concat('carcare.js'))
        .pipe(gulp.dest('./public/dist/script'))
        .pipe (uglify())
        .pipe(rename({ suffix: '.min' }))
        .pipe(gulp.dest('./public/dist/script'))
        .pipe(livereload());
});

gulp.task('img', function () {
    return gulp.src(['./src/**/*.png'])
        .pipe(imagemin({
            progressive: true,
            svgoPlugins: [{removeViewBox: false}],
            use: [pngquant()]
        }))
        .pipe(gulp.dest('./public/'))
        .pipe(gulp.dest('./public/dist'));
});

gulp.task('jade2html',['css','js','img'], function () {
    return gulp.src('./view/jade/*.jade')
        .pipe(jade({pretty:true}))
        .pipe(gulp.dest('./public'))
        .pipe(livereload());
});

gulp.task('default',['clean'], function () {
    gulp.start('jade2html');
    livereload.listen();
    gulp.watch(['./src/**/*.js', './src/*.js','./src/**/*.css', './src/*.css','./view/jade/*.jade'],['css','js','jade2html']);
});

