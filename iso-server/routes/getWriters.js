// var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {

  app.get('/api/getWriters', function (req, res) {
    console.log(`Call to /api/getWriters made at ${new Date()}`);

    // var o_id = new ObjectId(req.query._id);
  
    db.collection("articles_users").find({"employee.role": 'Writer'}, {projection: {email: 1, first_name: 1, last_name: 1} } ).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getPayrole`);
      return res.send(result) 
    });

  });

}