const mongoose = require('mongoose');
const User = mongoose.model('users');

module.exports = (app, db, passport) => {
  app.post('/api/secure/requestUserData', passport.authenticate('jwt', {session: false}), (req, res, next) => {

    User.findById(req.user._id)
    .then(user => {
      res.send(user);
    })
    .catch(err => console.log(err));

  });
}