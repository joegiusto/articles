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

  app.get('/api/getEmployees', function (req, res) {
    console.log(`Call to /api/getEmployees made at ${new Date()}`);
  
    db.collection("articles_users").find( {"roles.employee.bool": true} ).toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log("Call to /api/getEmployees done")
      return res.send(safeSendUserDocument(result)) 
    });
  
  });

  app.get('/api/getEmployee', function (req, res) {

    console.log(`Call to /api/getEmployee made at ${new Date()}`);

    console.log(ObjectId.isValid(req.query._id));

    if ( ObjectId.isValid(req.query._id) ) {

      console.log(`NO FRIENDLY URL FOR EMPLOYEE ${req.query._id}`)

      var o_id = new ObjectId(req.query._id);

      db.collection("articles_users").findOne( o_id, function(err, result) {
        if (err) throw err;
        console.log("Call to /api/getEmployee done")
  
        // TODO - Build this into a universal functions file for all routes to use
        const safeResult = safeSendUserDocument(result);
     
        return res.send( safeResult ) ;
      });

    } else {
      // If not an ObjectID then maybe a friendly_url

      db.collection("articles_users").findOne( { "employee.friendly_url": req.query._id }, function(err, result) {
        if (err) throw err;
        console.log("Call to /api/getEmployee done")
  
        // TODO - Build this into a universal functions file for all routes to use
        const safeResult = safeSendUserDocument(result);
     
        return res.send( safeResult ) ;
      });

    }
  
  });

  app.get('/api/getEmployeeAgr', function (req, res) {
    console.log(`Call to /api/getEmployeeAgr made at ${new Date()}`);

    var o_id = new ObjectId(req.query._id);

    const agg = [
      {
        '$match': {
          '_id': new ObjectId('5e90cc96579a17440c5d7d52')
        }
      }, {
        '$project': {
          'employee.payrole.stubs': 1
        }
      }, {
        '$unwind': {
          'path': '$employee.payrole.stubs'
        }
      }, {
        '$addFields': {
          'employee.payrole.total': {
            '$sum': '$employee.payrole.stubs.amount'
          }
        }
      }, {
        '$group': {
          '_id': 'aggrResult', 
          'total': {
            '$sum': '$employee.payrole.stubs.amount'
          }, 
          'results': {
            '$addToSet': '$employee.payrole.stubs'
          }
        }
      }
    ];
  
    db.collection("articles_users")
    .aggregate(agg)
    .toArray( function(err, result) {
      if (err) throw err;
      console.log("Call to /api/getEmployeeAgr done")
      // const safeResult = safeSendUserDocument(result);
      return res.send( result ) ;
    })
    // .findOne( o_id,
    //   function(err, result) {
    //     if (err) throw err;
    //     console.log("Call to /api/getEmployeeAgr done")
    //     const safeResult = safeSendUserDocument(result);
    //     return res.send( safeResult ) ;
    //   }
    // )
    ;
  
  });

}

