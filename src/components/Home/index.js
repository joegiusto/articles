import React, { Component, useState, useEffect } from 'react';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import moment from 'moment'

import * as ROUTES from '../../constants/routes';
import HomePageThreeBase from './components/HomePageThree'

class HomePageFour extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    if (!this.props.auth.isAuthenticated) {
      this.props.history.push("/signin");
    }
  }

  render() {

    return(
      <section className="home-page-four-page">

        <div className="top-bar">
          <div className="container-fluid">

            <div className="photo-section">

              <div className="photo">
                <img src={this.props.user?.photo_url} alt=""/>
              </div>

              <div>
                <div className="name">{this.props.user?.first_name} {this.props.user?.last_name}</div>
                <div className="email">{this.props.user?.email}</div>
              </div>

            </div>

          </div>
        </div>

        <div className="container-fluid">

          <div className="tile-section">

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
                      <i className="fas fa-balance-scale"></i>
                      <i className="fas fa-ghost mr-0"></i>
                    </div>

                  </div>

                  <div className="title">View News</div>
                  <div className="text">Home to stories, issues and myths along with weather and video content.</div>

                  <div className="tile-extra">
                    0 Subscribed Updates
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
                    0 Lifetime Orders
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
                      <i className="fas fa-money-check-alt"></i>
                      <i className="fas fa-money-bill mr-0"></i>
                    </div>
                  </div>

                  <div className="title">$0.00 Raised This Month</div>
                  <div className="text">For more inforamtion about our finances check out our reports.</div>

                  <div className="tile-extra">
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
                      <i className="fas fa-mouse-pointer"></i>
                      <i className="fas fa-mouse mr-0"></i>
                    </div>
                  </div>

                  <div className="title">
                    0 Entries This Period
                  </div>

                  <div className="text">
                    Submit a design for a chance to win <b>$$$</b> and get your product made for you.
                  </div>

                  <div className="tile-extra">
                    0 Lifetime Entries
                  </div>

                </div>
              </Link>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Instagram</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content instagram">
                <div className="photo">
                  <img src="https://www.nationalgeographic.com/content/dam/archaeologyandhistory/2020/02/washington-dc-statehood-explainer/washington-dc-aerial-2548942.adapt.1900.1.jpg" alt=""/>
                </div>
                <div className="icon">
                  <i className="fab fa-instagram mr-0" aria-hidden="true"></i>
                  <div className="text">
                    May 20th 2020
                  </div>
                </div>
              </div>

            </div>

            <div className="tile">
              
              <div className="tile-header">
                <div className="tile-title">Ethics and Privacy</div>
                <div className="tile-update"></div>
              </div>

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
                <div className="text">Whenever we make changes to how we use your data or other criticle changes to the site, we will alert you here.</div>

                <div className="tile-extra">
                  
                </div>
              </div>

            </div>

            

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Newsletter</div>
                <div className="tile-update"></div>
              </div>

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

                <div className="input-toggle">
                  <input id="true" name="newsletter" type="radio"/>
                  <input id="false" name="newsletter" type="radio"/>
                </div>

                <div className="tile-extra">
                  45 Others Subscribed
                </div>

              </div>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Temporarily</div>
                <div className="tile-update"></div>
              </div>

              {/* <Link to={ROUTES.HOME_OLD}> */}
                <div className="tile-content old-home">
                  <Link to={ROUTES.LANDING}><button className="btn btn-articles-light">Landing</button></Link>
                  <Link to={ROUTES.HOME_OLD}><button className="btn btn-articles-light">Old Home</button></Link>
                </div>
              {/* </Link> */}

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