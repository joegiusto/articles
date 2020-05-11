// const MongoClient = require('mongodb').MongoClient;
// const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = (app, db) => {

  app.post('/addNewsDocument', (req, res) => {
    console.log(`Call to /api/addNewsDocument made at ${new Date()}`);
  
    // Always assume client sends the wrong thing.
    var myobj = req.body.data;
    myobj.news_type = myobj.news_type.toLowerCase();
    myobj.news_date = new Date();

    // Preform Whitelist Acceptance
    const allowedKeys = ['news_type', 'news_title', 'news_notes', 'news_date', 'news_tags', "hero_url"];
    myobj = Object.keys(myobj)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = myobj[key];
      return obj;
    }, {});

    db.collection("articles_news").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("1 news document inserted");
      // db.close();
    });
  
    return res.end();
  
  });

} 