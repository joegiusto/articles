import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import NewsLayout from '../../../components/layouts/news.js';

var ws;

if (typeof window !== 'undefined') {
    ws = new WebSocket("wss://ws.bitstamp.net");
}

const subscribeMsg = {
    "event": "bts:subscribe",
    "data": {
        "channel": "live_trades_btcusd"
    }
};

function CryptoPage() {
    const router = useRouter()
    const { param } = router.query

    const [btcPrice, setBtcPrice] = useState(0)
    const [ethPrice, setEthPrice] = useState(0)
    const [xlmPrice, setXlmPrice] = useState(0)

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

    const subscribeBTC = {
        "event": "bts:subscribe",
        "data": {
            "channel": "live_trades_btcusd",
        }
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

        if (typeof window !== 'undefined') {
            // initWebsocket();
        }

        return () => {
            console.log("Stopping Web Socket")
            
            if (typeof window !== 'undefined') {
                // ws.close(1000, 'user');
            }
        };

    }, []);

    function initWebsocket() {
        ws = new WebSocket("wss://ws.bitstamp.net");

        ws.onopen = function (event) {
            console.log(event)

            ws.send( JSON.stringify( subscribeBTC ) );
            // ws.send(JSON.stringify(subscribeBTC, subscribeETH, subscribeXLM));
        };

        ws.onmessage = function (evt) {
            var response = JSON.parse(evt.data);
            /**
             * This switch statement handles message logic. It processes data in case of trade event
             * and it reconnects if the server requires.
             */
            switch (response.event) {
                case 'trade': {

                    switch (response.channel) {

                        case 'live_trades_btcusd': {
                            setBtcPrice(response.data.price)
                            break;
                        }
                        case 'live_trades_ethusd': {

                            setEthPrice(response.data.price)
                            break;
                        }
                        case 'live_trades_xlmusd': {
                            setXlmPrice(response.data.price)
                            break;
                        }

                    }

                    // serializeTrade(response.data);
                    // console.log(response)
                    // setBtcPrice(response.data.price)
                    // break;

                }
                case 'bts:request_reconnect': {
                    initWebsocket();
                    break;
                }
            }

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
        <section className="submissions-page">
            <Head>
                <title>Crypto - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Crypto Page</h2>
                <p className="mb-5">This is the Crypto Page of the news section.</p>

                <h2 className="">Bitcoin: {btcPrice}</h2>
                <h2 className="">Eth: {ethPrice}</h2>
                <h2 className="">Stel: {xlmPrice}</h2>

                <div className="row">

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