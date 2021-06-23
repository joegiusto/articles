var ObjectId = require('mongodb').ObjectId;
const moment = require('moment');
import { connectToDatabase } from "util/mongodb";

/* eslint import/no-anonymous-default-export: [2, {"allowArrowFunction": true}] */
export default async (req, res) => {
    const { db } = await connectToDatabase();

    console.log(`Call to /api/outsetUpdate made at ${new Date()}`);
    const o_id = new ObjectId(req.user._id);
    var outset = req.body.outsetState;
    var correctDate = moment(outset.age).toISOString();

    var correctSubscriptions = outset.subscriptions.map(subscription => {
        return {
          news_id: subscription
        }
    });

    console.log(correctSubscriptions);
    console.log(outset);
    
};