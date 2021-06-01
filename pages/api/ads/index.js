var ObjectId = require('mongodb').ObjectId; 
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const ad = req.query.ad

    console.log(ad)

    const result = await db
    .collection("ads")
    .findOne({_id: ObjectId( ad )})

    res.json(result);
};