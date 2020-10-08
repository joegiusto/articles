const moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var async = require("async");

module.exports = (app, db, passport) => {
  app.post('/api/respondReport', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/respondReport made at ${new Date()}`);

    const o_id = new ObjectId(req.body._id);

    console.log(req.body)

    // let limitUserScope = {user_id: req.user._id}

    // if (req.user._id === '5e90cc96579a17440c5d7d52') {
    //   // Admin doing this route
    //   limitUserScope = {}
    // } else {
    //   // Normal person
    // }

    // db.collection("articles_expense_reports").deleteOne( { _id: ObjectId(req.body._id) }, limitUserScope, 
    // function(err, result) {
    //   if (err) throw err;
    //   console.log(`Call to /api/deleteExpenseReport done`);
    //   return res.send(result);
    // });

    const response = await db.collection('articles_expense_reports').updateOne(
      {'_id': ObjectId(req.body._id)}, 
      { $push: { "responses" : { 
        employee: "5e90cc96579a17440c5d7d52",
        date: moment()._d,
        _id: new ObjectId(),
        response: req.body.response
      } } },
      false,
      true 
    );

    res.send(response);

  });
} 