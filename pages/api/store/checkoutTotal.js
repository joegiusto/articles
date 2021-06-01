var ObjectId = require('mongodb').ObjectId; 
const stripe = require('stripe')(process.env.STRIPE_TEST_SECRET);

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    // if (session) {

        console.log(req.body)

        const products = req.body.products;
        // Create a PaymentIntent with the order amount and currency

        const retrivedProducts = []
        let total = 0;

        for (let i = 0; i < products.length; i++) {

            db.collection("articles_products").findOne( {_id: ObjectId(products[i]._id) }, { projection: {title: 1, price: 1} }, function(err, result) {
                console.log(result)
                retrivedProducts[i] = result || {};
                retrivedProducts[i].size = products[i].size;
                retrivedProducts[i].cart_id = products[i].cart_id;
                total = total + result.price || 0
                setTimeout( () => onceDone(), 2000)
            });

            function onceDone() {
                // console.log("Once done called!")

                if (i === products.length - 1) {

                res.send({
                    total: parseFloat( 
                    (total / 100).toFixed(2) 
                    ),
                    tax:  parseFloat( 
                    ((total / 100 ) * 0.08125 ).toFixed(2)
                    ),
                    retrivedProducts: retrivedProducts
                });
                }

            }
        
        }

    // } else {
    //     res.send({ error: 'You must be signed in to get payment methods.' })
    // }

}