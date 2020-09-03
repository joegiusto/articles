module.exports = (app, db) => {
  app.get('/api/getExpenses', function (req, res) {

    console.log(`Call to /api/getExpenses made at ${new Date()}`);
  
    db.collection("expenses_recurring").find().toArray(function(err, result) {
      if (err) throw err;
      return res.send(result);
    });

  });

}