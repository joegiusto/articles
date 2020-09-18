const express = require("express");
// const router = express.Router();
const app = express();

const bcrypt = require("bcryptjs");

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

const jwt = require("jsonwebtoken");
// const keys = require("../../config/keys");

// Load input validation
const validateRegisterInput = require("../../validation/register");
const validateLoginInput = require("../../validation/login");

// Load User model
const User = require("../../models/User");

// @route POST api/users/register
// @desc Register user
// @access Public

// router.post("/register", (req, res) => {
app.post("/register", (req, res) => {

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
            .then(user => {

              res.json(user)

              sgMail
                .send(msg)
                .then(() => {}, error => {
                  console.error(error);
              
                  if (error.response) {
                    console.error(error.response.body)
                  }
                });
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

module.exports = app;