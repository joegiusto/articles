var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'

import connectDB from 'util/mongoose';
import Revenue from "models/Revenue";

export default connectDB( async (req, res) => {

    const session = await getSession({ req })
    console.log(req.body.donation)

    if ( session.user.email !== "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

    let filter = {};

    if(req.body.donation._id == null) {
        // console.log("was null")
        delete req.body.donation._id;
        filter = { _id: new ObjectId() };
    } else {
        // console.log("was not null")
        filter = { _id: req.body.donation._id };
    }

    Revenue.findOneAndUpdate( filter, req.body.donation, { new: true, upsert: true }, function(err, result) {
        if (err) return res.send(500, {error: err});

        return res.send({
            populatedDonation: result
        });
    });

} );