const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;

// Create Schema
const UserSchema = new Schema({
  first_name: {
    type: String,
    required: true
  },
  last_name: {
    type: String,
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
    type: Number,
    default: moment().unix()
  },
  address: {
    zip: {
      type: Number,
      default: ""
    },
    city: {
      type: String,
      default: ""
    },
    state: {
      type: String,
      default: ""
    }
  },
  roles: {
    isDev: {
      type: Boolean,
      default: false
    },
    isAdmin: {
      type: Boolean,
      default: false
    },
    isWriter: {
      type: Boolean,
      default: false
    }
  }
});

var User = mongoose.model("users", UserSchema, 'articles_users');
module.exports = User;