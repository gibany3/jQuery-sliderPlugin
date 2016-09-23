var gulp = require('gulp');
var sass = require('gulp-sass');
var browser_sync = require('browser-sync');
var sourcemaps = require('gulp-sourcemaps');
var autoprefixer = require('gulp-autoprefixer');

gulp.task('sass', function() {
  return gulp.src('scss/**/*.scss')
  .pipe(sourcemaps.init())
  .pipe(sass({errLogToConsole: true, outputStyle: 'expanded'}).on('error', sass.logError))
  .pipe(autoprefixer({browsers: ['> 1%', 'last 2 version', 'android 4']}))
  .pipe(sourcemaps.write('./maps'))
  .pipe(gulp.dest('css'));
});

gulp.task('browser_sync', function (){
  var files = [
      '*.html',
      'css/*.css',
      'js/*.js'
  ];
  browser_sync.init(files, {
      server: {
          baseDir: './'
      }
  });
});

gulp.task('watch', ['sass'], function (){
    gulp.watch('scss/**/*.scss', ['sass']);
});

gulp.task('default', ['watch', 'browser_sync'], function() {});
