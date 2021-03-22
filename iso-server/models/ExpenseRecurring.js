const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const expenseSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    // user_id: {
    //     type: String,
    //     ref: User
    // },

}, {timestamps: true});

var Token = mongoose.model('expenseRecurring', expenseSchema, 'expenses_recurring');
module.exports = (Token);