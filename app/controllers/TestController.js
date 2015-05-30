export default [ 'Router', 'db', function( Router, db ) {
  var controller = new Router();
  controller.path = '/api/test';

  controller.get( '/', async function( req, res ) {
    var account = await db.collection( 'accounts' ).findOne();
    res.send( `hello ${ account.name }` );
  });

  return controller;
}];
