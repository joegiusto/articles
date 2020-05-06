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
                <div className="tile-content frontpage">

                  <div className="frontpage-count">
                    <div className="count">0</div>
                    <div className="item">Storeis</div>
                  </div>

                  <div className="frontpage-count">
                    <div className="count">0</div>
                    <div className="item">Issues</div>
                  </div>

                  <div className="frontpage-count">
                    <div className="count">0</div>
                    <div className="item">Myths</div>
                  </div>

                </div>
              </Link>
              
            </div>


            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">Orders</div>
                <div className="tile-update"></div>
              </div>

              <Link to={ROUTES.STORE_ORDERS}><div className="tile-content"></div></Link>

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
                <div className="tile-title">Other</div>
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
                <div className="tile-title">Other</div>
                <div className="tile-update"></div>
              </div>

              <div className="tile-content">

              </div>

            </div>

            <div className="tile">

              <div className="tile-header">
                <div className="tile-title">View Old</div>
                <div className="tile-update"></div>
              </div>

              <Link to={ROUTES.HOME_OLD}>
                <div className="tile-content"></div>
              </Link>

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