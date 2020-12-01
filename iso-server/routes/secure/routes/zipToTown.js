var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db, passport) => {
  app.post('/api/secure/zipToTown', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/secure/zipToTown made at ${new Date()}`);

    let converted = {}

    console.log(req.body)

    if (req.body.format === 'tally') {

      // res.send("Thank You!")

      let cleanZips = Object.keys(req.body.zips).filter(zip => zip !== 'None');

      promises();

      async function promises() {
        const output = {}
        const promises = cleanZips.map( async(item, i) => {

          const promise = await db.collection("zips").findOne( { zip_code: parseInt(cleanZips[i]) }, { projection: {   } } )
          .then((response) => {
            return response
          })
          .catch((error) => {
            return error
          })

          console.log(item)
          console.log(promise)

          item = {[item]: promise}
          
          output[ cleanZips[i] ] = promise

        })
        await Promise.all(promises)
        console.log("THIS")
        console.log(output)
        return res.send(output)
      }

    } else {

      return res.status(400).send({
        message: 'Format not supported'
     });

    }

  });
} 