export default [ function() {
  return function proxy( source, props, destination ) {
    props.forEach( function( prop ) {
      if ( typeof source[ prop ] === 'function' ) {
        destination[ prop ] = source[ prop ].bind( source );
      } else {
        Object.defineProperty( destination, prop, {
          configurable: true,
          enumerable: prop in source,
          get() {
            return source[ prop ];
          },
          set( value ) {
            source[ prop ] = value;
          }
        });
      }
    });
  };
}];
