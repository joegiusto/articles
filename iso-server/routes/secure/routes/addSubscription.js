const moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var async = require("async");

module.exports = (app, db, passport) => {
  app.post('/api/addSubscription', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/addSubscription made at ${new Date()}`);

    const o_id = new ObjectId(req.user._id);

    console.log(req.body)

    var match = await db.collection('articles_users').find( {_id: req.user._id, subscriptions: { $elemMatch: {news_id: req.body.subscription_id} } }).toArray();

    if (match.length > 0) {
      return res.send({match: match, text: 'Already Exists'});
    } else {

      db.collection('articles_users').updateOne(
        {'_id': ObjectId(req.user._id)}, 
        { $push: { "subscriptions" : { news_id: req.body.subscription_id } } },
        false,
        true 
      );

      return res.send({match: match, text: 'Adding'});
    }

  });
} 