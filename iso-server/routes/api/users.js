const express = require("express");
// const router = express.Router();
const app = express();

const bcrypt = require("bcryptjs");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const jwt = require("jsonwebtoken");

const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

const axios = require('axios')

const {sendEmail} = require('../../utils/index');
// const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");
const Token = require('../../models/Token');

function sendNewUserMessage(user) {
  axios.post(process.env.DISCORD_HOOK, {
      username: "Articles Hook",
      avatar_url: "https://cdn.articles.media/email/logo.jpg",
      content: `A new user ${user.email} - ${user.first_name} has signed up!`
    },
    {
      'Content-type': 'application/json'
    }
  )
  .then(function (response) {
    // console.log(JSON.stringify(response.data))
    // console.log(response)
  })
  .catch(function (error) {
    // console.log(JSON.stringify(error))
    // console.log(error);
  });
}

// @route POST api/users/register
// @desc Register user
// @access Public

// router.post("/register", (req, res) => {
app.post("/register", async (req, res) => {

  // Log that we got request
  console.log("Called a register user");

  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  console.log("Request was valid!");
  console.log(req.body.email);
  console.log("New user referral through " + req.body.referral)
  
  User.findOne({ email: req.body.email }).then(user => {

    console.log("Something?");

    if (user) {

      console.log("Was user");
      return res.status(400).json({ email: "Email already exists" });

    } else {

      console.log("Was not user");

      const newUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        email: req.body.email,
        password: req.body.password,
        referral: req.body.referral 
      });

      const msg = {
        to: req.body.email,
        from: {
          email: "joey@articles.media",
          name: "Articles"
        },
        subject: 'Welcome to Articles!',
        text: 'Thank you for signing up!',
        html: `
        <strong>Hello ${req.body.first_name},</strong>
        <br>
        <p>Thank you for taking the time to sign up and become apart of what we are building. This is an automated email but you can respond to reach out to me with any questions or concerns you may have. Feel free to respond to this email or start send one to joey@articles.media, I just ask that you read the frequently asked questions <a href="https://articles.media">here</a> before sending anything to help cut down on repeat questions.</p>
        `,
      };

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then( async (user) => {

              // res.json(user)

              await sendVerificationEmail(user, req, res);

              sendNewUserMessage(user)

              // sgMail
              // .send(msg)
              // .then(() => {}, error => {
              //   console.error(error);

              //   if (error.response) {
              //     console.error(error.response.body)
              //   }
              // });

              console.log(user._id)
              console.log(user.email)

              addCustomer(user.email, user._id)
              .then(async response => {
                // console.log(response)

                const filter = { _id: user._id };
                const update = { stripe: { customer_id: response.id } };

                let test = await User.findOneAndUpdate(filter, update, {
                  returnOriginal: false,
                  strict: false,
                  useFindAndModify: false
                });

                console.log(test)
        
              })

              async function addCustomer(email, _id) {
                const customer = await stripe.customers.create({
                  email: email,
                  description: `Customer for the Articles MongoDB user ${_id}`,
                  phone: ''
                });
              
                return(customer)
              }

            })
            .catch(err => console.log(err));
        });
      });

    }
  });

});

// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
// router.post("/login", (req, res) => {
app.post("/login", (req, res) => {
  console.log("Login attempt");

  // Form validation
  const { errors, isValid } = validateLoginInput(req.body);
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  const email = req.body.email;
  const password = req.body.password;
  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }
    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };
        // Sign token
        jwt.sign(
          payload,
          process.env.PASSPORT_SECRET,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

// ===EMAIL VERIFICATION
// @route GET api/verify/:token
// @desc Verify token
// @access Public
app.get("/verify", async (req, res) => {

  console.log("Verify called")
  console.log(req.query.token)

  if(!req.query.token) return res.status(400).json({message: "We were unable to find a user for this token."});

  try {
      // Find a matching token
      const token = await Token.findOne({ token: req.query.token });

      if (!token) return res.status(400).json({ message: 'We were unable to find a valid token. Your token my have expired.' });

      // If we found a token, find a matching user
      User.findOne({ _id: token.userId }, (err, user) => {
          if (!user) return res.status(400).json({ message: 'We were unable to find a user for this token.' });

          if (user.isVerified) return res.status(400).json({ message: 'This user has already been verified.' });

          // Verify and save the user
          user.isVerified = true;
          user.save(function (err) {
              if (err) return res.status(500).json({message:err.message});

              res.status(200).send("The account has been verified. Please log in.");
          });
      });
  } catch (error) {
      res.status(500).json({message: error.message})
  }

});

// @route POST api/resend
// @desc Resend Verification Token
// @access Public
app.post("/resendToken", async (req, res) => {

  console.log("Resend Verify called")

  try {
    const { email } = req.body;

    const user = await User.findOne({ email });

    if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

    if (user.isVerified) return res.status(400).json({ message: 'This account has already been verified. Please log in.'});

    await sendVerificationEmail(user, req, res);
} catch (error) {
    res.status(500).json({message: error.message})
}

});

async function sendVerificationEmail(user, req, res){
  try{
      const token = user.generateVerificationToken();

      // Save the verification token
      await token.save();

      let subject = "Account Verification Token";
      let to = user.email;
      let from = {
        email: "no-reply@articles.media",
        name: "Articles Media"
      };
      let link="http://"+req.headers.host+"/verify-email?token="+token.token;

      let htmlOld = `
      <img width="100" height="100" src="https://cdn.articles.media/email/logo.jpg"></img>
      <br>
      <strong>Hello ${user.first_name},</strong>
      <br>
      <p>Thank you for taking the time to sign up and become apart of what we are building, for verification purposes please click on the following <a href="${link}">link</a> to verify your account.</p> 
      <br>
      <p>If you did not request this, please ignore this email.</p>`;

      let html = `
      <style>
        *  {
            font-family: montserrat, sans-serif;
            color: black;
          }
      </style>

      <link href="https://fonts.googleapis.com/css?family=Montserrat" rel="stylesheet" type="text/css">
      <link rel="stylesheet" href="https://use.typekit.net/wvo0uze.css">

      <div style="max-width: 600px;">

        <div style="background-color: black; padding: 0.5rem">
          <img width="100" height="100" src="https://cdn.articles.media/email/logo.jpg"></img>  
        </div>

        <br>

        <strong style="font-family: brandon-grotesque, sans-serif; font-weight: 900; font-size: 2rem; color: black;">Hello ${user.first_name},</strong>

        <br>

        <p style="color: black;">Thank you for taking the time to sign up and become apart of what we are building, for verification purposes please click on the following <a href="${link}">link</a> to verify your account.</p> 

        <br>

        <p>If you did not request this, please ignore this email.</p>
      </div>
      `;

      await sendEmail({to, from, subject, html});

      res.status(200).json({message: 'A verification email has been sent to ' + user.email + '.'});
  }catch (error) {
    console.log(error)
    res.status(500).json({message: error.message, bulk: error})
  }
}

module.exports = app;