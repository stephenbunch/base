var gulp = require( 'gulp' );

gulp.task( 'serve', [ 'make' ], function()  {
  var karma = require( 'gulp-karma' )({ configFile: 'karma.conf.js' });
  var browserSync = require( 'browser-sync' ).create();
  var pkg = require( APP_ROOT + '/package' );

  karma.start().then( karma.run );
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  gulp.watch([ 'src/**/*' ], [ 'make', function() {
    karma.run();
    browserSync.reload();
  }]);

  gulp.watch([ 'test/**/*' ], function() {
    karma.run();
  });
});
