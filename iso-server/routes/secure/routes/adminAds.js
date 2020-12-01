module.exports = (app, db, passport) => {
  app.post('/api/secure/adminAds', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/secure/adminAds made at ${new Date()}`);

    db.collection("ads").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/secure/adminAds done`);
      return res.send(result) 
    });

  });
} 