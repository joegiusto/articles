const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
var async = require("async");

module.exports = (app, db, passport) => {
  app.post('/api/removeSubscription', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/removeSubscription made at ${new Date()}`);

    const o_id = new ObjectId(req.user._id);

    console.log(req.body)

    var match = await db.collection('articles_users').find( {_id: req.user._id, subscriptions: { $elemMatch: {news_id: req.body.subscription_id} } }).toArray();

    if (match.length > 0) {

      db.collection('articles_users').updateOne(
        {'_id': ObjectId(req.user._id)}, 
        { $pull: { "subscriptions" : { news_id: req.body.subscription_id } } },
        false,
        true 
      );

      return res.send({match: match, text: 'Removing'});

    } else {
      return res.send({match: match, text: 'Does not exists'});
    }

  });
} 