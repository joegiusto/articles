import { connectToDatabase } from "../../../../util/mongodb";

export default async (req, res) => {

    const { db } = await connectToDatabase();

    // const donationsResult = await db
    // .collection("revenues_donations")
    // .find({})
    // .toArray();

    // const ordersResult = await db
    // .collection("revenue_orders")
    // .find({})
    // .toArray();

    // const recurringResult = await db
    // .collection("expenses_recurring")
    // .find({})
    // .toArray();

    // const inventoryResult = await db
    // .collection("expenses_inventory")
    // .find({})
    // .toArray();

    // Revenues

    const ordersTotal = await db.collection("revenue_orders").aggregate( [
        {
            '$group': {
                '_id': null, 
                'total': {
                    '$sum': '$payment.total'
                }
            }
        }
    ] )
    .toArray();

    const adsTotal = await db.collection("ads").aggregate( [
        {
            '$group': {
                '_id': null, 
                'total': {
                    '$sum': '$price_total'
                }
            }
        }
    ] )
    .toArray();

    const donationsTotal = await db.collection("revenues_donations").aggregate( [
        {
            '$group': {
                '_id': null, 
                'total': {
                    '$sum': '$amount'
                }
            }
        }
    ] )
    .toArray();

    // Expenses

    const recurringTotal = await db.collection("expenses_recurring").aggregate( [
        {
            '$group': {
                '_id': null, 
                'total': {
                    '$sum': '$amount'
                }
            }
        }
    ] )
    .toArray();

    const inventoryTotal = await db.collection("expenses_inventory").aggregate( [
        {
            '$group': {
                '_id': null, 
                'total': {
                    '$sum': '$amount'
                }
            }
        }
    ] )
    .toArray();

    // console.log(totalTest)

    res.status(200).json({ 
        expenses: {
            // other: [],
            // payroll: [],
            // recurring: recurringResult,
            // utilities: [],
            inventoryTotal: inventoryTotal[0].total,
            recurringTotal: recurringTotal[0].total
        },
        revenue: {
            // clothing: [],
            donationsTotal: donationsTotal[0].total,
            // donations: donationsResult,
            // orders: ordersResult,
            ordersTotal: ordersTotal[0].total,
            adsTotal: adsTotal[0].total,
            // memberships: []
        },
    })
}