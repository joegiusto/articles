var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/updateLastRead', function (req, res) {
    console.log(`Call to /api/updateLastRead made at ${new Date()}`);
    let data = {};
    const o_id = new ObjectId(req.body.user);
    const news_id = req.body.user

    db.collection("articles_users").findOne( o_id, { projection: { subscriptions: 1 } }, function(err, result) {
      if (err) throw err;

      data.subscriptions = result.subscriptions;

      console.log('here')
      console.log(result);

      const index = data.subscriptions.findIndex(x => x.news_id === news_id);

      if (index > -1 ) {
        data.subscriptions[index].lastRead = new Date();

        db.collection("articles_users").updateOne( {_id: o_id}, {
          $set: {
            subscriptions: data.subscriptions
          }
        }, function(err, result) {
          if (err) throw err;
          return res.send("Updated");
        });

      } else {
        return res.send("Was not subscribed to issue");
      }

      db.collection("articles_users").updateOne( {_id: o_id}, {
        $set: {
          subscriptions: data.subscriptions
        }
      }, function(err, result) {
        if (err) throw err;
        return res.send("Updated");
      });

    });

  });

}