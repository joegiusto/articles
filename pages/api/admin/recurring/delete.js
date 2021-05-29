var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'

import connectDB from 'util/mongoose';
import Recurring from "models/Recurring";

export default connectDB( async (req, res) => {

    const session = await getSession({ req })

    if ( session.user.email !== "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            error: 'You do not have the proper role to access this',
        })
    }

    if ( !req.body.id ) {
        return res.status(400).json({ 
            error: 'Please provide a req.body.id',
        })
    }

    Recurring.deleteOne({ 
        _id: req.body.id
    }, function (err, response) {
        if (err) return res.send(500, {error: err});

        return res.send({
            removed_id: req.body.id,
            response
        });
    });

} );