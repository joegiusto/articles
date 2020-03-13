const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

// var con = mysql.createConnection({
//   host: "localhost",
//   user: "root",
//   password: "",
//   database: "simplifeye_of"
// });

  var con = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "articles_news"
  });

var mysqlStuff = [];

con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected");

  // con.query("SELECT * FROM customers", function (err, result, fields) {
  //   if (err) throw err;
  //   // console.log(result);
  //   mysqlStuff = JSON.stringify(result, null, "\t");
  // });

  // con.query("SELECT * FROM customers", function (err, result, fields) {
  //   if (err) throw err;
  //   // console.log(result);
  //   mysqlStuff = JSON.stringify(result, null, "\t");
  // });

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
  console.log( new Date() );

  console.log("news loaded by someone");

  let data = 'original before query'

  // let sql = "SELECT * FROM news";
  // let sql = "SELECT n.* , GROUP_CONCAT(tm.tag_id) AS tags FROM news n LEFT JOIN news_tag_map tm ON tm.issue_id = n.issue_id GROUP BY n.issue_id";
  let sql = "SELECT n.* , GROUP_CONCAT(tm.tag_id) AS tags, GROUP_CONCAT(t.description) AS tags_names FROM news n LEFT JOIN news_tag_map tm ON tm.issue_id = n.issue_id LEFT JOIN tags t ON t.tag_id = tm.tag_id GROUP BY n.issue_id"
  // let sql = "SELECT n.*, GROUP_CONCAT(t.description) AS tags_names FROM news n LEFT JOIN news_tag_map tm ON tm.issue_id = n.issue_id LEFT JOIN tags t ON t.tag_id = tm.tag_id GROUP BY n.issue_id"

  // con.query("SELECT * FROM issues o JOIN issues_tag_map ot ON ot.issue_id = o.issue_id JOIN tag t ON t.tag_id = ot.tag_id WHERE t.description IN ('tesla') GROUP BY o.issue_id HAVING COUNT(DISTINCT t.description) = 1", function (err, result, fields) {
    con.query(sql, function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});

app.post('/getNewsByTag', (req, res) => {
  console.log(req.body.tag);
  console.log( new Date() );

  let data = 'original before query'

  // let sql = "SELECT o.* , GROUP_CONCAT(t.description) AS tags_names FROM news o JOIN news_tag_map ot ON ot.issue_id = o.issue_id JOIN tags t ON t.tag_id = ot.tag_id WHERE t.description IN (?) GROUP BY o.issue_id HAVING COUNT(DISTINCT t.description) = 1";
  let sql = "SELECT o.* , GROUP_CONCAT(t.description) AS tags_names FROM news o JOIN news_tag_map ot ON ot.issue_id = o.issue_id JOIN tags t ON t.tag_id = ot.tag_id GROUP BY o.issue_id HAVING FIND_IN_SET(?, tags_names)"

  // con.query("SELECT * FROM issues o JOIN issues_tag_map ot ON ot.issue_id = o.issue_id JOIN tag t ON t.tag_id = ot.tag_id WHERE t.description IN ('tesla') GROUP BY o.issue_id HAVING COUNT(DISTINCT t.description) = 1", function (err, result, fields) {
    con.query(sql, req.body.tag, function (err, result, fields) {

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

  // con.query("SELECT * FROM issues o JOIN issues_tag_map ot ON ot.issue_id = o.issue_id JOIN tag t ON t.tag_id = ot.tag_id WHERE t.description IN ('tesla') GROUP BY o.issue_id HAVING COUNT(DISTINCT t.description) = 1", function (err, result, fields) {
    con.query(sql, req.body.text, function (err, result, fields) {

    if (err) throw err;

    data = JSON.stringify(result, null, "\t");

    return res.send(data) 
  });
});