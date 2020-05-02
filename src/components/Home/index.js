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