var ObjectId = require('mongodb').ObjectId;
const moment = require('moment');

module.exports = (app, db, passport) => {
  app.post('/api/startChat', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log("/api/startChat");

    if ( !ObjectId.isValid(req.body.user) ) {
      console.log("IS NOT VALID")
      return res.status(400).send('Not a valid user id.');
    } else {
      console.log("IS VALID")
    }

    // Check to make sure user exist
    db.collection("articles_users").findOne( 
      { _id: ObjectId(`${req.body.user}`) },
      {projection: {first_name: 1, last_name: 1, email: 1} } 
    )
    .then((response) => {

      console.log("Success")
      console.log(response)

      if (response === null) {
        console.log("Was equal to null")
        return res.status(400).send('No user found with that Id');
      }

      // Check to make sure no chat exist
      db.collection("articles_messages").find( { users: { $all: [`${req.body.user}`, `${req.user._id}`] } } ).toArray(function(err, result) {
        if (err) throw err;
        console.log(result)

        if ( result.length > 0 ) {
          return res.status(400).send('User thread already exist');
        } else {

          db.collection("articles_messages").insertOne(

            { 
              _id: ObjectId(),
              fetchedUsers: [],
              messages: [
                {
                  _id: ObjectId(),
                  date: moment()._d,
                  message: req.body.message,
                  sender: req.user._id
                }
              ],
              users: [`${req.body.user}`, `${req.user._id}`]
            },

            function(err, result) {
              if (err) throw err;
              res.send(result);
            });
        }

      });

    }).catch((err) => {
      console.log("Error")
      console.log(err)
      return res.status(400).send(err);
    })

    // Check to make sure no chat exist
    // db.collection("articles_messages").find( { users: { $all: [`${req.body.user}`, `${req.user._id}`] } } ).toArray(function(err, result) {
    //   if (err) throw err;
    //   console.log(result)
    // });

    // Create Chat

    // Attach fetchedUsers

    // Return Chat

    // return res.send({text: 'Done'})
  });
};