var ObjectId = require('mongodb').ObjectId; 
import { connectToDatabase } from "util/mongodb";

import connectDB from 'util/mongoose';
import Submission from "models/Submission";

export default connectDB(async (req, res) => {
    const { db } = await connectToDatabase();

    if (req.method === 'POST') {
        
        // console.log("Was a post")
        // console.log(req.body.user_id)
        // Process a POST request
        const result = await db
        .collection("articles_submissions")
        .findOne({ _id: ObjectId(req.body.product_id) })

        console.log(result)

        res.send({document: result});

    } else {

        // Handle any other HTTP method
        // const result = await db
        // .collection("articles_submissions")
        // .find()
        // .toArray();

        // res.json({submissions: result});

        const result = await Submission.find({}).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
        res.json({submissions: result});
        // res.send(result);

    }
    
});