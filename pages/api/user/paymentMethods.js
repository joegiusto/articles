const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

import { getSession } from 'next-auth/client'
import axios from 'axios'

import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    let host = req.headers.host;
    // console.log(host)

    // console.log('session')
    // console.log(session)

    if (session) {

        // We first need to get stripe_id because it is not in session
        let stripe_customer_id = await axios.get(`http://${host}/api/user/customerId`, {
            params: {
                email: session.user.email,
            }
            // headers: {
            //     Authorization: process.env.GITHUB_API_KEY,
            //     'User-Agent': 'joegiusto'
            // }
        })
        .then(function (response) {
            // console.log('response')
            // console.log(response.data)
            return response.data
            // cache.put('githubCommits', response.data, 60000);
            // res.send({
            //     commits: response.data,
            //     cached: false
            // });
        })
        .catch(function (error) {
            console.log(error);
            // return res.status(400).send({
            //     message: 'There was an error in getting the commits'
            // });
        });

        let customer_id = stripe_customer_id;
        // console.log('customer_id')
        // console.log(customer_id)
    
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