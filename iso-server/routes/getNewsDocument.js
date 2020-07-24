const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = (app, db) => {
  app.post('/api/getNewsDocument', (req, res) => {

    console.log("Call to /api/getNewsDocument at" + new Date());

    // MongoClient.connect(url, function(err, db) {

      let data = {};

      // if (err) throw err;
      // var dbo = db.db("articles_data");
      //  || null);
      console.log(req.body);
      
      var o_id;
      if (req.body.news_id !== undefined ) {
        o_id = new ObjectId(req.body.news_id)
      } 

      var url = req.body.news_url

      console.log(req.body);

      if (url === undefined) {
        db.collection("articles_news").findOne( o_id, function(err, result) {
          if (err) throw err;
          data.document = result
          console.log("Call to /api/getNewsDocument done");
          // db.close();
          return res.send(data);
        });
      } else {
        db.collection("articles_news").findOne( {url: url}, function(err, result) {
          if (err) throw err;
          data.document = result
          console.log("Call to /api/getNewsDocument done");
          // db.close();
          return res.send(data);
        });
      }

      

    // });
    
  });
}