var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/getProposal', (req, res) => {

    console.log("Call to /api/getProposal" + new Date());

    db.collection("articles_proposals").findOne( { url: req.body.proposal_url }, function(err, result) {
      if (err) throw err;

      console.log("Call to /api/getProposal done");
      return res.send(result);
    });
    
  });
}