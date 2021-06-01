var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {

    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session.user.email !== "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

    db.collection("articles_proposals").deleteOne({ _id: ObjectId(req.body._id) }, 
    function(err, result) {
        if (err) throw err;
        res.send(result);
    });

}