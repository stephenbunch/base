import gulp from 'gulp';

gulp.task( 'default', function( done ) {
  require( 'run-sequence' )( 'make', 'test', done );
});
