// export default function handler(req, res) {
//     // console.log( req.query.proposal )
//     const proposal = req.query.proposal
//     res.end(`Proposal Requested: ${proposal}`)
// }

import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const proposal = req.query.proposal

    const result = await db
    .collection("articles_proposals")
    .findOne({url: proposal})
    // .limit(20)
    // .toArray();

    res.json(result);
};