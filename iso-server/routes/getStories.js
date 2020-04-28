const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {
  app.get('/getStories', function (req, res) {

    console.log(`Call to /api/getStories made at ${new Date()}`);
  
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");

      // return res.end
  
      dbo.collection("articles_news").find({news_type: 'story'}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        console.log(`Call to /api/getStories done`);
        return res.send(result) 
      });
  
    });
  
  });

}