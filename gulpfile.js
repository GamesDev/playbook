var gulp = require('gulp');
var sass = require('gulp-sass');
var concat = require('gulp-concat');
var uglify = require('gulp-uglify');
var minify = require('gulp-minify-css');

var assets = {
    'js': [
        "bower_components/jquery/dist/jquery.js",
        "bower_components/highlightjs/highlight.pack.js",
        "_js/*.js"
    ],
    'css': [
        "bower_components/highlightjs/styles/github.css",
        "_scss/**/*.{scss,sass}"
    ]
};

/**
 * TASKS
 */

gulp.task('js', function() {
    gulp.src(assets.js)
        .pipe(concat('scripts.js'))
        .pipe(gulp.dest('assets'));
});

gulp.task('css', function() {
    gulp.src(assets.css)
        .pipe(sass({ includePaths: require('node-bourbon').includePaths }))
        .pipe(concat('styles.css'))
        .pipe(minify({keepBreaks:true}))
        .pipe(gulp.dest('assets'));
});

gulp.task('default', ['css', 'js']);

gulp.task('development', ['css', 'js'], function(callback) {
    gulp.watch(assets.js, ['js']);
    gulp.watch(assets.css, ['css']);
});
