import { ObjectId } from 'promised-mongo';
export default [ 'Router', 'db', function( Router, db ) {
  var controller = new Router();
  controller.path = '/api/category';

  controller.get( '/', async function( req, res ) {
    var tasks = await db.collection( 'categories' ).find().toArray();
    res.json( tasks );
  });

  controller.get( '/:id', async function( req, res ) {
  	console.log(req.params.id);
    var task = await db.collection( 'categories' ).findOne({ _id: ObjectId(req.params.id) });
    res.json( task );
  });

  //query: accountId
  controller.get( '/', async function( req, res ) {
    var task = await db.collection( 'categories' ).findOne({ accountId: ObjectId(req.query.accountId) });
    res.json( task );
  });
 

  controller.post( '/', async function( req, res ) {
  	console.log(req.body.accountId);
    var task = await db.collection( 'categories' ).insert(req.body);
    res.json( task );
  });

  controller.put( '/:id', async function( req, res ) {
    var task = await db.collection( 'categories' ).update({ _id: ObjectId(req.params.id) }, req.body);
    res.json( task );
  });

  controller.delete( '/:id', async function( req, res ) {
    var task = await db.collection( 'categories' ).remove({ _id: ObjectId(req.params.id) });
    res.json( task );
  });

  return controller;
}];
