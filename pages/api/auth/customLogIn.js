export default (req, res) => {

    console.log("MADE IT HERE")

    if ( !req.body.user ) {
        return res.status(400).json({ 
            message: 'Please provide a user.email and a user.password',
        })
    } else {
        console.log(req.body.user)

        return res.status(200).json({ 
            text: 'Ah, a custom login!',
            email: req.body.user.email,
            password: req.body.user.password
        })
    }

}