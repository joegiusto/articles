module.exports = (app, db, passport) => {
  app.post('/api/secure/getProjects', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log("Call to /api/secure/getProjects at " + new Date());

    db.collection("internal_projects").find( {}, {projection: {public_title: 1, public_description: 1} } ).toArray(function(err, result) {
      if (err) throw err;
      return res.send(result);
    });
    
  });

}