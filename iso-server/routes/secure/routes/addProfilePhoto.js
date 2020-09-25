const sharp = require('sharp');
var AWS = require('aws-sdk');

const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

// const moment = require('moment');
// var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {

  app.post('/api/addProfilePhoto', passport.authenticate('jwt', {session: false}), function (req, res) {

    console.log(`${req.user._id} Is trying to change their profile photo`);

    if (!req.files || Object.keys(req.files).length === 0 || req.user._id === undefined || req.user._id === 'undefined') {
      console.log("Upload failed");
      return res.status(400).send('No files were uploaded.');
    }

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    // let sampleFile = req.files.file;

    // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
    let sampleFile = req.files.file;

    var resizedPhoto = Buffer

    sharp(sampleFile.data)
    .resize(200, 200)
    .withMetadata()
    .toBuffer()
    .then( data => {

      var params = {Bucket: 'articles-website/profile_photos', Prefix: 'profile_photos', Key: req.user._id + '.' + sampleFile.name.split('.')[1].toLowerCase(), ContentType: "image/jpeg", Body: data, ACL: "public-read"};
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

} 