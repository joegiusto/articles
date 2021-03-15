const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const revenueSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    user_id: {
        type: String,
        ref: User
    },

}, {timestamps: true});

var Token = mongoose.model('revenueOrders', revenueSchema, 'revenue_orders');
module.exports = (Token);