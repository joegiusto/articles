import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import { Switch, Route, Link } from 'react-router-dom';
import { withRouter } from "react-router";

import * as ROUTES from '../../constants/routes';

class Billing extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      userPaymentMethods: [],
      userPaymentMethodsLoading: false,
      defaultUserPaymentMethod: '',

      userOrders: [],
      userOrdersLoading: false,

      userDonations: [],
      userDonationsLoading: false
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    this.getUserPaymentMethods();
    this.getUserDonations();
    this.getStripeUser();
    this.getUserOrders();
  }

  getStripeUser() {
    let self = this;

    axios.post('/api/getStripeCustomer', {

    })
    .then(function (response) {
      console.log(response)
      self.setState({
        defaultUserPaymentMethod: response.data.invoice_settings.default_payment_method
      })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getUserPaymentMethods() {
    const self = this;

    this.setState({userPaymentMethodsLoading: true})
    axios.post('/api/getUserPaymentMethods', {

    })
    .then(function (response) {
      console.log("Good")
      self.setState({userPaymentMethodsLoading: false})

      console.log(response)
      console.log(response.data.data)

      self.setState({userPaymentMethods: response.data.data})
    })
    .catch(function (error) {
      console.log("Bad")
      self.setState({userPaymentMethodsLoading: false})
      console.log(error);
    });
  }

  getUserDonations() {
    const self = this;

    this.setState({userDonationsLoading: true})

    axios.post('/api/getUserDonations', {
      // _id: this.props.user_id
    })
    .then(function (response) {

      // console.log(response.data);

      self.setState({
        userDonations: response.data,
        userDonationsLoading: false
      }, () => {
        // self.mergeStuff()
      });

    })
    .catch(function (error) {
      console.log(error);
      self.setState({
        userDonationsLoading: false
      })
    });
  }

  getUserOrders() {
    const self = this;

    this.setState({userOrdersLoading: true})

    axios.post('/api/getUserOrders', {

    })
    .then(function (response) {
      console.log(response.data);

      self.setState({
        previousUserOrders: response.data,
        userOrdersLoading: false
      });

    })
    .catch(function (error) {
      console.log(error.response);

      self.setState({
        userOrdersLoading: false
      })
    });
  }

  setDefaultPaymentMethod(payment_method_id) {
    let self = this;

    axios.post('/api/setDefaultPaymentMethod', {
      payment_method_id
    })
    .then(function (response) {
      console.log(response)
      self.setState({
        defaultUserPaymentMethod: response.data.invoice_settings.default_payment_method
      })
    })
    .catch(function (error) {
      console.log(error.response);
    });
  }

  redirectToOrder(id) {
    this.props.history.push(ROUTES.STORE_ORDERS + '/' + id)
  }

  render() {

    return (
      <div className="settings-account mb-3">
        
        {/* Billing */}

        <div className={"card settings-card mt-3"}>

            <div className="card-header">
              <h5>Payment Methods</h5>
              <p>Saved payment methods for subscriptions and orders</p>
            </div>

            <div className="card-body">

              <div className="info donations w-100 table-responsive" style={{borderBottom: '1px solid #000'}}>
                <table className="table mb-0">
                  <thead className="">
                    <tr>
                      <th scope="col">Brand</th>
                      <th scope="col">Last 4</th>
                      <th scope="col">Exp</th>
                      <th scope="col">Primary</th>
                    </tr>
                  </thead>

                  <tbody>
                    {
                      this.state.userPaymentMethodsLoading ? 
                      <tr>
                        <th>Payment Methods Loading...</th>
                      </tr>
                      :
                      this.state.userPaymentMethods?.map(card => 
                        <tr className="donation">
                          <th scope="row" className="" >{card.card.brand}</th>
                          <td className="">{card.card.last4}</td>
                          <td className="">{card.card.exp_month}/{card.card.exp_year}</td>
                          <td className="">
                            {
                            this.state.defaultUserPaymentMethod === card.id ?
                            <span className="badge badge-primary">Primary</span>
                            :
                            <span className="badge badge-secondary" onClick={() => this.setDefaultPaymentMethod(card.id)}>Make Primary</span>
                            }
                          </td>
                        </tr>  
                      )
                    }
                    
                  </tbody>

                  {/* {this.state.previousUserDonationsLoading ? null : this.state.previousUserDonations.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''} */}
                  
                </table>

              </div>

              <button className="btn btn-articles-light my-3 mx-auto w-100 d-block" style={{maxWidth: '300px'}}>Add Payment Method</button>

              {/* <Elements stripe={stripePromise}>
                <CheckoutForm/>
              </Elements> */}

            </div>

          </div>

          <div className={"card settings-card mt-3"}>

            <div className="card-header">
              <h5>Donation History</h5>
              <p>Overview of recent donations made</p>
            </div>

            <div className="card-body">

              <div className="info-snippet p-0">

                {/* <div className="label">ISSUES</div> */}

                <div className="info donations w-100 table-responsive">
                  <table className="table mb-0">
                    <thead className="">
                      <tr>
                        <th scope="col">Order #</th>
                        <th scope="col">Date</th>
                        <th scope="col">Type</th>
                        <th scope="col">Amount</th>
                      </tr>
                    </thead>

                    <tbody>

                      {this.state.userDonationsLoading ? 
                        <tr>
                          <th>User Donations Loading...</th>
                        </tr>

                        :

                        this.state.userDonations.length > 1 ?

                          this.state.userDonations.map(donation => (
                            <tr className="donation">
                              <th scope="row" className="donation-id">{donation._id}</th>
                              <td className="date">{moment(donation.date).format('LLL')}</td>
                              <td className="type">Donation</td>
                              <td className="amount">${(donation.amount / 100).toFixed(2)}</td>
                            </tr>  
                          ))

                        :

                          <tr>
                            <th>No Donations yet, place one here <Link tp={ROUTES.DONATE}>Donate</Link></th>
                          </tr>
                      }

                    </tbody>

                    {/* {this.state.previousUserDonationsLoading ? null : this.state.previousUserDonations.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''} */}
                    
                  </table>

                  

                </div>

              </div>

            </div>

          </div>

          <div className={"card settings-card mt-3"}>

            <div className="card-header">
              <h5>Order History</h5>
              <p>Overview of recent orders made</p>
            </div>

            <div className="card-body">
              
              <div className="info billing-orders w-100 table-responsive">
                <table className="table table-hover mb-0">
                  <thead className="">
                    <tr>
                      <th scope="col">Order #</th>
                      <th scope="col">Date</th>
                      <th scope="col">For</th>
                      <th scope="col">Amount</th>
                    </tr>
                  </thead>

                  <tbody>
                    {this.props.orders.length > 0 ? 

                      this.props.orders.map(order => 
                        <tr className="order" onClick={() => this.redirectToOrder(order._id)}>
                          <th scope="row" className="order-id">{order._id}</th>
                          <td className="date">{moment(order.date).format('LLL')}</td>
                          <td className="type">{order.for}</td>
                          <td className="amount">${(order.payment.total / 100).toFixed(2)}</td>
                        </tr>  
                      )
                      :
                      <tr>
                        <th>No Orders yet, place one at the <Link tp={ROUTES.STORE}>Store</Link></th>
                      </tr>

                    } 
                  </tbody>

                  {/* {this.state.previousUserOrdersLoading ? null : this.state.previousUserOrders.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''} */}
                  
                </table>

              </div>

            </div>

          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id,
  orders: state.auth.user_details.ordersFetched,
});

export default connect(
  mapStateToProps,
)(withRouter(Billing));