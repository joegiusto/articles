const mongoose = require("mongoose");
const RevenueOrders = require("../models/RevenueOrders");

module.exports = (app, db) => {
  app.get('/api/getRevenueOrdersMongoose', async function (req, res) {

    const result = await RevenueOrders.find({}).populate('user_id', 'first_name last_name')

    res.send(result);

  });

}