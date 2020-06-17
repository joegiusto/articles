module.exports = (app, db) => {
  app.post('/api/getCanSubmit', (req, res) => {

    console.log("Call to /api/getCanSubmit at " + new Date());

    db.collection("articles_submissions").find({user_id: req.body.user_id})
    .toArray(function(err, result) {
      if (err) throw err;
      return res.send(result);
    });
    
  });

}