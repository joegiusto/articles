import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const resultGeneral = await db
    .collection("updates")
    .find({type: 'general'})
    .toArray();

    const resultDevelopment = await db
    .collection("updates")
    .find({type: 'development'})
    .toArray();

    res.json({
        general: resultGeneral,
        development: resultDevelopment
    });
};