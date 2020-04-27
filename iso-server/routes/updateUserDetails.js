const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {

  app.post('/updateUserDetails', (req, res) => {
    console.log(`Call to /api/updateUserDetails made at ${new Date()}`);
    // console.log(req.body.data);
  
    MongoClient.connect(url, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");
      
      var myobj = req.body.user_details;

      // console.log(req.body._id);
      var o_id = new ObjectId(req.body.user);
      // Always assume client sends the wrong thing.
      // myobj.news_type = myobj.news_type.toLowerCase();
      // myobj.news_date = new Date();

      // const allowedKeys = ['news_type', 'news_title', 'news_notes', 'news_date', 'news_tags'];

      // myobj = Object.keys(myobj)
      // .filter(key => allowedKeys.includes(key))
      // .reduce((obj, key) => {
      //   obj[key] = myobj[key];
      //   return obj;
      // }, {});

      console.log(myobj);
  
      dbo.collection("articles_users").updateOne({_id: o_id}, {
        // {subscriptions: myobj.subscriptions},
        $set: {
          first_name: myobj.first_name,
          last_name: myobj.last_name,
          photo_url: myobj.photo_url,
          address: {

            zip: myobj.address.zip,
            
          },
          // "subscriptions.$[]": myobj.subscriptions
          subscriptions: myobj.subscriptions
        }
      }, function(err, res) {
        if (err) throw err;
        db.close();
      });

      return res.end();

    });
  
    
  
  });

} 