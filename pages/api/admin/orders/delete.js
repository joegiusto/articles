var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";
import Order from "models/Order";

export default async (req, res) => {

    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session.user.email == "joeygiusto@gmail.com" ) {
        console.log("Joey made this call")

        Order.deleteOne({ 
            _id: req.body.id
        }, function (err, response) {
            if (err) return handleError(err);
            console.log(response)

            res.send({
                removed_id: req.body.id,
                response
            });
        });

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

}