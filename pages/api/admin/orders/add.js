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

    console.log(req.body.order)
    console.log(req.body.selectedDate)

    // Revenue.create({ 
    //     date: req.body.selectedDate,
    //     ...req.body.donation
    // }, async function (err, savedDonation) {
    //     if (err) return handleError(err);

    //     const result = await Revenue.findById(savedDonation._id).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')

    //     res.send({
    //         populatedDonation: result,
    //         savedDonation,
    //         sent: { 
    //             date: req.body.selectedDate,
    //             ...req.body.donation
    //         }
    //     });
    // });

}