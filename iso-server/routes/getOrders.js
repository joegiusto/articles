module.exports = (app, db) => {
  app.get('/api/getOrders', (req, res) => {

    console.log("Call to /api/getOrders at " + new Date());

    let data = {};

    db.collection("articles_orders").find().toArray(function(err, result) {
      if (err) throw err;
      data.orders = result;
      return res.send(data);
    });
    
  });

}