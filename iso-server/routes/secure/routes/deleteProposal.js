const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/deleteProposal', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/deleteProposal made at ${new Date()}`);

    console.log(req.body)

    db.collection("articles_proposals").deleteOne( { _id: ObjectId(req.body._id) }, 
    function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/deleteProposal done`);
      return res.send(result);
    });

  });
} 