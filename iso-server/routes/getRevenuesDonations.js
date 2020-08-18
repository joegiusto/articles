module.exports = (app, db) => {
  app.get('/api/getRevenuesDonations', function (req, res) {

    console.log(`Call to /api/getRevenuesDonations for reports made at ${new Date()}`);

    if (req.query.user_id === undefined || req.query.user_id === '') {
      console.log("Will serve even though this user is not valid, in times of high traffic this will be rejected")

      // Check if high traffic
      // return res.status(400).send({
      //   error: 'Our servers are experiencing high traffic right now and we are reserving bandwidth for our users. Please sign in / sign up, or wait untill a later time.',
      // });

    } else {
      console.log("Assume valid user and check");
    }  
  
    db.collection("revenues_donations").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getRevenuesDonations done`);
      return res.send(result) 
    });

  });

}