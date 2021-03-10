const moment = require('moment');
var ObjectId = require('mongodb').ObjectId; 
const passport = require("passport");
const mongoose = require("mongoose");
const axios = require("axios");
const User = mongoose.model("users");
var colors = require('colors');

// const { resource } = require('../api/users');
// const { response } = require('express');

function needAdmin(req, res, next) {

  if (!req.user.roles.isAdmin) {

    res.status(400).send({
      error: 'Not Admin',
    })

    return false
  } else {
    return true
  }
}

module.exports = (app, db) => {
  
  app.post('/api/secure/getUserDetails', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    console.log(`Call to /api/getUserDetails made here at ${new Date()} by user ${req.user._id}`);
      let data = {};
      var o_id = new ObjectId(req.user._id);
      // let justNews = []

      db.collection("articles_users").findOne( o_id, function(err, result) {
        if (err) throw err;
        data.user = result

        // We now fetch values of the users data that needs to be grabbed from other documents.
        data.user.ordersFetched = [];
        data.user.submissionsFetched = [];
        data.user.subscriptionsFetched = [];

        db.collection("revenues_clothing").find({user_id: req.user._id}).toArray(function(err, result) {
          if (err) throw err;
          // console.log(`Call to /api/getUserDetails done`)
          // console.log(result);
          data.user.ordersFetched = result
          // return res.send(data);

          db.collection("articles_submissions").find({user_id: req.user._id}).toArray(function(err, result) {
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
      var o_id = new ObjectId(req.user._id);

      console.log(myobj);

      if (req.user === undefined || req.user._id === undefined) {
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

  app.post('/api/secure/userSubscriptionUpdates', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(`Call to /api/secure/userSubscriptionUpdates made at ${new Date()}`);
      
      // var o_id = new ObjectId(req.body._id);

      console.log(req.user._id);

      // if ( req.body.user_details === undefined ) {
      //   return res.send("user_details and user are required");
      // }
  
      // db.collection("articles_users").find({_id: req.user._id}, {
      //   $set: {
      //     first_name: myobj.first_name,
      //     last_name: myobj.last_name,
      //     photo_url: myobj.photo_url,
      //     birth_date: new Date (myobj.birth_date),
      //     address: {
      //       city: myobj.address.city,
      //       state: myobj.address.state,
      //       zip: myobj.address.zip,
      //       lat: myobj.address.lat,
      //       lng: myobj.address.lng,
      //     },
      //     gender: myobj.gender,
      //     subscriptions: myobj.subscriptions
      //   }
      // }, function(err, res) {
      //   if (err) {
      //     throw err
      //   };
      // });

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

  app.post('/api/secure/getUsers', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    if (needAdmin(req, res)) {
    
      console.log(`Call to /api/getUsers made here at ${new Date()} by user ${req.user._id}`);
      let data = {};
      
      db.collection("articles_users").find().toArray(function(err, result) {
        if (err) throw err;

        data.users = result
        console.log(`Call to /api/getUsers done`)
        return res.send(data);
      });
    }
    
  });

  app.post('/api/secure/toggleRole', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(req.body)

    needAdmin(req, res);
    
    console.log(`Call to /api/secure/toggleRole made at ${new Date()} on user ${req.body._id} by user ${req.user._id}`);

    if (req.body._id === '5e90cc96579a17440c5d7d52') {
      return res.status(403).send({
        error: 'Good Try',
      })
    }

    var o_id = new ObjectId(req.body._id);

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

  });

  app.post("/api/confirmWithPaymentMethod", async (req, res) => {
    console.log(req.body)

    const stripe = req.app.get('stripe');

    // let customer_id = ''

    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //   customer_id = req.user.stripe.customer_test_id
    // } else {
    //   customer_id = req.user.stripe.customer_id
    // }

    let payload = await stripe.paymentIntents.confirm(
      req.body.paymentIntentID.toString(),
      {payment_method: req.body.payment_method}
    );

    res.send({  
      payload: payload
    });
  });

  app.post("/api/create-payment-intent", async (req, res) => {
    console.log(req.body)

    console.log(req.app.get('mongoConfig').store.enabled)
    if ( !req.app.get('mongoConfig').store.enabled ) {
      console.log("STOP HERE")
      return res.status(403).send('Store is temporally disabled, check back later.');
    }

    const stripe = req.app.get('stripe');

    let customer_id = ''

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      customer_id = req.user.stripe.customer_test_id
    } else {
      customer_id = req.user.stripe.customer_id
    }

    let isPaymentMethodPurchase = false

    if (req.body.payment_method_id !== null) {
      isPaymentMethodPurchase = true
    }

    let payment_method_purchase = (isPaymentMethodPurchase  ? {payment_method: req.body.payment_method_id} : {} );

    console.log(payment_method_purchase)

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: req.body.amount.toFixed(0),
      currency: "usd",

      // TODO - This
      customer: customer_id,
      ...payment_method_purchase,

      metadata: {
        user_id: req.body._id
      },
      description: 'User donation to the site',
    });

    console.log(paymentIntent)

    res.send({  
      clientSecret: paymentIntent.client_secret,
      paymentIntentID: paymentIntent.id
    });
  });

  app.post("/api/setDefaultPaymentMethod", passport.authenticate('jwt', {session: false}), async (req, res) => {

    if (req.body.payment_method_id === null || req.body.payment_method_id === undefined || req.body.payment_method_id === '') {
      res.status('400').send({ error:  'payment_method_id field is required' })
    }

    console.log("Attempting to set a default payment method on customer");

    const stripe = req.app.get('stripe');

    let customer_id = ''

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      customer_id = req.user.stripe.customer_test_id
    } else {
      customer_id = req.user.stripe.customer_id
    }

    let customer;

    try {

      customer = await stripe.customers.update(
        customer_id,
        {
          invoice_settings: {
            default_payment_method: req.body.payment_method_id
          }
        }
      );

      res.send(customer)

    } catch (err) {
      console.log(`⚠️  Error with setting a default payment method on customer.`);
      res.status('400').send({ error:  err  })
      // return res.sendStatus(400);
    }

    

    // console.log()

    // customer.then(
    //   console.log("Success")
    // ).catch(
    //   console.log("Error")
    // )

    // customer.then((response) => {
    //   console.log(response)
    //   console.log(customer)
    //   res.send('removed')
    // }).catch(e => 
    //   res.status('402').send({ error:  e.raw  })
    // )

  });

  app.post("/api/getUserPaymentMethods", passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Getting user payment methods")

    let stripe = '';
    let customer_id = ''

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      customer_id = req.user.stripe.customer_test_id
      stripe = req.app.get('stripe_test');
    } else {
      customer_id = req.user.stripe.customer_id
      stripe = req.app.get('stripe');
    }

    try {
      const paymentMethods = await stripe.paymentMethods.list({
        customer: customer_id,
        type: 'card',
      });

      res.send(paymentMethods);
      } catch (err) {
        console.log('Error')
        console.log(err)
        // next(err);
        // res.err(err);
        return res.status(400).send({
          message: err
       });
      }

    // paymentMethods
    // .then( (empty) => res.send(paymentMethods) )
    // .catch( (e) => res.send(e) )

    // res.send(paymentMethods);

  });

  app.post("/api/removePaymentMethod", passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Removing a users payment method");
    
    let stripe = '';
    // let customer_id = ''

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      // customer_id = req.user.stripe.customer_test_id
      stripe = req.app.get('stripe_test');
    } else {
      // customer_id = req.user.stripe.customer_id
      stripe = req.app.get('stripe');
    }

    const paymentMethod = await stripe.paymentMethods.detach(
      req.body.method_id
    );

    paymentMethod.then(
      res.send('removed')
    ).catch(
      res.send('not removed')
    )

  });

  app.post("/api/createSubscription", passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Attempting to create a subscription");

    const stripe = req.app.get('stripe');

    let customer_id = ''

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      customer_id = req.user.stripe.customer_test_id
    } else {
      customer_id = req.user.stripe.customer_id
    }

    // // Attach the payment method to the customer
    // try {
    //   await stripe.paymentMethods.attach(req.body.paymentMethodId, {
    //     customer: req.body.customerId,
    //   });
    // } catch (error) {
    //   return res.status('402').send({ error: { message: error.message } });
    // }

    // // Change the default invoice settings on the customer to the new payment method
    // await stripe.customers.update(
    // req.body.customerId,
    // {
    //   invoice_settings: {
    //     default_payment_method: req.body.paymentMethodId,
    //   },
    // }
    // );

    try {

      const subscriptions = await stripe.subscriptions.list({
        customer: customer_id,
        limit: 1,
      });

      if (subscriptions.data.length > 0) {

        res.status(400).send({error: 'User may not be subscribed to more then one plan'})

      } else {

        const subscription = await stripe.subscriptions.create({
          customer: customer_id,
          items: [
            { 
              price: 'price_1HSsAyKMwBfw4SyLEQAkf5zm'
            }
          ],
          expand: ['latest_invoice.payment_intent'],
        });

        res.send(subscription)

      }

    } catch (e) {
      
      console.log(e.raw)
      res.status('402').send({ error:  e.raw  });

    }

    // const subscription = await stripe.subscriptions.create({
    //   customer: req.user.stripe.customer_id,
    //   items: [
    //     { 
    //       price: 'price_1HQnYZKMwBfw4SyLXuXkEEEG'
    //     }
    //   ],
    //   expand: ['latest_invoice.payment_intent'],
    // });

    // subscription
    // .then(response => 
    //   res.send(response)
    // )
    // .catch(error => 
    //   res.status('402').send({ error: { message: error} })
    // ) 

  });

  app.post("/api/getStripeCustomer", passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Listing a users subscription");

    console.log('hello'.green); // outputs green text
    console.log(`${app.get('mongoConfig').stripe}`.green); // outputs green text
    console.log(app.get('mongoConfig').stripe); // outputs green text

    let stripe = '';
    let customer_id = ''

    if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
      customer_id = req.user.stripe.customer_test_id
      stripe = req.app.get('stripe_test');
    } else {
      customer_id = req.user.stripe.customer_id
      stripe = req.app.get('stripe');
    }

    const customer = await stripe.customers.retrieve(
      customer_id
    );
  
    res.send(customer);

  });

  app.post("/api/listSubscriptions", passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Listing a users subscription");

    const subscriptions = await stripe.subscriptions.list({
      customer: req.user.stripe.customer_id,
      limit: 3,
    });
  
    res.send(subscriptions);

  });

  app.post("/api/getTotalFromProducts", async (req, res) => {

    console.log(req.body)

    const products = req.body.products;
    // Create a PaymentIntent with the order amount and currency

    const retrivedProducts = []
    let total = 0;

    for (let i = 0; i < products.length; i++) {
      // console.log(products[i]);

      db.collection("articles_products").findOne( {_id: ObjectId(products[i]._id) }, { projection: {title: 1, price: 1} }, function(err, result) {
        console.log(result)
        retrivedProducts[i] = result || {};
        retrivedProducts[i].size = products[i].size;
        retrivedProducts[i].cart_id = products[i].cart_id;
        total = total + result.price || 0
        setTimeout( () => onceDone(), 2000)
      });

      function onceDone() {
        // console.log("Once done called!")

        if (i === products.length - 1) {
          // console.log(i)

          res.send({
            total: parseFloat( 
              (total / 100).toFixed(2) 
            ),
            tax:  parseFloat( 
              ((total / 100 ) * 0.08125 ).toFixed(2)
            ),
            retrivedProducts: retrivedProducts
          });
        }

      }
    
    }

    // const paymentIntent = await stripe.paymentIntents.create({
    //   amount: req.body.amount,
    //   currency: "usd",
    //   // customer: req.body._id,
    //   metadata: {
    //     user_id: req.body._id
    //   },
    //   description: 'User donation to the site',
    // });

    // res.send({
    //   clientSecret: paymentIntent.client_secret
    // });

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

    // console.log(charge)

    // const order = await stripe.orders.retrieve(
    //   req.body.payment.paymentIntent.id
    // );

    db.collection("revenues_donations").updateOne({ _id: ObjectId() }, {
      $set: {
        amount: parseFloat(charge.amount),
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

  app.post("/api/userMadePurchase", passport.authenticate('jwt', {session: false}), async (req, res) => {

    const intent = await stripe.paymentIntents.retrieve(
      req.body.payment.id
    );

    const charges = intent.charges.data;
    const charge = charges[0];

    // console.log(charge)

    // const order = await stripe.orders.retrieve(
    //   req.body.payment.paymentIntent.id
    // );

    db.collection("revenues_clothing").updateOne({ _id: ObjectId() }, {
      $set: {
        for: 'Clothing Store Order',
        user_id: req.user._id,
        date: moment()._d,
        status: 'Awaiting Shipment',
        items: req.body.items,
        payment: {
          type: 'card',
          processFee: parseFloat(0.00),
          processor: 'Stripe',
          total: parseFloat(charge.amount),
          trueTotal: parseFloat(charge.amount)
        }
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
        db.collection("revenues_donations").updateOne({ _id: idClean }, {
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
      db.collection("revenues_donations").updateOne({ _id: idClean }, {
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

  app.post('/api/upsertExpense', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/upsertExpense made at ${new Date()}`);
    const expense = req.body.form;
    const idClean = (req.body.form._id === '' ? ObjectId() : ObjectId(req.body.form._id))

    db.collection("expenses_recurring").updateOne({ _id: idClean }, {
      $set: {
        amount: parseInt(expense.amount),
        date: new Date(expense.date),
        reason: expense.reason,
        file: expense.file,
        note: expense.note,
      }
    },
    {
      upsert: true
    }, 
    function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/upsertExpense done`);
      return res.send(result);
    });
  });

  app.post('/api/deleteUser', passport.authenticate('jwt', {session: false}), (req, res) => {

    if ( needAdmin(req, res) ) {

      if (req.body._id === '5e90cc96579a17440c5d7d52') {

        db.collection("articles_users").updateOne({_id: ObjectId(req.user._id)}, {
          $set: {
            'roles.isAdmin': false
          }
        }, function(err, res) {
          if (err) {
            throw err
          };
    
        });
  
        return res.status(403).send({
          error: 'Good Try, if this was done on accident now contact Joey because you lost your admin roles...',
        })
      }
  
      console.log(`Call to /api/deleteUser made at ${new Date()}`);
  
      db.collection("articles_users").deleteOne({_id:  ObjectId(req.body._id)}, function(err, res) {
        if (err) throw err;
        console.log(`Call to /api/deleteUser done`);
      });
  
      return res.end();
    }
    
  });

  app.post('/api/deleteProduct', passport.authenticate('jwt', {session: false}), (req, res) => {

    needAdmin(req, res);

    console.log(`Call to /api/deleteProduct made at ${new Date()}`);

    db.collection("articles_products").deleteOne({_id:  ObjectId(req.body._id)}, function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteProduct done`);
    });

    return res.end();

  });

  app.post('/api/deleteDonation', passport.authenticate('jwt', {session: false}), (req, res) => {

    needAdmin(req, res);

    console.log(`Call to /api/deleteDonation made at ${new Date()}`);

    // const donation = req.body.donation;
    // const idClean = (req.body._id === '' ? null : ObjectId(req.body._id))

    db.collection("revenues_donations").deleteOne({_id:  ObjectId(req.body._id)}, function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteDonation done`);
    });

    return res.end();

  });

  app.post('/api/deleteOrder', passport.authenticate('jwt', {session: false}), (req, res) => {

    needAdmin(req, res);

    console.log(`Call to /api/deleteOrder made at ${new Date()}`);

    // TODO - Fetch order that is being deleted and send it somewhere for archive in case someone means harm

    db.collection("revenues_clothing").deleteOne({_id:  ObjectId(req.body._id)}, function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteOrder done`);
    });

    return res.end();

  });

  app.post('/api/deleteExpense', passport.authenticate('jwt', {session: false}), (req, res) => {

    needAdmin(req, res);

    console.log(`Call to /api/deleteExpense made at ${new Date()}`);

    // TODO - Fetch order that is being deleted and send it somewhere for archive in case someone means harm

    db.collection("expenses_recurring").deleteOne({_id:  ObjectId(req.body._id)}, function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteExpense done`);
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
              "up": req.user._id,
              "down": req.user._id
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
              "down": req.user._id
            },
            $push: {
              "up": req.user._id
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
              "up": req.user._id,
            },
            $push: {
              "down": req.user._id
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

    console.log(req.user._id);
  
    db.collection("revenues_donations").find({createdBy: `${req.user._id}`}).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getUserDonations done`);
      return res.send(result) 
    });

  });

  app.post('/api/getUserOrders', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/getUserOrders made at ${new Date()}`);

    // if (req.body._id === '' || req.body._id === undefined) {
    //   // return res.err('{_id: "user_id"} Needed to get orders.') 
    //   return res.status(400).send({
    //     // route: '/api/getUserOrders',
    //     error: '{_id: "user_id"} Needed to get orders',
    //  });
    // }
  
    db.collection("revenues_clothing").find({user_id: `${req.user._id}`}).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getUserOrders done`);
      return res.send(result) 
    });

  });

  app.post('/api/getUserMessages', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log(`Call to /api/getUserMessages made at ${new Date()}`);

    db.collection("articles_messages").find( { users: { $in: [`${req.user._id}`] } } ).toArray(function(err, result) {
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
            
            fetchedUsers.push({id: user, name: fetchedName});
            fetchedName = ''
          });
        })

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

  });

  app.post('/api/upsertExpenseReport', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(`Call to /api/upsertExpenseReport made at ${new Date()}`);

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
        user_id: req.user._id.toString(),
        expense_id: report.expense_id,
        reason: report.reason
      }
    },
    {
      upsert: true
    }, 
    function(err, response) {
      if (err) throw err;
      console.log(`Call to /api/upsertExpenseReport done`);
      // return res.send(response);

      db.collection("articles_users").updateOne({_id: ObjectId(req.user._id)}, {
        $set: {
          last_report: moment()._d
        }
      },
      function(err, responseLater) {
        if (err) throw err;
        console.log(`Update to user last_report done`);
        // return res.send(response);
        return res.send(response);
      });

    });

  });
  
  app.post('/api/deleteExpenseReport', (req, res) => {

    needAdmin(req, res);

    console.log(`/api/deleteExpenseReport ${new Date()}`);

    db.collection("articles_expense_reports").deleteOne({_id: ObjectId(req.body._id)}, 
    function(err, res) {
      if (err) throw err;
      console.log(`Call to /api/deleteExpenseReport done`);
    });

    return res.end();

  });

  app.post('/api/socketTest', passport.authenticate('jwt', {session: false}), (req, res) => {
    var io = req.app.get('socketio');
    return res.send('Socket Test');
  });

  app.post('/api/addSavedProduct', function (req, res) {
    console.log(`Call to /api/updateLastRead made at ${new Date()}`);

    const o_id = new ObjectId(req.user._id);

    function orginResult() { 

      return db.collection("articles_users").updateOne(
        {
            _id: o_id
        },
        {
            $addToSet: {
              "saved_products": {
                    product_id: req.body.product_id,
                    date: new Date()
                }
            }
        }
      );

    }

    orginResult().then( (result) =>  { 
     console.log(result.modifiedCount) 

     if ( result.modifiedCount < 1 ) {

      return res.send("Products was already found in saved products");

    } else {

      return res.send("Product added to users saved products")

    }

    })
    .catch(
      (result) =>  {
        console.log(result)
      }
    );

  });

  app.post('/api/removeSavedProduct', (req, res) => {
    console.log(`Call to /api/removeSavedProduct made at ${new Date()}`);

    let report = req.body.report;

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
      console.log(`Call to /api/removeSavedProduct done`);
    });

    return res.end();

  });

  async function addCustomer(req, email, _id) {

    const stripe = req.app.get('stripe');

    const customer = await stripe.customers.create({
      email: email,
      description: `Customer for the Articles MongoDB user ${_id}`,
      phone: ''
    });
  
    // console.log("Customer")
    return(customer)
  }

  app.post('/api/createCustomer', passport.authenticate('jwt', {session: false}), (req, res) => {
    console.log(`Call to /api/createCustomer made at ${new Date()} for user ${req.body._id}`);

    const o_id = new ObjectId(req.body._id);

    // TODO - Add logic to let this be called from prod and dev, not sure if I can have two stripe instances being done at once.

    User.findById(req.body._id)
    .then(user => {
      if (user) {

        console.log(user)
        console.log(user.stripe.customer_id)

        if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
          // Dev
          if (!user.stripe.customer_test_id) {
            console.log("Is not customer yet in Stripe");
      
            addCustomer(req, user.email, req.body._id)
            .then(response => {
              console.log(response)
      
              db.collection("articles_users").updateOne(
                {
                    _id: o_id
                },
                {
                  $set: {
                    "stripe.customer_test_id": response.id
                  }
                },
                {
                  upsert: true
                }
              );
      
            })
            // .catch(err => res.status(400).send({error: 'User may not be subscribed to more then one plan', stripeError: err}))
      
          } else {
            return res.send(`Is already a customer ${user.stripe.customer_test_id}`);
          }
        } else {
          // Prod
          if (!user.stripe.customer_id) {
            console.log("Is not customer yet in Stripe");
      
            addCustomer(req, user.email, req.body._id)
            .then(response => {
              console.log(response)
      
              db.collection("articles_users").updateOne(
                {
                    _id: o_id
                },
                {
                  $set: {
                    "stripe.customer_id": response.id
                  }
                },
                {
                  upsert: true
                }
              );
      
            })
            // .catch(err => res.status(400).send({error: 'User may not be subscribed to more then one plan', stripeError: err}))
      
          } else {
            return res.send(`Is already a customer ${user.stripe.customer_id}`);
          }
        }

      }
      console.log("Can not find user with");
    })
    .catch(err => console.log(err));

  })

  app.post('/api/getCanSubmit', passport.authenticate('jwt', {session: false}), (req, res) => {

    console.log("Call to /api/getCanSubmit at " + new Date());

    db.collection("articles_submissions").find({user_id: req.user._id})
    .toArray(function(err, result) {
      if (err) throw err;
      return res.send(result);
    });
    
  });

  app.post("/api/getReach", passport.authenticate('jwt', {session: false}), async (req, res) => {
    console.log("Getting reach of provided ad");
    console.log(req.body)
    console.log('All people less then this date ' + moment().subtract(req.body.ageFilters.above.age, 'years').format("LLL") )

    let ageRange, ageAbove, ageBelow = {}
    let zipList, zipNearby, zipAround = {}

    if (req.body.ageFilters.range.active) {
      ageRange = {birth_date: {$lte: new Date( moment().subtract( req.body.ageFilters.above.age, 'years') ) } }
    }
    
    if (req.body.ageFilters.above.active) {
      ageAbove = {birth_date: {$lte: new Date( moment().subtract( req.body.ageFilters.above.age, 'years') ) } }
    }

    if (req.body.ageFilters.below.active) {
      ageBelow = {birth_date: {$gte: new Date( moment().subtract( req.body.ageFilters.below.age, 'years') ) } }
    }

    if (req.body.zipFilters.list.active) {
      zipList = {"address.zip": req.body.zipFilters.list.zip }
    }
    
    if (req.body.zipFilters.nearby.active) {
      zipNearby = {"address.zip": req.body.zipFilters.nearby.zip }
    }

    if (req.body.zipFilters.around.active) {
      zipNearby = {"address.zip": req.body.zipFilters.around.zip }
    }

    db.collection("articles_users").find(
      {...ageRange, ...ageAbove, ...ageBelow, ...zipList, ...zipNearby, ...zipAround}
    ).toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getUserDonations done`);
      return res.send(result) 
    });
  
  });

  app.post("/api/secure/getAdPopulation", passport.authenticate('jwt', {session: false}), async (req, res) => {

    const users = await db.collection("articles_users").find( {}, { projection: { 'address.zip': 1 } } ).toArray();

    let processed_users = []

    users.map( (user, i) => {

      if (  processed_users.findIndex( obj => obj.zip === user.address.zip ) === -1  ) {
        // console.log('not')

        // console.log(user.address.zip)

        // Do not process users with no address zip information
        if (user.address.zip !== undefined && user.address.zip !== null) {
          processed_users.push({
            zip: user.address.zip,
            amount: 1
          })
        }

      } else {
        const index = processed_users.findIndex( obj => obj.zip === user.address.zip )
        console.log(index)
        processed_users[index].amount = processed_users[index].amount + 1

      }

    } )

    processArray();

    async function processArray() {
      const output = []
      
      // Keep this around a little bit
      // const promises = users.map( async(item, i) => {

      //   const it = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
      //     params: {
      //       address: item.address.zip,
      //       key: process.env.GOOGLE_MAPS_KEY
      //     }
      //   })
      //   .then(function (response) {
      //     console.log(response.data.results[0].geometry.location)
      //     return response.data.results[0]
      //   })
      //   .catch(function (error) {
      //     return error
      //   });

      //   item = {...it.geometry.location}
      //   item.name = it.address_components[1].short_name
      //   item.zip = users[i].address.zip
      //   item.amount = 1
      //   output.push(item)
      // })

      console.log(processed_users)

      const promises = processed_users.map( async(item, i) => {

        const it = await axios.get('https://maps.googleapis.com/maps/api/geocode/json', {
          params: {
            address: item.zip,
            key: process.env.GOOGLE_MAPS_KEY
          }
        })
        .then(function (response) {
          console.log(response.data.results[0].geometry.location)
          return response.data.results[0]
        })
        .catch(function (error) {
          return error
        });

        item = {...it.geometry.location}
        item.name = it.address_components[1].short_name
        item.zip = processed_users[i].zip
        item.amount = processed_users[i].amount
        output.push(item)
      })

      await Promise.all(promises)
      return res.json({ data: output })
    }

  })

  // Clean ones up here!
  require('./routes/aws/index')(app, db, passport);

  require('./routes/config/setStripeMode')(app, db, passport);
  require('./routes/config/setConfig')(app, db, passport);

  require('./routes/projects/getProjects')(app, db, passport);
  require('./routes/projects/getProject')(app, db, passport);

  // ----------------------------------------------------------

  // TODO - Sort these outs to be better organized 
  require('./routes/donation/addDonation')(app, db, passport);
  require('./routes/donation/deleteDonation')(app, db, passport);

  require('./routes/expenses/upsertExpense')(app, db, passport);
  require('./routes/expenses/deleteExpense')(app, db, passport);

  require('./routes/updateLastRead')(app, db, passport);
  require('./routes/outsetUpdate')(app, db, passport);
  require('./routes/addProfilePhoto')(app, db, passport);

  require('./routes/respondReport')(app, db, passport);
  require('./routes/deleteReport')(app, db, passport);
  
  require('./routes/addSubscription')(app, db, passport);
  require('./routes/removeSubscription')(app, db, passport);

  require('./routes/upsertComment')(app, db, passport);

  require('./routes/adminComments')(app, db, passport);
  require('./routes/adminAds')(app, db, passport);
  require('./routes/adminGetUser')(app, db, passport);

  // Gets how many people a user has refereed
  require('./routes/getUserReferrals')(app, db, passport);

  // Proposal Related
  require('./routes/upsertProposal')(app, db, passport);
  require('./routes/deleteProposal')(app, db, passport);

  require('./routes/zipToTown')(app, db, passport);

  require('./routes/requestUserData')(app, db, passport);

  // require('./routes/sendVerificationEmail')(app, db, passport);

  require('./routes/progressNeedsShipping')(app, db, passport);
  require('./routes/progressShipped')(app, db, passport);

  require('./routes/chatMessage')(app, db, passport);
  require('./routes/startChat')(app, db, passport);
  require('./routes/deleteChatMessage')(app, db, passport);
  require('./routes/deleteChatConversation')(app, db, passport);

  require('./routes/logUserOnline')(app, db, passport);

  require('./routes/addPresident')(app, db, passport);

  require('./routes/getNewsletterList')(app, db, passport);
} 