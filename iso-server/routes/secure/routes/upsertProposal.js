const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/upsertProposal', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/upsertProposal made at ${new Date()}`);

    console.log(req.body)

    const _id = req.body.proposal._id;

    delete req.body.proposal._id;

    db.collection("articles_proposals").updateOne({ _id: ObjectId(_id) }, {
      $set: {
        ...req.body.proposal
      }
    },
    {
      upsert: true
    }, 
    function(err, result) {
      if (err) throw err;

      res.send(result);
    });

  });
} 