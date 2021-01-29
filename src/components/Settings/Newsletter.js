import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import QRCode from 'qrcode.react';

class Newsletter extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      userReferrals: [],
      subscriptions: [],
    };

  }

  componentDidMount() {
    const self = this;

    this.props.setLocation(this.props.tabLocation);

  }

  render() {

    return (
      <div className="settings-account mb-3">

        {/* Subscription */}

        <div className={"card settings-card mt-3"}>

            <div className="card-header">
              <h5>Newsletter Options</h5>
              <p>Details about your newsletter alerts</p>
            </div>

            <div className="card-body">

              <div className="p-3">
                Newsletter.
              </div>

            </div>

          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Newsletter);