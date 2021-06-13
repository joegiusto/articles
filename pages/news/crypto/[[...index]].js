import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import Image from 'next/image'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import axios from 'axios'

import NewsLayout from 'components/layouts/news.js';
import ROUTES from 'components/constants/routes';

var ws;

// if (typeof window !== 'undefined') {
//     ws = new WebSocket("wss://ws-feed.pro.coinbase.com")
// }

// const subscribeMsg = {
//     "event": "bts:subscribe",
//     "data": {
//         "channel": "live_trades_btcusd"
//     }
// };

function CryptoPage() {
    const router = useRouter()
    const { param } = router.query

    const [btcCrypto, setBtc] = useState(0)
    const [ethCrypto, setEth] = useState(0)
    const [xlmCrypto, setXlm] = useState(0)
    const [xmrCrypto, setXmr] = useState(0)

    const cryptos = [
        {
          name: 'Bitcoin',
          exchange: '',
          ticker: 'BTC',
          price: '39,529.50',
        },
        {
          name: 'Ethereum',
          exchange: '',
          ticker: 'ETH',
          price: '1,301.65',
        },
        {
          name: 'Tether',
          exchange: '',
          ticker: 'USDT',
          price: '1.00',
        },
        {
          name: 'XRP',
          exchange: '',
          ticker: 'XRP',
          price: '0.33',
        },
        {
          name: 'Litecoin',
          exchange: '',
          ticker: 'LTC',
          price: '174.08',
        },
        {
          name: 'Bitcoin Cash',
          exchange: '',
          ticker: 'BCH',
          price: '568.48',
        },
        {
          name: 'Stellar',
          exchange: '',
          ticker: 'XLM',
          price: '0.29',
        },
        {
          name: 'Monero',
          exchange: '',
          ticker: 'XMR',
          price: '154.90',
        },
        {
          name: 'Tron',
          exchange: '',
          ticker: 'TRX',
          price: '0.03',
        },
    ]

    const subscribe = {
        "type": "subscribe",
        "product_ids": [
            "ETH-USD",
            "ETH-EUR"
        ],
        "channels": [
            "level2",
            "heartbeat",
            {
                "name": "ticker",
                "product_ids": [
                    "ETH-BTC",
                    "ETH-USD"
                ]
            }
        ]
    };

    const subscribeETH = {
        "event": "bts:subscribe",
        "data": {
            "channel": "live_trades_ethusd",
        }
    };

    const subscribeXLM = {
        "event": "bts:subscribe",
        "data": {
            "channel": "live_trades_xlmusd",
        }
    };

    // console.log(router.pathname)
    // console.log(param);

    useEffect(() => {

        // initWebsocket()

        axios.get('/api/news/crypto', {

		})
		.then( (response) => {
            console.log(response)
            setBtc(response.data.btc)
            setEth(response.data.eth)
            setXlm(response.data.xlm)
            // setXmr(response.data.xmr)
		})
		.catch( (error) => {
		    console.log(error);
		});

        // return () => {
        //     console.log("Stopping Web Socket")
            
        //     if (typeof window !== 'undefined') {
        //         // ws.close(1000, 'user');
        //     }
        // };

    }, []);

    function initWebsocket() {
        // ws = new WebSocket("wss://ws-feed.pro.coinbase.com");

        ws.onopen = function (event) {
            console.log(event)

            ws.send( JSON.stringify( subscribe ) );
            // ws.send(JSON.stringify(subscribeBTC, subscribeETH, subscribeXLM));
        };

        ws.onmessage = function (evt) {
            var response = JSON.parse(evt.data);
            console.log(response)
            /**
             * This switch statement handles message logic. It processes data in case of trade event
             * and it reconnects if the server requires.
             */
            // switch (response.event) {
            //     case 'trade': {

            //         switch (response.channel) {

            //             case 'live_trades_btcusd': {
            //                 setBtcPrice(response.data.price)
            //                 break;
            //             }
            //             case 'live_trades_ethusd': {

            //                 setEthPrice(response.data.price)
            //                 break;
            //             }
            //             case 'live_trades_xlmusd': {
            //                 setXlmPrice(response.data.price)
            //                 break;
            //             }

            //         }

            //         // serializeTrade(response.data);
            //         // console.log(response)
            //         // setBtcPrice(response.data.price)
            //         // break;

            //     }
            //     case 'bts:request_reconnect': {
            //         initWebsocket();
            //         break;
            //     }
            // }

        };

        /**
         * In case of unexpected close event, try to reconnect.
         */
        ws.onclose = function (event) {
            console.log('Websocket connection closed');
            console.log(event);

            if ( event.code !== 1000 ){
                console.log('Not code 1000, will retry');
                initWebsocket();
            }

        };
    }
  
    return(
        <section className="crypto-page">
            <Head>
                <title>Crypto - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Crypto</h2>
                <DropdownButton variant="articles-light" id="dropdown-basic-button" title={ <span><i className="fas fa-filter"></i>Market Cap</span> }>
                    <Link href={`${ROUTES.NEWS_CRYPTO}/market-cap`}><div className="btn dropdown-item p-2 pl-4">Market Cap</div></Link>
                    <Link href={`${ROUTES.NEWS_CRYPTO}/watch-list`}><div className="btn dropdown-item p-2 pl-4">Watch List</div></Link>
                    {/* <Dropdown.Item href={`${ROUTES.NEWS_CRYPTO}/watch-list`}>Watchlist</Dropdown.Item> */}
                </DropdownButton>
                {/* <p className="mb-5">This is the Crypto Page of the news section.</p> */}

                <div className="crypto-cards d-flex justify-content-between mt-4 mb-4">
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Bitcoin: { parseFloat(btcCrypto.price).toLocaleString('en-US', {maximumFractionDigits:2}) }</h5>
                        </div>
                        <div className="card-body text-center">
                            <div>
                                
                            </div>
                            {/* <img width="50px" height="50px" src="https://lh3.googleusercontent.com/proxy/s5Io0jkECZ8R6szs1yvf0zeIN8tnBU5VMRytOgSOtGACO6u1J63qzFrgkWIXsihLQa3awbDXREJ46PWof9Xmoq4-sB9180Mc741tohDV31fpVDV0ukD1XGhROv0" alt="" /> */}
                            <a className="btn btn-articles-light" target="_blank" href={btcCrypto.link}>View</a>
                            <a className="watchlist-button d-block"><i className="fad fa-plus"></i>Add to watch-list</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Ethereum: { parseFloat(ethCrypto.price).toLocaleString('en-US', {maximumFractionDigits:2}) }</h5>
                        </div>
                        <div className="card-body text-center">
                            <img width="50px" height="50px" src="https://lh3.googleusercontent.com/proxy/s5Io0jkECZ8R6szs1yvf0zeIN8tnBU5VMRytOgSOtGACO6u1J63qzFrgkWIXsihLQa3awbDXREJ46PWof9Xmoq4-sB9180Mc741tohDV31fpVDV0ukD1XGhROv0" alt="" /><a className="btn btn-articles-light" target="_blank" href={ethCrypto.link}>View</a>
                            <a className="watchlist-button d-block"><i className="fad fa-plus"></i>Add to watch-list</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Stellar: { parseFloat(xlmCrypto.price).toLocaleString('en-US', {maximumFractionDigits:2}) }</h5>
                        </div>
                        <div className="card-body text-center">
                            <img width="50px" height="50px" src="https://lh3.googleusercontent.com/proxy/s5Io0jkECZ8R6szs1yvf0zeIN8tnBU5VMRytOgSOtGACO6u1J63qzFrgkWIXsihLQa3awbDXREJ46PWof9Xmoq4-sB9180Mc741tohDV31fpVDV0ukD1XGhROv0" alt="" /><a className="btn btn-articles-light" target="_blank" href={xlmCrypto.link}>View</a>
                            <a className="watchlist-button d-block"><i className="fad fa-plus"></i>Add to watch-list</a>
                        </div>
                    </div>
                    <div className="card">
                        <div className="card-header">
                            <h5 className="mb-0">Monero: 0</h5>
                        </div>
                        <div className="card-body text-center">
                            <img width="50px" height="50px" src="https://lh3.googleusercontent.com/proxy/s5Io0jkECZ8R6szs1yvf0zeIN8tnBU5VMRytOgSOtGACO6u1J63qzFrgkWIXsihLQa3awbDXREJ46PWof9Xmoq4-sB9180Mc741tohDV31fpVDV0ukD1XGhROv0" alt="" /><a className="btn btn-articles-light" target="_blank" href={'https://www.coinbase.com/price/monero'}>View</a>
                            <a className="watchlist-button d-block"><i className="fad fa-plus"></i>Add to watch-list</a>
                        </div>
                    </div>
                </div>

                <div className="row d-none">

                    {cryptos.map( crypto => 
                    <div className="col-lg-3">

                        <div className="card stock-card mb-3">

                        <div className="card-header d-flex justify-content-between">
                            <h6>{crypto.name}</h6>
                            <div className="text-muted">
                                {crypto.ticker}
                            </div>
                        </div>

                        <div className="stock-price badge badge-dark">
                            {crypto.price}
                        </div>

                        </div>

                    </div>
                    )}

                </div>

            </div>
        </section>
    )
}

CryptoPage.Layout = NewsLayout;
export default CryptoPage;