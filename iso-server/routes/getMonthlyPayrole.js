module.exports = (app, db) => {

  app.get('/api/getMonthlyPayrole', function (req, res) {
    console.log(`Call to /api/getMonthlyPayrole made at ${new Date()}`);

    // var o_id = new ObjectId(req.query._id);

    const agg = [
      {
        '$project': {
          'employee': {
            'payrole': {
              'stubs': 1
            }
          }
        }
      }, {
        '$unwind': {
          'path': '$employee.payrole.stubs'
        }
      }, {
        '$group': {
          '_id': {
            'month': {
              '$month': '$employee.payrole.stubs.date'
            }, 
            'year': {
              '$year': '$employee.payrole.stubs.date'
            }
          }, 
          'total': {
            '$sum': '$employee.payrole.stubs.amount'
          }
        }
      }
    ];
  
    db.collection("articles_users")
    .aggregate(agg).toArray( function(err, result) {
      if (err) throw err;
      console.log("Call to /api/getMonthlyPayrole done")
      return res.send( result ) ;
    });
  
  });

}

