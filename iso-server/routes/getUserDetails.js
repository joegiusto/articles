// const MongoClient = require('mongodb').MongoClient;
var ObjectId = require('mongodb').ObjectId; 
// const url = "mongodb://joegiusto:" + process.env.MONGODB_PASSWORD + "@articles-xgwnd.mongodb.net";
// const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;
// const express = require('express');
// const app = express();
// var router = require('express').Router();

module.exports = (app, db, ) => {
  app.post('/getUserDetails', (req, res) => {

    ///... This file is destroyed by the way, dont try to fix it just grab the /getUserDetails post call form the main server.js file.
    
    console.log(`Call to /api/getUserDetails made here at ${new Date()} by user ${req.body.user}`);

    // MongoClient.connect(url, {useNewUrlParser: true, useUnifiedTopology: true}, function(err, db) {

      let data = {};

      // if (err) throw err;
      // var dbo = db.db("articles_data");
      var o_id = new ObjectId(req.body.user);

      let justNews = []

      db.collection("articles_users").findOne( o_id, function(err, result) {
        // if (err) throw err;
        data.user = result
        data.subscriptions = [];
        // return res.send(data);
      });

      db.collection("articles_orders").find({user_id: req.body.user}).toArray(function(err, result) {
        if (err) throw err;
        data.orders = result
      });

      db.collection("articles_submissions").find({user_id: req.body.user}).toArray(function(err, result) {
        if (err) throw err;
        data.submissions = result;
        data.subscriptions = [];

        try {
          justNews = data.user.subscriptions.map(sub => {
            return ObjectId(sub.news_id);
          })
        } catch {
          console.log("This user ain't got shit");
        }
        
      });

      db.collection("articles_news").find({ _id: {$in: justNews} }).toArray(function(err, result) {
        if (err) throw err;
        console.log(`Call to /api/getUserDetails done`)
        data.subscriptions = result;
        return res.send(data);
      });

    });
    
  // });
}