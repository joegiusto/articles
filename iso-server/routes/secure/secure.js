const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
const passport = require("passport");
const stripe = require('stripe')(process.env.STRIPE_NEW);

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

      if (req.body.user_details === undefined || req.body.user === undefined) {
        return res.send("user_details and user are required");
      }
  
      db.collection("articles_users").updateOne({_id: o_id}, {
        $set: {
          first_name: myobj.first_name,
          last_name: myobj.last_name,
          photo_url: myobj.photo_url,
          birth_date: new Date (myobj.birth_date),
          address: {
            city: myobj.address.city,
            state: myobj.address.state,
            zip: myobj.address.zip,
            lat: myobj.address.lat,
            lng: myobj.address.lng,
          },
          gender: myobj.gender,
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

  app.post("/api/create-payment-intent", async (req, res) => {
    const { items } = req.body;
    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount,
      currency: "usd",
      // customer: req.body._id,
      metadata: {
        user_id: req.body._id
      },
      description: 'User donation to the site',
    });
    res.send({
      clientSecret: paymentIntent.client_secret
    });
  });

  app.post("/api/userMadeDonation", async (req, res) => {
    const { items } = req.body;

    // const idClean = (req.body.donation._id === '' ? ObjectId() : ObjectId(req.body.donation._id))

    // console.log(items)
    // console.log(items._id)

    // Create a PaymentIntent with the order amount and currency
    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: 1000,
    //   currency: "usd",
    //   customer: items._id,
    //   description: 'User donation to the site',
    // });

    const intent = await stripe.paymentIntents.retrieve(
      req.body.payment.paymentIntent.id
    );

    // console.log(intent)

    const charges = intent.charges.data;
    const charge = charges[0];

    console.log(charge)

    // const order = await stripe.orders.retrieve(
    //   req.body.payment.paymentIntent.id
    // );

    db.collection("articles_donations").updateOne({ _id: ObjectId() }, {
      $set: {
        amount: parseInt(charge.amount),
        type: 'card',
        date: moment()._d,
        // name: donation.name,
        first_name: req.body.first_name || 'Private Donor',
        last_name: req.body.last_name || '',
        // message: donation.message,
        stripeCharge: charge.id,
        createdBy: req.body._id,
        // matched: donation.matched,
        // matchedBy: donation.matchedBy
      }
    },
    {
      upsert: true
    }, 
    function(err, result) {
      if (err) throw err;
      // console.log(`Call to /api/upsertDonation done`);
      // return res.send(result);

      res.send({
        order: result
      });
    });

    
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

  app.post('/api/getUserDonations', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/getUserDonations made at ${new Date()}`);
  
    db.collection("articles_donations").find({createdBy: req.body._id}).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getUserDonations done`);
      return res.send(result) 
    });

  });

  app.post('/api/getUserMessages', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/getUserMessages made at ${new Date()}`);

    // Get the users Mail
    db.collection("articles_messages").find( { users: { $in: [req.body._id] } } ).toArray(function(err, result) {
      if (err) throw err;

      for (let i = 0; i < result.length; i++) {

        if ( result[i].users.length > 2 ) {
          // console.log("Is a group message");
          result[i].group_message = true;
        }

      }

      // result | message = [{}, {}]
      for (let i = 0; i < result.length; i++) {

        let fetchedUsers = []

        // users = [userID, userID]
        result[i].users.map((user) => {

          db.collection("articles_users").findOne( { _id: ObjectId( user ) }, { projection: {first_name: 1, last_name: 1 } }, function(subErr, subResult) {
            if (err) throw subErr;

            // console.log(subResult)

            let fetchedName = ''

            if (subResult === null) {
              fetchedName = "Deleted User"
            } else {
              fetchedName = subResult.first_name + ' ' + subResult.last_name
            }

            // console.log(fetchedName)
            // console.log(fetchedUsers)
            
            fetchedUsers.push(fetchedName);
            fetchedName = ''
          });
        })

        // console.log("Final List Real")
        // console.log(fetchedUsers)

        result[i].fetchedUsers = fetchedUsers;
        // result[i].userMatch = fetchedUsers;

        if (i === result.length - 1 ) {
          // console.log("Final List")
          // console.log(fetchedUsers)

          delaySubmit()
        }

      }

      function delaySubmit() {
        // setTimeout(function(){ return res.send(result[0].mail) }, 500);
        setTimeout(function(){ return res.send(result) }, 250);
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

  app.post('/api/upsertExpenseReport', (req, res) => {
    console.log(`Call to /api/upsertProduct made at ${new Date()}`);

    let report = req.body.report;

    const allowedKeys = ['expense_id', 'user_id', 'reason'];

    report = Object.keys(report)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = report[key];
      return obj;
    }, {});

    console.log(report)

    db.collection("articles_expense_reports").updateOne({_id: ObjectId(report._id)}, {
      $set: {
        date: moment()._d,
        user_id: report.user_id,
        expense_id: report.expense_id,
        reason: report.reason
      }
    },
    {
      upsert: true
    }, 
    function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/upsertProduct done`);
    });

    return res.end();

  });
  
  app.post('/api/deleteExpenseReport', (req, res) => {

    console.log(`/api/deleteExpenseReport ${new Date()}`);

    db.collection("articles_expense_reports").deleteOne({_id: ObjectId(req.body._id)}, 
    function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteExpenseReport done`);
    });

    return res.end();

  });

  app.post('/api/chatMessage', (req, res) => {

    if (req.body.chat_id === '' || req.body.user_id === '' || req.body.user_id === undefined || req.body.message === '') {

      console.log("should End Here")

      res.status(500)
      res.json({
        message: 'err.message',
        error: 'err'
      });

      // res.render('error', { error: '{chat_id: string, user_id: string, message: string }' })
      // res.send("{chat_id: string, user_id: string, message: string }")

    } else {

      db.collection("articles_messages").updateOne( {_id: ObjectId(req.body.chat_id) }, 
      {
        $push: {
          messages: {
            sender: req.body.user_id,
            message: req.body.message,
            date: moment()._d
          }
        }
      },
      function(err, res) {
        if (err) throw err;
        console.log(`Call to /api/chatMessage done`);
      });
  
      return res.send('Message Saved');

    }
  });

} 