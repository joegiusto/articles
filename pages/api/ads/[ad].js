import mongodb from "mongodb";
import { connectToDatabase } from "../../../util/mongodb";

const ObjectID = mongodb.ObjectID;

export default async (req, res) => {
    const { db } = await connectToDatabase();
    const ad = req.query.ad

    console.log(ad)

    let isValid = ObjectID.isValid(ad);
    // var isValid = ObjectId.isValid('5c0a7922c9d89830f4911426');

    // console.log('1')

    // let test = ObjectId( ad );

    // console.log('2')

    if ( isValid ) {

        const result = await db
        .collection("ads")
        .findOne({ _id: ObjectID(ad)})

        res.json(result);

    } else {

        res.status(403).json({ 
            message: 'Invalid ad._id',
        })

    }

};