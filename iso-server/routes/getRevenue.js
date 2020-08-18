module.exports = (app, db) => {
  app.get('/api/getRevenue', (req, res) => {

    console.log("Call to /api/getRevenue at " + new Date());

    let data = {};

    db.collection("revenues_donations").find().toArray(function(err, result) {
      if (err) throw err;
      data.donations = result;
      return res.send(data);
    });
    
  });

}