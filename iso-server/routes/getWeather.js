const axios = require('axios')
var colors = require('colors');

module.exports = (app, db, cache) => {
  app.get('/api/getWeather', function (req, res) {

    let zip = 0

    if (req.query.zip === undefined) {
      return res.status(400).send({
        message: 'Zip code required for this call'
      });
    } else {
      zip = req.query.zip
      const splitZip = zip.split('')
      // console.log(splitZip)
      // console.log(splitZip.length)

      if (splitZip.length !== 5) {
        return res.status(400).send({
          message: `${req.query.zip} is not a valid zip code`
        });
      }
    }

    if ( cache.get('weather' + zip) === null) {

      axios.get('http://api.weatherstack.com/current', {
        params: {
          query: zip,
          access_key: '7df5e8614e8fc3b1123c38fb2f0514bb',
          units: 'f'
        }
      })
      .then(function (response) {

        cache.put('weather' + zip, response.data, 3600000);

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

      console.log( `[Cache Engine] Weather for ${zip} is not stored in cache, will store`.underline.red );
      
    } else {
      res.send( { 
        weather: cache.get('weather' + zip),
        cached: true
      } )

      console.log( `[Cache Engine] Weather for ${zip} was stored in cache, will send stored value`.yellow );
      console.log("Logging all keys")
      console.log(cache.keys())
    }

  });

}