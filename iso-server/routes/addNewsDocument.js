const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {

  app.post('/addNewsDocument', (req, res) => {
    console.log("A News Document is trying to be added with the following object");
    console.log(req.body.data);
    console.log( new Date() );
  
    MongoClient.connect(url, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");
  
      var myobj = req.body.data;
  
      // Always assume client sends the wrong thing.
      myobj.news_type = myobj.news_type.toLowerCase();

      const ignoreKeys = ['submitting_data', 'submitting_error', 'submitting_error_text']

      ignoreKeys.map((key) => {
        return delete myobj[key];
      });

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