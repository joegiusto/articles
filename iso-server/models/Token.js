const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const tokenSchema = new Schema({
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },

    token: {
      type: String,
      required: true
    },

    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      expires: 43200
    }

}, {timestamps: true});

var Token = mongoose.model('tokens', tokenSchema, 'user_tokens');
module.exports = (Token);