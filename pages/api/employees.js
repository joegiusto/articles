import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    console.log(req.method);

    const result = await db
    .collection("articles_users")
    .find( {"roles.employee.bool": true}, { 'employee.friendly_url': 1, 'first_name': 1, 'last_name': 1 } )
    .toArray();

    res.json(result);

    // if (req.method === 'POST') {

    //     const result = await db
    //     .collection("articles_users")
    //     .findOne({
    //         "roles.employee.bool": true,
    //         "employee.friendly_url": req.body.employee
    //     });

    //     res.json(result);

    // } else {

    //     const result = await db
    //     .collection("articles_users")
    //     .find({"roles.employee.bool": true})
    //     .toArray();

    //     res.json(result);

    // }

    
};