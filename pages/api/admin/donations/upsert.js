var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";
import Revenue from "models/Revenue";

export default async (req, res) => {

    const session = await getSession({ req })
    const { db } = await connectToDatabase();
    console.log(req.body.donation)

    if ( session.user.email !== "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

    const filter = { _id: req.body.donation._id };
    const update = { ...req.body.donation };

    const result = await Revenue.findOneAndUpdate(filter, update, {
        new: true,
        upsert: true // Make this update into an upsert
    })

    res.send({
        populatedDonation: result,
        // savedDonation,
        sent: req.body.donation
    });

}