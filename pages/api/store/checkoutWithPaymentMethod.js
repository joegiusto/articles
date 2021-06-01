const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    let customer_id = 'cus_I2gasSmH70Etq2'

    let payload = await stripe.paymentIntents.confirm(
        req.body.paymentIntentID.toString(),
        {payment_method: req.body.payment_method}
    );

    res.send({  
      payload: payload
    });

}