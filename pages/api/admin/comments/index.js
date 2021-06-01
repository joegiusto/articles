import connectDB from 'util/mongoose';
import { getSession } from 'next-auth/client'

import News from "models/News";

export default connectDB(async (req, res) => {
    const session = await getSession({ req })

    if ( session?.user?.email != "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to do that',
        })
    }

    const result = await News.find({}, 'comments news_title news_type',).populate("comments.user_id", 'first_name last_name')

    res.json(result);
});