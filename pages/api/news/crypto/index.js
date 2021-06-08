import { connectToDatabase } from "util/mongodb";

import axios from 'axios'

export default async (req, res) => {
    // const { db } = await connectToDatabase();

    // const result = await db
    // .collection("articles_news")
    // .find({news_type: 'story', visible: true})
    // .sort({"news_date": -1})
    // .limit(resultsLimit)
    // .skip(resultsLimit * 0)
    // .project(projection)
    // .toArray();

    const btc = await axios.get('https://api.coinbase.com/v2/prices/BTC-USD/buy', {
    })
    .then(function (response) {
        console.log(response.data)
        return(response)

    })
    .catch(function (error) {
        console.log(error);
        return res.status(400).send({
            message: 'There was an error in getting the totals'
        });
    });

    const eth = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
    })
    .then(function (response) {
        console.log(response.data)
        return(response)

    })
    .catch(function (error) {
        console.log(error);
        return res.status(400).send({
            message: 'There was an error in getting the totals'
        });
    });

    const xlm = await axios.get('https://api.coinbase.com/v2/prices/XLM-USD/buy', {
    })
    .then(function (response) {
        console.log(response.data)
        return(response)

    })
    .catch(function (error) {
        console.log(error);
        return res.status(400).send({
            message: 'There was an error in getting the totals'
        });
    });

    res.json({ 
        btc_price: btc.data.data.amount,
        eth_price: eth.data.data.amount,
        // ada_price: 5000,
        xlm_price: xlm.data.data.amount,
        // ltc_price: ltc.data.data.amount,
        // xmr_price: 5000
    });
};