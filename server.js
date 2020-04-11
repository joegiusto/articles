require('dotenv').config()
const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const app = express();

const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

// MongoClient.connect(url, function(err, db) {
//   if (err) throw err;
//   var dbo = db.db("articles_data");
//   var myobj = { 
//     first_name: "Joey",
//     last_name: "Giusto",
//     address: {
//       state: 'New York',
//       zip: '12524',
//       city: 'Fishkill'
//     },
//     legal: {
//       terms: false,
//       cookies: false,
//       privacy: false
//     },
//     sign_up_date: 1586544138,
//     birth_date: 1586544138,
//     last_online_date: 1586544138,

//     subscriptions: [
//       {
//         news_id: 20,
//         last_viewed: 1586544138
//       },
//       {
//         news_id: 21,
//         last_viewed: 1586504138
//       }
//     ],
//     orders: [1, 7, 80],
//     submissions: [23, 67, 98, 1023]
//   };
//   dbo.collection("articles_users").insertOne(myobj, function(err, res) {
//     if (err) throw err;
//     console.log("1 document inserted");
//     db.close();
//   });
// });

// const client = new MongoClient(uri, { useNewUrlParser: true });
// client.connect(err => {
//   const collection = client.db("articles_data").collection("articles_users");
//   // perform actions on the collection object
//   console.log(collection);
//   client.close();
// });

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "articles_news"
  });

  var user_con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "articles_users"
  });

var mysqlStuff = [];

con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected");
});

app.use( express.static(path.join(__dirname, 'build')) );
app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'build', 'index.html'));
});

app.listen(process.env.PORT || 8080);

// API
app.get('/ping', function (req, res) {
  return res.send('pong');
});
 
app.post('/tag', (req, res) => { console.log(req.body); console.log( new Date() ); return res.send('Roger that') });

app.get('/issue-tags', function (req, res) {
  
  console.log("tags loaded by someone");
  // return res.send(['one', 'two', 'three', 'Tesla']);

  let data = 'original before query'

  con.query('SELECT * FROM tags', function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});

app.get('/search-history', function (req, res) {
  
  console.log("history loaded by someone");

  let data = 'original before query'

  con.query('SELECT * FROM search_history ORDER BY id DESC;', function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});

app.get('/getNews', (req, res) => {
  // console.log(req.body.tag);
  var ip = req.headers['x-forwarded-for'] || req.connection.remoteAddress;
  console.log( new Date() );

  console.log(ip)

  console.log("news loaded by someone");

  let data = 'original before query'

  // let sql = "SELECT * FROM news";
  // let sql = "SELECT n.* , GROUP_CONCAT(tm.tag_id) AS tags FROM news n LEFT JOIN news_tag_map tm ON tm.news_id = n.news_id GROUP BY n.news_id";
  let sql = "SELECT n.* , GROUP_CONCAT(tm.tag_id) AS tags, GROUP_CONCAT(t.description) AS tags_names FROM news n LEFT JOIN news_tag_map tm ON tm.news_id = n.news_id LEFT JOIN tags t ON t.tag_id = tm.tag_id GROUP BY n.news_id"
  // let sql = "SELECT n.*, GROUP_CONCAT(t.description) AS tags_names FROM news n LEFT JOIN news_tag_map tm ON tm.news_id = n.news_id LEFT JOIN tags t ON t.tag_id = tm.tag_id GROUP BY n.news_id"

  // con.query("SELECT * FROM issues o JOIN issues_tag_map ot ON ot.news_id = o.news_id JOIN tag t ON t.tag_id = ot.tag_id WHERE t.description IN ('tesla') GROUP BY o.news_id HAVING COUNT(DISTINCT t.description) = 1", function (err, result, fields) {
    con.query(sql, function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});

app.post('/getUserSubscriptions', (req, res) => {
  console.log(req.body.user);
  console.log( new Date() );

  let data = 'original before query'

  let sql = "SELECT user_id FROM user_data WHERE firebase_id = ?"

  user_con.query(sql, req.body.user, function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    const number = ( result[0].user_id );
    // console.log(fields);

    // return res.send( number ) 
    let sql = "SELECT * FROM user_subscriptions WHERE user_id = ?"

    user_con.query(sql, number, function (err, result, fields) {

      if (err) throw err;

      data = JSON.stringify(result, null, "\t");

      console.log(data);
      // console.log(fields);

      return res.send(data) 
    });

  });

});

app.post('/getUserDetails', (req, res) => {
  console.log(req.body.user);
  console.log( new Date() );

  MongoClient.connect(url, function(err, db) {

    let data = {};

    if (err) throw err;
    var dbo = db.db("articles_data");
    var o_id = new ObjectId(req.body.user);

    dbo.collection("articles_users").findOne( o_id, function(err, result) {
      if (err) throw err;
      data.user = result

      dbo.collection("articles_orders").find({user_id: req.body.user}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        data.orders = result
      });
  
      dbo.collection("articles_submissions").find({user_id: req.body.user}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        data.submissions = result;
        data.subscriptions = [];

        const justNews = data.user.subscriptions.map(sub => {
          return ObjectId(sub.news_id);
        })

        dbo.collection("articles_news").find({ _id: {$in: justNews} }).toArray(function(err, result) {
          if (err) throw err;
          console.log("Maybe an error was thrown");
          console.log(result);
          data.subscriptionsBulk = result;
          return res.send(data);
        });
        
      });

    });

  });
  
});

