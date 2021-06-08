import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    let resultsLimit = req.query.limit;
    resultsLimit = 20;

    // let page = req.params.page >= 1 ? req.params.page : 1;
    // const page = req.query.page;

    const projection = { 
        'news_title': 1, 
        'news_date': 1 ,
        'news_tags': 1 ,
        'news_tagline': 1,
        'hero_url': 1,
        'last_update': 1,
        'authors': 1,
        'url': 1,
        'proposals': 1
    };

    const result = await db
    .collection("articles_news")
    .find({news_type: 'story', visible: true})
    .sort({"news_date": -1})
    .limit(resultsLimit)
    .skip(resultsLimit * 0)
    .project(projection)
    .toArray();

    res.json(result);
};