import { connectToDatabase } from "../../../../util/mongodb";
// import connectDB from 'util/mongoose';
import Donations from "models/Donations";

export default async (req, res) => {

    const { db } = await connectToDatabase();

    // const donationsResult = await db
    // .collection("revenues_donations")
    // .find({})
    // .toArray();

    const donationsResult = await Donations.find({}).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')

    const ordersResult = await db
    .collection("revenue_orders")
    .find({})
    .toArray();

    const adsResult = await db
    .collection("ads")
    .find({})
    .toArray();

    // res.json(result);

    res.status(200).json({ 
        // text: 'You asked for revenue',
        clothing: [],
        donations: donationsResult,
        orders: ordersResult,
        ads: adsResult,
        memberships: []
    })
}