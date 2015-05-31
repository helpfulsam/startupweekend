import { ObjectId } from 'promised-mongo';
export default [ 'Router', 'db', function( Router, db ) {
  var controller = new Router();
  controller.path = '/api/category';

  controller.get( '/', async function( req, res ) {
    if(req.query.categoryId && req.query.lang){
      var task = await db.collection( 'categories' ).findOne({ categoryId: Number(req.query.categoryId), lang: req.query.lang });
      res.json(task);
      return;
    }

    var tasks = await db.collection( 'categories' ).find({"lang": req.query.lang }).sort({ _id: 1 }).toArray();
    res.json( tasks );
  });

  controller.get( '/:id', async function( req, res ) {
    var task = await db.collection( 'categories' ).findOne({ _id: ObjectId(req.params.id)});
    res.json( task );
  });

  //query: accountId
  controller.get( '/', async function( req, res ) {
    var task = await db.collection( 'categories' ).findOne({ accountId: ObjectId(req.query.accountId) });
    res.json( task );
  });


  controller.post( '/', async function( req, res ) {
    var task = await db.collection( 'categories' ).insert(req.body);
    res.json( task );
  });

  controller.put( '/', async function( req, res ) {

    var task = req.body;
    for(var i = 0; i < task.steps.length; i++){
      delete task.steps[i].$$hashKey;
    }
    //var categories = await db.collection( 'categories' ).find({ categoryId: req.query.categoryId}).toArray();

    var categories = await db.collection('categories').update({categoryId:Number(req.query.categoryId), 'tasks.id': Number(req.query.taskIndex)  }, {"$set": {'tasks.$.progress.currentStep': task.progress.currentStep}}, { "multi": true});

    //for(var i = 0; i < categories.length; i++){
    //  categories[i].tasks[req.query.taskIndex] = task;
    //  console.log(categories[i]);
    //  await db.collection( 'categories').update({ _id: ObjectId(categories[i]._id)}, categories[i]);

    //}

    res.json( categories );
  });

  controller.delete( '/:id', async function( req, res ) {
    var task = await db.collection( 'categories' ).remove({ _id: ObjectId(req.params.id) });
    res.json( task );
  });

  return controller;
}];
