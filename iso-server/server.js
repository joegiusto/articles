// import addNewsDocument from './routes/addNewsDocument';
// const addNewsDocument = require('./routes/addNewsDocument');
require('dotenv').config()
const express = require('express');
// var mysql = require('mysql');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');
const app = express();

const users = require("./routes/api/users");

const mongoose = require("mongoose");
const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId;
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority";

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("articles_data").collection("articles_users");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
// });

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
  .then(() => console.log("Mongoose MongoDB successfully connected"))
  .catch(err => console.log(err));

// MySQL makes me wanna die, I just want this commited at some point so will remove in future.

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "articles_news"
// });

// var user_con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "articles_users"
// });

// var mysqlStuff = [];

// con.connect(function(err) {
//   if (err) throw err;
//   console.log("Database connected");
// });

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
// app.use('/', secureRoute);

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