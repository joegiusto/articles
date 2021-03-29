import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const result = await db
    .collection("articles_proposals")
    .find({})
    .limit(20)
    .toArray();

    res.json(result);
};