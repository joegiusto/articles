module.exports = (app, db) => {
  app.post('/getNewsByTag', (req, res) => {

    console.log("Call to /api/getNewsByTag at" + new Date());
    console.log(req.body.tag);

    let data = {};

    db.collection("articles_news")
    .find( {'news_tags.tag_name': { $in: [req.body.tag] } } )
    .toArray(function(err, result) {
      if (err) throw err;
      data.tags = result;
      return res.send(data);
    });

    db.collection("articles_donations").insertOne(
      {
        amount: 5000,
        date: 1574187988687,
        name: 'Joey Giusto',
        message: "Another deposit",
        createdBy: "5e90cc96579a17440c5d7d52",
        wasMatched: false,
        matchedBy: null,
      }
    )
    
  });
}