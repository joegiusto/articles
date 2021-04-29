import connectDB from 'util/mongoose';
// const mongoose = require("mongoose");

// Articles Absolute
const Revenue = require("models/Revenue");

const handler = async (req, res) => {

    const result = await Revenue.find({}).populate('createdBy', 'first_name last_name').populate('user_id', 'first_name last_name')
    res.send(result);

}

export default connectDB(handler);