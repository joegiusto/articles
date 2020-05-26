var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/getProduct', (req, res) => {

    console.log("Call to /api/getProduct" + new Date());

    var o_id = new ObjectId(req.body.product_id);

    db.collection("articles_products").findOne( o_id, function(err, result) {
      if (err) throw err;

      console.log("Call to /api/getProduct done");
      return res.send(result);
    });
    
  });
}