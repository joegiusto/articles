const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {
  app.get('/getMyths', function (req, res) {
  
    console.log(`Call to /api/getMyths made at ${new Date()}`);
  
    MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");
  
      dbo.collection("articles_news").find({news_type: 'myth'}).toArray(function(err, result) {
        if (err) throw err;
        db.close();
        console.log(`Call to /api/getMyths done`);
        return res.send(result) 
      });
  
    });
  
  });

}