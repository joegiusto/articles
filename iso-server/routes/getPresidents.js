// var ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
  app.get('/api/getPresidents', (req, res) => {

    console.log("Call to /api/getPresidents" + new Date());

    db.collection("presidents").find().toArray(function(err, result) {
      if (err) throw err;
      return res.send(result);
    });
    
  });
}