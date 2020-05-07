module.exports = (app, db) => {
  app.get('/getExpenses', function (req, res) {

    console.log(`Call to /api/getExpenses made at ${new Date()}`);
  
    db.collection("articles_expenses").find().toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getExpenses done`);
      return res.send(result);
    });

  });

}