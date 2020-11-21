module.exports = (app, db) => {
  app.get('/api/getUpdate', function (req, res) {

    console.log(`Call to /api/getUpdate made at ${new Date()}`);

    console.log(req.query.url)
  
    db.collection("updates").findOne({url: req.query.url})
    .then((response) => (

      res.send(response)

    ))
    .catch(err => (

      res.status(400).send(err)

    ))

  });

}