// Load plugins
var gulp = require('gulp'),
    sass = require('gulp-sass'),
    autoprefixer = require('gulp-autoprefixer'),
    minifycss = require('gulp-minify-css'),
    uglify = require('gulp-uglify'),
    imagemin = require('gulp-imagemin'),
    rename = require('gulp-rename'),
    concat = require('gulp-concat'),
    notify = require('gulp-notify'),
    cache = require('gulp-cache'),
    livereload = require('gulp-livereload'),
    sourcemaps = require('gulp-sourcemaps');

// Styles
gulp.task('dev-styles', function() {
    return gulp.src('assets/css/style.scss')
        .pipe(sourcemaps.init())
        .pipe(autoprefixer('last 2 version', 'safari 5', 'ie 8', 'ie 9', 'opera 12.1', 'ios 6', 'android 4'))
        .pipe(sass())
        .pipe(sourcemaps.write())
        .pipe(gulp.dest('dev/css'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(minifycss())
        .pipe(gulp.dest('dev/css'))
        .pipe(notify({ message: 'Styles task complete' }));
});

// Scripts
gulp.task('dev-scripts', function() {
    return gulp.src(['assets/js/vendor/*.js', 'assets/js/*.js'])
        .pipe(concat('production.js'))
        .pipe(gulp.dest('dev/js'))
        .pipe(rename({ suffix: '.min' }))
        .pipe(uglify())
        .pipe(gulp.dest('dev/js'))
        .pipe(notify({ message: 'Scripts task complete' }));
});

// Images
gulp.task('dev-images', function() {
    return gulp.src('assets/img/**/*')
        .pipe(cache(imagemin({ optimizationLevel: 3, progressive: true, interlaced: true })))
        .pipe(gulp.dest('dev/img'));
});

// Default task
gulp.task('default', function() {
    gulp.start('dev-styles', 'dev-scripts', 'dev-images');
});

// Watch
gulp.task('dev', function() {

    // Watch .scss files
    gulp.watch('assets/css/**/*.scss', ['styles']);

    // Watch .js files
    gulp.watch('assets/js/**/*.js', ['scripts']);

    // Watch image files
    gulp.watch('assets/img/**/*', ['images']);

    // Create LiveReload server
    livereload.listen();

    // Watch any files in dist/, reload on change
    gulp.watch(['dev/**']).on('change', livereload.changed);

});