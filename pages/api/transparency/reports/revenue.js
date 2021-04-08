import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {

    const { db } = await connectToDatabase();

    const donationsResult = await db
    .collection("revenues_donations")
    .find({})
    .toArray();

    const ordersResult = await db
    .collection("revenue_orders")
    .find({})
    .toArray();

    // res.json(result);

    res.status(200).json({ 
        text: 'You asked for revenue',
        clothing: [],
        donations: donationsResult,
        orders: ordersResult,
        ads: [],
        memberships: []
    })
}