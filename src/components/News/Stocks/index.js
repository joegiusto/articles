import React, { useState } from 'react';
import { connect } from "react-redux";

import appStore from '../../../assets/img/app-store/app-store-badge.svg';
import playStore from '../../../assets/img/app-store/google-play-badge.png';

function Stocks(props) {
  // const [search, changeSearch] = useState("");

  const stocks = [
    {
      name: 'AMD',
      exchange: 'NASDAQ',
      ticker: 'AMD',
      price: '94.00',
    },
    {
      name: 'Apple',
      exchange: 'NASDAQ',
      ticker: 'AAPL',
      price: '130.00',
    },
    {
      name: 'GM',
      exchange: 'NYSE',
      ticker: 'GM',
      price: '43.00',
    },
    {
      name: 'Tesla',
      exchange: 'NASDAQ',
      ticker: 'TSLA',
      price: '880.00',
    },
    {
      name: 'Microsoft',
      exchange: 'NASDAQ',
      ticker: 'MSFT',
      price: '219.00',
    },
    {
      name: 'Ford',
      exchange: 'NYSE',
      ticker: 'F',
      price: '9.00',
    },
    {
      name: 'Yum!',
      exchange: 'NYSE',
      ticker: 'YUM',
      price: '107.00',
    },
    {
      name: 'Alphabet',
      exchange: 'NASDAQ',
      ticker: 'GOOGL',
      price: '1790.00',
    }
  ]

  return (
    <section className="stock-section pr-3">
      
      <div className="row">

        <div className="col-lg-3 text-center mb-3">
          <h2>Stocks</h2>

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
    
            <div className="row index-list d-none">
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">DOW JONES</div>
                </div>
              </div>
      
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">S&P 500</div>
                </div>
              </div>
      
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">Nasdaq</div>
                </div>
              </div>
      
              <div className="col-lg-3">
                <div className="card">
                  <div className="card-header">NYSE Composite</div>
                </div>
              </div>
  
              <div className="col-12">
                <hr className="my-3"/>
              </div>
            </div>

            {stocks.map( stock => 
              <div className="col-lg-3">

                <div className="card stock-card mb-3">

                  <div className="card-header d-flex justify-content-between">
                    <h6>{stock.name}</h6>
                    <div className="text-muted">
                      {stock.ticker}
                    </div>
                  </div>

                  <div className="stock-price badge badge-dark">
                    {stock.price}
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
)(Stocks);