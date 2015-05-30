export default [ '$router', function( $router ) {
  function goHome() {
    $router.go( '/' );
  }

  $router.on404 += goHome;

  $router.add( '/some-page' );
  $router.add( '/category/:id' );
  $router.add( '/dashboard' );
}];
