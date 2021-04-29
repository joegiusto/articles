const mongoose = require("mongoose");
const moment = require("moment");
// const crypto = require('crypto');
// const Token = require('../models/Token');
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
    type: Date,
    default: moment()
  },
  isVerified: {
    type: Boolean,
    default: false
  },
  address: {
    lineOne: {
      type: String,
      default: ""
    },
    lineTwo: {
      type: String,
      default: ""
    },
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
    },
    employee: {
      bool: {
        type: Boolean,
        default: false
      },
      privacy: {
        type: Boolean,
        default: false
      }
    }
  },
  referral: {
    type: String,
    default: ''
  },
  stripe: {
    type: Object,
    default: {
      customer_id: '',
      customer_test_id: ''
    }
  },
  resetPasswordToken: {
    type: String,
    required: false
  },
  resetPasswordExpires: {
    type: Date,
    required: false
  }
});

// UserSchema.methods.generatePasswordReset = function() {
//   console.log("generatePasswordReset called");
//   this.resetPasswordToken = crypto.randomBytes(20).toString('hex');
//   this.resetPasswordExpires = Date.now() + 3600000; //expires in an hour
// };

// UserSchema.methods.generateVerificationToken = function() {
//   let payload = {
//       userId: this._id,
//       token: crypto.randomBytes(20).toString('hex')
//   };

//   return new Token(payload);
// };

var User = mongoose.models.users || mongoose.model("users", UserSchema, 'articles_users');
module.exports = User;