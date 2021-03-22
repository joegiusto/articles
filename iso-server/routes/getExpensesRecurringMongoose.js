const mongoose = require("mongoose");
const ExpenseRecurring = require("../models/ExpenseRecurring");

module.exports = (app, db) => {
  app.get('/api/getExpenseRecurringMongoose', async function (req, res) {

    const result = await ExpenseRecurring.find({});

    res.send(result);

  });

}