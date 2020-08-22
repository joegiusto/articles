var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/updateLastRead', function (req, res) {
    console.log(`Call to /api/updateLastRead made at ${new Date()}`);

    const o_id = new ObjectId(req.body.user);

    console.log(req.body.user)
    console.log(req.body.news_id)

    function orginResult() { 

      return db.collection("articles_users").updateOne(
        {
            _id : o_id,
            "subscriptions.news_id": req.body.news_id
        },
        {
            $set: { 
              "subscriptions.$.lastRead": new Date() 
            } 
        }
      );

    }

   orginResult().then( (result) =>  { 
     console.log(result.modifiedCount) 

     if ( result.modifiedCount < 1 ) {

      console.log("Was not there, gotta add")

      

      db.collection("articles_users").updateOne(
          {
              _id: o_id
          },
          {
              $addToSet: {
                "subscriptions": {
                      news_id: req.body.news_id,
                      lastRead: new Date()
                  }
              }
          }
      );

      return res.send("Adding new ")

    } else {
      return res.send("Updating exist")
    }

    });


  orginResult().catch(
    (result) =>  {
      console.log(result)
    }
  )
    

    // db.collection("articles_users").updateOne( 
    //   {
    //     _id: o_id, 
    //     "subscriptions.news_id": req.body.news_id 
    //   }, 
    //   { $set : 
    //     { 
    //       "subscriptions.$.lastRead": new Date() 
    //     } 
    //   }, 
    //   function(err, result) {
        
    //   if (err) throw err;
    //   console.log(result.result.nModified)
    //   // console.log(result.nModified)
    //   return res.send("Updated");
    // });

    // db.bar.update( {user_id : 123456, "items.item_name" : {$ne : "my_item_two" }} , 
    //             {$addToSet : {"items" : {'item_name' : "my_item_two" , 'price' : 1 }} } ,
    //             false , 
    //             true);

    // db.collection("articles_users").findOne( o_id, { projection: { subscriptions: 1 } }, function(err, result) {
    //   if (err) throw err;

    //   data.subscriptions = result.subscriptions;

    //   console.log('here')
    //   console.log(result);

    //   const index = data.subscriptions.findIndex(x => x.news_id === news_id);

    //   if (index > -1 ) {
    //     data.subscriptions[index].lastRead = new Date();

    //     db.collection("articles_users").updateOne( {_id: o_id}, {
    //       $set: {
    //         subscriptions: data.subscriptions
    //       }
    //     }, function(err, result) {
    //       if (err) throw err;
    //       return res.send("Updated");
    //     });

    //   } else {
    //     return res.send("Was not subscribed to issue");
    //   }

    //   db.collection("articles_users").updateOne( {_id: o_id}, {
    //     $set: {
    //       subscriptions: data.subscriptions
    //     }
    //   }, function(err, result) {
    //     if (err) throw err;
    //     return res.send("Updated");
    //   });

    // });

  });

}