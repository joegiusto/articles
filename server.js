const express = require('express');
var mysql = require('mysql');
const bodyParser = require('body-parser')
const path = require('path');
const app = express();

var con = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "",
  database: "simplifeye_of"
});

var mysqlStuff = [];

con.connect(function(err) {
  if (err) throw err;
  console.log("Database connected");

  con.query("SELECT * FROM customers", function (err, result, fields) {
    if (err) throw err;
    // console.log(result);
    mysqlStuff = JSON.stringify(result, null, "\t");
  });

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