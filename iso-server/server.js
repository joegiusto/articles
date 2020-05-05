require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');
let mongoUtil = require('./db');
const mongoose = require('mongoose');
// const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;
// const urlGoose = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;

const router = require('express').Router();

// const secureRoute = '';

mongoUtil.connectToServer( function( err, client ) {
  
  if (err) console.log(err);
  // Start the rest of your app here
  var db = mongoUtil.getDb();

  // db.collection("articles_users").find().toArray(function(err, result) {
  //   if (err) throw err;
  //   console.log(result)
  // });

  require('./routes/addNewsDocument')(app, db);
  require('./routes/editNewsDocument')(app, db);
  require('./routes/getNewsDocument')(app, db);

  require('./routes/getNewsByTag')(app, db);
  require('./routes/getNews')(app, db);
  require('./routes/getTags')(app, db);
  require('./routes/outsetUpdate')(app, db);

  require('./routes/getIssues')(app, db);
  require('./routes/getStories')(app, db);
  require('./routes/getMyths')(app, db);

  require('./routes/getSubmissions')(app, db);
  require('./routes/getProducts')(app, db);

  // const secureRoute = require('./routes/secure/secure-routes.js')(app, db);
  // app.use('/api/secure', passport.authenticate('jwt', {session: false}), secureRoute);

  // TODO / HELP / I GIVE UP! - I can not seem to nest secure routes anymore while keeping const "app.post" preserverd once I got the MongoDB var "db" passed down for a constant connection and getting everything faster. For now I will just be doing app.post secure routes done one by one untill I can just get them all done similir to how it was done on the lines above this comment
  app.post('/api/secure/getUserDetails', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    console.log(`Call to /api/getUserDetails made here at ${new Date()} by user ${req.body.user}`);
      let data = {};
      var o_id = new ObjectId(req.body.user);
      // let justNews = []

      db.collection("articles_users").findOne( o_id, function(err, result) {
        if (err) throw err;
        data.user = result

        // We now fetch values of the users data that needs to be grabbed from other documents.
        data.user.ordersFetched = [];
        data.user.submissionsFetched = [];
        data.user.subscriptionsFetched = [];

        db.collection("articles_orders").find({user_id: req.body.user}).toArray(function(err, result) {
          if (err) throw err;
          // console.log(`Call to /api/getUserDetails done`)
          // console.log(result);
          data.user.ordersFetched = result
          // return res.send(data);

          db.collection("articles_submissions").find({user_id: req.body.user}).toArray(function(err, result) {
            if (err) throw err;
            data.user.submissionsFetched = result;

            let justNews_Id = [];
            
            try {

              justNews_Id = data.user.subscriptions.map(sub => {
                return ObjectId(sub.news_id);
              })

            } catch(e) {
              console.log("This user has no subscriptions yet");
            }

            if (justNews_Id.length > 0) {
              
              db.collection("articles_news").find({ _id: {$in: justNews_Id} }).toArray(function(err, result) {
                if (err) throw err;
                console.log(`Call to /api/getUserDetails done`)
                data.user.subscriptionsFetched = result;
                return res.send(data);
              });

            } else {

              console.log(`Call to /api/getUserDetails done`)
              return res.send(data);

            }
            
          });
        });

      });
  });

  app.post('/api/secure/updateUserDetails', (req, res) => {
    console.log(`Call to /api/updateUserDetails made at ${new Date()}`);
      
      var myobj = req.body.user_details;
      var o_id = new ObjectId(req.body.user);

      console.log(myobj);
  
      db.collection("articles_users").updateOne({_id: o_id}, {
        // {subscriptions: myobj.subscriptions},
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
        if (err) {
          throw err
        };

      });

      return res.end();
  });

});

mongoose
.connect(
  url, {
    useNewUrlParser: true,
    useUnifiedTopology: true 
})
.then(() => console.log("Mongoose successfully connected"))
.catch(err => {
  console.log("Mongoose connection error");
  console.log(err.message)
});

const users = require("./routes/api/users");

// app.use(history());
app.use( express.static(path.join(__dirname, '../build')) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes

app.use("/api/users", users);

app.listen(process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Used to make sure server is up in one place, though this was in MySQL days
app.get('/ping', function (req, res) {
  return res.send('pong');
});

// require('./routes/addNewsDocument')(app);
// require('./routes/editNewsDocument')(app);
// require('./routes/getNewsByTag')(app);
// require('./routes/getNews')(app);
// require('./routes/getTags')(app);
// require('./routes/outsetUpdate')(app);

// app.get('/getAllIssues', function (req, res) {
//   console.log(`Call to /api/getAllIssues made at ${new Date()}`);

//   MongoClient.connect(url, function(err, db) {

//     if (err) throw err;
//     var dbo = db.db("articles_data");
//     // var o_id = new ObjectId(req.body.user);

//     dbo.collection("articles_news").find({news_type: 'issue'}).toArray(function(err, result) {
//       if (err) throw err;
//       db.close();
//       return res.send(result) 
//     });

//   });

// });