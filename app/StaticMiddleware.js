import path from 'path';
import moment from 'moment';
import fs from 'fs';
import Promise from 'bluebird';

Promise.promisifyAll( fs );

export default async function( request, response, next ) {
  var filename = path.resolve( APP_ROOT, 'www', request.path.replace( /^\//, '' ) );
  var ext = path.extname( filename );
  if ( ext && await fileExistsAsync( filename ) ) {
    if ( !!request.query.v ) {
      // If a version param is supplied, return cache headers.
      response.set({
        'Cache-Control': 'public; max-age=' + moment.duration( 365, 'days' ).asSeconds(),
        'Expires': moment().add( 365, 'days' ).format( 'ddd, DD MMM YYYY HH:mm:ss [GMT]' )
      });
    }
    response.sendFile( filename );
  } else {
    next();
  }
};

async function fileExistsAsync( filename ) {
  try {
    return ( await fs.statAsync( filename ) ).isFile();
  } catch ( err ) {
    return false;
  }
}
