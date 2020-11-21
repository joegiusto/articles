module.exports = (app, db) => {
  app.get('/api/getUpdates', function (req, res) {

    console.log(`Call to /api/getUpdates made at ${new Date()}`);
  
    db.collection("updates").find().toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log(`Call to /api/getUpdates done`);
      return res.send(result) 
    });

  });

}