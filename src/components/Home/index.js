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
      total: 0
    }
  }

  componentDidMount() {
    const self = this;

    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/signin");
    }

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
  }

  render() {

    return(
      <section className="home-page-four-page">

      <Helmet>
        <title>Home - Articles</title>
      </Helmet>

        <div className="top-bar">
          <div className="container-fluid">

            <div className="photo-section">

              <div className="photo">
                <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props?.user?._id}.jpg` || ''} alt=""/>
                <div className="blank"></div>
              </div>

              <div>
                <div className="name">{this.props.user?.first_name} {this.props.user?.last_name}</div>
                <div className="email">{this.props.user?.email}</div>
                <Link to={ROUTES.MESSAGES}><div className="badge badge-light mt-3">0 Messages</div></Link>
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

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Frontpage</div>
                <div className="tile-update"></div>
              </div>
              
              <Link to={ROUTES.NEWS}>
                <div className="tile-content">

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

                  <div className="title">View News</div>
                  <div className="text">Home to stories, issues and myths along with weather and video content.</div>

                  <div className="tile-extra">
                    {this.props.user?.subscriptionsFetched?.length || 0} Updates
                  </div>

                </div>
              </Link>
              
            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Orders</div>
                <div className="tile-update"></div>
              </div>

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

                  <div className="title">0 Active Orders</div>
                  <div className="text">To help support Articles order from our store.</div>

                  <div className="tile-extra">
                    {this.props.user?.ordersFetched?.length || 0} Lifetime Orders
                  </div>

                </div>
              </Link>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Reports</div>
                <div className="tile-update"></div>
              </div>

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

                  <div className="title">${(this.state.total / 100).toFixed(2)} Raised This Month</div>
                  <div className="text">For more inforamtion about our finances check out our reports.</div>

                  <div className="tile-extra">
                    $250.00 Raised Alltime
                  </div>

                </div>
              </Link>
              

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Submissions</div>
                <div className="tile-update"></div>
              </div>

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
                    No Entry This Period
                  </div>

                  <div className="text">
                    Submit a design for a chance to win some money and get your product made!
                  </div>

                  <div className="tile-extra">
                    5 Entries So Far
                  </div>

                </div>
              </Link>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Instagram</div>
                <div className="tile-update"></div>
              </div>

              <a href="https://www.instagram.com/articles.media/" target="_blank" rel="noopener noreferrer">
                <div className="tile-content instagram">

                  <div className="photo">
                    <i className="icon fab fa-instagram mr-0" aria-hidden="true"></i>
                    <img src="https://www.nationalgeographic.com/content/dam/archaeologyandhistory/2020/02/washington-dc-statehood-explainer/washington-dc-aerial-2548942.adapt.1900.1.jpg" alt=""/>
                  </div>

                  <div className="text">
                    May 20th 2020
                  </div>

                  <div className="tile-extra">
                    Opens instagram.com
                  </div>

                </div>
              </a>

            </div>

            <div className="tile">
              
              <div className="tile-header">
                <div className="tile-title">Ethics and Privacy</div>
                <div className="tile-update"></div>
              </div>

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
  
                  <div className="title">No Changes</div>
                  <div className="text">Whenever we make changes, we will alert you here.</div>
  
                  <div className="tile-extra">
                    Last Change: <span className="badge badge-light">June 2020</span>
                  </div>

                </div>
              </Link>

            </div>

            

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Newsletter</div>
                <div className="tile-update"></div>
              </div>

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

                  <div className="title">Weekly Updates</div>
                  <div className="text">Get sent an mail about everything going on with Articles. Sent out every Sunday.</div>

                  <div className="radio-switch-toggle noselect d-none">
                    <input id="false" value="false" name="newsletter" type="radio" checked/>
                    <label htmlFor="false">No</label>

                    <input id="true" value="true" name="newsletter" type="radio"/>
                    <label htmlFor="true">Yes</label>
                  </div>

                  <div className="tile-extra">
                    45 Others Subscribed
                  </div>

                </div>
              </Link>
              
            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Account</div>
                <div className="tile-update"></div>
              </div>

              <Link to={ROUTES.SETTINGS}>
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

                  <div className="title">Settings</div>
                  <div className="text">Manage your account and data.</div>

                  <div className="tile-extra">
                    Updated: <span className="badge badge-light">June 2020</span>
                  </div>

                </div>
              </Link>

            </div>

            {this.props.user?.roles?.isAdmin === true ?
            <Link className="w-100" to={ROUTES.HOME_OLD}>
              <button className="btn btn-articles-light my-2 ml-2 mx-auto d-block">Old Home Page</button>
            </Link>
            :
            null
            }

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