import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const result = await db
    .collection("mass_shootings")
    .find({})
    .sort({"date": -1})
    // .limit(20)
    .toArray();

    res.json(result);
};