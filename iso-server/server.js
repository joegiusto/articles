require('dotenv').config()
const express = require('express');
const bodyParser = require('body-parser');
const passport = require("passport");
const path = require('path');
const app = express();
const cors = require('cors');
var http = require('http').createServer(app);
// var io = require('socket.io')(http);
var io = require('socket.io')(http);
const allNamespace = io.of('/');
const history = require('connect-history-api-fallback');
let mongoUtil = require('./db');
const mongoose = require('mongoose');
var ObjectId = require('mongodb').ObjectId;
var AWS = require('aws-sdk');
const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;
// const stripe = require('stripe')(process.env.STRIPE_PASSWORD);

let mongooseConnectionAttempts = 1
const mongooseConnectionAttemptsMax = 5

let mongoConnectionAttempts = 1
const mongoConnectionAttemptsMax = 5

// app.use(

//   history({
//     verbose: true,
//     rewrites: [
//       {
//         from: /^\/api\/.*$/,
//         to: function(context) {
//           console.log(context.parsedUrl.pathname);
//           return context.parsedUrl.pathname;
//         }
//       }
//     ]
//   })

// );

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

async function listAllObjectsFromS3Bucket(bucket, prefix) {
  let isTruncated = true;
  let marker;
  while(isTruncated) {
    let params = { Bucket: bucket };
    if (prefix) params.Prefix = prefix;
    if (marker) params.Marker = marker;
    try {
      const response = await s3.listObjects(params).promise();
      response.Contents.forEach(item => {
        console.log(item.Key);
      });
      isTruncated = response.IsTruncated;
      if (isTruncated) {
        marker = response.Contents.slice(-1)[0].Key;
      }
  } catch(error) {
      // throw error;
      console.log(error);
      isTruncated = false;
    }
  }
}

// Fuck this for now
// listAllObjectsFromS3Bucket('articles-website');

function connectWithRetryMongo() {
  mongoUtil.connectToServer( function( err, client ) {

    if (err) {
      console.log('\x1b[31m%s\x1b[0m', `[Startup] Mongo Failed - Retry attempt ${mongoConnectionAttempts}/${mongoConnectionAttemptsMax}`)
      console.log(err)

      if (mongoConnectionAttempts <= mongoConnectionAttemptsMax) {
        mongoConnectionAttempts++
        connectWithRetryMongo()
      }
    };
  
    var db = mongoUtil.getDb();
  
    require('./routes/getNewsDocument')(app, db);
    // Replace add and edit with upsert
    require('./routes/addNewsDocument')(app, db);
    require('./routes/editNewsDocument')(app, db);
  
    require('./routes/getNewsByTag')(app, db);
    require('./routes/getNews')(app, db);
    require('./routes/getTags')(app, db);
    require('./routes/outsetUpdate')(app, db);

    require('./routes/getRevenue')(app, db);
    require('./routes/getExpenses')(app, db);
  
    require('./routes/getProducts')(app, db);
    require('./routes/getProduct')(app, db);
    require('./routes/upsertProduct')(app, db);
  
    require('./routes/getIssues')(app, db);
    require('./routes/getStories')(app, db);
    require('./routes/getMyths')(app, db);
    require('./routes/getSubmissions')(app, db);
    require('./routes/getDonations')(app, db);
    require('./routes/getExpenses')(app, db);
  
    // const secureRoute = require('./routes/secure/secure-routes.js')(app, db);
    // app.use('/api/secure', passport.authenticate('jwt', {session: false}), secureRoute);
    // TODO / HELP / I GIVE UP! - I can not seem to nest secure routes anymore while keeping const "app.post" preserverd once I got the MongoDB var "db" passed down for a constant connection and getting everything faster. For now I will just be doing app.post secure routes done one by one untill I can just get them all done similir to how it was done on the lines above this comment
    require('./routes/secure/secure')(app, db);


  });
}

connectWithRetryMongo();

app.use(cors());
app.options('*', cors());

http.listen(process.env.PORT || 8080, () => {
  console.log( '\x1b[32m%s\x1b[0m', '[Startup] HTTP Ready');
});

function connectWithRetryMongoose() {
  mongoose
  .connect(
    url, {
      useNewUrlParser: true,
      useUnifiedTopology: true 
  })
  .then(() => console.log('\x1b[32m%s\x1b[0m', '[Startup] Mongoose Ready'))
  .catch(err => {
    console.log('\x1b[31m%s\x1b[0m', `[Startup] Mongoose Failed - Retry attempt ${mongooseConnectionAttempts}/${mongooseConnectionAttemptsMax}`);
    console.log(err.message)

    if (mongooseConnectionAttempts <= mongooseConnectionAttemptsMax) {
      mongooseConnectionAttempts++
      connectWithRetryMongoose()
    }
  });
}

connectWithRetryMongoose();

const users = require("./routes/api/users");

// Not sure wehat this did
app.use( express.static(path.join(__dirname, '../build')) );

app.use( bodyParser.json() );
app.use( bodyParser.urlencoded({ extended: true }) );

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// app.listen(process.env.PORT || 8080);

app.get('/', function (req, res) {
  // TEMP
  res.set({"Cache-Control": "no-store, no-cache"})
  res.sendFile(path.join(__dirname, './build', 'index.html'));
});

// io.origins('*:*');

io.on('connection', (socket) => {
  console.log('User connected');
  
  io.of('/').clients((error, clients) => {
    if (error) throw error;
    console.log(clients);
    io.emit( 'online', clients );
  });

  socket.on('adminMessage', (data) => {
    console.log(data);
    socket.send('hi');
    io.emit('adminMessage', data);
  });

  function recieveDonation(object) {
    io.emit('recieveDonation', object);
    console.log(object);
  }

  socket.on('recieveDonation', (data) => {

    // recieveDonation({
    //   amount: 1000,
    //   date: Math.floor(new Date().getTime()/1000.0),
    //   note: 'Fake Donation',
    //   uid: Date.now(),
    //   name: 'Test',
    //   department: 'other',
    //   file: 'https://en.wikipedia.org/wiki/Rickrolling'
    // });

    recieveDonation(data)

    // console.log(data);

  });

  function recieveExpense(object) {
    io.emit('recieveExpense', object);
    console.log(object);
  }

  socket.on('recieveExpense', (data) => {

    recieveExpense({
      amount: 1000,
      date: Math.floor(new Date().getTime()/1000.0),
      note: 'Fake Expense',
      uid: Date.now(),
      name: 'Sample',
      department: 'other',
      file: 'https://en.wikipedia.org/wiki/Rickrolling'
    });

  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    
    io.of('/').clients((error, clients) => {
      if (error) throw error;
      console.log(clients);
      io.emit( 'online', clients );
    });
  });

});

// Used to make sure server is up in one place, though this was in MySQL days
app.get('/ping', function (req, res) {
  return res.send('pong');
});