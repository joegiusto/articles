// import { connectToDatabase } from "../../../../util/mongodb";

// export default async (req, res) => {

//     const { db } = await connectToDatabase();

//     console.log(req.method);

//     const projection = { 'employee.friendly_url': 1, 'first_name': 1, 'last_name': 1, 'birth_date': 1 };

//     const result = await db
//     .collection("articles_users")
//     .find( {"roles.employee.bool": true} )
//     .project(projection)
//     .toArray();

//     res.json(result);
    
// };