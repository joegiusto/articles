const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const expensesSchema = new Schema({

    // user_id: {
    //     type: String,
    //     ref: User
    // },

    // createdBy: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     required: true,
    //     ref: User
    // },

    date: {
        type: Date,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    file: {
        type: String,
        default: '',
    },

    note: {
        type: String,
        required: true,
    },

}, {timestamps: true});

var Token = mongoose.model('expenses', expensesSchema, 'expenses_recurring');
module.exports = (Token);