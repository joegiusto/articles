var ObjectId = require('mongodb').ObjectId;

module.exports = (app, db) => {
  app.post('/api/getPresident', (req, res) => {

    console.log("Call to /api/getPresident" + new Date());

    db.collection("presidents").findOne( ObjectId(req.body.president_id), function(err, result) {
      if (err) throw err;
      return res.send(result);
    });
    
  });
}