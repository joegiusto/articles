import React, { Component, useState, useEffect } from 'react';
import { Helmet } from "react-helmet";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import moment from 'moment'

import * as ROUTES from '../../constants/routes';
import HomePageThreeBase from './components/HomePageThree'

class HomePageFour extends Component {
  constructor(props) {
    super(props);

    this.state = {
      total: 0,
      newsletterCount: 0,
      quotes: [
        {
          quote: 'The ignorance of one voter in a democracy impairs the security of all.',
          author: 'John F. Kennedy'
        },
        {
          quote: 'America will never be destroyed from the outside. If we falter and lose our freedoms, it will be because we destroyed ourselves.',
          author: 'Abraham Lincoln'
        },
        {
          quote: 'Guard against the impostures of pretended patriotism.',
          author: 'George Washington'
        },
        {
          quote: 'Government, even in its best state, is but a necessary evil; in its worst state, an intolerable one.',
          author: 'Thomas Paine'
        },
        {
          quote: 'Don’t throw stones at your neighbors, if your own windows are glass.',
          author: 'Benjamin Franklin'
        },
        {
          quote: 'Our civil rights have no dependence on our religious opinions any more than our opinions in physics or geometry...',
          author: 'Thomas Jefferson'
        }
      ],
      randomQuote: -1
    }
  }

  componentDidMount() {
    const self = this;

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/signin");
    }

    this.getRandomQuote()

    axios
    .post("/api/getDonationTimeframe", {
      start: new Date(2020, moment().month(), 1),
      // end: new Date(2020, 6, 30)
    })
    .then((res) => {
      console.log("Got");
      console.log(res);

      self.setState({
        total: res.data.map((item) => (item.amount) ).reduce((prev, next) => prev + next)
      })
    }) // re-direct to login on successful register
    .catch(err => {
      console.log(err); 
    }
    );

