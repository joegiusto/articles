const moment = require('moment');
const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

module.exports = app => {

  app.post('/outsetUpdate', (req, res) => {
    console.log(`Call to /api/outsetUpdate made at ${new Date()}`);
  
    MongoClient.connect(url, function(err, db) {
  
      if (err) throw err;
      var dbo = db.db("articles_data");

      // Passed user and outsetState
      // console.log(req.body.user)
      // console.log(req.body.outsetState)

      const o_id = new ObjectId(req.body.user);

      var outset = req.body.outsetState;

      var correctDate = moment(outset.age).unix();

      var correctSubscriptions = outset.subscriptions.map(subscription => {
        return {
          news_id: subscription
        }
      });

      console.log(correctSubscriptions);

      // const allowedKeys = ['news_type', 'news_title', 'news_notes', 'news_date', 'news_tags'];
      // myobj = Object.keys(myobj)
      // .filter(key => allowedKeys.includes(key))
      // .reduce((obj, key) => {
      //   obj[key] = myobj[key];
      //   return obj;
      // }, {});

      // console.log(myobj);
  
      // dbo.collection("articles_news").replaceOne({_id: o_id}, {...myobj}, function(err, res) {
      //   if (err) throw err;
      //   console.log("1 news document replaced");
      //   db.close();
      // });

      dbo.collection("articles_users").updateOne({_id: o_id}, {
        // {subscriptions: myobj.subscriptions},
        $set: {
          first_name: outset.first_name,
          last_name: outset.last_name,

          birth_date: correctDate,
          cell: outset.cell,
          gender: outset.gender,

          address: {
            zip: outset.zip,
            city: outset.city,
            state:  outset.state
          },
          
          clothing: {
            cut: outset.clothingCut,
            shirt: outset.shirtSize,
            shoe: outset.shoeSize,
          },

          subscriptions: correctSubscriptions,

          political: {
            party: outset.partAffiliation
          },

          sign_up_date: moment().unix(),
          outset: true
          
        }
      }, function(err, res) {
        if (err) throw err;
        db.close();
      });

      return res.end();

    });
  
  });

} 