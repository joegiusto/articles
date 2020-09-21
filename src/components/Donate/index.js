import React, { useState, useEffect, Component } from "react";
import axios from 'axios';
import { connect } from "react-redux";
import { Link } from 'react-router-dom'
import moment from 'moment';

import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';


import * as ROUTES from '../../constants/routes';
import * as KEYS from '../../constants/public_keys';
import ArticlesBackground from '../../assets/img/banner.jpg'
import power from '../../assets/img/Store/power.png'

const stripePromise = loadStripe(KEYS.STRIPE_PUBLIC_KEY);

function CheckoutForm(props) {
  const [succeeded, setSucceeded] = useState(false);
  const [privacy, setPrivacy] = useState(false);
  const [amount, setAmount] = useState(1000);
  const [error, setError] = useState(null);
  const [processing, setProcessing] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [clientSecret, setClientSecret] = useState('');
  const stripe = useStripe();
  const elements = useElements();

  // useEffect(() => {
  //   // Create PaymentIntent as soon as the page loads
  //   window
  //     .fetch("/api/create-payment-intent", {
  //       method: "POST",
  //       headers: {
  //         "Content-Type": "application/json"
  //       },
  //       body: JSON.stringify({
  //         items: [{ id: "xl-tshirt" }],
  //         _id: props._id,
  //         first_name: props.first_name,
  //         last_name: props.last_name,
  //         amount: amount
  //       })
  //     })
  //     .then(res => {
  //       return res.json();
  //     })
  //     .then(data => {
  //       setClientSecret(data.clientSecret);
  //     })
  //     .catch(function (error) {
  //       console.log(error);
  //       setError('Could not get valid intent')
  //     });
  // }, []);

  const cardStyle = {
    style: {
      base: {
        color: "#32325d",
        fontFamily: 'Arial, sans-serif',
        fontSmoothing: "antialiased",
        fontSize: "16px",
        "::placeholder": {
          color: "#32325d"
        }
      },
      invalid: {
        color: "#fa755a",
        iconColor: "#fa755a"
      }
    }
  };

  const tryIntent = async stuff => {
    window
      .fetch("/api/create-payment-intent", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          items: [{ id: "xl-tshirt" }],
          _id: props._id,
          first_name: props.first_name,
          last_name: props.last_name,
          amount: amount
        })
      })
      .then(res => {
        return res.json();
      })
      .then(data => {
        setClientSecret(data.clientSecret);
        return data.clientSecret
      })
      .then(secret => {
        // console.log(secret)
        handleSubmit(secret) 
        
      })
      .catch(function (error) {
        console.log(error);
        setError('Could not get valid intent')
      });
  }

  const handleChange = async (event) => {
    // Listen for changes in the CardElement
    // and display any errors as the customer types their card details
    setDisabled(event.empty);
    setError(event.error ? event.error.message : "");
  };

  const handleSubmit = async secret => {
    setProcessing(true);
    const payload = await stripe.confirmCardPayment(secret, {
      payment_method: {
        card: elements.getElement(CardElement),
        billing_details: {
          name: `${props.first_name} ${props.last_name}`,
          email: props.email
        }
      }
    });
    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      console.log(payload);
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      axios.post('/api/userMadeDonation', {
        payment: payload,
        _id: props._id,
        first_name: props.first_name,
        last_name: props.last_name
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  };
  
  return (
    <div className="donate-form">
      <div className="inner">

        <div className="title">Name</div>

        {props.isAuthenticated ? 
        <div className="name-plate">

          <div className="date">
            {moment().format("LL")}
          </div>

          <div className="name">
            {privacy === false ? `${props.first_name} ${props.last_name}` : `Private Donor`}
          </div>

          <div className="d-flex">
            <div onClick={() => setPrivacy(false)} className={"privacy-pick " + (privacy === false ? 'active' : '')}>Show Name</div>
            <div onClick={() => setPrivacy(true)} className={"ml-2 privacy-pick " + (privacy === true ? 'active' : '')}>Hide Name</div>
          </div>

        </div>
          : 
        <div className="name-plate">

          <div className="name">
            {`Sign In`}
          </div>

          <div className="date">We need you to sign in or create an account before we can accept your donation. You can choose to stay anonymous once you are signed in.</div>

          <div className="buttons mt-4">
            <Link to={ROUTES.SIGN_UP}><div className="btn btn-articles-light">Sign Up</div></Link>
            <Link to={ROUTES.SIGN_IN}><div className="btn btn-articles-light ml-2">Sign In</div></Link>
          </div>

        </div>
        }

        <div className={props.isAuthenticated ? '' : 'd-none'}>

          <div className="title">Amount: ${(amount / 100).toFixed(2)}</div>

          <div className="amount-group">
            <input className="form-control" type="text" value={amount} onChange={e => setAmount(e.target.value)} placeholder="$0.00"/>
            <button onClick={() => setAmount(100) } className={"btn btn-articles-light " + (amount === 100 ? 'btn-articles-light alt' : 'btn-articles-light') }>$1</button>
            <button onClick={() => setAmount(500) } className={"btn btn-articles-light " + (amount === 500 ? 'btn-articles-light alt' : 'btn-articles-light') }>$5</button>
            <button onClick={() => setAmount(1000) } className={"btn btn-articles-light " + (amount === 1000 ? 'btn-articles-light alt' : 'btn-articles-light') }>$10</button>
            <button onClick={() => setAmount(2000) } className={"btn btn-articles-light " + (amount === 2000 ? 'btn-articles-light alt' : 'btn-articles-light') }>$20</button>
            <button onClick={() => setAmount(5000) } className={"btn btn-articles-light " + (amount === 5000 ? 'btn-articles-light alt' : 'btn-articles-light') }>$50</button>
          </div>

          <div style={{fontSize: '0.8rem'}}>${( (amount / 100).toFixed(2) - ( ( 0.029 * (amount) + 30) / 100 ).toFixed(2) ).toFixed(2) } (${( ( 0.029 * (amount) + 30) / 100 ).toFixed(2)} Stripe Fee | 2.9% + ¢30)</div>
          <div className="mt-2" style={{fontSize: '0.8rem'}}>Want to make the most of your donation and avoid fees? We accept Bitcoin and Checks!</div>

        </div>

        <div className={props.isAuthenticated ? '' : 'd-none'}>
          <div className="title">Card Info:</div>
          {clientSecret === '' ? 
          <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
          :
          <CardElement id="card-element" options={cardStyle} onChange={handleChange}/>
          }
        </div>

        <img src={power} alt="" className="power mt-4"/>

        <button
        disabled={processing || disabled || succeeded}
        id="submit"
        // onClick={() => handleSubmit()}
        onClick={() => tryIntent()}
        className={"pay w-100 btn btn-articles-light alt mx-auto mt-4 " + (props.isAuthenticated ? 'd-block' : 'd-none')}
        >
          <span id="button-text">
            {processing ? (
              <div className="spinner" id="spinner"></div>
            ) : (
              "Pay"
            )}
        </span>
        </button>

        {/* <div onClick={() => handleSubmit} className={"btn btn-articles-light alt mx-auto mt-4 " + (this.props.auth.isAuthenticated ? 'd-block' : 'd-none')}>Donate</div> */}

        {/* Show any error that happens when processing the payment */}
        {error && (
          <div className="card-error" role="alert">
            {error}
          </div>
        )}
        
        {/* Show a success message upon completion */}
        <p className={succeeded ? "result-message" : "result-message d-none"}>
          Payment succeeded, see the result in your
          <Link to={ROUTES.SETTINGS_ACCOUNT}>{" "}Account</Link>
          {/* <a
            href={`https://dashboard.stripe.com/test/payments`}
            target="_"
            rel="noopener noreferrer"
          >
            {" "}
            Stripe dashboard.
          </a>  */}
          {/* Refresh the page to pay again. */}
        </p>

      </div>
    </div>

    // <form id="payment-form" onSubmit={handleSubmit}>
    //   <CardElement id="card-element" options={cardStyle} onChange={handleChange} />
    //   <button
    //     disabled={processing || disabled || succeeded}
    //     id="submit"
    //   >
    //     <span id="button-text">
    //       {processing ? (
    //         <div className="spinner" id="spinner"></div>
    //       ) : (
    //         "Pay"
    //       )}
    //     </span>
    //   </button>
    //   {/* Show any error that happens when processing the payment */}
    //   {error && (
    //     <div className="card-error" role="alert">
    //       {error}
    //     </div>
    //   )}
    //   {/* Show a success message upon completion */}
    //   <p className={succeeded ? "result-message" : "result-message hidden"}>
    //     Payment succeeded, see the result in your
    //     <a
    //       href={`https://dashboard.stripe.com/test/payments`}
    //     >
    //       {" "}
    //       Stripe dashboard.
    //     </a> Refresh the page to pay again.
    //   </p>
    // </form>

  );
}

class DonateBase extends Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: 1000,
      privacy: false,
      donations: []
    };

  }

  componentWillUnmount() {
    console.log("Something has to happen here because of crash")
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    const self = this;

    axios.get('/api/getDonations')
    .then(function (response) {

      console.log(response.data);

      self.setState({
        donations: response.data,
      }, () => {
        // self.mergeStuff()
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }
  
  render(props) {

    return (
      <div className="donate-page">

        <Elements stripe={stripePromise}>
          <CheckoutForm 
            isAuthenticated={this.props.auth.isAuthenticated}
            _id={this.props.auth.user_details._id}
            first_name={this.props.user.first_name}
            last_name={this.props.user.last_name}
            email={this.props.user.email}
          />
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
                  <div className="others">

                    <Link to={ROUTES.SUBSCRIBE}>
                      <div className="other">
                        Subscription
                      </div>
                    </Link>

                    <div className="other">
                      Merch
                    </div>

                  </div>
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

                <div className="small">Last 30 Donations</div>
                <div className="others">
                  {[...this.state.donations].map((e, i) => <span className="other" key={i}>
                    <div className="money">${(e.amount / 100).toFixed(2)}</div>
                    <div className="name">{`${e.first_name || "Private Donor"} ${e.last_name || ''}`}</div>
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