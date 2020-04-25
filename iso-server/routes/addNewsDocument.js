const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {

  app.post('/addNewsDocument', (req, res) => {
    console.log(`Call to /api/addNewsDocument made at ${new Date()}`);
    // console.log(req.body.data);
  
    MongoClient.connect(url, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");
  
      var myobj = req.body.data;
  
      // Always assume client sends the wrong thing.
      myobj.news_type = myobj.news_type.toLowerCase();
      myobj.news_date = new Date();

      // const ignoreKeys = ['submitting_data', 'submitting_error', 'submitting_error_text'];
      const allowedKeys = ['news_type', 'news_title', 'news_notes', 'news_date', 'news_tags'];

      // Switching to a whitelist so we can just send entire state to server. 
      // ignoreKeys.map((key) => {
      //   return delete myobj[key];
      // });

      myobj = Object.keys(myobj)
      .filter(key => allowedKeys.includes(key))
      .reduce((obj, key) => {
        obj[key] = myobj[key];
        return obj;
      }, {});

      // delete myobj.submitting_data;
      // delete myobj.submitting_error;
      // delete myobj.submitting_error_text;
  
      dbo.collection("articles_news").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 news document inserted");
        db.close();
      });

    });
  
    return res.end();
  
  });

} 