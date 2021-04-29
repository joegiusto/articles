import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    // const result = await db
    // .collection("articles_news")
    // .find({news_type: 'story'})
    // .sort({"news_date": -1})
    // .limit(10)
    // .toArray();

    var stories = await db.collection('articles_news').count( {news_type: 'story', visible: true} );
    var issues = await db.collection('articles_news').count( {news_type: 'issue', visible: true} );
    var myths = await db.collection('articles_news').count( {news_type: 'myth', visible: true} );

    res.json({stories, issues, myths})

    // res.json(result);
};