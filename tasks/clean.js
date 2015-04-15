var gulp = require( 'gulp' );

gulp.task( 'clean', function( done ) {
  require( 'del' )( [ 'dist/**/*.js' ], done );
});
