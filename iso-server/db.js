const MongoClient = require( 'mongodb' ).MongoClient;
const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url, { useNewUrlParser: true, useUnifiedTopology: true}, function( err, client ) {
      if (err) {
        console.log(err)
        // console.log('\x1b[31m%s\x1b[0m', '[Startup] Mongo Failed')
        // setTimeout(module.exports.connectToServer, 5000);
        return callback( err );
      } else {
        _db  = client.db('articles_data');
        console.log('\x1b[32m%s\x1b[0m', '[Startup] Mongo Ready');
        return callback( err );
      }
    } );
  },

  getDb: function() {
    return _db;
  }
};