module.exports = (app, db) => {
  app.post('/api/getNewsByTag', (req, res) => {

    console.log("Call to /api/getNewsByTag at" + new Date());
    // console.log(req.body.tag);

    let data = {};

    db.collection("articles_news")
    .find( {'news_tags.tag_name': { $in: [req.body.tag] } } )
    .toArray(function(err, result) {
      if (err) throw err;
      data.tags = result;
      return res.send(data);
    });
    
  });
}