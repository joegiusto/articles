const axios = require('axios')

module.exports = (app, db, cache) => {
  app.get('/api/getWeather', function (req, res) {

    if ( cache.get('weather') === null) {

      axios.get('http://api.weatherstack.com/current', {
        params: {
          query: 12524,
          access_key: '7df5e8614e8fc3b1123c38fb2f0514bb'
        }
      })
      .then(function (response) {

        cache.put('weather', response.data, 7200000);

        res.send( { 
          weather: response.data,
          cached: false
        } );

      })
      .catch(function (error) {
        console.log(error);
        return res.status(400).send({
          message: 'There was an error in getting the weather'
       });
      });

      console.log( '\x1b[33m', '[Cache Engine] Item is not stored in cache, will store', '\x1b[0m');
      
    } else {
      res.send( { 
        weather: cache.get('weather'),
        cached: true
      } )

      console.log( '\x1b[33m', '[Cache Engine] Item was stored in cache, will send stored value', '\x1b[0m');
    }

  });

}