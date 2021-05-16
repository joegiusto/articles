var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'

// import { connectToDatabase } from "util/mongodb";
import connectDB from 'util/mongoose';
import Order from "models/Order";

export default connectDB(async (req, res) => {
    const session = await getSession({ req })
    // const { db } = await connectToDatabase();

    if ( session?.user?.email != "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to do that',
        })
    }

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
        // const result = await db
        // .collection("revenue_orders")
        // .find()
        // .toArray();

        const result = await Order.find({}).populate('user_id', 'first_name last_name')

        res.json(result);
    }
    
});