module.exports = (app, db) => {
  app.get('/getDonations', function (req, res) {

    console.log(`Call to /api/getDonations made at ${new Date()}`);
  
    db.collection("articles_donations").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getDonations done`);
      return res.send(result) 
    });

  });

}