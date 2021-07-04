import sgMail from '@sendgrid/mail'

sgMail.setApiKey(process.env.SENDGRID_API_KEY)

export default function sendEmail(msg) {

    // Trust no one!
    msg.from = {
        email: "no-reply@articles.media",
        name: "Articles Media"
    };

    if ( msg.to, msg.subject, msg.html ) {

        sgMail
        .send(msg)
        .then((response) => {
            console.log(response[0].statusCode)
            console.log(response[0].headers)
        })
        .catch((error) => {
            console.error(error)
        })

    } else {

        console.log("EMAIL ERROR")

    }

}