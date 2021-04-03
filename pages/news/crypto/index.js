import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import NewsLayout from '../../../components/layouts/news.js';

function CryptoPage() {
    const router = useRouter()
    const { param } = router.query
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

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="submissions-page">
            <Head>
                <title>Crypto - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Crypto Page</h2>
                <p className="mb-5">This is the Crypto Page of the news section.</p>

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