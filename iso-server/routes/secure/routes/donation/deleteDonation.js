const isJoey = require("../functions/isJoey");
const Revenue = require("../../../../models/Revenue");

module.exports = (app, db, passport) => {
    app.post('/api/secure/deleteDonation', passport.authenticate('jwt', {session: false}), async (req, res) => {
  
        if ( isJoey(req.user._id) ) {

            Revenue.deleteOne({ 
                _id: req.body.id
            }, function (err, response) {
                if (err) return handleError(err);
                console.log(response)
    
                res.send({
                    removed_id: req.body.id,
                    response
                });
            });
            
        } else {
            res.send("Sorry buddy, you are not Joey though :(");
        }
  
    });
} 