const moment = require('moment');
var ObjectId = require('mongodb').ObjectId;
var async = require("async");
const {sendEmail} = require('../../../utils/index');

const sgMail = require('@sendgrid/mail');
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

module.exports = (app, db, passport) => {
  app.post('/api/respondReport', passport.authenticate('jwt', {session: false}), async (req, res) => {

    console.log(`Call to /api/respondReport made at ${new Date()}`);

    const o_id = new ObjectId(req.body._id);

    console.log(req.body)

    const response = await db.collection('articles_expense_reports').updateOne(
      {'_id': ObjectId(req.body._id)}, 
      { $push: { "responses" : { 
        employee: "5e90cc96579a17440c5d7d52",
        date: moment()._d,
        _id: new ObjectId(),
        response: req.body.response
      } } },
      false,
      true 
    );

    res.send(response);

    const report = await db.collection('articles_expense_reports').findOne(
      {'_id': ObjectId(req.body._id)}, 
    );

    const user = await db.collection('articles_users').findOne(
      {'_id': ObjectId(report.user_id)}, 
    );

    console.log("This is the users email that sent this report");
    console.log(user.email)

    let link="http://"+req.headers.host+"/reports/report";
    let subject = "An expense you reported has received a response";
    let to = user.email;
    let from = {
      email: "no-reply@articles.media",
      name: "Articles Media"
    };
    let html = `
      <img width="100" height="100" src="https://cdn.articles.media/email/logo.jpg"></img>
      <br>
      <strong>Hello ${user.first_name},</strong>
      <br>
      <p>We have responded to a report you made. Please click on the following <a href="${link}">link</a> to view the response.</p> `;

    await sendEmail({to, from, subject, html});

  });
} 