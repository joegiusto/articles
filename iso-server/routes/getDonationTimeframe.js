module.exports = (app, db) => {
  app.post('/api/getDonationTimeframe', function (req, res) {

    console.log(`Call to /api/getDonationTimeframe made at ${new Date()}`);

    console.log(`Start Date: ${req.body.start} - End Date: ${req.body.end}`)

    db.collection("revenues_donations").find(
      { date : { 
        $gte : new Date(req.body.start), 
        // $lt : new Date(req.body.end) 
      }}
    ).toArray(function(error, documents) {
      if (error) throw error;
      // console.log(documents)
      res.send(documents);
    } )

  });

}