require('dotenv').config()
const express = require('express');
const fileUpload = require('express-fileupload');
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
const stripe = require('stripe')(process.env.STRIPE_TEST_PASSWORD);
const sharp = require('sharp');
let mongooseConnectionAttempts = 1
const mongooseConnectionAttemptsMax = 5

let mongoConnectionAttempts = 1
const mongoConnectionAttemptsMax = 5

app.use(

  history({
    verbose: true,
    rewrites: [
      {
        from: /^\/api\/.*$/,
        to: function(context) {
          console.log(context.parsedUrl.pathname);
          return context.parsedUrl.pathname;
        }
      }
    ]
  })

);

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

async function listAllObjectsFromS3Bucket(bucket, prefix) {
  let isTruncated = true;
  let marker;
  let photos = [];
  while(isTruncated) {
    let params = { Bucket: bucket };
    if (prefix) params.Prefix = prefix;
    if (marker) params.Marker = marker;
    try {
      const response = await s3.listObjects(params).promise();

      response.Contents.forEach(item => {
        // console.log(item.Key);
        photos.push(item.Key)
      });

      isTruncated = response.IsTruncated;

      if (isTruncated) {
        marker = response.Contents.slice(-1)[0].Key;
      }

      // console.log(photos)
      return(photos);
  } catch(error) {
      // throw error;
      console.log(error);
      isTruncated = false;
    }
  }
}

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
    require('./routes/getNewsTags')(app, db);
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
  
    // const secureRoute = require('./routes/secure/secure-routes.js')(app, db);
    // app.use('/api/secure', passport.authenticate('jwt', {session: false}), secureRoute);
    // TODO / HELP / I GIVE UP! - I can not seem to nest secure routes anymore while keeping const "app.post" preserverd once I got the MongoDB var "db" passed down for a constant connection and getting everything faster. For now I will just be doing app.post secure routes done one by one untill I can just get them all done similir to how it was done on the lines above this comment
    require('./routes/secure/secure')(app, db);

    app.get('/sitemap.xml', function(req, res) {
      res.sendFile(__dirname + '/sitemap.xml');
    });
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

app.use(fileUpload());

// Passport middleware
app.use(passport.initialize());

// Passport config
require("./config/passport")(passport);

// Routes
app.use("/api/users", users);

// app.listen(process.env.PORT || 8080);
res.set({"Cache-Control": "no-store, no-cache"})

app.get('/', function (req, res) {
  // TEMP
  
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

  function deleteDonation(id) {
    io.emit('deleteDonation', id);
  }

  socket.on('recieveDonation', (data) => {
    console.log("Recieved a donation from somewhere")

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

  socket.on('deleteDonation', (id) => {

    // recieveDonation({
    //   amount: 1000,
    //   date: Math.floor(new Date().getTime()/1000.0),
    //   note: 'Fake Donation',
    //   uid: Date.now(),
    //   name: 'Test',
    //   department: 'other',
    //   file: 'https://en.wikipedia.org/wiki/Rickrolling'
    // });

    deleteDonation(id)

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
app.get('/api/ping', function (req, res) {
  return res.send('pong');
});

app.get('/api/photos', function (req, res) {
  listAllObjectsFromS3Bucket('articles-website', '').then(results => {
    console.log("Call to /api/photos/ done");
    return res.send(results);
  })
});

app.post('/api/addPhoto', function (req, res) {

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;

  // Use the mv() method to place the file somewhere on your server
  // sampleFile.mv(__dirname + '/photos/' + req.files.file.name, function(err) {
  //   if (err)
  //     // return res.status(500).send(err);
  //     console.log(err);
  //   console.log("Complete");
  //   // res.send('File uploaded!');

  // });

  // let albumName = 'articles-website'
  // var base64data = Buffer(sampleFile, 'binary');

  var resizedPhoto = Buffer

  // sharp(sampleFile.data)
  // .resize(300, 300)
  // .toFile(__dirname + '/photos/' + sampleFile.name.split('.')[0] + '_1.' + sampleFile.name.split('.')[1], (err, info) => { 
  //   resizedPhoto = info;
  //   console.log("Done");
  //   console.log(info);

  //   var params = {Bucket: 'articles-website', Key: sampleFile.name, ContentType: "image/jpeg", Body: info, ACL: "public-read"};
  //   s3.upload(params, function(err, data) {
  //     console.log(err, data);
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
        
  //     res.send('File uploaded!');
  //   });
  // });

  // sharp(sampleFile.data)
  // .resize(200, 200)
  // .toBuffer()
  // .then( data => {
  //   // console.log(resizedPhoto);
  //   // console.log("-")
  //   // console.log(sampleFile.data)

  //   var params = {Bucket: 'articles-website', Key: sampleFile.name, ContentType: "image/jpeg", Body: data, ACL: "public-read"};
  //   s3.upload(params, function(err, data) {
  //     console.log(err, data);
  //     if (err) {
  //       return res.status(500).send(err);
  //     }
        
  //     res.send('File uploaded!');
  //   });
  // })
  // .catch( err => { 
  //   console.log("Fail");
  //   console.log(err);
  // });

  // sharp(sampleFile.data)
  // .resize(200, 200)
  // .toBuffer()
  // .then( data => {
  //   console.log(resizedPhoto);
  //   console.log("-")
  //   console.log(sampleFile.data)

  //   resizedPhoto.mv(__dirname + '/photos/' + req.files.file.name.split('.')[0] + '-1' + req.files.file.name.split('.')[1], function(err) {
  //     if (err)
  //       console.log(err);
  //     console.log("Complete");
  //   });
  // })
  // .catch( err => { 
  //   console.log("Fail");
  //   console.log(err);
  // });

  var params = {Bucket: 'articles-website', Key: sampleFile.name, ContentType: "image/jpeg", Body: sampleFile.data, ACL: "public-read"};
  s3.upload(params, function(err, data) {
    console.log(err, data);
    if (err) {
      return res.status(500).send(err);
    }
      
    res.send('File uploaded!');
  });
  
});

app.post('/api/addProfilePhoto', function (req, res) {

  console.log(`${req.body.user} Is trying to change their profile photo`);

  if (!req.files || Object.keys(req.files).length === 0) {
    return res.status(400).send('No files were uploaded.');
  }

  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
  let sampleFile = req.files.file;

  var resizedPhoto = Buffer

  sharp(sampleFile.data)
  .resize(200, 200)
  .toBuffer()
  .then( data => {

    var params = {Bucket: 'articles-website/profile_photos', Prefix: 'profile_photos', Key: req.body.user + '.' + sampleFile.name.split('.')[1], ContentType: "image/jpeg", Body: data, ACL: "public-read"};
    s3.upload(params, function(err, data) {
      console.log(err, data);
      if (err) {
        return res.status(500).send(err);
      }
        
      res.send('File uploaded!');
    });

  })
  .catch( err => { 
    console.log("Fail");
    console.log(err);
  });
  
});

app.post('/api/charge', function (req, res) {

  stripe.charges.create({
    amount: 1000,
    currency: 'usd',
    description: 'Articles Website Store',
    // id: 'tok_visa',
    source: 'tok_visa'
  })
.then((charge) => {
    console.log("Success")
    console.log(charge)
}).catch((err) => {
    // charge failed. Alert user that charge failed somehow
    console.log("Error")
    console.log(err)
});
  
});