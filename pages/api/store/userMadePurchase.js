var ObjectId = require('mongodb').ObjectId; 
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

import { getSession } from 'next-auth/client'
import moment from 'moment';

import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    let customer_id = 'cus_I2gasSmH70Etq2'

    if (session) {

        const intent = await stripe.paymentIntents.retrieve(
            req.body.payment.id
        );

        const charges = intent.charges.data;
        const charge = charges[0];

        db.collection("revenue_orders").updateOne({ _id: ObjectId() }, {
            $set: {
                // for: 'Clothing Store Order',
                user_id: session.user._id,
                date: moment()._d,
                status: 'Awaiting Shipment',
                products: req.body.items,
                payment: {
                    type: 'card',
                    processFee: parseFloat(0.00),
                    processor: 'Stripe',
                    total: parseFloat(charge.amount),
                    trueTotal: parseFloat(charge.amount)
                }
            }
        },
        {
            upsert: true
        },
        function (err, result) {
            if (err) throw err;
            // console.log(`Call to /api/upsertDonation done`);
            // return res.send(result);

            res.send({
                order: result
            });
        });

    } else {
        res.send({ error: 'You must be signed in to do that.' })
    }

}