    axios
    .get("/api/getNewsletterCount", {

    })
    .then((res) => {
      console.log(res);

      self.setState({
        newsletterCount: res.data.newsletterCount
      })
    })
    .catch(err => {
      console.log(err); 
    }
    );
  }

  getRandomQuote() {
    this.setState({
      randomQuote: this.getRandomInt(0, this.state.quotes.length - 1)
    })
  }

  getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  render() {

    return(
      <section className="home-page-four-page">

      <Helmet>
        <title>Home - Articles</title>
      </Helmet>

        <div className="home-head-container">
          <div className="container-fluid ">
            <div className="home-head">

              <div className="photo-section">

                <div className="photo">
                  <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props?.user?._id}.jpg` || ''} alt=""/>
                  <div className="blank"></div>
                </div>

                <div>
                  <div className="name">{this.props.user?.first_name} {this.props.user?.last_name}</div>
                  <Link className="d-none d-md-block" to={ROUTES.MESSAGES}><button className="btn btn-articles-light mt-4">0 Messages</button></Link>
                </div>

              </div>

              <div className="weather">

                <div className="icon">
                  <img src="https://icon-library.com/images/cloudy-icon/cloudy-icon-3.jpg" alt=""/>
                </div>

                <div className="details">
                  <div className="temp">
                    50
                    <span className="deg">
                      °F
                    </span>
                  </div>
                </div>

                <div className="details-extra">
                  <div className="precipitation">
                    <img src="https://media.istockphoto.com/vectors/water-drop-symbol-vector-rain-drop-icon-vector-id1156487494?k=6&m=1156487494&s=170667a&w=0&h=RD9wBtK827d_3rdeOvSez9bboMBf4_E_0MIEtus9cUo=" alt="Precipitation Symbol"/>
                    0%
                  </div>
                  <div className="humidity">
                    <img src="https://w7.pngwing.com/pngs/65/666/png-transparent-drawing-humidity-indicator-angle-triangle-illustrator-thumbnail.png" alt="Humidity Symbol"/>
                    0%
                  </div>
                  <div className="wind">
                    <img src="https://www.pinclipart.com/picdir/middle/140-1405202_windy-weather-icon-wind-weather-symbols-clipart.png" alt="Wind Symbol"/>
                    5 mph
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="container-fluid">     

          <div className="tile-section">

            {
              this.props.user?.outset ?
              null
              :
              <div className="tile w-100 outset-tile">
                <Link to={ROUTES.OUTSET}>
                  
                  <div className="tile-content">

                    <div className="attention">Action Needed</div>

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-road"></i>
                      </div>

                      <div className="sub-icons">
                        <i className="fas fa-hiking mr-0"></i>
                      </div>
                    </div>

                    <div className="title">Get started with Articles</div>
                    <div className="text">Please complete your outset to finish setting up your account</div>

                  </div>
                </Link>
              </div>
            }

            <div className="tile-grid">

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Frontpage</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.NEWS}>
                  <div className="tile-content">

                    {/* <div className="corner-notification">
                      <span className="badge badge-danger">5</span>
                    </div> */}

                    <div className="icons">

                      <div className="head-icon">
                        <i className="fas fa-newspaper"></i>
                      </div>
                      
                      <div className="sub-icons">
                        <i className="fas fa-bullhorn"></i>
                        <i className="fas fa-balance-scale mr-0 mr-md-2"></i>
                        <i className="fas fa-ghost mr-0 d-none d-md-inline-block"></i>
                      </div>

                    </div>

                    <div className="title">News</div>
                    <div className="text">Collection of all of our stories, issues and myths.</div>

                    <div className="tile-extra">
                      <div className="status-circle"></div>
                      {this.props.user?.subscriptionsFetched?.length || 0} Updates
                    </div>

                  </div>
                </Link>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Orders</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.STORE_ORDERS}>
                  <div className="tile-content">

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-clipboard-list"></i>
                      </div>
                      <div className="sub-icons">
                        <i className="fas fa-shopping-cart"></i>
                        <i className="fas fa-tshirt mr-0"></i>
                      </div>
                    </div>

                    <div className="title">Orders</div>
                    <div className="text">View any orders you have placed through the store.</div>

                    <div className="tile-extra">
                      {this.props.user?.ordersFetched?.length || 0} Current Order{this.props.user?.ordersFetched?.length === 1 ? '' : 's'}
                    </div>

                  </div>
                </Link>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Reports</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.REPORTS}>
                  <div className="tile-content">

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-receipt"></i>
                      </div>
                      <div className="sub-icons reports">
                        <i className="fas fa-money-check-alt mr-0 mr-md-2"></i>
                        <i className="fas fa-money-bill d-none d-md-inline-block mr-0"></i>
                      </div>
                    </div>

                    <div className="title">Reports</div>
                    <div className="text">Look into our financial records to see our revenues and expenses.</div>

                    <div className="tile-extra">
                      ${(this.state.total / 100).toFixed(2)} Raised This Month
                    </div>

                  </div>
                </Link>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Submissions</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.STORE_SUBMISSIONS}>
                  <div className="tile-content">

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-chalkboard"></i>
                      </div>
                      <div className="sub-icons">
                        <i className="fas fa-pencil-alt"></i>
                        <i className="fas fa-mouse-pointer mr-0 mr-md-2"></i>
                        <i className="fas fa-mouse d-none d-md-inline-block mr-0"></i>
                      </div>
                    </div>

                    <div className="title">
                      Submissions
                    </div>

                    <div className="text">
                      Vote on user designs and enter for a chance to win.
                    </div>

                    <div className="tile-extra">
                      5 Entries So Far
                    </div>

                  </div>
                </Link>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Instagram</div>
                  <div className="tile-update"></div>
                </div> */}

                <a href="https://www.instagram.com/articles.media/" target="_blank" rel="noopener noreferrer">
                  <div className="tile-content instagram">

                    <div className="photo">
                      <i className="icon fab fa-instagram mr-0" aria-hidden="true"></i>
                      <img src="https://www.nationalgeographic.com/content/dam/archaeologyandhistory/2020/02/washington-dc-statehood-explainer/washington-dc-aerial-2548942.adapt.1900.1.jpg" alt=""/>
                    </div>

                    {/* <div className="text">
                      May 20th 2020
                    </div> */}

                    <div className="tile-extra">
                      instagram.com
                    </div>

                  </div>
                </a>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Ethics and Privacy</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.PRIVACY}>
                  <div className="tile-content">

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-binoculars"></i>
                      </div>
                      <div className="sub-icons">
                        <i className="fas fa-search-location mr-0"></i>
                      </div>
                    </div>

                    <div className="title">Ethics and Privacy</div>
                    <div className="text">Whenever we make changes to any of our policies we will alert you.</div>

                    <div className="tile-extra">
                      <span className="badge badge-light">No Changes</span>
                    </div>

                  </div>
                </Link>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Newsletter</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.UPDATES}>
                  <div className="tile-content">

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-envelope-open-text"></i>
                      </div>
                      <div className="sub-icons">
                        <i className="fas fa-at mr-0"></i>
                      </div>
                    </div>

                    <div className="title">Newsletter</div>
                    <div className="text">Weekly emails about everything going on at Articles.</div>

                    <div className="radio-switch-toggle noselect d-none">
                      <input id="false" value="false" name="newsletter" type="radio" checked/>
                      <label htmlFor="false">No</label>

                      <input id="true" value="true" name="newsletter" type="radio"/>
                      <label htmlFor="true">Yes</label>
                    </div>

                    <div className="tile-extra">
                      {this.state.newsletterCount} Subscribed
                    </div>

                  </div>
                </Link>

              </div>

              <div className="tile">

                {/* <div className="tile-header">
                  <div className="tile-title">Account</div>
                  <div className="tile-update"></div>
                </div> */}

                <Link to={ROUTES.SETTINGS_ACCOUNT}>
                  <div className="tile-content">

                    <div className="icons">
                      <div className="head-icon">
                        <i className="fas fa-toolbox"></i>
                      </div>
                      <div className="sub-icons">
                        <i className="fas fa-tools"></i>
                        <i className="fas fa-cog mr-0"></i>
                      </div>
                    </div>

                    <div className="title">Account</div>
                    <div className="text">Manage your account and data.</div>

                    <div className="tile-extra">
                      Last Updated: <span className="badge badge-light">June 2020</span>
                    </div>

                  </div>
                </Link>

              </div>

            </div>

            {/* {this.props.user?.roles?.isAdmin === true &&
              <Link className="w-100 " to={ROUTES.HOME_OLD}>
                <button className="btn btn-articles-light my-2 ml-2 mx-auto d-block">Old Home Page</button>
              </Link>
            } */}

          </div>

          <div className="random-quote">
            <div className="title">Random Political Quotes</div>

            {this.state.randomQuote !== -1 &&
            <div className="quote-container">

              <div className="quote">
                "{this.state.quotes[this.state.randomQuote].quote}"
              </div>

              <div className="author">
                {this.state.quotes[this.state.randomQuote].author}
              </div>

            </div>
            }

            <div className="btn btn-articles-light btn-sm" onClick={() => this.getRandomQuote()}>
              <i className="fas fa-redo "></i>Read Another
            </div>

          </div>

        </div>

      </section>
    )
  }

}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  stories: state.stories,
  myths: state.myths,
  errors: state.errors
});

connect(
  mapStateToProps,
  // { logoutUser, setUserDetails }
)(HomePageThreeBase);

export default connect(
  mapStateToProps,
)(HomePageFour);