app.post('/getUserSubmissions', (req, res) => {
  console.log(req.body.user);
  console.log( new Date() );

  MongoClient.connect(url, function(err, db) {

    if (err) throw err;
    var dbo = db.db("articles_data");
    var o_id = new ObjectId(req.body.user);

    dbo.collection("articles_submissions").find({user_id: req.body.user}).toArray(function(err, result) {
      if (err) throw err;
      console.log(result);
      db.close();
      return res.send(result) 
    });

  });

});

app.post('/getNewsByTag', (req, res) => {
  console.log(req.body.tag);
  console.log( new Date() );

  let data = 'original before query'

  // let sql = "SELECT o.* , GROUP_CONCAT(t.description) AS tags_names FROM news o JOIN news_tag_map ot ON ot.news_id = o.news_id JOIN tags t ON t.tag_id = ot.tag_id WHERE t.description IN (?) GROUP BY o.news_id HAVING COUNT(DISTINCT t.description) = 1";
  let sql = "SELECT o.* , GROUP_CONCAT(t.description) AS tags_names FROM news o JOIN news_tag_map ot ON ot.news_id = o.news_id JOIN tags t ON t.tag_id = ot.tag_id GROUP BY o.news_id HAVING FIND_IN_SET(?, tags_names)"

  // con.query("SELECT * FROM issues o JOIN issues_tag_map ot ON ot.news_id = o.news_id JOIN tag t ON t.tag_id = ot.tag_id WHERE t.description IN ('tesla') GROUP BY o.news_id HAVING COUNT(DISTINCT t.description) = 1", function (err, result, fields) {
    con.query(sql, req.body.tag, function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});

app.post('/userAdded', (req, res) => {
  console.log(req.body);
  console.log( new Date() );

  let data = 'Value of data before SQL query'

  let sql = "INSERT INTO `user_data` (`user_id`, `firebase_id`, `email`, `name_first`, `name_last`, `role_id`) VALUES (NULL, ?, ?, ?, ?, ?);";
  user_con.query(sql, [req.body.firebase_id, req.body.email, req.body.nameFirst, req.body.nameLast, 3], function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });

});

app.post('/recordSearch', (req, res) => {
  console.log(req.body.text);
  console.log( new Date() );

  let data = 'original before query'

  let sql = "INSERT INTO `search_history` (`id`, `text`) VALUES (NULL, ?);";

  // con.query("SELECT * FROM issues o JOIN issues_tag_map ot ON ot.news_id = o.news_id JOIN tag t ON t.tag_id = ot.tag_id WHERE t.description IN ('tesla') GROUP BY o.news_id HAVING COUNT(DISTINCT t.description) = 1", function (err, result, fields) {
  con.query(sql, req.body.text, function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});