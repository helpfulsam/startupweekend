import express from 'express';
import yargs from 'yargs';
import { Kernel } from '@stephenbunch/di';
import requireDirectory from 'require-directory';
import pmongo from 'promised-mongo';
import path from 'path';

var args = yargs.argv;
var pkg = require( APP_ROOT + '/package' );
require( 'dotenv' ).load();

var config = {
  port: args.port || parseInt( process.env.PORT || 0, 10 ) || 8000
};

var kernel = new Kernel();

var app = express();
app.use( require( 'compression' )({ threshold: 512 }) );

kernel.register( 'Router', express.Router );

if ( process.env.DB_HOST ) {
  var db = pmongo(
    ( process.env.DB_USER ? process.env.DB_USER + ':' + process.env.DB_PASS + '@' : '' ) +
    'mongodb://' + process.env.DB_HOST + ':' + process.env.DB_PORT + '/' + process.env.DB_NAME
  );
  kernel.register( 'db', db );
} else {
  kernel.register( 'db', null );
}

var modules = requireDirectory( module, './', {
  exclude: function( name ) {
    name = path.relative( __dirname, name );
    if ( /^controllers\//.test( name ) ) {
      return true;
    }
    var exclude = [ 'boot.js', 'index.js' ];
    if ( exclude.indexOf( name ) > -1 ) {
      return true;
    }
    return false;
  }
});

for ( let name in modules ) {
  var service = path.dirname( name ) + '/' + path.basename( name, '.js' );
  kernel.registerFactoryAsSingleton( service.substr( 2 ), modules[ name ] );
}

app.use( kernel.resolve( 'StaticMiddleware' ) );

var controllers = requireDirectory( module, './controllers' );
for ( let name in controllers ) {
  var controller = kernel.invoke( controllers[ name ] );
  app.use( controller.path, controller );
}

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
