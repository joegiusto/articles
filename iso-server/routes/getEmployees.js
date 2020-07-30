var ObjectId = require('mongodb').ObjectId;

function safeSendUser(user) {

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
      return res.send(result) 
    });
  
  });

  app.get('/api/getEmployee', function (req, res) {
    console.log(`Call to /api/getEmployee made at ${new Date()}`);

    var o_id = new ObjectId(req.query._id);
  
    db.collection("articles_users").findOne( o_id, function(err, result) {
      if (err) throw err;
      console.log("Call to /api/getEmployee done")

      // TODO - Build this into a universal functions file for all routes to use
      const safeResult = safeSendUser(result);
   
      return res.send( safeResult ) ;
    });
  
  });

}

