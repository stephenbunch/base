import gulp from 'gulp';

gulp.task( 'clean', function( done ) {
  require( 'del' )( [ 'dist', 'lib' ], done );
});
