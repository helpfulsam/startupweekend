import express from 'express';
import yargs from 'yargs';

var args = yargs.argv;
var pkg = require( APP_ROOT + '/package' );
require( 'dotenv' ).load();

var config = {
  port: args.port || parseInt( process.env.APP_PORT || 0, 10 ) || 8000
};

var app = express();
app.use( require( 'compression' )({ threshold: 512 }) );
app.use( require( './StaticMiddleware' ) );

app.get( '/*', function( request, response ) {
  response.sendFile( `${ APP_ROOT }/www/views/index.html` );
});

app.listen( config.port, function( err ) {
  if ( err ) {
    console.error( err );
  } else {
    console.log( `Server is listening at port ${ config.port }.` );
  }
});

process.title = `node ${ pkg.name } ${ config.port }`;

if ( process.send ) {
  process.send(
    JSON.stringify({
      status: 'online',
      port: config.port
    })
  );
}
