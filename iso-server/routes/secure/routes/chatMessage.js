const moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
const { v4: uuidv4 } = require('uuid');

var AWS = require('aws-sdk');
const s3 = new AWS.S3({
  accessKeyId: process.env.accessKeyId,
  secretAccessKey: process.env.secretAccessKey,
});

module.exports = (app, db, passport) => {
  app.post('/api/chatMessage', passport.authenticate('jwt', {session: false}), (req, res) => {

    var io = req.app.get('socketio');

    console.log(req.body)

    if (req.body.chat_id === '' || req.user._id === '' || req.user._id === undefined || (req.body.message === '' && req.body.file === '') ) {

      console.log("ERROR")

      res.status(500)
      res.json({
        message: 'err.message',
        error: 'err'
      });

      // res.render('error', { error: '{chat_id: string, user_id: string, message: string }' })
      // res.send("{chat_id: string, user_id: string, message: string }")

    } else {

      if (req.body.file !== '') {
        console.log("Message is a file");
        let uuid = uuidv4();
        console.log(uuid);

        var GeneratedObjectId = ObjectId();

        console.log(req.files.file)

        var params = {Bucket: `articles-website/chat/${req.body.chat_id}`, Key: uuid, ContentType: "image/jpeg", Body: req.files.file.data, ACL: "public-read"};

        s3.upload(params, function(err, data) {

          console.log(err, data);

          if (err) {
            return res.status(500).send(err);
          }

          db.collection("articles_messages").updateOne( 
            {_id: ObjectId(req.body.chat_id) }, 
            {
              $push: {
                messages: {
                  _id: GeneratedObjectId,
                  sender: req.user._id,
                  message: '',
                  media: 'photo',
                  url: `https://articles-website.s3.amazonaws.com/chat/${req.body.chat_id}/${uuid}`,
                  date: moment()._d
                }
              }
            },
            function(err, response) {
              if (err) throw err;
              console.log(`Call to /api/chatMessage done`);

              io.in(req.body.chat_id).emit('message', {
                chat_id: req.body.chat_id,
                _id: GeneratedObjectId,
                date: moment()._d,
                media: 'photo',
                url: `https://articles-website.s3.amazonaws.com/chat/${req.body.chat_id}/${uuid}`,
                message: '',
                sender: req.user._id
              });

              return res.send({
                type: 'photo',
                message: 'Image Uploaded',
                url: `https://articles-website.s3.amazonaws.com/chat/${req.body.chat_id}/${uuid}`,
              });
            }
          );
        });
        
      } else {
        console.log("Just message")
        var GeneratedObjectId = ObjectId();

        db.collection("articles_messages").updateOne( 
          {_id: ObjectId(req.body.chat_id) }, 
          {
            $push: {
              messages: {
                _id: GeneratedObjectId,
                sender: req.user._id,
                message: req.body.message,
                date: moment()._d
              }
            }
          },
          function(err, response) {
            if (err) throw err;
            console.log(`Call to /api/chatMessage done`);

            // io.in('game').emit('big-announcement', 'the game will start soon');

            io.in(req.body.chat_id).emit('message', {
              chat_id: req.body.chat_id,
              _id: GeneratedObjectId,
              date: moment()._d,
              message: req.body.message,
              sender: req.user._id
            });

            // return res.send('Message Saved');
            return res.send(response);
            
          }
        );
    
      }

    }
  });
}