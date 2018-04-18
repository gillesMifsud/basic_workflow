var gulp = require('gulp');
var $    = require('gulp-load-plugins')();
// Live reload
var browserSync = require('browser-sync').create();

var sassPaths = [
  'node_modules/foundation-sites/scss',
  'node_modules/motion-ui/src'
];

gulp.task('sass', function() {
  return gulp.src('scss/app.scss')
    .pipe($.sass({
      includePaths: sassPaths,
      outputStyle: 'compressed' // if css compressed **file size**
    })
      .on('error', $.sass.logError))
    .pipe($.autoprefixer({
      browsers: ['last 2 versions', 'ie >= 9']
    }))
    .pipe(gulp.dest('css'))
      .pipe(browserSync.reload({
          stream: true
      }))

});

gulp.task('default', ['sass'], function() {
  gulp.watch(['scss/**/*.scss'], ['sass']);
});




// Gulp watch syntax with live reload as an argument
gulp.task('watch', ['browserSync'], function (){
    gulp.watch(['scss/**/*.scss'], ['sass']);
    // Other watchers
});

// Live reload watches where the index.html is
gulp.task('browserSync', function() {
    browserSync.init({
        server: {
            baseDir: './'
        },
    })
});