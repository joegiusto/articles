const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/progressNeedsShipping', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/outsetUpdate made at ${new Date()}`);

    console.log(req.body)

    const o_id = new ObjectId(req.body.order._id);

    var outset = req.body.outsetState;

    db.collection("revenues_clothing").updateOne({_id: o_id}, {
      $set: {
        status: 'Shipped',
        tracking_code: req.body.tracking_code
      }
    }, function(err, result) {

      if (err) throw err;

      return res.send(result);
    });

  });
} 