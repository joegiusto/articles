import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    // db.collection("articles_products").find().toArray(function(err, result) {
        // if (err) throw err;
        // console.log(`Call to /api/getProducts done`);
        // return res.send(result) 
        // res.status(200).json(result)
    // });

    const movies = await db
    .collection("articles_products")
    .find({})
    // .sort({ metacritic: -1 })
    .limit(20)
    .toArray();

    res.json(movies);
};