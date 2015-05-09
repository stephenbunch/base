import gulp from 'gulp';

function handleError( err ) {
  console.error( err.stack );
}

export function browserify( opts ) {
  var _ = require( 'lodash' );
  var browserify = require( 'browserify' );
  var babelify = require( 'babelify' );

  var browserifyOpts = _.extend({
    entries: APP_ROOT + '/src/index.js',
    debug: true,
    standalone: PACKAGE.name
  }, opts );

  var babelOpts = _.extend( PACKAGE.babel, {
    sourceRoot: APP_ROOT + '/src'
  });

  return (
    browserify( browserifyOpts )
      .transform( babelify.configure( babelOpts ) )
  );
}

export function bundle( browserify, done ) {
  var source = require( 'vinyl-source-stream' );
  var _ = require( 'lodash' );
  return (
    browserify
      .bundle()
      .on( 'error', handleError )
      .pipe( source( PACKAGE.name + '.js' ) )
      .pipe( gulp.dest( 'dist' ) )
      .on( 'end', done || _.noop )
  );
}

export function babel( files ) {
  var babel = require( 'gulp-babel' );
  return (
    gulp.src( files )
      .pipe( babel( PACKAGE.babel ) )
      .on( 'error', handleError )
      .pipe( gulp.dest( APP_ROOT + '/lib' ) )
  );
}

gulp.task( 'js', [ 'jshint' ], function() {
  var merge = require( 'merge-stream' );
  return merge(
    bundle( browserify() ),
    babel( APP_ROOT + '/src/**/*.js' )
  );
});
