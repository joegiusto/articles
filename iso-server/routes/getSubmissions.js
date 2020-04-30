module.exports = (app, db) => {
  app.get('/getSubmissions', function (req, res) {

    console.log(`Call to /api/getSubmissions made at ${new Date()}`);
  
    db.collection("articles_submissions").find().toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log(`Call to /api/getSubmissions done`);
      return res.send(result) 
    });

  });

}