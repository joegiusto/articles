import { connectToDatabase } from "util/mongodb";

import axios from 'axios'

export default async (req, res) => {

    let error = false;

    const AppleStock = await axios.get('https://api.polygon.io/v1/open-close/AAPL/2021-06-11', {
        params: {
            unadjusted: false,
            apiKey: process.env.POLYGON_API_KEY
        }
    })
    .then(function (response) {
        console.log(response.data)
        return(response.data)

    })
    .catch(function (error) {
        // console.log(error);
        console.log("Stock Error".red)
        error = true;
        // if (error != true) {
        //     error = true;
        //     return res.status(400).send({
        //         message: 'There was an error in getting the stock'
        //     });
        // }
    });

    const microsoft = await axios.get('https://api.polygon.io/v1/open-close/MSFT/2021-06-11', {
        params: {
            unadjusted: false,
            apiKey: process.env.POLYGON_API_KEY
        }
    })
    .then(function (response) {
        console.log(response.data)
        return(response.data)

    })
    .catch(function (error) {
        // console.log(error);
        console.log("Stock Error".red)
        error = true;
        // if (error != true) {
        //     error = true;
        //     return res.status(400).send({
        //         message: 'There was an error in getting the stock'
        //     });
        // }
    });

    const TeslaStock = await axios.get('https://api.polygon.io/v1/open-close/TSLA/2021-06-11', {
        params: {
            unadjusted: false,
            apiKey: process.env.POLYGON_API_KEY
        }
    })
    .then(function (response) {
        console.log(response.data)
        return(response.data)

    })
    .catch(function (error) {
        // console.log(error);
        console.log("Stock Error".red)
        error = true;
        // if (error != true) {
        //     error = true;
        //     return res.status(400).send({
        //         message: 'There was an error in getting the stock'
        //     });
        // }
    });

    // const eth = await axios.get('https://api.coinbase.com/v2/prices/ETH-USD/buy', {
    // })
    // .then(function (response) {
    //     console.log(response.data)
    //     return(response)

    // })
    // .catch(function (error) {
    //     console.log(error);
    //     return res.status(400).send({
    //         message: 'There was an error in getting the totals'
    //     });
    // });

    // const xlm = await axios.get('https://api.coinbase.com/v2/prices/XLM-USD/buy', {
    // })
    // .then(function (response) {
    //     console.log(response.data)
    //     return(response)

    // })
    // .catch(function (error) {
    //     console.log(error);
    //     return res.status(400).send({
    //         message: 'There was an error in getting the totals'
    //     });
    // });

    // const xmr = await axios.get('https://api.coinbase.com/v2/prices/XMR-USD/buy', {
    // })
    // .then(function (response) {
    //     console.log(response.data)
    //     return(response)

    // })
    // .catch(function (error) {
    //     console.log(error);
    //     return res.status(400).send({
    //         message: 'There was an error in getting the totals'
    //     });
    // });

    if (error !== true) {
        res.json({ 
            apple: AppleStock,
            tesla: TeslaStock,
            microsoft
        });
    }

};