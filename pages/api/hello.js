export default (req, res) => {
    console.log("api/hello Called")
    res.status(200).json({ text: 'Hello' })
}