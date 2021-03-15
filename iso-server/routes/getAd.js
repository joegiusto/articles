var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {

    app.get('/api/getAd', function (req, res) {
    //   console.log(`Call to /api/getIssues made at ${new Date()}`);
      console.log(req.query);
    
      db.collection("ads").findOne( ObjectId(req.query.ad_id), function(err, result) {
        if (err) throw err;
        console.log("Call to /api/getAd")
        return res.send(result) 
      });
    
    });
  
}
  
  