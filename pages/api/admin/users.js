// This is an example of how to access a session from an API route
import { getSession } from 'next-auth/client'
import { connectToDatabase } from "../../../util/mongodb";

export default async (req, res) => {
    const session = await getSession({ req })
    const { db } = await connectToDatabase();

    if ( session?.user?.email != "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to do that',
        })
    }

    if ( session.user.email == "joeygiusto@gmail.com" ) {
        console.log("Joey made this call")

        const result = await db
        .collection("articles_users")
        .find({})
        .toArray();

        return res.status(200).json({ 
            message: 'Here are the results!',
            users: result
        })

    } else {
        return res.status(403).json({ 
            message: 'You do not have the proper role to access this',
        })
    }

}