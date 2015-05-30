export default [
  '$window', '$timeout', 'moment', 'fetch',
function( $window, $timeout, moment, fetch ) {
  return function() {
    /**
     * @param {String} [url]
     * @param {Object|Function} request
     */
    return function $fetch( url, request ) {
      if ( typeof url === 'string' ) {
        request.url = url;
      } else {
        request = url;
      }

      function build() {
        return new Promise( function( resolve, reject ) {
          if ( typeof request === 'function' ) {
            try {
              resolve( request() );
            } catch ( err ) {
              reject( err );
            }
          } else {
            resolve( request );
          }
        });
      }

      return new Promise( function( resolve, reject ) {
        var retries = 0;
        var maxDelay = moment.duration( 30, 'seconds' ).asMilliseconds();

        function send() {
          build().then( function( request ) {
            fetch.call( $window, request.url, request ).then( resolve ).catch( function( err ) {
              // Assume lost internet connection?
              retries += 1;
              var delay = Math.pow( 2, retries ) * 100;
              if ( delay > maxDelay ) {
                delay = maxDelay
              }
              $timeout( send, delay );
            });
          }).catch( reject );
        }
        send();
      });
    };
  };
}];
