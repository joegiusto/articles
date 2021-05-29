import { connectToDatabase } from "../../../../util/mongodb";

// Return only safe data
// Support friendly_url calls
// Support _id calls

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const expenses_agg = [
        {
          '$group': {
            '_id': {
              'date': '$date'
            }, 
            'total': {
              '$sum': '$amount'
            }
          }
        }
    ];

    const revenues_agg = [
        {
            '$group': {
            '_id': {
                'date': '$date'
            }, 
            'total': {
                '$sum': '$amount'
            }
            }
        }
    ];

    res.send({

        revenues: await db.collection("revenues_donations")
        .aggregate(revenues_agg)
        .toArray(),

        expenses: await db.collection("expenses_recurring")
        .aggregate(expenses_agg)
        .toArray(),

        cached: false
      })

};