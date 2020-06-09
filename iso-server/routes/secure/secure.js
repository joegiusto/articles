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
              
              db.collection("articles_news").find({ _id: {$in: justNews_Id} }).toArray(function(err, result) {
                if (err) throw err;
                console.log(`Call to /api/getUserDetails done`)
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

    if (donation.type === 'card') {
      stripe.charges.create({
        amount: donation.amount,
        currency: 'usd',
        description: 'Articles Website Store',
        source: 'tok_visa'
      })
      .then((charge) => {
        db.collection("articles_donations").updateOne({_id: ObjectId(req.body.donation._id)}, {
          $set: {
            amount: donation.amount,
            date: donation.date,
            name: donation.name,
            message: donation.message,
            createdBy: donation.createdBy,
            wasMatched: donation.wasMatched,
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
      db.collection("articles_donations").updateOne({_id: ObjectId(req.body.donation._id)}, {
        $set: {
          amount: donation.amount,
          date: donation.date,
          name: donation.name,
          message: donation.message,
          createdBy: donation.createdBy,
          wasMatched: donation.wasMatched,
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
    }
  });

  app.post('/api/deleteDonation', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/deleteDonation made at ${new Date()}`);
    const donation = req.body.donation;

    db.collection("articles_donations").deleteOne({_id: ObjectId(req.body._id)}, function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteDonation done`);
    });

    return res.end();

  });
} 