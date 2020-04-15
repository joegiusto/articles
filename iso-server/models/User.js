const mongoose = require("mongoose");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  sign_up_date: {
    type: Date,
    default: Date.now
  }
});

var User = mongoose.model("users", UserSchema, 'articles_users');
module.exports = User;