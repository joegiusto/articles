const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/secure/addPresident', passport.authenticate('jwt', {session: false}), (req, res) => {

    // console.log(`Call to /api/outsetUpdate made at ${new Date()}`);

    console.log(req.body)

    // return res.send('Hello');

    db.collection("presidents").updateOne({_id: ObjectId()}, {
      $set: {
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        photo: req.body.photo
      }
    },
    {
      upsert: true
    }, 
    function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/secure/addPresident done`);
    });

    return res.end();

    // const o_id = new ObjectId(req.user._id);

    // var outset = req.body.outsetState;

    // var correctDate = moment(outset.age).toISOString();

    // console.log(correctDate)
    // return(null);

    // var correctSubscriptions = outset.subscriptions.map(subscription => {
    //   return {
    //     news_id: subscription
    //   }
    // });

    // console.log(correctSubscriptions);

    // db.collection("presidents").updateOne({_id: o_id}, {
    //   $set: {
    //     first_name: outset.first_name,
    //     last_name: outset.last_name,

    //     birth_date: correctDate,
    //     cell: outset.cell,
    //     gender: outset.gender,

    //     address: {
    //       zip: outset.zip,
    //       city: outset.city,
    //       state:  outset.state
    //     },
        
    //     clothing: {
    //       cut: outset.clothingCut,
    //       shirt: outset.shirtSize,
    //       shoe: outset.shoeSize,
    //     },

    //     subscriptions: correctSubscriptions,

    //     political: {
    //       party: outset.partyAffiliation
    //     },

    //     outset: true
        
    //   }
    // }, function(err, result) {

    //   if (err) throw err;

    //   return res.send(result);
    // });

  });
} 