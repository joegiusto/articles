const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {
  app.post('/getUserDetails', (req, res) => {
    console.log(req.body.user);
    console.log("Someone calling getUserDetails")
    console.log( new Date() );

    MongoClient.connect(url, function(err, db) {

      let data = {};

      if (err) throw err;
      var dbo = db.db("articles_data");
      var o_id = new ObjectId(req.body.user);

      dbo.collection("articles_users").findOne( o_id, function(err, result) {
        if (err) throw err;
        data.user = result

        dbo.collection("articles_orders").find({user_id: req.body.user}).toArray(function(err, result) {
          if (err) throw err;
          data.orders = result
        });
    
        dbo.collection("articles_submissions").find({user_id: req.body.user}).toArray(function(err, result) {
          if (err) throw err;
          data.submissions = result;
          data.subscriptions = [];

          let justNews = []
          try {
            justNews = data.user.subscriptions.map(sub => {
              return ObjectId(sub.news_id);
            })
          } catch {
            console.log("This user ain't got shit");
          }
          

          dbo.collection("articles_news").find({ _id: {$in: justNews} }).toArray(function(err, result) {
            if (err) throw err;
            db.close();
            data.subscriptionsBulk = result;
            return res.send(data);
          });
          
        });

      });

    });
    
  });
}