export default [ function() {
  return function terminal( value ) {
    return function( component ) {
      component.$terminal = value;
    };
  };
}];
