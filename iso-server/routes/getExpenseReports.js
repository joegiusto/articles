var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {

  app.get('/api/getExpenseReports', function (req, res) {
    
    console.log(`Call to /api/getExpenseReports made at ${new Date()}`);

    console.log(req.query.user_id)

    let ifUser = {}

    if ( req.query.user_id !== undefined ) {
      console.log("The req.query.user_id was filled out so returning results limited to that user_id")
      ifUser = { user_id: req.query.user_id }
    } else {
      ifUser = {}
    }
  
    db.collection("articles_expense_reports").find( ifUser ).toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log("Call to /api/getExpenseReports done")

      console.log(result)

      processArray();

      async function processArray() {
        const output = []
        const promises = result.map( async(item, i) => {

          const it = await db.collection("articles_users").findOne( {_id: ObjectId(result[i].user_id)}, { projection: { 'first_name': 1 } } )
          .then((response) => {
            return response
          })
          .catch((error) => {
            return error
          })

          console.log(it)
          item = result[i]
          item.first_name = it.first_name
          // item += it
          // item.name = it.address_components[1].short_name
          // item.zip = users[i].address.zip
          // item.amount = 1
          
          output.push(item)

        })
        await Promise.all(promises)
        return res.json(output)
      }

      // console.log(result)

      // for (let i = 0; i < result.length; i++) {
      //   console.log(i)

      //   db.collection("articles_expenses").findOne( {_id: ObjectId(result[i].expense_id)}, function(subErr, subResult) {
      //     if (err) throw subErr;
      //     // console.log(subResult)
      //     result[i].fetchedId = subResult.reason
      //   });

        // db.collection("articles_users").findOne( {_id: ObjectId(result[i].user_id)}, function(subErr, subResult) {

        //   if ( subResult === null ) {
        //     subResult = {}
        //   }

        //   if (err) throw subErr;
        //   // console.log(subResult)

        //   // let first_name = subResult.first_name || ''
        //   // let last_name = subResult.last_name || ''

        //   if ( !subResult.hasOwnProperty('first_name') ) {
        //     subResult.first_name = 'User Account Deleted'
        //   }

        //   if ( !subResult.hasOwnProperty('last_name') ) {
        //     subResult.last_name = ''
        //   }

        //   result[i].fetchedUser = subResult.first_name + ' ' + subResult.last_name 
        // });

        // if (i === result.length - 1) {
        //   delaySubmit()
        // }

      // }

      // function delaySubmit() {
      //   setTimeout(function(){ return res.send(result) }, 500);
      // }

      // return res.send(result) 
    });
  
  });

}