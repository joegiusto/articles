const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const User = require("./User");

const newsSchema = new Schema({

    date: {
        type: Date,
        required: true,
    },

    comments: {
        user_id: {
            type: String,
            ref: User
        },
    },

}, {timestamps: true});

var Token = mongoose.models.news || mongoose.model('news', newsSchema, 'articles_news');
module.exports = (Token);