import { getSession } from 'next-auth/client'

import connectDB from 'util/mongoose';
import Recurring from "models/Recurring";

const handler = async (req, res) => {
    const session = await getSession({ req })

    if ( session?.user?.email != "joeygiusto@gmail.com" ) {
        return res.status(403).json({ 
            message: 'You do not have the proper role to do that',
        })
    }

    const result = await Recurring.find({})
    res.send(result);

}

export default connectDB(handler);