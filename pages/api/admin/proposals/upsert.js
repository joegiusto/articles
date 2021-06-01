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

    console.log(req.body.proposal);

    db.collection("articles_proposals").updateOne({ _id: ObjectId(req.body.proposal._id) }, 
    {
        $set: {
          ...req.body.proposal
        }
    },
    {
        upsert: true
    }, 
    function(err, result) {
        if (err) throw err;
        console.log(result);
        res.send(result);
    });

}