const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const submissionSchema = new Schema({

    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: User
    },

}, {timestamps: true});

var Token = mongoose.models.submissions || mongoose.model('submissions', submissionSchema, 'articles_submissions');
module.exports = (Token);