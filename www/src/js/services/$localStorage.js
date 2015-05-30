export default [ '$window', function( $window ) {
  return new ( class LocalStorage {
    stringForKey( key ) {
      return $window.localStorage[ key ] || '';
    }

    setStringForKey( key, value ) {
      if ( value === null || value === undefined ) {
        delete $window.localStorage[ key ];
      } else {
        $window.localStorage[ key ] = value;
      }
    }

    objectForKey( key ) {
      var value = $window.localStorage[ key ] || null;
      if ( value ) {
        try {
          value = JSON.parse( value );
        } catch( err ) {
          value = null;
        }
      }
      return value;
    }

    setObjectForKey( key, value ) {
      if ( value === null || value === undefined ) {
        delete $window.localStorage[ key ];
      } else {
        $window.localStorage[ key ] = JSON.stringify( value );
      }
    }
  });
}];
