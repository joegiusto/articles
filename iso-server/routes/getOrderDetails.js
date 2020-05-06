const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {
  app.post('/getOrderDetails', (req, res) => {

    console.log("Call to /api/secure/getOrderDetails at" + new Date());

    MongoClient.connect(url, function(err, db) {

      let data = {};

      if (err) throw err;
      var dbo = db.db("articles_data");
      var o_id = new ObjectId(req.body.order_id);

      console.log(req.body.order_id);

      dbo.collection("articles_orders").findOne( o_id, function(err, result) {
        if (err) throw err;
        data.order = result
        console.log(result);
        // db.close();
        return res.send(data);
      });

    });
    
  });
}