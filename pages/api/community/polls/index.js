import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const result = await db
    .collection("polls")
    .find({})
    .toArray();

    res.json(result);
};