const { ObjectID } = require('bson');
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const recurringSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    reason: {
        type: String,
        required: true,
    },

    amount: {
        type: Number,
        required: true,
    },

    department: {
        type: String,
        required: true,
    },

    file: {
        type: String,
        required: true,
    },

    note: {
        type: String,
        required: true,
    },

}, {timestamps: true});

var Token = mongoose.models.recurring || mongoose.model('recurring', recurringSchema, 'expenses_recurring');
module.exports = (Token);