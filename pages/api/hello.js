import sendEmail from '../../util/sendEmail'

export default (req, res) => {
    console.log("api/hello Called")

    const msg = {
        to: 'joeygiusto@gmail.com', // Change to your recipient
        from: 'info@articles.media', // Change to your verified sender
        subject: 'Sending with SendGrid is Fun',
        text: 'and easy to do anywhere, even with Node.js',
        html: '<strong>and easy to do anywhere, even with Node.js</strong>',
    }

    sendEmail(msg)

    res.status(200).json({ text: 'Hello' })
}