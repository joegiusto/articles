const mongoose = require('mongoose');
const User = mongoose.model('users');
const express = require("express");
const bcrypt = require("bcryptjs");
const moment = require ('moment');
const app = express();
const {sendEmail} = require('../../utils/index');

// @route POST api/auth/recover
// @desc Recover Password - Generates token and Sends password reset email
// @access Public
exports.recover = async (req, res) => {
  try {
      const { email } = req.body;

      console.log(req.body)

      const user = await User.findOne({ email });

      if (!user) return res.status(401).json({ message: 'The email address ' + req.body.email + ' is not associated with any account. Double-check your email address and try again.'});

      //Generate and set password reset token
      user.generatePasswordReset();

      // Save the updated user object
      await user.save();

      // send email
      let subject = "Password change request";
      let to = user.email;
      let from = {
        email: "no-reply@articles.media",
        name: "Articles Media"
      };
      let link = "http://" + req.headers.host + "/password-reset?token="+user.resetPasswordToken;
      let html = `<p>Hi ${user.first_name}</p>
                  <p>Please click on the following <a href="${link}">link</a> to reset your password.</p> 
                  <p>If you did not request this, please ignore this email and your password will remain unchanged.</p>`;

      await sendEmail({to, from, subject, html});

      res.status(200).json({message: 'A reset email has been sent to ' + user.email + '.'});
  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

// @route POST api/auth/reset
// @desc Reset Password - Validate password reset token and shows the password reset view
// @access Public
exports.reset = async (req, res) => {
  try {
      const { token } = req.body;

      const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

      if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

      // Let client know call was a success
      res.end();
  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

// @route POST api/auth/reset
// @desc Reset Password
// @access Public
exports.resetPassword = async (req, res) => {
  try {
      const { token, newPassword } = req.body;

      const user = await User.findOne({resetPasswordToken: token, resetPasswordExpires: {$gt: Date.now()}});

      if (!user) return res.status(401).json({message: 'Password reset token is invalid or has expired.'});

      bcrypt.genSalt(10, (err, salt) => {

        bcrypt.hash(newPassword, salt, (err, hash) => {
          if (err) throw err;

          user.password = hash;
          user.resetPasswordToken = undefined;
          user.resetPasswordExpires = undefined;
          user.password_last_change = moment()._d;

          user.save().then( async (user) => {

            let subject = "Your password has been changed";
            let to = user.email;
            let from = process.env.FROM_EMAIL;
            let html = `<p>Hi ${user.first_name}</p>
                        <p>This is a confirmation that the password for your account ${user.email} has just been changed.</p>`

            await sendEmail({to, from, subject, html});

            res.status(200).json({message: 'Your password has been updated.'});

          })

        });
      }); 

  } catch (error) {
      res.status(500).json({message: error.message})
  }
};

// module.exports = app;