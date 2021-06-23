
var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";
// import Revenue from "models/Revenue";

export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( !session ) {
        return res.status(403).json({ 
            message: 'You must be signed in to access that',
        })
    }

    if (req.method === 'POST') {

        // console.log(req.body.news_id)

        const result = await db
        .collection("revenues_donations")
        .find({ user_id: session.user._id })
        .sort({"date": -1})
        .toArray();
        
        res.send(result);
    
    } else {
    
        if ( !session ) {
            return res.status(403).json({ 
                message: 'You must be signed in to access that',
            })
        }
    
    }

}