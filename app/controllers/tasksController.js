import { ObjectId } from 'promised-mongo';
export default [ 'Router', 'db', function( Router, db ) {
  var controller = new Router();
  controller.path = '/api/tasks';

  controller.get( '/', async function( req, res ) {
    var tasks = await db.collection( 'tasks' ).find().toArray();
    res.json( tasks );
  });

  controller.get( '/:id', async function( req, res ) {
  	console.log(req.params.id);
    var task = await db.collection( 'tasks' ).findOne({ _id: ObjectId(req.params.id) });
    res.json( task );
  });

  //query: accountId
  controller.get( '/', async function( req, res ) {
    var task = await db.collection( 'tasks' ).findOne({ accountId: ObjectId(req.query.accountId) });
    res.json( task );
  });
 

  controller.post( '/', async function( req, res ) {
  	console.log(req.body.accountId);
    var task = await db.collection( 'tasks' ).insert(req.body);
    res.json( task );
  });

  controller.put( '/:id', async function( req, res ) {
    var task = await db.collection( 'tasks' ).update({ _id: ObjectId(req.params.id) }, req.body);
    res.json( task );
  });

  controller.delete( '/:id', async function( req, res ) {
    var task = await db.collection( 'tasks' ).remove({ _id: ObjectId(req.params.id) });
    res.json( task );
  });

  return controller;
}];
