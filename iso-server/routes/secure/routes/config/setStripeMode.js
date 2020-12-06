var ObjectId = require('mongodb').ObjectId;
var colors = require('colors')

module.exports = (app, db, passport) => {
  app.post('/api/secure/config/setStripeMode', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log('Changing config.stripe.mode'.red)

    db.collection("config").updateOne(
      {'_id': ObjectId( app.get('mongoConfig')._id )}, 
      { $set: {'stripe.mode': req.body.mode} },
    ).then((response) => {
      console.log(response);
      return res.send({text: 'Done'})
    }).catch((err) => {
      console.log(err)
    });

  });
};