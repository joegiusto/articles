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

        <div className="card settings-card w-100 mt-3">

        <div className="card-header">
          <h5>Newsletter Settings</h5>
          <p>‎‎Manage your Newsletter settings here</p>
        </div>

        <div className="card-body p-3">

          <div className="newsletter-options">

            <div className="newsletter-option-wrapper noselect">

              <div onClick={() => this.setState({newsletterGeneral: !this.state.newsletterGeneral})} className={"newsletter-option " + (this.state.newsletterGeneral && 'checked')}>

                General

                <div className="box">
                  <i className="fas fa-check mr-0"></i>
                </div>
                
              </div>

              <div className="badge badge-articles">Every Tuesday</div>

            </div>

            <div className="newsletter-option-wrapper noselect">

              <div onClick={() => this.setState({newsletterDev: !this.state.newsletterDev})} className={"newsletter-option " + (this.state.newsletterDev && 'checked')}>

                Dev

                <div className="box">
                  <i className="fas fa-check mr-0"></i>
                </div>

              </div>

              <div className="badge badge-articles">Every Sunday</div>

            </div>
            
          </div>

          <p><b>General:</b> Newsletter focused on general updates about Articles. Financial status, added content, announcements all to your inbox once a week.</p>
          <p><b>Dev:</b> Newsletter geared around the more technical side of things, website development, news internal tools an upcoming features.</p>

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