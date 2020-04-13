const express = require("express");
// const router = express.Router();
const app = express();
const bcrypt = require("bcryptjs");
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
  
  User.findOne({ email: req.body.email }).then(user => {

    console.log("Something?");

    if (user) {

      console.log("Was user");
      return res.status(400).json({ email: "Email already exists" });

    } else {

      console.log("Was not user");

      const newUser = new User({
        first_name: req.body.first_name,
        email: req.body.email,
        password: req.body.password
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
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