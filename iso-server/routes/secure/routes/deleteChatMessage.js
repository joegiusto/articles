var ObjectId = require('mongodb').ObjectId;

module.exports = (app, db, passport) => {
  app.post('/api/deleteChatMessage', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("/api/deleteChatMessage");

    // db.collection("articles_messages").deleteOne( { _id: ObjectId(req.body._id) }, limitUserScope, 
    // function(err, result) {
    //   if (err) throw err;
    //   console.log(`Call to /api/deleteExpenseReport done`);
    //   return res.send(result);
    // });

    db.collection("articles_messages").updateOne(
      {'_id': ObjectId(req.body.chat_id)}, 
      { $pull: { "messages" : { _id: ObjectId(req.body.message_id) } } },
      false,
      true 
    ).then((response) => {
      console.log(response);
      return res.send({text: 'Done'})
    }).catch((err) => {
      console.log(err)
    });

  });
};