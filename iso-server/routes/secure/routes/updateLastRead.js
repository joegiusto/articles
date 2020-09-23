var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/updateLastRead', passport.authenticate('jwt', {session: false}), function (req, res) {
    console.log(`Call to /api/updateLastRead made at ${new Date()}`);

    const o_id = new ObjectId(req.user._id);

    console.log(req.user._id)

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

  });
}