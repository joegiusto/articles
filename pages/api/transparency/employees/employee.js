import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const projection = { 'employee': 1, 'first_name': 1, 'last_name': 1, 'birth_date': 1 };

    const result = await db
    .collection("articles_users")
    .findOne({
        "roles.employee.bool": true,
        "employee.friendly_url": req.body.employee
    },
    {
        projection: projection
    })

    res.json(result);

};