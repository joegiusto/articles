import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const issue = req.query.issue

    const result = await db
    .collection("articles_news")
    .findOne({url: issue})

    res.json(result);
};