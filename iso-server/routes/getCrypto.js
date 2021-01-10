module.exports = (app, db) => {

  app.get('/api/getIssues', function (req, res) {
    console.log(`Call to /api/getIssues made at ${new Date()}`);
  
    db.collection("articles_news").find({news_type: 'issue'}).toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log("Call to /api/getIssues done")
      return res.send(result) 
    });
  
  });

}

