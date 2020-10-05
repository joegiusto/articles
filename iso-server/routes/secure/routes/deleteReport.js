const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/deleteReport', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/deleteReport made at ${new Date()}`);

    const o_id = new ObjectId(req.body._id);

    console.log(req.body._id)
    console.log(req.user._id)

    let limitUserScope = {user_id: req.user._id}

    if (req.user._id === '5e90cc96579a17440c5d7d52') {
      // Admin doing this route
      limitUserScope = {}
    } else {
      // Normal person
    }

    // var result = await db.collection("articles_expense_reports").deleteOne( { _id: ObjectId(req.body._id), user_id: req.user._id }, async function(err, response) {
    //   if (err) throw err;
    //   console.log(`Call to /api/deleteReport done`);
    //   // res.send(response);
    // });

    db.collection("articles_expense_reports").deleteOne( { _id: ObjectId(req.body._id) }, limitUserScope, 
    function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/deleteExpenseReport done`);
      return res.send(result);
    });

  });
} 