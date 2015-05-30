export default [ function() {
  return function( input, format ) {
    var time;
    if ( moment.isMoment( input ) ) {
      time = input;
    } else if ( !!input ) {
      time = moment( input, 'HH:mm' );
    } else {
      return '';
    }
    return time.format( format || 'h:mm A' );
  };
}];
