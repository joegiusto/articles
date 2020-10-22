const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
var async = require("async");

module.exports = (app, db, passport) => {
  app.post('/api/adminComments', passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Admin Comments Ran");

    db.collection("articles_news").find( {}, {projection: { comments: 1, news_title: 1 } } ).toArray(function(err, result) {
      if (err) throw err;
      return res.send(result) 
    });

  });
} 