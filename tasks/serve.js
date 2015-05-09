import gulp from 'gulp';

gulp.task( 'serve', [ 'make' ], function()  {
  var karma = require( 'gulp-karma' )({ configFile: 'karma.conf.js' });
  var browserSync = require( 'browser-sync' ).create();

  karma.start().then( karma.run );
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  function reload() {
    karma.run();
    browserSync.reload();
  }

  var watchify = require( 'watchify' );
  var js = require( './js' );
  var b = watchify( js.browserify( watchify.args ) );
  b.on( 'update', function( files ) {
    js.bundle( b, function() {
      reload();
      js.babel( files );
    });
  });
  js.bundle( b, reload );

  gulp.watch([ 'test/**/*' ], function() {
    karma.run();
  });
});
