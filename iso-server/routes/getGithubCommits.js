const axios = require('axios')

module.exports = (app, db, cache) => {
  app.get('/api/getGithubCommits', function (req, res) {

    if ( cache.get('githubCommits') === null ) {

      axios.get('https://api.github.com/repos/joegiusto/articles/commits', {
        headers: {
          Authorization: process.env.GITHUB_API_KEY,
          'User-Agent': 'joegiusto'
        }
      })
      .then(function (response) {

        cache.put('githubCommits', response.data, 60000);

        res.send( { 
          commits: response.data,
          cached: false
        } );

      })
      .catch(function (error) {
        console.log(error);
        return res.status(400).send({
          message: 'There was an error in getting the commits'
       });
      });

      // cache.put('githubCommits', [{id: 1}, {id: 2}], 60000);

      console.log( '\x1b[33m', '[Cache Engine] Item is not stored in cache, will store', '\x1b[0m');
      
    } else {
      res.send( { 
        commits: cache.get('githubCommits'),
        cached: true
      } )

      console.log( '\x1b[33m', '[Cache Engine] githubCommits was stored in cache, will send stored value', '\x1b[0m');
    }

  });

}