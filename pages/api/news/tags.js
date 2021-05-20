var ObjectId = require('mongodb').ObjectId; 
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    if (req.method === 'POST') {
        console.log("Why are you posting to tags?")
        res.send("Why are you posting to tags?");
        // console.log(req.body.user_id)
        // // Process a POST request
        // const result = await db
        // .collection("articles_news")
        // .findOne({ _id: ObjectId(req.body.news_id) })

        // console.log(result)
        

        // res.send({document: result});
    } else {
        // Handle any other HTTP method
        const result = await db
        .collection("articles_tags")
        .find()
        .toArray();

        res.json({
            tags: result
        });
    }
    
};