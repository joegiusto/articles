module.exports = (app, db) => {
  app.get('/api/getProposals', (req, res) => {

    console.log("Call to /api/getProposals" + new Date());

    // db.collection("articles_proposals").find( { }, function(err, result) {
    //   if (err) throw err;

    //   console.log("Call to /api/getProposal done");
    //   return res.send(result);
    // });

    db.collection("articles_proposals").find().toArray(function(err, result) {
      if (err) throw err;
      // db.close();
      console.log(`Call to /api/getStories done`);
      return res.send(result) 
    });
    
  });
}