var ObjectId = require('mongodb').ObjectId; 
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    if (req.method === 'POST') {
        // console.log("Was a post")
        // console.log(req.body.user_id)
        // Process a POST request
        const result = await db
        .collection("articles_products")
        .findOne({ _id: ObjectId(req.body.product_id) })

        console.log(result)
        

        res.send({document: result});
    } else {
        // Handle any other HTTP method
        const result = await db
        .collection("revenue_orders")
        .find()
        .toArray();

        res.json(result);
    }
    
};