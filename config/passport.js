const JwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;
const mongoose = require("mongoose");
const User = mongoose.model("users");
// const keys = require("../config/keys");

const opts = {};
opts.jwtFromRequest = ExtractJwt.fromAuthHeaderAsBearerToken();
opts.secretOrKey = process.env.PASSPORT_SECRET;

module.exports = passport => {

  passport.use(
    new JwtStrategy(opts, (jwt_payload, done) => {
      User.findById(jwt_payload.id)
        .then(user => {
          if (user) {
            return done(null, user);
          }
          return done(null, false);
        })
        .catch(err => console.log(err));
    })
  );

    //This verifies that the token sent by the user is valid
    // passport.use(
    //   new JwtStrategy({

    //   //secret we used to sign our JWT
    //   secretOrKey : opts.secretOrKey,

    //   //we expect the user to send the token as a query parameter with the name 'secret_token'
    //   jwtFromRequest : opts.jwtFromRequest

    // }, async (token, done) => {

    //   try {

    //     //Pass the user details to the next middleware
    //     return done(null, token.user);

    //   } catch (error) {

    //     done(error);
    //   }
    // }));
};