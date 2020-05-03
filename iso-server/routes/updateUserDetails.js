const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = (app, db) => {

  app.post('/updateUserDetails', (req, res) => {
    console.log(`Call to /api/updateUserDetails made at ${new Date()}`);
      
    var myobj = req.body.user_details;
    var o_id = new ObjectId(req.body.user);

    db.collection("articles_users").updateOne({_id: o_id}, {
      $set: {
        first_name: myobj.first_name,
        last_name: myobj.last_name,
        photo_url: myobj.photo_url,
        address: {

          zip: myobj.address.zip,
          
        },
        subscriptions: myobj.subscriptions
      }
    }, function(err, res) {
      if (err) throw err;
    });

    console.log(`Call to /api/updateUserDetails done`);
    return res.end();
  
  });

} 