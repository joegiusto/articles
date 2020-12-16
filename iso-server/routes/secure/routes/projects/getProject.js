var ObjectId = require('mongodb').ObjectId;
const CryptoJS = require('crypto-js');

module.exports = (app, db, passport) => {
  app.post('/api/secure/getProject', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log("Call to /api/secure/getProject at " + new Date());

    console.log(req.body);

    var project = await db.collection("internal_projects").findOne( {_id: ObjectId(req.body.id)}, {} )

    var bytes  = CryptoJS.AES.decrypt( project.encrypted_bytes , req.body.key);

    try {
      var decryptedData = JSON.parse(bytes.toString(CryptoJS.enc.Utf8));
      decryptedData.encrypted_bytes = project.encrypted_bytes
      return res.send(decryptedData)
    }
    catch(err) {
      console.log("INTERNAL PROJECT KEY FAIL")
      return res.status(401).send('Key Invalid');
    }

  });

}