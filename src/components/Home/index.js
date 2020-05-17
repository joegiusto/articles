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

  test() {
    console.log("Test")
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
                      <i class="fas fa-newspaper"></i>
                    </div>
                    
                    <i class="fas fa-bullhorn"></i>
                    <i class="fas fa-balance-scale"></i>
                    <i class="fas fa-ghost"></i>

                  </div>
                  <div className="title">View News</div>
                  <div className="text">Home to stories, issues and myths along with weather and video content.</div>

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
                    <div className="head">
                      <i class="fas fa-clipboard-list"></i>
                    </div>
                    <i class="fas fa-shopping-cart"></i>
                  </div>

                  <div className="title">0 Active Orders</div>
                  <div className="text">To help support Articles order from our store.</div>

                </div>
              </Link>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Submissions</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content"></div>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Other</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content"></div>

            </div>

            <div className="tile">
              
              <div className="tile-header">
                <div className="tile-title">Ethics and Privacy</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content">
                <div className="title">No Changes</div>
                <div className="text">Whenever we make changes to how we use your data or other criticla changes to the site, we wilol alert you here.</div>
              </div>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Reports</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content">
                <div className="title">$0.00 Raised This Month</div>
                <div className="text">For more inforamtion about our finances check out our reports.</div>
              </div>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Newsletter</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content">
                <div className="icons">
                  <div className="head">
                    <i class="fas fa-envelope-open-text"></i>
                  </div>
                </div>
                <div className="title">Weekly Updates</div>
                <div className="text">Get sent an mail about everything going on with Articles. Sent out every Sunday.</div>
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