const MongoClient = require( 'mongodb' ).MongoClient;
var colors = require('colors');
const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;

var _db;

module.exports = {

  connectToServer: function( app, callback ) {
    MongoClient.connect( url, { useNewUrlParser: true, useUnifiedTopology: true}, function( err, client ) {
      if (err) {
        console.log(err)
        // console.log('\x1b[31m%s\x1b[0m', '[Startup] Mongo Failed')
        // setTimeout(module.exports.connectToServer, 5000);
        return callback( err );
      } else {
        _db  = client.db('articles_data');
        var mongoConfig;
        console.log('\x1b[32m%s\x1b[0m', '[Startup] Mongo Ready');

        _db.collection("config").find().toArray(function(err, result) {
          if (err) throw err;

          console.log('[Startup] Server is being started with the following configuration'.green);
          console.log(JSON.stringify(result));

          if (result.length > 1) {
            console.log('WARNING: mongoDB config has more then one document, server will take the first one'.red);
          }

          mongoConfig = result[0];
          app.set('mongoConfig', mongoConfig)
        });

        return callback( err );
      }
    } );
  },

  getDb: function() {
    return _db;
  }
};