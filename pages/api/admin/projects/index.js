var ObjectId = require('mongodb').ObjectId; 
import { connectToDatabase } from "util/mongodb";
import { getSession } from 'next-auth/client'

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

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
        const result = await db
        .collection("internal_projects")
        .find()
        .toArray();

        res.json(result);
    }
    
};