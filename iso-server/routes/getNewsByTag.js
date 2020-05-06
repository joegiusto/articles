// const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
// const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = (app, db) => {
  app.post('/getNewsByTag', (req, res) => {

    console.log("Call to /api/getNewsByTag at" + new Date());
    console.log(req.body.tag);

    // MongoClient.connect(url, function(err, db) {

      let data = {};

      // if (err) throw err;
      // var dbo = db.db("articles_data");
      // var o_id = new ObjectId(req.body.news_id);
      // console.log(req.body.news_id);

      db.collection("articles_news").find( {
        'news_tags.tag_name': { $in: [req.body.tag]
      } } ).toArray(function(err, result) {
        if (err) throw err;
        data.tags = result;
        // console.log(result);
        // db.close();
        return res.send(data);
      });

    // });
    
  });
}