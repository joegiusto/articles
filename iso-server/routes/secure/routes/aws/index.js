var AWS = require('aws-sdk');
var colors = require('colors');
const isJoey = require("../functions/isJoey");

const s3 = new AWS.S3({
    accessKeyId: process.env.accessKeyId,
    secretAccessKey: process.env.secretAccessKey,
});

const listAllDirectories = params => {
return new Promise ((resolve, reject) => {
    const s3params = {
    Bucket: 'articles-website',
    MaxKeys: 20,
    Delimiter: '/',
    };
    s3.listObjectsV2 (s3params, (err, data) => {
    if (err) {
        reject (err);
    }
    resolve (data);
    });
});
};

const deleteS3Photo = (key) => {
    return new Promise ((resolve, reject) => {

    s3.deleteObject({
        Bucket: 'articles-website',
        Key: key
    },function (err,data){
        if (err) {
                reject (err);
        }
        resolve (data);
    })

    });
};

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

module.exports = (app, db, passport) => {

    app.post('/api/secure/aws/removePhoto', passport.authenticate('jwt', {session: false}), (req, res) => {

        console.log(req.body.key);

        // Will return a response to stop those who are not Joey
        if ( isJoey(req.user._id) ) {

            deleteS3Photo(req.body.key).then(results => {
                console.log('[Admin] Removing an image from AWS S3'.red);
                return res.send(results);
            }).catch(error => {
                return res.send(error);
            })
            
        } else {
            res.send("Sorry buddy, you are not Joey though :(");
        }

    });

    app.post('/api/secure/aws/directories', passport.authenticate('jwt', {session: false}), function (req, res) {

        if ( isJoey(req.user._id) ) {

            listAllDirectories('articles-website', '').then(results => {
                console.log("Call to /api/photos/ done");
                return res.send(results);
            })
            
        } else {
            return res.status(403).send({
                error: 'Sorry buddy, you are not Joey though :(',
            })
        }
      
    });

    app.post('/api/secure/aws/getDirectoryPhotos', passport.authenticate('jwt', {session: false}), function (req, res) {

        if ( isJoey(req.user._id) ) {

            listAllObjectsFromS3Bucket('articles-website', req.body.prefix).then(results => {
                console.log("Call to /api/secure/aws/getDirectoryPhotos done");
                return res.send(results);
            })
            
        } else {
            return res.status(403).send({
                error: 'Sorry buddy, you are not Joey though :(',
            })
        }
      
    });

    app.post('/api/secure/aws/addPhoto', passport.authenticate('jwt', {session: false}), function (req, res) {

        if (!req.files || Object.keys(req.files).length === 0) {
          return res.status(400).send('No files were uploaded.');
        }

        if ( isJoey(req.user._id) ) {

            // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
            let sampleFile = req.files.file;
        
            var explodedSampleFileName = sampleFile.name.split('.');
        
            explodedSampleFileName[1] = explodedSampleFileName[1].toLowerCase();
        
            var params = {Bucket: 'articles-website', Key: sampleFile.name, ContentType: "image/jpeg", Body: sampleFile.data, ACL: "public-read"};
            
            s3.upload(params, function(err, data) {
            console.log(err, data);
            if (err) {
                return res.status(500).send(err);
            }
                
            res.send('File uploaded!');
            });
            
        } else {
            return res.status(403).send({
                error: 'Sorry buddy, you are not Joey though :(',
            })
        }
        
      });

};