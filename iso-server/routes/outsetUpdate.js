const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/outsetUpdate', (req, res) => {
    console.log(`Call to /api/outsetUpdate made at ${new Date()}`);

    const o_id = new ObjectId(req.body.user);

    var outset = req.body.outsetState;

    var correctDate = moment(outset.age).unix();

    var correctSubscriptions = outset.subscriptions.map(subscription => {
      return {
        news_id: subscription
      }
    });

    console.log(correctSubscriptions);

    db.collection("articles_users").updateOne({_id: o_id}, {
      $set: {
        first_name: outset.first_name,
        last_name: outset.last_name,

        birth_date: correctDate,
        cell: outset.cell,
        gender: outset.gender,

        address: {
          zip: outset.zip,
          city: outset.city,
          state:  outset.state
        },
        
        clothing: {
          cut: outset.clothingCut,
          shirt: outset.shirtSize,
          shoe: outset.shoeSize,
        },

        subscriptions: correctSubscriptions,

        political: {
          party: outset.partAffiliation
        },

        sign_up_date: moment().unix(),
        outset: true
        
      }
    }, function(err, res) {
      if (err) throw err;

    });

    });

} 