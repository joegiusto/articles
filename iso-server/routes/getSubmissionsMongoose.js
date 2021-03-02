const mongoose = require("mongoose");
const Submission = require("../models/Submission");

module.exports = (app, db) => {
  app.get('/api/getSubmissionsMongoose', async function (req, res) {

    const result = await Submission.find({}).populate('user_id', 'first_name last_name address.state')

    res.send(result);

  });

}