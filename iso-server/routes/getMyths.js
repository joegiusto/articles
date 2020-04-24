const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {
  app.get('/getMyths', function (req, res) {
  
    // console.log(req.body.user);
    console.log( new Date() );
  
    MongoClient.connect(url, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");
      // var o_id = new ObjectId(req.body.user);
  
      dbo.collection("articles_news").find({news_type: 'myth'}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        db.close();
        return res.send(result) 
      });
  
    });
  
  });

}