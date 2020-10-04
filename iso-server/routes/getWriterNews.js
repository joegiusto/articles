// var ObjectId = require('mongodb').ObjectId;
var async = require("async");

module.exports = (app, db) => {

  app.get('/api/getWriterNews', function (req, res) {
    console.log(`Call to /api/getWriterNews made at ${new Date()}`);

    // var o_id = new ObjectId(req.query._id);

    console.log(req.query)
  
    db.collection("articles_news").find(
      {"author": req.query.user_id, visible: true, news_type: req.query.news_type}, 
      {projection: {news_type: 1, news_title: 1, hero_url: 1, url: 1, news_date: 1, last_update: 1, news_tagline: 1 } } 
    )
    .sort({last_update: -1})
    .skip( parseInt(req.query.skip * 10)  )
    .limit(10)
    .toArray(function(err, result) {
      if (err) throw err;
      console.log(`Call to /api/getWriterNews`);
      return res.send(result) 
    });

  });

  app.get('/api/getWriterNewsCount', async function (req, res) {
    console.log(`Call to /api/getWriterNewsCount made at ${new Date()}`);

    var stories = await db.collection('articles_news').count( {"author": req.query.user_id, news_type: 'story', visible: true} );
    var issues = await db.collection('articles_news').count( {"author": req.query.user_id, news_type: 'issue', visible: true} );
    var myths = await db.collection('articles_news').count( {"author": req.query.user_id, news_type: 'myth', visible: true} );

    res.send({stories, issues, myths})
  
    // db.collection("articles_news").count( {"author": req.query.user_id}, (err,result) => {

    //   if(err){
    //     res.send(err)
    //   }
    //   else{
    //       res.json(result)
    //   }
    //   }
    // )

  });

}