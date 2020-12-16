const CryptoJS = require('crypto-js');

module.exports = (app, db) => {

  app.post('/api/cryptoTest', function (req, res) {
    console.log(`Call to /api/cryptoTest made at ${new Date()}`);
  
    var bytes  = CryptoJS.AES.decrypt(req.body.ciphertext, 'secret key 124')
    console.log(bytes.toString(CryptoJS.enc.Utf8));
  });

}

