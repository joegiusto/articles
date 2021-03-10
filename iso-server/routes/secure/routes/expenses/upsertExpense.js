var ObjectId = require('mongodb').ObjectId; 
const isJoey = require("../functions/isJoey");
const Expense = require("../../../../models/Expense");
// const Revenue = require("../../../../models/Revenue");

module.exports = (app, db, passport) => {
    app.post('/api/secure/upsertExpense', passport.authenticate('jwt', {session: false}), async (req, res) => {
  
        console.log(`Upsert Expense Called`);
        console.log(req.body)

        if ( isJoey(req.user._id) ) {

            Expense.findOneAndUpdate({
                _id: ObjectId(req.body._id)
            },
            { 
                ...req.body
            },
            {
                upsert: true,
                new: true
            }, 
            async function (err, savedExpense) {

                if (err) {
                    res.status(500).send({ error: err });
                    // res.status(500)
                    // res.render('error', { error: err });
                };

                // populatedDonation
                // const result = await Expense.findById(savedDonation._id).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
    
                res.send({
                    result: savedExpense,
                });
            });
            
        } else {
            res.send("Sorry buddy, you are not Joey though :(");
        }

        // Revenue.create({ 
        //     date: req.body.selectedDate,
        //     ...req.body.donation
        // }, async function (err, savedDonation) {
        //     if (err) return handleError(err);

        //     // populatedSendBack = savedDonation.populate

        //     const result = await Revenue.findById(savedDonation._id).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
        //     // res.send(result);

        //     res.send({
        //         populatedDonation: result,
        //         savedDonation,
        //         sent: { 
        //             date: req.body.selectedDate,
        //             ...req.body.donation
        //         }
        //     });
        // });

        // const result = await Revenue.find({}).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
        // res.send(result);
  
    });
} 