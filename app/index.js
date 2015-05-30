var path = require( 'path' );

global.APP_ROOT = path.resolve( __dirname + '/../' );

require( 'babel/register' )({
  optional: [ 'bluebirdCoroutines' ]
});

require( './boot' );
