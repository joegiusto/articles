var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'

import connectDB from 'util/mongoose';
import Recurring from "models/Recurring";

export default connectDB( async (req, res) => {

    const session = await getSession({ req })

    if ( session.user.email !== "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

    // console.log("😎 req.body")
    // console.log(req.body)

    // console.log("😎 query")
    // const query = ( { _id: "5eb350ad5ec6cf37a8f79999" } );

    // console.log( query );

    let filter = {};

    if(req.body._id == null) {
        // console.log("was null")
        delete req.body._id;
        filter = { _id: new ObjectId() };
    } else {
        // console.log("was not null")
        filter = { _id: req.body._id };
    }

    Recurring.findOneAndUpdate( filter, req.body, { new: true, upsert: true }, function(err, doc) {
        if (err) return res.send(500, {error: err});
        // console.log("😎 doc")
        // console.log(doc)
        return res.send(doc);
    });

} );