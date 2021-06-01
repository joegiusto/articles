var ObjectId = require('mongodb').ObjectId; 

import { getSession } from 'next-auth/client'
import { connectToDatabase } from "util/mongodb";

export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session?.user?.email != "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to do that',
        })
    }

    const result = await db
    .collection("articles_messages")
    .find({})
    .toArray();

    return res.status(200).json({ 
        message: 'Here are the results!',
        totals: {
            chat_count: result.filter( (chat) => chat.users.length == 2 ).length,
            encrypted_chat_count: result.filter( (chat) => chat.users.length == 2 && chat.encryption ).length,
            group_chat_count: result.filter( (chat) => chat.users.length > 2 ).length,
            encrypted_group_chat_count: result.filter( (chat) => chat.users.length > 2 && chat.encryption ).length,
            messages_aws_storage: 0.00
        }
    })

    // if ( session.user.email == "joeygiusto@gmail.com" ) {
    //     console.log("Joey made this call")

    //     const result = await db
    //     .collection("articles_users")
    //     .findOne({ _id: ObjectId(req.body.user_id) })

    //     return res.status(200).json({ 
    //         message: 'Here are the results!',
    //         user: result
    //     })

    // } else {
    //     return res.status(403).json({ 
    //         message: 'You do not have the proper role to access this',
    //     })
    // }

}