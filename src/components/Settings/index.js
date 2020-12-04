import React, { Component, useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Switch, Route, Link } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import moment from 'moment';

import { logoutUser, setUserDetails } from "../../actions/authActions";
import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

// import TextareaAutosize from 'react-textarea-autosize';

import * as ROUTES from '../../constants/routes';


import Account from './Account'
import Membership from './Membership'
import Billing from './Billing'
import Employee from './Employee'

import * as KEYS from '../../constants/public_keys';

const stripePromise = loadStripe(KEYS.STRIPE_PUBLIC_KEY);

const CheckoutForm = (props) => {
  // const { register, handleSubmit, watch, errors } = useForm();

  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [returnedProducts, setReturnedProducts] = useState([]);

  const prevReturnRef = useRef()
  const mounted = useRef();

  const [address, setAddress] = useState(props.user_details?.address?.address || '');
  const [address_two, setAddressTwo] = useState(props.user_details?.address?.address_two || '');
  const [city, setCity] = useState(props.user_details?.address?.city || '');
  const [state, setState] = useState(props.user_details?.address?.state || '');
  const [zip, setZip] = useState(props.user_details?.address?.zip || '');
  const [cartEmpty, setCartEmpty] = useState(true);
  const [cartLoading, setCartLoading] = useState(false);
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [disabled, setDisabled] = useState(true);
  const [saveCard, setSaveCard] = useState(false);
  const [cardComplete, setCardComplete] = useState(false);
  const elements = useElements();
  const [userPaymentMethods, setUserPaymentMethods] = useState([]);

  const [checkoutComplete, setCheckoutComplete] = useState('');

  const [isSavedPayment, setIsSavedPayment] = useState(false);
  const [savedPaymentId, setSavedPaymentId] = useState(null);

  const isValid = (address !== '' && city !== '' && state !== '' && zip !== '' && (isSavedPayment ? true : cardComplete !== false) && (props.productsUser.length > 0) )
  
  useEffect(() => {

    // if (props.productsUser.length < 1) {
    //   setCartEmpty(true)
    // } else {
    //   setCartEmpty(false)
    //   userProductsToServer()
    // }

    // getUserPaymentMethods()

    // if (!mounted.current) {
    //   // do componentDidMount logic
    //   mounted.current = true;
    // } else {
    //   // do componentDidUpdate logic
    //   console.log("UPDATE!")
    //   // userProductsToServer()
    //   mounted.current = false;

    //   if (returnedProducts.length !== props.productsUser.length && returnedProducts.length !== 0) {
    //     console.log("Not equal, update");
    //   }
    // }
  }, []);

  // const tryIntent = () => {
  //   axios.post('/api/create-payment-intent', {
  //     amount: (total + tax) * 100,
  //     _id: props.user_details._id,
  //     first_name: props.user_details.first_name,
  //     last_name: props.user_details.last_name,
  //     email: props.user_details.email,
  //     customer_id: props.user_details.stripe.customer_id,
  //     payment_method_id: savedPaymentId
  //   })
  //   .then(res => {
  //     console.log(res.data)
  //     setClientSecret(res.data.clientSecret);
  //     return {clientSecret: res.data.clientSecret, paymentIntentID: res.data.paymentIntentID}
  //   })
  //   .then( (obj) => {
  //     console.log(obj)
  //     handleSubmit(obj.clientSecret, obj.paymentIntentID) 
  //   })
  //   .catch(function (error) {
  //     console.log(error);
  //     setError('Could not get valid intent')
  //   });
  // }

  function renderCardBrandIcon(brand) {
    switch(brand) {
      case 'visa':
        return( <i className="fab fa-cc-visa"></i> )
      case 'discover':
      return( <i className="fab fa-cc-discover"></i> )
      default:
        return( <i className="fab fa-cc"></i> )
    }
  }

  function removePaymentMethod(method_id) {
    axios.post('/api/removePaymentMethod', {
      method_id
    })
    .then(function (response) {
      console.log(response)

      setUserPaymentMethods(
        userPaymentMethods.filter(function( obj ) {
          return obj.id !== method_id;
        })
      )

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  function getUserPaymentMethods() {
    axios.post('/api/getUserPaymentMethods', {

    })
    .then(function (response) {
      console.log(response)
      setUserPaymentMethods(response.data.data)
      console.log(userPaymentMethods)
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  let userProductsToServer = () => {
    setCartLoading(true)

    console.log("sending this to server")
    console.log(props.productsUser);

    let productsUserToServer = props.productsUser.map( (product) => { return {
      _id: product.note,
      cart_id: product.id,
      size: product.size
    } } )

    axios.post('/api/getTotalFromProducts', {
      products: [
        ...productsUserToServer
      ]
    })
    .then(function (response) {
      setReturnedProducts(response.data.retrivedProducts)
      setTotal(response.data.total)
      setTax(response.data.tax)
      setCartCount(response.data.retrivedProducts.length)
      setCartLoading(false)
      // tryIntent();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  const handleSubmit = async (secret, paymentIntentID) => {

    console.log("PaymentIntentID " + paymentIntentID)

    setProcessing(true);

    let future_usage = (saveCard ? {setup_future_usage: 'off_session'} : {} );

    let payload;

    if ( isSavedPayment ) {

      payload = axios.post('/api/confirmWithPaymentMethod', {
        paymentIntentID: paymentIntentID,
        payment_method: savedPaymentId
      })
      .then(function (response) {
        // console.log(response)
        console.log(response.data.payload)
        return response.data.payload
        
      })
      .catch(function (error) {
        console.log(error);
      });

    } else {

      // Will be completed with providede card info
      payload = stripe.confirmCardPayment(secret, {
        payment_method: {
          card: elements.getElement(CardElement),
          billing_details: {
            name: `${props.first_name} ${props.last_name}`,
            email: props.email
          }
        },
        ...future_usage
      })
      .then(function (response) {
        console.log(response.paymentIntent)
        return response.paymentIntent
        
      })
      .catch(function (error) {
        console.log(error);
      });
    }

    payload.then(data => {
      console.log('Should be payment data')
      console.log(data)

      console.log(payload);
      setError(null);
      setProcessing(false);
      setSucceeded(true);

      axios.post('/api/userMadePurchase', {
        payment: data,
        user_id: props.user_details._id,
        items: props.productsUser
      })
      .then(function (response) {
        console.log(response);
        props.clearExpenses();
        userProductsToServer();
      })
      .catch(function (error) {
        console.log(error);
      });
    }
    ).catch(e => console.log(e))

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      
    }
  };

  function handleCardChange(e)  {
    console.log(e)

    setCardComplete(e.complete)

    // if (e.complete)
  }

  const removeItemAndRefresh = (item, dispatch) => new Promise((resolve, reject) => {

    console.log('removeItemAndRefresh called')

    props.removeExpense({
      id: item.cart_id
      // id: item.id
    }, () => resolve());

  });

  const letterToSize = {
    XS: 'Extra Small',
    S: 'Small',
    M: 'Medium',
    L: 'Large',
    XL: 'Extra Large'
   };

  // Use a traditional checkout form.
  return (
    <div className="checkout-page new mb-5">

      <div className="details card shadow-sm">
        
        <div className="customer-info-cards">

          <div className="payment-details card mx-md-3 mb-3 w-100">

            <div className="card-body">

              <div className='stripe-card-input'>
                <CardElement style={{marginLeft: '0'}} onChange={(e) => handleCardChange(e) }/>
              </div>

            </div>

          </div>

        </div>
        
      </div>

    </div>
  );
}



class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settingsTab: '',

      // newsAll: [],
      // newsAllLoading: false,

      // userReferrals: [],

      subscriptions: [],

      user: {

      },
      
    }

    // this.handleChange = this.handleChange.bind(this);
    // this.handleUserChange = this.handleUserChange.bind(this);
    // this.handleAddressChange = this.handleAddressChange.bind(this);
    // this.onChangeProfile = this.onChangeProfile.bind(this);
    // this.updateUser = this.updateUser.bind(this);

    // this.placesToAddress = this.placesToAddress.bind(this);
    // this.latLng = this.latLng.bind(this);

    this.setLocation = this.setLocation.bind(this)
    
  }

  componentDidMount() {
    let self = this;

    // Refresh for the newest info!
    this.props.setUserDetails(self.props.auth.user.id);
  }

  // handleChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState({
  //     [name]: value
  //   });
  // }

  // handleAddressChange(event) {
  //   const target = event.target;
  //   const value = target.type === 'checkbox' ? target.checked : target.value;
  //   const name = target.name;

  //   this.setState(prevState => ({
  //     user: {
  //       ...prevState.user,
  //       address: {
  //         ...prevState.user.address,
  //         [name]: value
  //       }
  //     }
  //   }));
  // }

  setLocation(tab) {
    this.setState({
      settingsTab: tab
    })
  }

  render() {
    // const {user, mongoDBsubmissions, mongoDBorders, allIssues, mongoDBsubscriptionsBulk, merge} = this.state;

    return(
      <div className="settings-page">

        <Helmet>
          <title>Settings - Articles</title>
        </Helmet>

        <div className="container">

          <div className="top d-flex justify-content-between align-items-start" style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>
            <div>
              <div className="title">Account Settings</div>
              <p className="mb-0">User since {moment(this.props.user_details?.sign_up_date).format('LL')}</p>
            </div>
            <div onClick={this.props.logoutUser} className="btn btn-articles-light">
              Sign Out
            </div>
          </div>

          <div className="tabs mt-3 " style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>

            <Link to={ROUTES.SETTINGS_ACCOUNT}>
              <button className={"btn btn-articles-light " + (this.state.settingsTab === 'Account' ? 'alt' : '')}>Account</button>
            </Link>

            <Link to={ROUTES.SETTINGS_MEMBERSHIP}>
              <button className={"btn btn-articles-light " + (this.state.settingsTab === 'Membership' ? 'alt' : '')}>Membership</button>
            </Link>

            <Link to={ROUTES.SETTINGS_BILLING}>
              <button className={"btn btn-articles-light " + (this.state.settingsTab === 'Billing' ? 'alt' : '')}>Billing</button>
            </Link>

            {this.props.user_details.employee?.bool === true ? 

              <Link to={ROUTES.SETTINGS_EMPLOYEE}>
                <button className={"btn btn-articles-light " + (this.state.settingsTab === 'Employee' ? 'alt' : '')}>Employee<span className="badge badge-warning ml-1">Role</span></button>
              </Link>

              :

              null

            }
            
          </div>

          <div className="content">

            <Switch>

              <Route path={ROUTES.SETTINGS_ACCOUNT} render={() => <Account 
                match={this.props.match} 
                tabLocation='Account' 
                setLocation={this.setLocation}
              ></Account>}/>

              <Route exact path={ROUTES.SETTINGS_MEMBERSHIP} render={() => <Membership 
                match={this.props.match} 
                tabLocation='Membership'
                setLocation={this.setLocation}
              ></Membership> }/>

              <Route exact path={ROUTES.SETTINGS_BILLING} render={() => <Billing 
                match={this.props.match} 
                tabLocation='Billing' 
                setLocation={this.setLocation}
              ></Billing> }/>

              <Route exact path={ROUTES.SETTINGS_EMPLOYEE} render={() => <Employee 
                match={this.props.match} 
                tabLocation='Employee' 
                setLocation={this.setLocation}
              ></Employee> }/>

            </Switch>
          
          </div>

          <div className="card settings-card mt-4 d-none">

            <div className="card-header">
              <h5>Experimental Features</h5>
              <p>Try out and help us test features that are not released to the public yet.</p>
            </div>

            <div className="card-body">

              <div className="info-snippet">

                <div className="label">NIGHT MODE</div>

                <div className="info">
                  <div className="enabled-dot"></div>Enabled
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">MESSAGES / MAIL</div>

                <div className="info">
                  <div className="enabled-dot"></div>Enabled
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">MESH</div>

                <div className="info">
                  <div className="disabled-dot"></div>Disabled
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

            </div>

          </div>

        </div>
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user_id: state.auth.user.id,
  user_details: state.auth.user_details,
  orders: state.auth.user_details.ordersFetched,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserDetails }
)(Settings);