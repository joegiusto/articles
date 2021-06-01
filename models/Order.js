const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const orderSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    user_id: {
        type: String,
        ref: User
    },

    type: {
        type: String,
        required: true,
    },

}, {timestamps: true});

var Token = mongoose.models.orders || mongoose.model('orders', orderSchema, 'revenue_orders');
module.exports = (Token);