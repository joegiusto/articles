const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
var async = require("async");

module.exports = (app, db, passport) => {
  app.post('/api/getUserReferrals', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/getUserReferrals made at ${new Date()}`);

    db.collection("articles_users").find( {referral: '5e90cc96579a17440c5d7d52'}, {projection: { first_name: 1, last_name: 1, sign_up_date: 1 } } ).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getUserReferrals done`);
      return res.send(result) 
    });

  });
} 