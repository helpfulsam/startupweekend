export default [ '$router', function( $router ) {
  function goHome() {
    $router.go( '/' );
  }

  $router.on404 += goHome;

  $router.add( '/' );
  $router.add( '/dashboard' );
  $router.add( '/category/:id' );
  $router.add( '/task/:id' );
}];
