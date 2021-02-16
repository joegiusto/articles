var ObjectId = require('mongodb').ObjectId;

function safeSendUserDocument(user) {

  console.log("safeSendUser called");

  const tempUser = user;

  const blacklist = ['cell', 'password', 'password_last_change'];
 
  for (let i = 0; i < blacklist.length; i++) {
    tempUser[ blacklist[i] ] = 'BLOCKED';
  }

  return tempUser;
}

module.exports = (app, db) => {

  app.get('/api/getMonthlyExpense', function (req, res) {
    console.log(`Call to /api/getMonthlyExpense made at ${new Date()}`);

    // var o_id = new ObjectId(req.query._id);

    const agg = [
      {
        '$group': {
          '_id': {
            'month': {
              '$month': '$date'
            }, 
            'year': {
              '$year': '$date'
            }
          }, 
          'total': {
            '$sum': '$amount'
          }
        }
      }
    ];
  
    db.collection("articles_expenses")
    .aggregate(agg)
    .toArray( function(err, result) {
      if (err) throw err;
      console.log("Call to /api/getMonthlyExpense done")
      // const safeResult = safeSendUserDocument(result);
      return res.send( result ) ;
    });
  
  });

}

