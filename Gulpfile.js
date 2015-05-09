global.APP_ROOT = __dirname;
global.PACKAGE = require( './package' );

PACKAGE.babel = PACKAGE.babel || {};

require( 'babel/register' )( PACKAGE.babel );
require( 'require-directory' )( module, './tasks' );
