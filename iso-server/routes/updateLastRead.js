var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/updateLastRead', function (req, res) {

    console.log(`Call to /api/updateLastRead made at ${new Date()}`);

    let data = {};

    var o_id = new ObjectId(req.body.user);

    // console.log(new Date(req.body.start))
    // console.log(new Date("2010-04-29T00:00:00.000Z"))

    db.collection("articles_users").findOne( o_id, function(err, result) {
      // if (err) throw err;
      data.user = result
      data.subscriptions = result.subscriptions;
      // console.log(data.subscriptions)

      const index = data.subscriptions.findIndex(x => x.news_id === req.body.news_id);

      if (index > -1 ) {
        // console.log("User is subscribed to this issue");

        data.subscriptions[index].lastRead = new Date();

        // console.log(data.subscriptions);

        db.collection("articles_users").updateOne( {_id: o_id}, {
          $set: {
            subscriptions: data.subscriptions
          }
        }, function(err, result) {
          if (err) throw err;
          return res.send("Updated");
        });

      } else {
        // console.log("User is not subscribed to this issue");
        return res.send("Was not subscribed to issue");
      }

      // console.log(`Index: ${index}`)

      // return res.send(data.subscriptions);
    });

  });

}