// const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
// const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = (app, db) => {
  app.get('/getTags', (req, res) => {

    console.log("Call to /api/getTags at" + new Date());

    // MongoClient.connect(url, function(err, db) {

      let data = {};

      // if (err) throw err;
      // var dbo = db.db("articles_data");
      // var o_id = new ObjectId(req.body.order_id);

      db.collection("articles_tags").find().toArray(function(err, result) {
        if (err) throw err;
        data.tags = result;
        console.log(result);
        // db.close();
        return res.send(data);
      });

    // });
    
  });

}