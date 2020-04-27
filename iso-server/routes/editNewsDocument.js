const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {

  app.post('/editNewsDocument', (req, res) => {
    console.log(`Call to /api/editNewsDocument made at ${new Date()}`);
    // console.log(req.body.data);
  
    MongoClient.connect(url, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");
      
      var myobj = req.body.data;

      // console.log(req.body._id);
      var o_id = new ObjectId(myobj._id);
      // Always assume client sends the wrong thing.
      myobj.news_type = myobj.news_type.toLowerCase();
      myobj.news_date = new Date();

      const allowedKeys = ['news_type', 'news_title', 'news_notes', 'news_date', 'news_tags'];

      myobj = Object.keys(myobj)
      .filter(key => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = myobj[key];
        return obj;
      }, {});

      console.log(myobj);
  
      dbo.collection("articles_news").replaceOne({_id: o_id}, {...myobj}, function(err, res) {
        if (err) throw err;
        console.log("1 news document replaced");
        db.close();
      });

      return res.end();

    });
  
  });

} 