import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const myth = req.query.myth

    const projection = { 
        'comments': 0, 
    };

    const result = await db
    .collection("articles_news")
    .findOne( {url: myth}, { projection: projection } )

    res.json(result);
};