module.exports = (app, db) => {
  app.post('/api/getDonationTimeframe', function (req, res) {

    console.log(`Call to /api/getDonationTimeframe made at ${new Date()}`);

    console.log(`Start Date: ${req.body.start} - End Date: ${req.body.end}`)

    console.log(new Date(req.body.start))
    console.log(new Date("2010-04-29T00:00:00.000Z"))

    db.collection("articles_donations").find(
      { date : { 
        $gte : new Date(req.body.start), 
        // $lt : new Date(req.body.end) 
      }}
    ).toArray(function(error, documents) {
      if (error) throw error;
      console.log(documents)
      res.send(documents);
    } )

    // db.collection("articles_donations").find( { date: { $gte: req.body.start, $lt: req.body.end } } ) {
    //   console.log("Call to /api/getDonationTimeframe done")
    //   console.log(`Found ${result}`)
    //   if (err) throw err;
    //   return res.send(result);
    // });

  });

}