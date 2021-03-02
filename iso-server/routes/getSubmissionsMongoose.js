const mongoose = require("mongoose");
const Submission = require("../models/Submission");

module.exports = ( app, db, cache ) => {
  app.get('/api/getSubmissionsMongoose', async function (req, res) {

    const cacheKey = 'getSubmissionsMongoose';

    if ( cache.get( cacheKey ) === null ) {

        const result = await Submission.find({}).populate('user_id', 'first_name last_name address.state')

        cache.put(cacheKey, result, 60000);

        res.send( { 
            submissions: result,
            cached: false
        } );
  
        console.log( '\x1b[33m', '[Cache Engine] Item is not stored in cache, will store', '\x1b[0m');
        
    } else {

        res.send( { 
            submissions: cache.get(cacheKey),
            cached: true
        } )
  
        console.log( '\x1b[33m', '[Cache Engine] getSubmissionsMongoose was stored in cache, will send stored value', '\x1b[0m');

    }

  });

}