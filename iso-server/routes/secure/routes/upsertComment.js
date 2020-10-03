var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/upsertComment', passport.authenticate('jwt', {session: false}), function (req, res) {

    console.log(`Call to /api/upsertComment made at ${new Date()}`);

    console.log(req.body)

    const o_id = new ObjectId(req.body._id);

    db.collection("articles_news").updateOne({_id: o_id}, {
      // $set: {
      //   comments: req.body.comment,
      // },

      $push: {
        "comments": {
            comment: req.body.comment,
            date: new Date(),
            user_id: req.user._id
          }
      },

    },
    {
      upsert: true
    }, 
    function(err, response) {
      if (err) throw err;
      console.log(`Call to /api/upsertComment done`);
      // console.log(response)
    });

    res.send("I saw")

  });
}