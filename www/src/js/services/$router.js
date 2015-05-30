export default [
  '$location', '$rootScope', '@bind', '@event', 'http/RouteParser',
function( $location, $rootScope, bind, event, RouteParser ) {

  const noop = () => {};
  var initial = $location.url();

  return new ( class Router {
    constructor() {
      this.routes = [];
      this._last = null;
      this._going = null;
      $rootScope.$on( '$locationChangeSuccess', this._location_didChange );
      this.add( '/' );
    }

    @event on404
    @event onNavigate

    get url() {
      return $location.url() || '/';
    }

    get path() {
      var path = this.url;
      var hash = path.indexOf( '#' );
      if ( hash > -1 ) {
        path = path.substr( 0, hash );
      }
      return path;
    }

    add( path ) {
      return this.when( path, noop );
    }

    when( path, handler ) {
      this.routes.push({
        parser: new RouteParser( path ),
        handler: handler
      });
      return this;
    }

    go( url ) {
      if ( !/^\//.test( url ) ) {
        var base = this.path;
        if ( !/\/$/.test( base ) ) {
          base += '/';
        }
        url = base + url;
      }
      $location.url( url );
      return this._start( url );
    }

    _start( url ) {
      if ( url === this.going ) {
        throw new Error( 'Redirect loop detected!' );
      }
      this._last = url;
      this._going = url;
      var context = {
        path: url,
        params: {}
      };
      return this._next( url, context, 0 ).then( () => {
        this._going = null;
        this._onNavigate.raise( context );

        // Don't send a page view on initial page load.
        if ( url === initial ) {
          initial = null;
        } else {
          if ( typeof ga !== 'undefined' ) {
            ga( 'send', 'pageview', { page: url } );
          }
        }
      });
    }

    _next( url, context, index ) {
      var len = this.routes.length;
      for ( ; index < len; index++ ) {
        var route = this.routes[ index ];
        var hash = url.indexOf( '#' );
        var path = url;
        if ( hash > -1 ) {
          path = url.substr( 0, hash );
        }
        if ( route.parser.match( path, context.params ) ) {
          return Promise.resolve().then( () => {
            // Make the `next` function idempotent.
            var going;
            return route.handler.call( undefined, context, () => {
              if ( !going ) {
                going = this._next( url, context, index + 1 );
              }
              return going;
            });
          });
        }
      }
      this._on404.raise( context );
      return Promise.reject( new Error( '404' ) );
    }

    @bind _location_didChange() {
      if ( this._last !== this.url ) {
        var url = this.url;
        this._start( this.url ).catch( err => {
          console.log( `Navigation to ${ url } returned "${ err.message }".` );
        });
      }
    }
  });
}];
