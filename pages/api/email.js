import sgMail from '@sendgrid/mail';

export default async (req, res) => {

    console.log("Email was called");

    sgMail.setApiKey(process.env.SENDGRID_API_KEY);

    const msg = {
        to: 'joegiusto@outlook.com',
        from: 'joey@articles.media', // Use the email address or domain you verified above
        subject: 'Joey | Articles Media',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>Hello</strong>',
    };

    const result = await sgMail
    .send(msg)
    .then(() => {}, error => {
        console.error(error);

        if (error.response) {
            console.error(error.response.body)
        }

    });

    res.json(result);

}