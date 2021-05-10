const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const donationsSchema = new Schema({

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

var Token = mongoose.models.donations || mongoose.model('donations', donationsSchema, 'revenues_donations');
module.exports = (Token);