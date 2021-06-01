// This is an example of to protect an API route
import { getSession } from 'next-auth/client'
import { connectToDatabase } from "../../util/mongodb";


export default async (req, res) => {
    const { db } = await connectToDatabase();
    const session = await getSession({ req })

    if (session) {

        const projection = { 'password': 0 };
        
        const result = await db
        .collection("articles_users")
        .findOne(
            {email: session.user.email},
            {projection: projection}
        )

        res.send({ 
            content: 'This is protected content. You can access this content because you are signed in.',
            session,
            user: result
         })

    } else {
        res.send({ error: 'You must sign in to view the protected content on this page.' })
    }
}