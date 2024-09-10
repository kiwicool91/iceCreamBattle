const { src, dest, watch, series } = require('gulp');
const sass = require('gulp-sass')(require('sass'));
const browserSync = require('browser-sync').create();
const concat = require('gulp-concat');
const uglify = require('gulp-uglify');

// Task to compile SCSS
function scssTask() {
    return src('src/scss/**/*.scss')
        .pipe(sass().on('error', sass.logError))
        .pipe(dest('dist/css'))
        .pipe(browserSync.stream());
}

// Task to process JS
function jsTask() {
    return src('src/js/**/*.js')
        .pipe(concat('script.js'))
        .pipe(uglify())
        .pipe(dest('dist/js'))
        .pipe(browserSync.stream());
}

// Serve and watch SCSS/JS
function serve() {
    browserSync.init({
        server: { baseDir: './' }
    });
    watch('src/scss/**/*.scss', scssTask);
    watch('src/js/**/*.js', jsTask);
    watch('./*.html').on('change', browserSync.reload);
}

// Default Gulp task
exports.default = series(scssTask, jsTask, serve);