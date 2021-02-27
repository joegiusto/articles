const mongoose = require("mongoose");
const Revenue = require("../models/Revenue");

module.exports = (app, db) => {
  app.get('/api/getRevenueMongoose', async function (req, res) {

    const result = await Revenue.find({}).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')

    res.send(result);

  });

}