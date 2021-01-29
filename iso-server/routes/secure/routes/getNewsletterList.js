module.exports = (app, db, passport) => {
    app.post('/api/secure/getNewsletterList', passport.authenticate('jwt', {session: false}), async (req, res) => {
  
      console.log(`Call to /api/getNewsletterList made at ${new Date()}`);
  
      db.collection("articles_users").find( {newsletter: true}, {projection: { first_name: 1, last_name: 1, email: 1 } } ).toArray(function(err, result) {
        if (err) throw err;
        console.log(`Call to /api/getNewsletterList done`);
        return res.send(result) 
      });
  
    });
  } 