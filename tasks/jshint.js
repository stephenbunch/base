var gulp = require( 'gulp' );
var jshint = require( 'gulp-jshint' );
var stylish = require( 'jshint-stylish' );

gulp.task( 'jshint', function() {
  return gulp.src([ 'src/*', '!src/_*' ])
    .pipe( jshint({ debug: true }) )
    .pipe( jshint.reporter( stylish ) )
    .pipe( jshint.reporter( 'fail' ) );
});
