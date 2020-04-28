const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {
  app.get('/getNews', (req, res) => {

    console.log("Call to /api/getNews at" + new Date());

    MongoClient.connect(url, { useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {

      let data = {};

      if (err) throw err;
      var dbo = db.db("articles_data");
      // var o_id = new ObjectId(req.body.order_id);

      dbo.collection("articles_news").find().toArray(function(err, result) {
        if (err) throw err;
        data.news = result;
        db.close();
        return res.send(data);
      });

    });
    
  });

}