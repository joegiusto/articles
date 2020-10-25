var async = require("async");

module.exports = (app, db) => {
  app.get('/api/getSubCount', function (req, res) {

    console.log(`Call to getSubCount with ${req.query._id}`)

    // if (req.query._id === undefined || req.query._id === null || req.query._id === '') {
    //   return res.status(400).send({
    //     message: 'Valid news_id needed!'
    //   });
    // }

    db.collection('articles_users').countDocuments( 
      {"subscriptions.news_id": req.query._id }
    ).then(results => {
      // console.log(results)
      return res.send({count: results}) 
    })
    .catch(error => console.log(error))

    // try {

    //   var subCount = await db.collection('articles_news').countDocuments( 
    //     {"subscriptions.news_id": req.query._id }
    //   );

    //   return res.send(subCount) 

    // } catch (err) {

    //   console.log("ERROR ")
    //   console.log(err)

    //   return res.sendStatus(400).send({
    //     message: 'Error',
    //     // data: err
    //   });

    //   // console.log("ERROR ")

    // }

    // db.collection("articles_news").count(
    //   {"subscriptions.news_id": req.query._id },
    //   function(err, result) {
    //     if (err) throw err;
    //     // db.close();
    //     console.log(`Call to /api/getStories done`);
    //     return res.send(result) 
    //   })
    // );

    // return res.send(subCount) 

  });

}