module.exports = (app, db) => {

  app.get('/api/mongoConfig', function (req, res) {

    db.collection("config").find().toArray(function(err, result) {
      if (err) throw err;
      return res.send(result) 
    });
  
  });
  

}