const gulp = require('gulp');
// Install Gulp globally, other packages as dev dependency
// Run with 'gulp watch'

var postcss      = require('gulp-postcss');
var sourcemaps   = require('gulp-sourcemaps');
var autoprefixer = require('autoprefixer');
const sass = require('gulp-sass');
var cssnano = require('cssnano');
var lost = require('lost');

// Watch and Dest folders
var paths = {
    cssSource: 'scss/',
    cssDestination: 'dist/'
  };


gulp.task('styles', function () {

    return gulp.src(paths.cssSource + 'main.scss')
        .pipe(sourcemaps.init())
        .pipe(sass().on('error', function(err){
            console.error(err.message);
          }))
        .pipe(postcss([
            lost(), 
            autoprefixer({
            browsers: ['last 2 versions'],
            cascade: true
          }) 
          /* , cssnano() */ 
        ]))
        .pipe(sourcemaps.write('./'))
        .pipe(gulp.dest(paths.cssDestination));
});

gulp.task('watch', function() {
    gulp.watch(paths.cssSource + '**/*.scss', gulp.series('styles'));
  });
