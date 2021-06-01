import { getSession } from 'next-auth/client'
import axios from 'axios'

import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    // console.log('req.query')
    // console.log(req.query)

    const result = await db
    .collection("articles_users")
    .findOne({email: req.query.email})

    // console.log(result)

    res.json(result.stripe.customer_test_id)
}