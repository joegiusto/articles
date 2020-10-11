const password = require('./api/password');

module.exports = app => {
  // app.get('/', (req, res) => {
  //     res.status(200).send({ message: "Welcome to the AUTHENTICATION API. Register or Login to test Authentication."});
  // });

  app.use('/password', password);
  // app.use('/api/user', authenticate, user);
};