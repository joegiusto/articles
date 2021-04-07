import { connectToDatabase } from "../../util/mongodb";

export default async (req, res) => {
    const { db } = await connectToDatabase();

    const result = await db
    .collection("articles_users")
    .findOne({
        "roles.employee.bool": true,
        "employee.friendly_url": req.body.employee
    });

    res.json(result);

};