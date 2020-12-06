var ObjectId = require('mongodb').ObjectId;
var colors = require('colors')

module.exports = (app, db, passport) => {
  app.post('/api/secure/config/setConfig', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log('Changing config.stripe.mode'.red)

    console.log(req.body.config)

    delete req.body.config['_id']

    db.collection("config").updateOne(
      {'_id': ObjectId( app.get('mongoConfig')._id )}, 
      { $set: {...req.body.config} },
    ).then((response) => {
      console.log(response);

      // TODO - Verify this is working correctly in all scenarios, just because we update mongoDB does not mean the server knows this, server should only update its config when it changes instead of grabbing it every time. This will be a problem when the site scales so maybe instead of setting app we tell the cache to clear for the mongoConfig route.
      app.set('mongoConfig', req.body.config)

      return res.send({text: 'Done'});
    }).catch((err) => {
      console.log(err)
    });

  });
};