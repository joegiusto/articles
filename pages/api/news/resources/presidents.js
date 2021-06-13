import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const result = await db
    .collection("presidents")
    .find({})
    // .limit(20)
    .toArray();

    res.json(result);
};