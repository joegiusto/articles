const Revenue = require("../../../../models/Revenue");

module.exports = (app, db, passport) => {
    app.post('/api/secure/addDonation', passport.authenticate('jwt', {session: false}), async (req, res) => {
  
        console.log(`Add Donation Called`);
        console.log(req.body.donation)
        console.log(req.body.selectedDate)

        Revenue.create({ 
            date: req.body.selectedDate,
            ...req.body.donation
        }, async function (err, savedDonation) {
            if (err) return handleError(err);

            // populatedSendBack = savedDonation.populate

            const result = await Revenue.findById(savedDonation._id).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
            // res.send(result);

            res.send({
                populatedDonation: result,
                savedDonation,
                sent: { 
                    date: req.body.selectedDate,
                    ...req.body.donation
                }
            });
        });

        // const result = await Revenue.find({}).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
        // res.send(result);
  
    });
} 