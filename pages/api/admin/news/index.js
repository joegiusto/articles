
var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";
import Revenue from "models/Revenue";

export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session.user.email !== "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

    if (req.method === 'POST') {

        console.log(req.body.news_id)

        const result = await db
        .collection("articles_news")
        .findOne({ _id: ObjectId(req.body.news_id) })
        
        res.send({
            document: result
        });
    
    } else {
    
        // Handle any other HTTP method
        const result = await db
        .collection("articles_news")
        .find()
        .toArray();
    
        res.json({
            news: result
        });
    
    }

}