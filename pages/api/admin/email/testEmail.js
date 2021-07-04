import sendEmail from 'util/sendEmail'

export default (req, res) => {
    console.log("api/hello Called")

    console.log(req.body.message)

    const msg = req.body.message;

    sendEmail(msg)

    res.status(200).json({ text: 'Hello' })
}