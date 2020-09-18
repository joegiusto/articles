var ObjectId = require('mongodb').ObjectId; 

module.exports = (app, db) => {
  app.post('/api/getReferral', (req, res) => {

    console.log("Call to /api/getReferral" + new Date());

    if (req.body._id === null || req.body._id === undefined || req.body._id === '') {
      return res.status(400).send({
        message: 'Referal ID required'
     });
    }

    console.log(req.body._id)
    
    var o_id = new ObjectId(req.body._id);

    let first_letter = ''

    db.collection("articles_users").findOne( o_id, function(err, result) {
      if (err) throw err;
      console.log(result)
      console.log("Call to /api/getReferral done");

      return res.send({
        first_name: result.first_name, 
        last_name: result.last_name.charAt(0)
      });
    });
  });
}