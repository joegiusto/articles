const mongoose = require("mongoose");
const ExpenseInventory = require("../models/ExpenseInventory");

module.exports = (app, db) => {
  app.get('/api/getExpenseInventoryMongoose', async function (req, res) {

    const result = await ExpenseInventory.find({});

    res.send(result);

  });

}