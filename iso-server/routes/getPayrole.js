var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.get('/api/getPayrole', function (req, res) {
    console.log(`Call to /api/getPayrole made at ${new Date()}`);

    var o_id = new ObjectId(req.query._id);
  
    db.collection("articles_users").find(o_id, {'employee.payrole.stubs': 1} ).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getPayrole`);
      return res.send(result) 
    });

  });

}