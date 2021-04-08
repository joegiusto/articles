import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {

    const { db } = await connectToDatabase();

    const recurringResult = await db
    .collection("expenses_recurring")
    .find({})
    .toArray();

    const inventoryResult = await db
    .collection("expenses_inventory")
    .find({})
    .toArray();

    // res.json(result);

    res.status(200).json({ 
        text: 'You asked for expense',
        other: [],
        payroll: [],
        recurring: recurringResult,
        utilities: [],
        inventory: inventoryResult
    })
}