export default [ function() {
  var kCacheKey = Symbol();
  return function bind( prototype, name, descriptor ) {
    var func = descriptor.value;
    return {
      configurable: true,
      enumerable: false,
      get: function() {
        if ( !this[ kCacheKey ] ) {
          this[ kCacheKey ] = {};
        }
        var cache = this[ kCacheKey ];
        if ( !cache[ name ] ) {
          cache[ name ] = func.bind( this );
        }
        return cache[ name ];
      }
    };
  };
}];
