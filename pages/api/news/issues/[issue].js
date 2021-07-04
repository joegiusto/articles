import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const issue = req.query.issue

    const projection = { 
        comments: 0, 
    };

    const result = await db
    .collection("articles_news")
    .findOne( {url: issue}, { projection: projection } )

    res.json(result);
};