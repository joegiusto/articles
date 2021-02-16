import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import QRCode from 'qrcode.react';

class Account extends Component {
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

    this.getUserReferrals();
    this.getUserSubscriptions();
  }

  getUserReferrals() {
    let self = this;

    axios.post('/api/getUserReferrals', {

    })
    .then(function (response) {

      console.log(response)

      self.setState({
        userReferrals: response.data
      })

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUserSubscriptions() {
    const self = this;

    axios.post('/api/listSubscriptions', {
       
    })
    .then(function (response) {

      // socket.emit('deleteUser', id);

      self.setState({
        subscriptions: response.data.data
      });

      console.log(response)

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="settings-account mb-3">

        {/* Subscription */}

        <div className={"card settings-card mt-3"}>

            <div className="card-header">
              <h5>Membership Status</h5>
              <p>Details about your membership and contributions</p>
            </div>

            <div className="card-body">

              <div className="p-3">
                You are not a member, consider supporting Articles to become a member and receive benefits such as ad free browsing experience and store discounts.
              </div>

              <div className="plans d-flex justify-content-center">
  
                <div className={"plan d-flex flex-column " + (this.state.subscriptions[0]?.plan.product === 'prod_I2y7aiDpmeSkFP' ? 'active' : '')}>

                  <div className="active-badge">
                    Active
                  </div>

                  {/* <i className="fas fa-user"></i> */}
                  <img src="https://cdn.iconscout.com/icon/premium/png-512-thumb/usa-1495530-1266384.png" alt=""/>
                  <div className="type">Supporter Plan</div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Ad Free Browsing</li>
                    <li className="list-group-item">Private Video Calls with Staff</li>
                    <li className="list-group-item">Exclusive Store Items</li>
                    <li className="list-group-item">&nbsp;</li>
                    <li className="list-group-item">&nbsp;</li>
                  </ul>

                  <div className="price">$1 / mo</div>

                  {(this.state.subscriptions[0]?.plan.product === 'prod_I2y7aiDpmeSkFP' ? 
                  <button className="btn btn-danger btn-sm">Cancel</button>
                  :
                  <button className="btn btn-articles-light btn-sm">Join</button>
                  )}
                  
                </div>
  
                <div className={"plan d-flex flex-column ml-3 " + (this.state.subscriptions[0]?.plan.product === 'prod_I2y7aiDpmeSkFP' ? 'active' : '')}>

                  {/* <i className="fas fa-medal"></i> */}
                  <img src="https://cdn1.iconfinder.com/data/icons/japanese-landmarks-color/512/statue_of_liberty-512.png" alt=""/>
                  <div className="type">Founder Plan</div>

                  <ul className="list-group list-group-flush">
                    <li className="list-group-item">Ad Free Browsing</li>
                    <li className="list-group-item">Private Video Calls with Staff</li>
                    <li className="list-group-item">Exclusive Store Items</li>
                    <li className="list-group-item">Free US Shipping (inc AK, HI, UM)</li>
                    <li className="list-group-item">Store Discounts</li>
                  </ul>
                  
                  <div className="price">$5 / mo</div>

                  {/* <button className="btn btn-articles-light btn-sm">Join</button> */}
                  {(this.state.subscriptions[0]?.plan.product === 'prod_I2y7aiDpmeSkFP' ? 
                  <button className="btn btn-danger btn-sm">Switch</button>
                  :
                  <button className="btn btn-articles-light btn-sm">Join</button>
                  )}
                </div>

                {/* <div className="or">- Or -</div>

                <div className="plan d-flex flex-column ml-3">
                  <i className="fas fa-shopping-cart"></i>
                  <div className="type">Store Bundles</div>
                  <div>0 Purchases</div>
                  <button className="btn btn-articles-light btn-sm">Shop</button>
                </div>

                <div className="plan d-flex flex-column ml-3">
                  <i className="far fa-share-square"></i>
                  <div className="type">Referrals</div>
                  <div>1 Week / referrals</div>
                  <button className="btn btn-articles-light btn-sm">Refer</button>
                </div> */}

              </div>

              <div className="active-plan">

                {/* <div>Next Charge: 12/14/20</div> */}

                {this.state.subscriptions.length > 0 ?
                  <div className="">
                    {this.state.subscriptions.map(plan => 

                      <div className="plan mb-2">

                        <div className="heading">
                          Current Plan: {plan.id}
                        </div>

                        <div className="">
                          Next Charge: {moment.unix(plan.current_period_end).format('LLL')}
                        </div>

                        <button>Cancel</button>

                      </div>  
                    )}
                  </div>
                  :
                  null
                }

                <div className="pending-credits-container">
                  <div className="title">
                    Pending Credits
                  </div>
                  <div>Store Purchase - 1 month</div>
                  <div>Store Purchase - 1 month</div>
                </div>

                <div>Amount: $1.00</div>

              </div>

              <div className="referral-section">
                <h3 className="title">Referral Link</h3>

                <div className="d-flex">

                  <QRCode value={`https://articles.media/signup?referral=${this.props.user_id}`} />

                  <div className="ml-2">
                    
                    <h5 className="title">Get subscription benifits by refering friends to sign up</h5>
                    <div>https://articles.media/signup?referral={this.props.user_id}</div>

                    <h5 className="title mt-2">User Referrals <span className="border badge badge-light">{this.state.userReferrals.length}</span></h5>

                    {this.state.userReferrals.length > 0 ? 

                    this.state.userReferrals.map(referral => 
                      <div className="border border-dark p-1">
                        <div>{moment(referral.sign_up_date).format("LLL")} </div>
                        <div>{referral.first_name} {referral.last_name}</div>
                        {/* <div>Outset: {referral.outset ? 'Complete' : 'Not Complete'}</div> */}
                      </div>
                    )

                    :

                    <small>No user referrals found.</small>

                    }

                  </div>

                </div>
                
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
)(Account);