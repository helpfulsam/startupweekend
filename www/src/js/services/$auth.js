export default [
  '@event', 'moment', '$localStorage', 'http/HttpError', 'config', '$fetch',
  'http/AccessToken', 'http/RefreshToken', 'URI',
function(
  event, moment, $localStorage, HttpError, config, $fetch, AccessToken,
  RefreshToken, URI
) {

  const kRefreshTokenKey = 'refreshToken';
  const kRefreshUriKey = 'refreshUri';

  /**
   * @param {Token} token
   * @param {Moment} date
   * @returns {Boolean}
   */
  function tokenExpired( token, date ) {
    return token.expiresAt && date >= token.expiresAt;
  }

  return new ( class AuthorizationService {
    constructor() {
      this._completionHandlers = [];
      this._accessToken = null;
      this._refreshInProgress = false;
      this._version = 0;

      var refreshToken = $localStorage.stringForKey( kRefreshTokenKey );
      var refreshUri = $localStorage.stringForKey( kRefreshUriKey );
      if ( refreshToken ) {
        this._refreshToken = new RefreshToken( refreshToken );
        this._refreshToken.refreshUrl = refreshUri;
      } else {
        this._refreshToken = null;
      }
    }

    @event onRefreshFailed
    @event onChange

    get isLoggedIn() {
      return this._refreshToken !== null;
    }

    login( url, params ) {
      var self = this;
      this._version += 1;
      return new Promise( function( resolve, reject ) {
        self._refreshInProgress = true;
        self._send( config.apiServer + url, params ).then( function( tokens ) {
          self._updateTokens( tokens );
          resolve( tokens.accessToken.claims );
        }, reject );
      });
    }

    logout() {
      this._version += 1;
      this._accessToken = null;
      this._refreshToken = null;
      this._refreshInProgress = false;

      $localStorage.setStringForKey( kRefreshTokenKey, null );
      $localStorage.setStringForKey( kRefreshUriKey, null );

      this._onRefreshFailed.raise( new Error( 'User logged out.' ) );
    }

    getNewTokenAsync() {
      var self = this;
      return new Promise( function( resolve ) {
        self._completionHandlers.push( resolve );
        self._refresh();
      });
    }

    getTokenAsync() {
      var self = this;
      return new Promise( function( resolve ) {
        var tenSecondsFromNow = moment().add( 10, 'seconds' );
        if ( self._accessToken && !tokenExpired( self._accessToken, tenSecondsFromNow ) ) {
          resolve( self._accessToken );
        } else {
          self._completionHandlers.push( resolve );
          self._refresh();
        }
      });
    }

    _refresh() {
      if ( this._refreshInProgress ) {
        return;
      }
      this._refreshInProgress = true;
      var version = this._version;
      var tenSecondsFromNow = moment().add( 10, 'seconds' );
      if ( this._refreshToken && !tokenExpired( this._refreshToken, tenSecondsFromNow ) ) {
        this._send( this._refreshToken.refreshUrl, {
          token: this._refreshToken.value
        }).then( this._updateTokens.bind( this ), err => {
          this._onRefreshFailed.raise( err );
        });
      } else {
        this._onRefreshFailed.raise( new Error( 'User is not logged in.' ) );
      }
    }

    _updateTokens( tokens ) {
      this._accessToken = tokens.accessToken;
      this._refreshToken = tokens.refreshToken;
      this._refreshInProgress = false;

      $localStorage.setStringForKey( kRefreshTokenKey, this._refreshToken.value );
      $localStorage.setStringForKey( kRefreshUriKey, this._refreshToken.refreshUrl );

      var handlers = this._completionHandlers;
      this._completionHandlers = [];
      handlers.forEach( handler => handler( this._accessToken ) );
      this._onChange.raise( this._accessToken );
    }

    _send( url, data ) {
      var self = this;
      var version = this._version;
      return new Promise( function( resolve, reject ) {
        $fetch({
          url: url,
          headers: {
            'Accept': 'application/json',
            'Content-Type': 'application/json'
          },
          method: 'POST',
          body: JSON.stringify( data )
        }).then( function( response ) {
          if ( response.ok ) {
            return response.json();
          } else if ( response.bodyUsed ) {
            return response.json().then( function( body ) {
              throw new HttpError( response.status, _.first( body.errors ) || response.statusText );
            });
          } else {
            throw new HttpError( response.status, response.statusText );
          }
        }).then( function( body ) {
          if ( version === self._version ) {
            var tokens = {
              accessToken: new AccessToken( body.access_token ),
              refreshToken: new RefreshToken( body.refresh_token )
            };
            tokens.refreshToken.refreshUrl = URI( 'token' ).absoluteTo( URI( url ) ).toString();
            resolve( tokens );
          }
        }).catch( function( err ) {
          if ( version === self._version ) {
            reject( err );
          }
        });
      });
    }
  });
}];
