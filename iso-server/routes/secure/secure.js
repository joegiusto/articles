// const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
const passport = require("passport");
const stripe = require('stripe')(process.env.STRIPE_TEST_PASSWORD);


module.exports = (app, db) => {

  app.post('/api/secure/getUserDetails', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    console.log(`Call to /api/getUserDetails made here at ${new Date()} by user ${req.body.user}`);
      let data = {};
      var o_id = new ObjectId(req.body.user);
      // let justNews = []

      db.collection("articles_users").findOne( o_id, function(err, result) {
        if (err) throw err;
        data.user = result

        // We now fetch values of the users data that needs to be grabbed from other documents.
        data.user.ordersFetched = [];
        data.user.submissionsFetched = [];
        data.user.subscriptionsFetched = [];

        db.collection("articles_orders").find({user_id: req.body.user}).toArray(function(err, result) {
          if (err) throw err;
          // console.log(`Call to /api/getUserDetails done`)
          // console.log(result);
          data.user.ordersFetched = result
          // return res.send(data);

          db.collection("articles_submissions").find({user_id: req.body.user}).toArray(function(err, result) {
            if (err) throw err;
            data.user.submissionsFetched = result;

            let justNews_Id = [];
            
            try {

              justNews_Id = data.user.subscriptions.map(sub => {
                return ObjectId(sub.news_id);
              })

            } catch(e) {
              console.log("This user has no subscriptions yet");
            }

            if (justNews_Id.length > 0) {
              
              db.collection("articles_news").find({ _id: {$in: justNews_Id}, news_type: 'issue' }).toArray(function(err, result) {
                if (err) throw err;
                console.log(`Call to /api/getUserDetails done`)

                // Meaning the user subscriptions fetched against all issues 
                if  ( result.length > 0 ) {
                  for (let i = 0; i < result.length; i++) {
                    let match = data.user.subscriptions.find(subscription => subscription.news_id === result[i]._id.toString() )
                    result[i].lastRead = match.lastRead;
                  }
                }

                data.user.subscriptionsFetched = result;
                return res.send(data);
              });

            } else {

              console.log(`Call to /api/getUserDetails done`)
              return res.send(data);

            }
            
          });
        });

      });
  });

  app.post('/api/secure/updateUserDetails', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(`Call to /api/updateUserDetails made at ${new Date()}`);
      
      var myobj = req.body.user_details;
      var o_id = new ObjectId(req.body.user);

      console.log(myobj);
  
      db.collection("articles_users").updateOne({_id: o_id}, {
        // {subscriptions: myobj.subscriptions},
        $set: {
          first_name: myobj.first_name,
          last_name: myobj.last_name,
          photo_url: myobj.photo_url,
          address: {

            zip: myobj.address.zip,
            
          },
          subscriptions: myobj.subscriptions
        }
      }, function(err, res) {
        if (err) {
          throw err
        };

      });

      return res.end();
  });

  app.post('/getOrderDetails', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log("Call to /api/secure/getOrderDetails at" + new Date());

    let data = {};
    var o_id = new ObjectId(req.body.order_id);

    console.log(req.body.order_id);

    db.collection("articles_orders").findOne( o_id, function(err, result) {
      if (err) throw err;
      data.order = result
      console.log("Call to /api/secure/getOrderDetails done");
      return res.send(data);
    });
    
  });

  app.post('/api/secure/getUsers', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    console.log(`Call to /api/getUsers made here at ${new Date()} by user ${req.body.user}`);
    let data = {};
    
    db.collection("articles_users").find({user_id: req.body.user}).toArray(function(err, result) {
      if (err) throw err;

      data.users = result
      console.log(`Call to /api/getUsers done`)
      return res.send(data);
    });

  });

  app.post('/api/secure/toggleRole', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    console.log(`Call to /api/secure/toggleRole made here at ${new Date()} by user ${req.body.user}`);

    var o_id = new ObjectId(req.body.user);

    const access = `roles.${req.body.role}`

    db.collection("articles_users").updateOne({_id: o_id}, {
      $set: {
        [access]: req.body.permission
      }
    }, function(err, res) {
      if (err) {
        throw err
      };

    });
    
    return res.send({note: 'worked'});

    // db.collection("articles_users").find({user_id: req.body.user}).toArray(function(err, result) {
    //   if (err) throw err;
    //   data.users = result
    //   console.log(`Call to /api/secure/toggleRole done`)
    //   return res.send(data);
    // });

  });

  app.post('/api/upsertDonation', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/upsertDonation made at ${new Date()}`);
    const donation = req.body.donation;
    const idClean = (req.body.donation._id === '' ? ObjectId() : ObjectId(req.body.donation._id))

    if (donation.type === 'Card') {
      stripe.charges.create({
        amount: donation.amount,
        currency: 'usd',
        description: 'Articles Website Store',
        source: 'tok_visa'
      })
      .then((charge) => {
        db.collection("articles_donations").updateOne({ _id: idClean }, {
          $set: {
            amount: donation.amount,
            type: donation.type,
            date: donation.date,
            name: donation.name,
            message: donation.message,
            createdBy: donation.createdBy,
            matched: donation.matched,
            matchedBy: donation.matchedBy
          }
        },
        {
          upsert: true
        }, 
        function(err, res) {
          if (err) throw err;
          console.log(`Call to /api/upsertDonation done`);
        });
  
        return res.end();
      })
      .catch((err) => {
        // charge failed. Alert user that charge failed somehow
        console.log("Error")
        console.log(err)
      });
    } else {
      db.collection("articles_donations").updateOne({ _id: idClean }, {
        $set: {
          amount: parseInt(donation.amount),
          type: donation.type,
          date: new Date(donation.date),
          name: donation.name,
          message: donation.message,
          createdBy: donation.createdBy,
          matched: donation.matched,
          matchedBy: donation.matchedBy
        }
      },
      {
        upsert: true
      }, 
      function(err, result) {
        if (err) throw err;
        console.log(`Call to /api/upsertDonation done`);
        return res.send(result);
      });
      
    }
  });

  app.post('/api/deleteDonation', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/deleteDonation made at ${new Date()}`);

    // const donation = req.body.donation;
    // const idClean = (req.body._id === '' ? null : ObjectId(req.body._id))

    db.collection("articles_donations").deleteOne({_id:  ObjectId(req.body._id)}, function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteDonation done`);
    });

    return res.end();

  });

  app.post('/api/tryVote', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/tryVote made at ${new Date()}`);
    console.log(req.body)

    

    switch(req.body.type) {
      case 'null':
        console.log("Clear up and down for user")

        db.collection("articles_submissions").updateOne({_id: ObjectId(req.body.submission_id)},
        {
          // $set: {
            $pull: {
              "up": req.body.user_id,
              "down": req.body.user_id
            }
          // }
        }, 
        function(err, res) {
          if (err) throw err;
          console.log("Neutral Success");
        });

        return res.end();
        // break;
      case 'up':

        console.log("Clear down for user and check and add up");

        db.collection("articles_submissions").updateOne({_id: ObjectId(req.body.submission_id)},
        {
          // $set: {
            $pull: {
              "down": req.body.user_id
            },
            $push: {
              "up": req.body.user_id
            }
          // }
        }, 
        function(err, res) {
          if (err) throw err;
          console.log("Upvote Success");
        });

        return res.end();

      case 'down':
        console.log("Clear up for user and check and add down")

        db.collection("articles_submissions").updateOne({_id: ObjectId(req.body.submission_id)},
        {
          // $set: {
            $pull: {
              "up": req.body.user_id,
            },
            $push: {
              "down": req.body.user_id
            }
          // }
        }, 
        function(err, res) {
          if (err) throw err;
          console.log("Downvote Success");
        });

        return res.end();
        // break;
      default:
        console.log("Please provide a {type: ''}");
        return res.end();
    }

    // db.collection("articles_submissions").findOne({_id: ObjectId(req.body._id)}, function(err, res) {
    //   // if (err) throw err;
    //   console.log(res);
    //   // console.log(`Call to /api/tryVote done`);
    // });

    // return res.end();

  });

  app.post('/api/getUserMessages', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/getUserMessages made at ${new Date()}`);

    // Get the users Mail
    db.collection("articles_users").find( {_id: ObjectId(req.body._id)}, {mail:1} ).toArray(function(err, result) {
      if (err) throw err;

      // console.log(`Call to /api/getUserMessages done`);

      // Get the senders names of mail messages
      for (let i = 0; i < result[0].mail.length; i++) {
        console.log(result[0].mail[i].sender)

        db.collection("articles_users").findOne( {_id: ObjectId(result[0].mail[i].sender)}, function(subErr, subResult) {
          if (err) throw subErr;
          // console.log(subResult)
          result[0].mail[i].fetchedSender = subResult.first_name + ' ' + subResult.last_name
        });

        console.log(i)
        console.log(result[0].mail.length)

        if (i === result[0].mail.length - 1) {
          console.log("Last sender")

          // Delay return res so Mongo can finish, THIS NEEDS TO BE IN A CALLBACK
          delaySubmit()
        }

      }

      function delaySubmit() {
        setTimeout(function(){ return res.send(result[0].mail) }, 500);
      }
       
      // return res.send(result[0].mail)
      
    });

    // return res.end();

    // db.collection("articles_submissions").findOne({_id: ObjectId(req.body._id)}, function(err, res) {
    //   // if (err) throw err;
    //   console.log(res);
    //   // console.log(`Call to /api/tryVote done`);
    // });

    // return res.end();

  });
} 