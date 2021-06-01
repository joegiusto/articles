// export default function handler(req, res) {
//     // console.log( req.query.proposal )
//     const proposal = req.query.proposal
//     res.end(`Proposal Requested: ${proposal}`)
// }

import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const story = req.query.story

    const result = await db
    .collection("articles_news")
    .findOne({url: story})

    res.json(result);
};