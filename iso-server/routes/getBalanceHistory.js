var async = require("async");

module.exports = (app, db) => {

    app.get('/api/getBalanceHistory', async function (req, res) {

      console.log(`Call to /api/getBalanceHistory made at ${new Date()}`);

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

      var expenses = await db.collection("expenses_recurring")
      .aggregate(expenses_agg)
      .toArray( function(err, result) {
        if (err) throw err;
        console.log(result)
        return result;
      });

      var revenues = await db.collection("revenues_donations")
      .aggregate(revenues_agg)
      .toArray( function(err, result) {
        if (err) throw err;
        return result;
      });

      res.send({

        revenues: await db.collection("revenues_donations")
        .aggregate(revenues_agg)
        .toArray(),

        expenses: await db.collection("expenses_recurring")
        .aggregate(expenses_agg)
        .toArray(),

        cached: false
      })
    
    });
  
  }
  
  