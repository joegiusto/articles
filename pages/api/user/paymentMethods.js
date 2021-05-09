const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    if (session) {

        let customer_id = 'cus_I2gasSmH70Etq2'
    
        try {
    
            const paymentMethods = await stripe.paymentMethods.list({
                customer: customer_id,
                type: 'card',
            });
    
            res.send(paymentMethods);
    
        } catch (err) {
    
            console.log('Error')
            console.log(err)
    
            return res.status(400).send({
                message: err
            });
    
        }

    } else {
        res.send({ error: 'You must be signed in to get payment methods.' })
    }

}

// app.post("/api/getUserPaymentMethods", passport.authenticate('jwt', {session: false}), async (req, res) => {

//     // const stripe = req.app.get('stripe');

//     // console.log("Getting user payment methods")

//     // let stripe = '';
//     let customer_id = '5e90cc96579a17440c5d7d52'

//     // if (!process.env.NODE_ENV || process.env.NODE_ENV === 'development') {
//     //     customer_id = req.user.stripe.customer_test_id
//     //     stripe = req.app.get('stripe_test');
//     // } else {
//     //     customer_id = req.user.stripe.customer_id
//     //     stripe = req.app.get('stripe');
//     // }

//     try {

//         const paymentMethods = await stripe.paymentMethods.list({
//             customer: customer_id,
//             type: 'card',
//         });

//         res.send(paymentMethods);

//     } catch (err) {

//         console.log('Error')
//         console.log(err)

//         return res.status(400).send({
//             message: err
//         });

//     }

//     // paymentMethods
//     // .then( (empty) => res.send(paymentMethods) )
//     // .catch( (e) => res.send(e) )

//     // res.send(paymentMethods);

// });