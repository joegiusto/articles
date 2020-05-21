const MongoClient = require( 'mongodb' ).MongoClient;
const url = `mongodb+srv://joegiusto:${encodeURIComponent(process.env.MONGODB_PASSWORD)}@articles-xgwnd.mongodb.net/articles_data?retryWrites=true&w=majority`;

var _db;

module.exports = {

  connectToServer: function( callback ) {
    MongoClient.connect( url, { useNewUrlParser: true, useUnifiedTopology: true}, function( err, client ) {
      if (err) {
        console.log(err)
        console.log('Failed to connect to mongo - retrying is not setup yet')
        // setTimeout(module.exports.connectToServer, 5000);
      } else {
        _db  = client.db('articles_data');
        console.log("Now connected");
        return callback( err );
      }
    } );
  },

  getDb: function() {
    return _db;
  }
};