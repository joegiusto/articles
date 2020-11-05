var ObjectId = require('mongodb').ObjectId;

module.exports = (app, db, passport) => {
  app.post('/api/deleteChatConversation', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("/api/deleteChatConversation");

    db.collection("articles_messages").deleteOne( { _id: ObjectId(req.body.chat_id) },
    function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/deleteChatConversation done`);
      return res.send({text: `Chat conversation ${req.body.chat_id} deleted`})
    });

  });
};