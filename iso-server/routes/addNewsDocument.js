module.exports = (app, db) => {
  app.post('/api/addNewsDocument', (req, res) => {
    console.log(`Call to /api/addNewsDocument made at ${new Date()}`);
  
    // Always assume client sends the wrong thing.
    var myobj = req.body.data;
    myobj.news_type = myobj.news_type.toLowerCase();
    myobj.news_date = new Date(myobj.news_date);
    myobj.last_update = new Date(myobj.last_update);

    // Preform Whitelist Acceptance
    const allowedKeys = ['news_type', 'news_title', 'news_notes', 'news_date', 'news_tags', "url", "hero_url", "last_update", "news_tagline", "visible", "author", "proposals"];

    if (myobj.visible === true || myobj.visible === "true") {
      myobj.visible = true
    } else {
      myobj.visible = false
    }

    myobj = Object.keys(myobj)
    .filter(key => allowedKeys.includes(key))
    .reduce((obj, key) => {
      obj[key] = myobj[key];
      return obj;
    }, {});

    db.collection("articles_news").insertOne(myobj, function(err, result) {
      if (err) throw err;
      console.log("1 news document inserted");
    });
  
    return res.end();
  });
} 