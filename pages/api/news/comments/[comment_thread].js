import { getSession } from 'next-auth/client'

import connectDB from 'util/mongoose';
import Comment from "models/Comment";

const handler = async (req, res) => {
    const session = await getSession({ req })
    const comment_id = req.query.comment_thread

    // if ( session?.user?.email != "joeygiusto@gmail.com" ) {
    //     return res.status(403).json({ 
    //         message: 'You do not have the proper role to do that',
    //     })
    // }

    const result = await Comment.findOne( {_id: comment_id}, { comments: 1 } ).populate('comments.user_id', 'first_name last_name')
    res.send(result);

}

export default connectDB(handler);

// import { connectToDatabase } from "util/mongodb";

// export default async (req, res) => {
//     const { db } = await connectToDatabase();
//     const issue = req.query.issue

//     const projection = { 
//         comments: 1, 
//     };

//     const result = await db
//     .collection("articles_news")
//     .findOne( {url: issue}, { projection: projection } )

//     res.json(result);
// };