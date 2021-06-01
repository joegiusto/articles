var ObjectId = require('mongodb').ObjectId; 
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const projection = { 'first_name': 1, 'last_name': 1 };

    const result = await db
    .collection("articles_users")
    .findOne( { _id: ObjectId(req.query.user_id) }, {projection: projection} )

    console.log(result)

    res.json({
        first_name: result.first_name,
        last_name: (result.last_name.charAt(0) || '')
    });
};