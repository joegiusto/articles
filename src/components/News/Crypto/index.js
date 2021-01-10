import React, { useState } from 'react';
import { connect } from "react-redux";

import appStore from '../../../assets/img/app-store/app-store-badge.svg';
import playStore from '../../../assets/img/app-store/google-play-badge.png';

function Crypto(props) {
  // const [search, changeSearch] = useState("");

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

  return (
    <section className="stock-section pr-3">
      
      <div className="row">

        <div className="col-lg-3 text-center mb-3">
          <h2>Cryptos</h2>

          <div className="card">
            <div className="card-body text-center">
              <h6 className="text-muted">Powered By:</h6>
              <hr className="my-2"/>  
              <img className="img-fluid" width="200px" src="https://www.investopedia.com/thmb/A7KgNn1a_0wsF1VN49xX4-gD5l0=/1627x400/filters:no_upscale()/robinhood-productcard-5c743379c9e77c00010d6c5e.png" alt=""/>
            </div>
          </div>

          <div className="row download-links mt-2">
            <div className="col-6">
              <img class="app-badge" height="40px" src={appStore} alt=""/>
            </div>
            <div className="col-6">
              <img class="app-badge" height="40px" src={playStore} alt=""/>
            </div>
          </div>

        </div>
  
        <div className="col-lg-9">
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

      </div>

    </section>
  );
}

const mapStateToProps = state => ({
  // myths: state.myths,
});

export default connect(
  mapStateToProps
)(Crypto);