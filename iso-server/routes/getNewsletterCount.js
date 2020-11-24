var async = require("async");

module.exports = (app, db, cache) => {

  app.get('/api/getNewsletterCount', function (req, res) {

    if ( cache.get('getNewsletterCount') === null ) {

      console.log(`Call to getNewsletterCount`)

      db.collection('articles_users').countDocuments(
        {"newsletter": true }
      ).then(results => {

        cache.put('getNewsletterCount', results, 60000);
        return res.send({
          cached: false,
          newsletterCount: results
        }) 
        
      })
      .catch(error => console.log(error))

    } else {

      res.send( { 
        commits: cache.get('getNewsletterCount'),
        cached: true
      } )

      console.log( '\x1b[33m', '[Cache Engine] getNewsletterCount was stored in cache, will send stored value', '\x1b[0m');

    }

  });

}