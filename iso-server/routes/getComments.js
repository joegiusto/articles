var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {

  app.get('/api/getComments', function (req, res) {
    
    console.log(`Call to /api/getComments made at ${new Date()}`);

    console.log(req.query)

    let ifUser = {}

    // if ( req.query._id !== undefined ) {
    //   console.log("The req.query.user_id was filled out so returning results limited to that user_id")
    //   ifUser = { user_id: req.query.user_id }
    // } else {
    //   ifUser = {}
    // }
  
    db.collection("articles_news").findOne( ObjectId(req.query._id), { projection: {comments: 1, "_id": 0 } }, function(err, result) {
      if (err) throw err;
      console.log("Call to /api/getComments done")

      processNames();

      async function processNames() {
        const output = []
        const promises = result.comments.map( async(item, i) => {

          const it = await db.collection("articles_users").findOne( {_id: ObjectId(result.comments[i].user_id)}, { projection: { 'first_name': 1,  'last_name': 1  } } )
          .then((response) => {
            return response
          })
          .catch((error) => {
            return error
          })

          console.log(item)
          console.log(it)
          item = {...item, ...it}

          // item.first_name = it.first_name
          // item.last_name = it.last_name
          // item += it
          // item.name = it.address_components[1].short_name
          // item.zip = users[i].address.zip
          // item.amount = 1
          
          output.push(item)

        })
        await Promise.all(promises)
        return res.json(output)
      }
      // return res.send(result)
    });
  
  });

}