const mongoose = require("mongoose");
const moment = require("moment");
const Schema = mongoose.Schema;
const User = require("./User");
const ObjectId = mongoose.Schema.Types.ObjectId;

// Create Schema
const CommentSchema = new Schema({

    // date: {
    //     type: Date,
    //     required: true,
    // },

    comments: [{

        user_id: {
            type: mongoose.Schema.Types.ObjectId,
            required: true,
            ref: User
        },

    }],

});

var Comment = mongoose.models.comments || mongoose.model("comments", CommentSchema, 'articles_news');
module.exports = Comment;