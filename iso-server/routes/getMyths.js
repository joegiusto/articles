// const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
// const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";
// const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;

module.exports = (app, db) => {

  app.get('/api/getMyths', function (req, res) {
  
    console.log(`Call to /api/getMyths made at ${new Date()}`);
  
    db.collection("articles_news").find({news_type: 'myth'}).sort({"news_date": -1}).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getMyths done`);
      return res.send(result) 
    });
  
  });

}