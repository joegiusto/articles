import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const result = await db
    .collection("articles_news")
    .find({news_type: 'myth'})
    .sort({"news_date": -1})
    .limit(20)
    .toArray();

    res.json(result);
};