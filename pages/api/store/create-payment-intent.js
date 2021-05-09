const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    let customer_id = 'cus_I2gasSmH70Etq2'

    console.log(req.body)

    // console.log(req.app.get('mongoConfig').store.enabled)
    // if (!req.app.get('mongoConfig').store.enabled) {
    //     console.log("STOP HERE")
    //     return res.status(403).send('Store is temporally disabled, check back later.');
    // }

    // const stripe = req.app.get('stripe');

    // let customer_id = ''

    // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
    //     customer_id = req.user.stripe.customer_test_id
    // } else {
    //     customer_id = req.user.stripe.customer_id
    // }

    let isPaymentMethodPurchase = false

    if (req.body.payment_method_id !== null) {
        isPaymentMethodPurchase = true
    }

    let payment_method_purchase = (isPaymentMethodPurchase ? { payment_method: req.body.payment_method_id } : {});

    console.log(payment_method_purchase)

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
        amount: req.body.amount.toFixed(0),
        currency: "usd",

        // TODO - This
        customer: customer_id,
        ...payment_method_purchase,

        metadata: {
            user_id: req.body._id
        },
        description: 'User donation to the site',
    });

    console.log(paymentIntent)

    res.send({
        clientSecret: paymentIntent.client_secret,
        paymentIntentID: paymentIntent.id
    });

}