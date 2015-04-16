var gulp = require( 'gulp' );

gulp.task( 'make', [ 'jshint' ], function() {
  var fs = require( 'fs' );
  var browserify = require( 'browserify' );
  var babelify = require( 'babelify' );
  var source = require( 'vinyl-source-stream' );
  var pkg = require( APP_ROOT + '/package' );

  return (
    browserify({
      entries: APP_ROOT + '/index.js',
      debug: true,
      standalone: pkg.name
    })
      .transform(
        babelify.configure({
          sourceRoot: APP_ROOT + '/src'
        })
      )
      .bundle()
      .pipe( source( pkg.name + '.js' ) )
      .pipe( gulp.dest( 'dist' ) )
  );
});
