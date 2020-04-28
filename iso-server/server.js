require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');
const app = express();
const history = require('connect-history-api-fallback');

const users = require("./routes/api/users");
const mongoose = require('mongoose');
const MongoClient = require('mongodb').MongoClient;
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority";

// Connect to MongoDB
MongoClient
  .connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true}
  )
  .then(() => console.log("MongoDB successfully connected"))
  .catch(err => console.log(err));

mongoose
  .connect(
    url,
    { useNewUrlParser: true, useUnifiedTopology: true }
  )
  .then(() => console.log("Mongoose successfully connected"))
  .catch(err => console.log(err));


app.use(history());
app.use( express.static(path.join(__dirname, '../build')) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

const secureRoute = require('./routes/secure/secure-routes.js');
app.use('/api/secure', passport.authenticate('jwt', {session: false}), secureRoute);

app.listen(process.env.PORT || 8080);

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

// Used to make sure server is up in one place, though this was in MySQL days
app.get('/ping', function (req, res) {
  return res.send('pong');
});

require('./routes/addNewsDocument')(app);
require('./routes/editNewsDocument')(app);
require('./routes/getNewsDocument')(app);
require('./routes/getNewsByTag')(app);
require('./routes/getNews')(app);
require('./routes/getTags')(app);
require('./routes/getStories')(app);
require('./routes/getMyths')(app);
require('./routes/outsetUpdate')(app);

app.get('/getAllIssues', function (req, res) {
  console.log(`Call to /api/getAllIssues made at ${new Date()}`);

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("articles_data");
    // var o_id = new ObjectId(req.body.user);

    dbo.collection("articles_news").find({news_type: 'issue'}).toArray(function(err, result) {
      if (err) throw err;
      db.close();
      return res.send(result) 
    });

  });

});