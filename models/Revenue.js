const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const revenueSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: User
    },

    amount: {
        type: Number,
        required: true,
    },

    user_id: {
        type: String,
        ref: User
    },

    message: {
        type: String,
        required: true,
    },

}, {timestamps: true});

var Token = mongoose.models.revenues || mongoose.model('revenues', revenueSchema, 'revenues_donations');
module.exports = (Token);