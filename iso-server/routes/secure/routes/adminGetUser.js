var ObjectId = require('mongodb').ObjectId; 

// Will return a true only if user is Joey!
function isJoey(id) {
    if ( id == "5e90cc96579a17440c5d7d52" ) {
        console.log('[Admin] Was Joey'.red);
        return true
    } else {
        console.log('[Admin] Was not Joey'.yellow);
        return false
    }
}

module.exports = (app, db, passport) => {

    app.post('/api/secure/adminGetUser', passport.authenticate('jwt', {session: false}), async (req, res) => {

        // Will return a response to stop those who are not Joey
        if ( isJoey(req.user._id) ) {

            var o_id = new ObjectId(req.body.user_id);

            db.collection("articles_users").findOne( o_id, function(err, result) {
                if (err) throw err;
                return res.send(result) 
            });
            
        } else {
            res.send("Sorry buddy, you are not Joey though :(");
        }

    });

}