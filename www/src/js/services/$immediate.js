export default [ '$window', function( $window ) {
  // Taken from David Baron's Blog:
  // http://dbaron.org/log/20100309-faster-timeouts

  var timeouts = [];
  var messageName = 'pw-zero-timeout-message';

  // Like setTimeout, but only takes a function argument.  There's
  // no time argument (always zero) and no arguments (you have to
  // use a closure).
  var setImmediate = function( fn ) {
    timeouts.push( fn );
    $window.postMessage( messageName, "*" );
  };

  var handleMessage = function( e ) {
    if ( e.source === $window && e.data === messageName ) {
      if ( timeouts.length > 0 ) {
        timeouts.shift()();
      }
    }
  };

  if ( $window.addEventListener ) {
    $window.addEventListener( 'message', handleMessage );
  } else {
    $window.attachEvent( 'onmessage', handleMessage );
  }

  return setImmediate;
}];
