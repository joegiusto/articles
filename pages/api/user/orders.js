var ObjectId = require('mongodb').ObjectId; 

// This is an example of to protect an API route
import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    if ( !session ) {
        return res.status(403).json({ 
            message: 'You must be signed in to access that',
        })
    }

    const results = await db
    .collection("revenue_orders")
    .find( { user_id: session.user._id } )
    .sort( { 'date': -1 } )
    .toArray();
    
    res.json(results);

}