const express = require('express');
const app = express();
var router = express.Router();

// const MongoClient = require('mongodb').MongoClient;
// var ObjectId = require('mongodb').ObjectId; 
// const url = "mongodb+srv://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net/test?retryWrites=true&w=majority";

//Let's say the route below is very sensitive and we want only authorized users to have access

//Displays information tailored according to the logged in user
// app.post('/profile', (req, res, next) => {
//   console.log("Profile Called!");

//   //We'll just send back the user details and the token
//   res.json({
//     message : 'You made it to the secure route',
//     user : req.user,
//     token : req.query.secret_token
//   })
// });

// require('../getUserDetails')(app);
// require('../updateUserDetails')(app);
// require('../getOrderDetails')(app);

// exports.find = function(db){
  // you can do:
  // module.parent.client.query.....
  require('../getUserDetails')(router);
  require('../updateUserDetails')(router);
  require('../getOrderDetails')(router);
// }

module.exports = app;