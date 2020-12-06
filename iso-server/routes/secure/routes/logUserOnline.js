var ObjectId = require('mongodb').ObjectId;
var colors = require('colors')

module.exports = (app, db, passport) => {
  app.post('/api/secure/logUserOnline', passport.authenticate('jwt', {session: false}), (req, res) => {

    // Check if date exist, if not create document with user
    db.collection("users_online").find(
      {},
      {date: {$gt: new Date('2014-05-18T20:00:00.000Z')}},
    ).then((response) => {

      return res.send(response);

    }).catch((err) => {

      console.log(err)

    });

    // If date exist, add user to array if user is not in array

  });
};