import { connectToDatabase } from "../../../../util/mongodb";

// Return only safe data
// Support friendly_url calls
// Support _id calls

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const projection = { 'employee': 1, 'first_name': 1, 'last_name': 1, 'birth_date': 1, "address.state": 1 };

    const result = await db
    .collection("articles_users")
    .findOne({
        "roles.employee.bool": true,
        "employee.friendly_url": req.body.employee
    },
    {
        projection: projection
    })

    if ( result ) {

        res.json(result);

    } else {

        let resultById = await db
        .collection("articles_users")
        .findOne({
            "roles.employee.bool": true,
            "employee._id": req.body.employee
        },
        {
            projection: projection
        })

        res.json(resultById);
    }

    

};