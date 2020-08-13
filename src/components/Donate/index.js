import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorizationHide } from '../Session';
import { withFirebase } from '../Firebase';

import { connect } from "react-redux";

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom'
import moment from 'moment';

import {CardElement, Elements, ElementsConsumer} from '@stripe/react-stripe-js';
import {loadStripe} from '@stripe/stripe-js';

import ArticlesBackground from '../../assets/img/banner.jpg'
import power from '../../assets/img/Store/power.png'
  
const STRIPE_PUBLIC_KEY = 'pk_live_VE6HtyhcU3HCa6bin4uKgFgL00jeOY6SEW'; // TODO: PUT YOUR STRIPE PUBLISHABLE KEY HERE
// const FIREBASE_FUNCTION = 'https://us-central1-articles-1776.cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE

const stripePromise = loadStripe(STRIPE_PUBLIC_KEY);

const stripe = window.Stripe(STRIPE_PUBLIC_KEY);
const elements = stripe.elements();

const charge_amount = 1000;
const charge_currency = 'usd';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {color: '#fce883'},
      '::placeholder': {color: '#87bbfd'},
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const CardField = ({onChange}) => (
  <fieldset className="FormGroup">
    <div className="FormRow">
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  </fieldset>
);

class DonateBase extends Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: 1000,
      privacy: false
    };

  }

  componentWillUnmount() {
    console.log("Something has to happen here because of crash")
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {

  }
  
  render(props) {
    return (
      <div className="donate-page">

        <Elements stripe={stripePromise}>
          <div className="donate-form">
            <div className="inner">

              <div className="title">Name</div>

              {/* <div className="name-plate"> */}

                {this.props.auth.isAuthenticated ? 
                <div className="name-plate">

                  <div className="date">
                    {moment().format("LL")}
                  </div>

                  <div className="name">
                    {this.state.privacy === false ? `${this.props.user?.first_name} ${this.props.user?.last_name}` : `Private Donor`}
                  </div>

                  <div className="d-flex">
                    <div onClick={() => this.setState({privacy: false})} className={"privacy-pick " + (this.state.privacy === false ? 'active' : '')}>Show Name</div>
                    <div onClick={() => this.setState({privacy: true})} className={"ml-2 privacy-pick " + (this.state.privacy === true ? 'active' : '')}>Hide Name</div>
                  </div>

                </div>
                 : 
                 <div className="name-plate">

                  {/* <div className="date">
                    {moment().format("LL")}
                  </div> */}

                  <div className="name">
                    {`Sign In`}
                  </div>

                  <div className="date">We need you to sign in or create an account before we can accept your donation</div>

                  <div className="buttons mt-4">
                    <Link to={ROUTES.SIGN_UP}><div className="btn btn-articles-light">Sign Up</div></Link>
                    <Link to={ROUTES.SIGN_IN}><div className="btn btn-articles-light ml-2">Sign In</div></Link>
                  </div>

                 </div>
                }

                
              
              {/* </div> */}

              {/* <input className="form-control" type="text" value={`${this.props.user?.first_name} ${this.props.user?.last_name}` || ''}/> */}

              <div className={this.props.auth.isAuthenticated ? '' : 'd-none'}>
                <div className="title">Amount:</div>
                <div className="amount-group">
                  <input className="form-control" type="text" value={this.state.amount} placeholder="$0.00"/>
                  <button onClick={() => this.setState({amount: 100})} className={"btn btn-articles-light " + (this.state.amount === 100 ? 'btn-articles-light alt' : 'btn-articles-light') }>$1</button>
                  <button onClick={() => this.setState({amount: 500})} className={"btn btn-articles-light " + (this.state.amount === 500 ? 'btn-articles-light alt' : 'btn-articles-light') }>$5</button>
                  <button onClick={() => this.setState({amount: 1000})} className={"btn btn-articles-light " + (this.state.amount === 1000 ? 'btn-articles-light alt' : 'btn-articles-light') }>$10</button>
                  <button onClick={() => this.setState({amount: 2000})} className={"btn btn-articles-light " + (this.state.amount === 2000 ? 'btn-articles-light alt' : 'btn-articles-light') }>$20</button>
                  <button onClick={() => this.setState({amount: 5000})} className={"btn btn-articles-light " + (this.state.amount === 5000 ? 'btn-articles-light alt' : 'btn-articles-light') }>$50</button>
                </div>
              </div>

              <div className={this.props.auth.isAuthenticated ? '' : 'd-none'}>
                <div className="title">Card Info:</div>
                <CardElement
                  options={{
                    style: {
                      base: {
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </div>

              <img src={power} alt="" className="power mt-4"/>
              <div className={"btn btn-articles-light alt mx-auto mt-4 " + (this.props.auth.isAuthenticated ? 'd-block' : 'd-none')}>Donate</div>

            </div>
          </div>
        </Elements>

        <div className="intro-section">

          <img src={ArticlesBackground} alt=""/>

          <div className="container">
            <div className="row">
              
              <div className="col-12 col-md-5">
                <div className="info">
                  <div className="blur"></div>
                  <div className="title">Thinking About Donating?</div>
                  <div className="text">Donating is just one of the ways you can really help Articles. </div>
                  {/* <div>Donations make up ?% of our total revenue and are just one of the income sources helping us help you.</div> */}
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="other-ways-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-5">

                <div className="title">
                  Other Ways To Support
                </div>

                <div className="text">
                  Besides donating there are other ways to support us while recving something in return!
                </div>

                <div className="buttons mt-4">
                  <Link to={ROUTES.STORE}><div className="btn btn-articles-light">Shop Store</div></Link>
                  <Link to={ROUTES.STORE}><div className="btn btn-articles-light ml-2">Buy Membership</div></Link>
                </div>

              </div>
            </div>
          </div>
        </div>

        <div className="join-others-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-5">

                <div className="title">
                  Join Others
                </div>

                <div className="text">
                  We can not do it alone! It is the people that give this platform it's power.
                </div>

                <div className="small">Last 30 Donations (Live)</div>
                <div className="others">
                  {[...Array(30)].map((e, i) => <span className="other" key={i}>
                    <div className="money">$2.00</div>
                    <div className="name">Joey Giusto</div>
                  </span>)}            
                </div>
    
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(DonateBase);