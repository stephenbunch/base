import gulp from 'gulp';

gulp.task( 'serve', function()  {
  var karma = require( 'gulp-karma' )({ configFile: 'karma.conf.js' });
  var browserSync = require( 'browser-sync' ).create();

  karma.start().then( karma.run );
  browserSync.init({
    server: {
      baseDir: './'
    }
  });

  var watchify = require( 'watchify' );
  var js = require( './js' );

  var b = watchify( js.browserify( watchify.args ) );
  b.on( 'update', make );

  function reload() {
    karma.run();
    browserSync.reload();
  }

  function make( files ) {
    js.bundle( b, function() {
      reload();
      js.babel( files );
    });
  }

  gulp.watch([ 'test/**/*' ], function() {
    karma.run();
  });

  make();
});
