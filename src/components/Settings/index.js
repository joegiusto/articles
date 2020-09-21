import React, { Component, useState, useEffect, useRef } from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import { connect } from "react-redux";
import axios from 'axios';
import moment from 'moment';
import Cleave from 'cleave.js/react';
import PlacesAutocomplete from 'react-places-autocomplete';

import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import {
  geocodeByAddress,
  geocodeByPlaceId,
  getLatLng,
} from 'react-places-autocomplete';

import * as ROUTES from '../../constants/routes';
import { logoutUser } from "../../actions/authActions";
import { setUserDetails } from "../../actions/authActions";

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

class LocationSearchInput extends React.Component {
  constructor(props) {
    super(props);
    this.state = { address: '' };
  }
 
  handleChange = address => {
    this.setState({ address });
  };
 
  handleSelect = address => {

    geocodeByAddress(address)
      .then(results => {
        this.props.placesToAddress(results);
        return( getLatLng(results[0]) )
      })
      .then(latLng => {
        console.log('Success', latLng)
        this.props.latLng(latLng)
      })
      .catch(error => console.error('Error', error));
  };
 
  render() {

    const searchOptions = {
      types: ['geocode']
    }

    return (
      <PlacesAutocomplete
        value={this.state.address}
        onChange={this.handleChange}
        onSelect={this.handleSelect}
        searchOptions={searchOptions}
      >
        {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
          <div>

            <input
              {...getInputProps({
                placeholder: 'Search Places ...',
                className: 'location-search-input',
              })}
            />

            <div className="autocomplete-dropdown-container">
              {loading && <div>Loading...</div>}
              {suggestions.map((suggestion, i) => {
                const className = suggestion.active
                  ? 'suggestion-item--active'
                  : 'suggestion-item';
                // inline style for demonstration purpose
                const style = suggestion.active
                  ? { backgroundColor: '#fafafa', cursor: 'pointer' }
                  : { backgroundColor: '#ffffff', cursor: 'pointer' };
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                      style,
                      key: i
                    })}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>

          </div>
        )}
      </PlacesAutocomplete>
    );
  }
}

class Settings extends Component {
  constructor(props) {
    super(props)
    this.state = {
      settingsTab: 'Account',
      userPaymentMethods: [],
      defaultUserPaymentMethod: '',

      newsAll: [],
      newsAllLoading: false,
      updatingUserDetails: false,

      previousUserOrders: [],
      previousUserOrdersLoading: false,

      previousUserDonationsLoading: false,
      previousUserDonationsError: false,
      previousUserDonations: [],

      nameExpanded: false,
      genderExpanded: false,
      birthDateExpanded: false,
      subscriptionsExpanded: false,

      subscriptions: [],

      mongoDBuser: {
        first_name: this.props.user_details?.first_name || '',
        last_name: this.props.user_details?.last_name || '',

        password: '',
        newPassword: '',
        newPasswordConfirm: '',

        birth_date: this.props.user_details?.birth_date || '',
        age: moment(this.props.user_details?.birth_date).format('MM/DD/YYYY') || '',
        
        sign_up_date: this.props.user_details?.sign_up_date || '',
        last_online_date: this.props.user_details?.last_online_date || '',

        photo_url: this.props.user_details?.photo_url || '',

        address: {
          zip: this.props.user_details?.address?.zip || '',
          city: this.props.user_details?.address?.city || '',
          state: this.props.user_details?.address?.state || '',
          lat: this.props.user_details?.address?.lat || '',
          lng: this.props.user_details?.address?.lng || '',
        },

        gender: this.props.user_details?.gender || '',

        submissions: this.props.user_details?.submissions || [],
        submissionsFetched: this.props.user_details?.submissionsFetched || [],
        orders: this.props.user_details?.orders || [],
        ordersFetched: this.props.user_details?.ordersFetched || [],
        subscriptions: this.props.user_details?.subscriptions || [],
        subscriptionsFetched: this.props.user_details?.subscriptionsFetched || []
      },
      
    }

    this.handleChange = this.handleChange.bind(this);
    this.handleUserChange = this.handleUserChange.bind(this);
    this.handleAddressChange = this.handleAddressChange.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    this.updateUser = this.updateUser.bind(this);

    this.placesToAddress = this.placesToAddress.bind(this);
    this.latLng = this.latLng.bind(this);
    this.getUserPaymentMethods = this.getUserPaymentMethods.bind(this)
  }

  getUserPaymentMethods() {
    const self = this;

    axios.post('/api/getUserPaymentMethods', {

    })
    .then(function (response) {
      console.log(response)

      console.log(response.data.data)

      self.setState({userPaymentMethods: response.data.data})

      // setUserPaymentMethods(response.data.data)
      // console.log(userPaymentMethods)
    })
    .catch(function (error) {
      console.log(error);
    });
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

  componentDidMount() {
    this.getUserPaymentMethods();
    this.getStripeUser();
    // console.log("Subscribe Mounted");

    let self = this;

    // TODO - I really think something like the admin page tab system belongs here instead for hard coded links

    switch ( localStorage.getItem('settingsTab') ) {
      case 'Account':
        self.setState({
          settingsTab: 'Account'
        })
        break;
      case 'Subscriptions':
        self.setState({
          settingsTab: 'Subscriptions'
        })
        break;
      case 'Billing':
        self.setState({
          settingsTab: 'Billing'
        })
        break;
      default:
        self.setState({
          settingsTab: 'Account'
        })
    }
    

    // console.log('Making changes to subscriptions');
    // this.setState({ newsAllLoading: true });

    // Refresh for the newest info!
    this.props.setUserDetails(self.props.auth.user.id);

    axios.get('/api/getIssues')
    .then(function (response) {

      // console.log(response.data);

      self.setState({
        allIssues: response.data,
      }, () => {
        // self.mergeStuff()
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });

    this.setState({previousUserDonationsLoading: true})

    axios.post('/api/getUserDonations', {
      _id: this.props.user_id
    })
    .then(function (response) {

      // console.log(response.data);

      self.setState({
        previousUserDonations: response.data,
        previousUserDonationsLoading: false
      }, () => {
        // self.mergeStuff()
      });

    })
    .catch(function (error) {
      console.log(error);
      self.setState({
        previousUserDonationsLoading: false
      })
    });

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

    this.setState({previousUserOrdersLoading: true})

    axios.post('/api/getUserOrders', {
      _id: this.props.user_id
    })
    .then(function (response) {

      console.log(response.data);

      self.setState({
        previousUserOrders: response.data,
        // previousUserOrdersLoading: false
      }, () => {
        // self.mergeStuff()
      });

    })
    .catch(function (error) {

      console.log(error.response);
      // if (error.response.data) {
      //   console.log(error.response.data)
      // } else {
      //   console.log(error.response)
      // }
      

      self.setState({
        // previousUserOrders: [],
        // previousUserOrdersLoading: false
      })
    });

  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  handleUserChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      mongoDBuser: {
        ...prevState.mongoDBuser,
        [name]: value
      }
    }));
  }

  changeGender(gender) {
    this.setState(prevState => ({
      mongoDBuser: {
        ...prevState.mongoDBuser,
        gender: gender
      }
    }));
  }

  handleAddressChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState(prevState => ({
      mongoDBuser: {
        ...prevState.mongoDBuser,
        address: {
          ...prevState.mongoDBuser.address,
          [name]: value
        }
      }
    }));
  }

  placesToAddress(geocodeResults) {

    const place = geocodeResults[0]

    var componentForm = {
      locality: 'long_name',
      administrative_area_level_1: 'short_name',
      postal_code: 'short_name'
    };

    this.setState({
      mongoDBuser: {
        ...this.state.mongoDBuser,
        address: {
          city: '',
          state: '',
          zip: ''
        }
      }
    })

    for (var i = 0; i < place.address_components.length; i++) {

      var addressType = place.address_components[i].types[0];
      
      if (componentForm[addressType]) {
        var val = place.address_components[i][componentForm[addressType]];

        this.setState({
          [addressType]: val 
        })

        switch(addressType) {
          case 'locality':
            this.setState({
              mongoDBuser: {
                ...this.state.mongoDBuser,
                address: {
                  ...this.state.mongoDBuser.address,
                  city: val 
                }
              }
            })
          break;
          case 'administrative_area_level_1':
            this.setState({
              mongoDBuser: {
                ...this.state.mongoDBuser,
                address: {
                  ...this.state.mongoDBuser.address,
                  state: val
                }
              }
            })
          break;
          case 'postal_code':
            this.setState({
              mongoDBuser: {
                ...this.state.mongoDBuser,
                address: {
                  ...this.state.mongoDBuser.address,
                  zip: val
                }
              }
            })
          break;
          default: 
            console.log(`Error - Check geocodeResults`);
        }

      }
    }

  }

  latLng(latLng) {
    this.setState({
      mongoDBuser: {
        ...this.state.mongoDBuser,
        address: {
          ...this.state.mongoDBuser.address,
          lat: latLng.lat,
          lng: latLng.lng
        }
      }
    })
  }

  addSubscriptionNew(issue) {

    this.setState(prevState => ({

      // mongoDBsubscriptionsBulk: [
      //   ...prevState.mongoDBsubscriptionsBulk,
      //   issue
      // ],
      mongoDBuser: {
        ...prevState.mongoDBuser,

        subscriptions: [
          ...prevState.mongoDBuser.subscriptions,
          {
            news_id: issue._id
          }
        ],

        subscriptionsFetched: [
          ...prevState.mongoDBuser.subscriptionsFetched,
          issue
        ]

      }

    }))

  }

  removeSubscriptionNew(id) {
    console.log(id);

    this.setState(prevState => ({
      // mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.filter(function( obj ) {
      //   return obj._id !== id;
      // }),
      mongoDBuser: {
        ...prevState.mongoDBuser,
        
        subscriptions: this.state.mongoDBuser.subscriptions.filter(function( obj ) {
          return obj.news_id !== id;
        }),

        subscriptionsFetched: this.state.mongoDBuser.subscriptionsFetched.filter(function( obj ) {
          return obj._id !== id;
        })
      }
    }))

    // this.setState({
    //   mongoDBsubscriptionsBulk: this.state.mongoDBsubscriptionsBulk.concat(id)
    // })
  }

  updateUser() {
    const self = this;
    console.log("UPDATE!");

    this.setState({
      updatingUserDetails: true
    })

    axios.post('/api/secure/updateUserDetails', {
      user: self.props.auth.user.id,
      user_details: {
        first_name: this.state.mongoDBuser.first_name,
        last_name: this.state.mongoDBuser.last_name,
        photo_url: this.state.mongoDBuser.photo_url,
        birth_date: new Date(this.state.mongoDBuser.age),
        address: {
          city: this.state.mongoDBuser.address.city,
          state: this.state.mongoDBuser.address.state,
          zip: this.state.mongoDBuser.address.zip,
          lat: this.state.mongoDBuser.address.lat,
          lng: this.state.mongoDBuser.address.lng,
        },
        gender: this.state.mongoDBuser.gender,
        subscriptions: this.state.mongoDBuser.subscriptions,
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        updatingUserDetails: false,
      }, () => {
        // self.mergeStuff()
      })

      self.props.setUserDetails(self.props.auth.user.id);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  updatePassword() {
    const self = this;
    console.log("PASSWORD UPDATE!");

    this.setState({
      updatingUserDetails: true
    })

    axios.post('/api/secure/updateUserPassword', {
      user: self.props.auth.user.id,
      user_details: {
        password: self.state.mongoDBuser.password,
        newPassword: self.state.mongoDBuser.newPassword
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        updatingUserDetails: false,
      }, () => {
        // self.mergeStuff()
      })

      self.props.setUserDetails(self.props.auth.user.id);

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getKeyByValue(object, value) { 
    console.log(object);
    console.log(value);
    for (var prop in object) { 
        if (object.hasOwnProperty(prop)) { 
            if (object[prop] === value) 
            return prop; 
        } 
    } 
  } 

  onChangeProfile(e) {
    console.log(e.target.files);
    const data = new FormData();

    this.setState({
      file: e.target.files[0],
      newProfilePhotoLoading: true,
    }, 
      () => {
        data.append('file', this.state.file);
        data.append('user', this.props.user_id);
        
        axios.post("/api/addProfilePhoto", data, { // receive two parameter endpoint url ,form data 
        
        })
        .then(res => { // then print response status
          console.log(res.statusText)
          this.setState({
            newProfilePhotoLoading: false,
            // photos: [...this.state.photos, 'profile_photos/' + this.props.user_id + '.' + this.state.file.name.split('.')[1]],
            fakeImageHash: this.state.fakeImageHash + 1
          })
        })
      }
    )

  }

  updateDetail(detail) {
    const self = this;

    console.log(detail)
  }

  handleClick(id) {
    this.props.history.push(ROUTES.STORE_ORDERS + '/' + id)
  }

  render() {
    const {mongoDBuser, mongoDBsubmissions, mongoDBorders, allIssues, mongoDBsubscriptionsBulk, merge} = this.state;

    return(
      <div className="settings-page">

        <Helmet>
          <title>Settings - Articles</title>
        </Helmet>

        {/* <div className="background-image">
          <img src="https://cdn.cheapism.com/images/Where_You_Live_or_Work.2e16d0ba.fill-1440x605.png" alt=""/>
        </div> */}

        <div className="banner">
          {/* <img src="https://cdn.vox-cdn.com/thumbor/eWyJSxmd-K42xArXNwPbb_tEj2s=/0x0:2000x1333/1200x800/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/65996321/190921_07_40_09_5DS27847.0.jpg" alt=""/> */}
        </div>

        <div className="container">

          <div className="top d-flex justify-content-between align-items-start" style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>
            <div>
              <div className="title">Account Settings</div>
              <p className="mb-0">User since {moment(mongoDBuser?.sign_up_date).format('LL')}</p>
            </div>
            <div onClick={this.props.logoutUser} className="btn btn-articles-light">
              Sign Out
            </div>
          </div>

          <div className="tabs mt-3 " style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>

            <div onClick={() => {
              localStorage.setItem( 'settingsTab', 'Account' ) 
              this.setState({settingsTab: 'Account'})}
            } className={"btn btn-articles-light " + (this.state.settingsTab === 'Account' ? 'alt' : '')}>Account</div>

            <div onClick={() => {
              localStorage.setItem( 'settingsTab', 'Subscription' ) 
              this.setState({settingsTab: 'Subscription'})}
            } className={"btn btn-articles-light " + (this.state.settingsTab === 'Subscription' ? 'alt' : '')}>Subscription</div>

            <div onClick={() => {
              localStorage.setItem( 'settingsTab', 'Billing' ) 
              this.setState({settingsTab: 'Billing'})}
            } className={"btn btn-articles-light " + (this.state.settingsTab === 'Billing' ? 'alt' : '')}>Billing</div>
            
          </div>

          <div className={"card membership-card " + (this.state.settingsTab !== 'Subscription' ? 'd-none' : '')}>

            <div className="card-header">
              <h5>Membership Status</h5>
              <p>Details about your membership and contributions</p>
            </div>

            <div className="card-body">

              <div className="">
                You are not a member, consider supporting Articles to become a member and recieve benifits such as ad free browsing expreience and store discounts.
              </div>

              <div className="plans d-flex justify-content-center">
  
                <div className="plan d-flex flex-column active">

                  <div className="active-badge">
                    Active
                  </div>

                  <i className="fas fa-user"></i>
                  <div className="type">Supporter Plan</div>
                  <div>$1.00 / month</div>
                  <button className="btn btn-articles-light btn-sm">Join</button>
                </div>
  
                <div className="plan d-flex flex-column ml-3">
                  <i className="fas fa-medal"></i>
                  <div className="type">Supporter Plan</div>
                  <div>$5.00 / month</div>
                  <button className="btn btn-articles-light btn-sm">Join</button>
                </div>

                <div className="or">- Or -</div>

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
                </div>

              </div>

              <div className="active-plan">
                <div>Next Charge: 12/14/20</div>
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
                <div className="small">Get subscription benifits by refering friends to sign up</div>
                <div>https://articles.media/signup?referral=5e90cc96579a17440c5d7d52</div>
              </div>

            </div>

            {this.state.subscriptions.length > 0 ?
              <div className="mt-2">
                {this.state.subscriptions.map(plan => 
                  <div className="plan mb-2">
                    <div>{plan.id}</div>
                    <div>{moment.unix(plan.current_period_end).format('LLL')}</div>
                  </div>  
                )}
              </div>
              :
              null
            }

          </div>

          <div className={"card settings-card mt-3 " + (this.state.settingsTab !== 'Account' ? 'd-none' : '')}>

            <div className="card-header">
              <h5>Profile Info</h5>
              <p>Basic info, like your name and photo, that you use on Articles</p>
            </div>

            <div className="card-body">

              <div className="info-snippet">
                <div className="label">EMAIL</div>

                <div className="info">
                  
                  <div className={"detail-view " + (this.state.emailExpanded ? 'd-none' : '')}>
                    {this.props.user_details.email}
                    <div className="email-note">
                      Email can not be changed at this time. Coming Soon.
                    </div>
                  </div>

                  <div className={"expand-view " + (this.state.emailExpanded ? '' : 'd-none')}>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                        emailExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.updateDetail('email')} className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>
                  
                </div>

                {/* <div className="arrow"><i className="far fa-hand-point-right"></i></div> */}

              </div>

              <div className="info-snippet">

                <div className="label">PHOTO</div>

                <div className="info">
                  <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props.auth.user.id}.jpg`} alt=""/>
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

                <input className="profile-photo" onChange={this.onChangeProfile} accept=".jpg" type="file" name="myfile" />

              </div>

              <div className="info-snippet noselect" onClick={() => 
                this.state.nameExpanded ?
                null
                :
                this.setState({
                  nameExpanded: !this.state.nameExpanded
                })
              }>
                <div className="label">NAME</div>

                <div className={"info"}>

                  <div className={"detail-view " + (this.state.nameExpanded ? 'd-none' : '')}>
                    {this.props.user_details.first_name} {this.props.user_details.last_name}
                  </div>

                  <div className={"expand-view " + (this.state.nameExpanded ? '' : 'd-none')}>
  
                    {/* <div>CHANGE NAME</div> */}
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <input className="d-block" name="first_name" onChange={this.handleUserChange} value={mongoDBuser.first_name} type="text"/>
                    <span className="badge badge-dark">Visible To All</span>

                    <input className="d-block mt-2" name="last_name" onChange={this.handleUserChange} value={mongoDBuser.last_name} type="text"/>
                    <span className="badge badge-dark">First Lettter Visible</span>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                        nameExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.updateDetail('first_name')} className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i className={"far fa-hand-point-right " + (this.state.nameExpanded? 'fa-rotate-90' : '')}></i></div>

              </div>

              <div className="info-snippet" onClick={() => 
                this.state.birthDateExpanded ?
                null
                :
                this.setState({
                  birthDateExpanded: !this.state.birthDateExpanded
                })
              }>
                <div className="label">BIRTHDAY</div>

                <div className="info mr-5">
                  
                  <div className={"detail-view " + (this.state.birthDateExpanded ? 'd-none' : '')}>
                    {moment(this.props.user_details.birth_date).format("LL")}
                  </div>

                  <div className={"expand-view " + (this.state.birthDateExpanded ? '' : 'd-none')}>
  
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <Cleave
                      placeholder=""
                      options={{date: true, delimiter: '/', datePattern: ['m','d','Y']}}
                      className={"form-control"}
                      onChange={(e) => this.handleUserChange(e)}
                      value={mongoDBuser.age}
                      name="age"
                    />
                    
                    <small className="pl-2" style={{fontSize: '10px'}}>DD/MM/YYYY</small>

                    <div className="actions mt-2">
                      <div onClick={ () => this.setState( { birthDateExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                      <div onClick={ () => null } className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i className={"far fa-hand-point-right " + (this.state.birthDateExpanded? 'fa-rotate-90' : '')}></i></div>
              </div>

              <div className="info-snippet" onClick={() => 
                this.state.addressExpanded ?
                null
                :
                this.setState({
                  addressExpanded: !this.state.addressExpanded
                })
              }>
                <div className="label">ADDRESS</div>
                <div className="info">

                  <div style={{textTransform: 'capitalize'}} className={"detail-view " + (this.state.addressExpanded ? 'd-none' : '')}>
                    {this.props.user_details.address.city + ', '}
                    {this.props.user_details.address.state + ' | '} 
                    {this.props.user_details.address.zip}
                  </div>

                  <div className={"expand-view " + (this.state.addressExpanded ? '' : 'd-none')}>

                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <div className="last-changed">Begin typing your address</div>
                    <LocationSearchInput 
                      placesToAddress={this.placesToAddress}
                      latLng={this.latLng}
                    />

                    <div className="py-2">Or</div>

                    <div className="last-changed">Town / City</div>
                    <input className="d-block" value={mongoDBuser.address.city} type="text"/>
                    <div className="last-changed">State</div>
                    <input className="d-block" value={mongoDBuser.address.state} type="text"/>
                    <div className="last-changed">Zip</div>
                    <input className="d-block" value={mongoDBuser.address.zip} type="text"/>

                    <div className="py-2">&nbsp;</div>

                    <div className="last-changed">Lat</div>
                    <input className="d-block" value={mongoDBuser.address?.lat} type="text"/>
                    <div className="last-changed">Lng</div>
                    <input className="d-block" value={mongoDBuser.address?.lng} type="text"/>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                        addressExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.updateDetail('address')} className="btn btn-articles-light ml-2">Save</div>
                    </div>

                  </div>

                </div>
                <div className="arrow"><i className="far fa-hand-point-right"></i></div>
              </div>

              <div className="info-snippet" onClick={() => 
                this.state.genderExpanded ?
                null
                :
                this.setState({
                  genderExpanded: !this.state.genderExpanded
                })
              }>
                <div className="label">GENDER</div>

                <div className="info">

                  <div style={{textTransform: 'capitalize'}} className={"detail-view " + (this.state.genderExpanded ? 'd-none' : '')}>
                    {this.props.user_details.gender}
                  </div>

                  <div className={"expand-view " + (this.state.genderExpanded ? '' : 'd-none')}>

                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <div onClick={() => this.changeGender('male')} className={"badge badge-lg mr-2 " + (mongoDBuser.gender === 'male' ? 'badge-articles' : 'badge-light border')}>Male</div>
                    <div onClick={() => this.changeGender('female')} className={"badge badge-lg mr-2 " + (mongoDBuser.gender === 'female' ? 'badge-articles' : 'badge-light border')}>Female</div>
                    <div onClick={() => this.changeGender('')} className={"badge badge-lg mr-2 " + (mongoDBuser.gender === '' ? 'badge-articles' : 'badge-light border')}>Other</div>

                    <div className="actions mt-2">
                      <div onClick={() => this.setState({
                        genderExpanded: false
                      })} className="btn btn-articles-light">Cancel</div>
                      <div onClick={() => this.setState({
                        genderExpanded: false
                      })} className="btn btn-articles-light ml-2">Save</div>
                    </div>

                  </div>

                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet" onClick={() => 
                this.state.passwordExpanded ?
                null
                :
                this.setState({
                  passwordExpanded: !this.state.passwordExpanded
                })
              }>

                <div className="label">PASSWORD</div>

                <div className="info">
                  
                  <div className={"detail-view " + (this.state.passwordExpanded ? 'd-none' : '')}>
                    ***********
                    <div className="last-changed">Last Changed {moment(this.props.user_details.password_last_change).format("LLL") || 'Never'}</div>
                  </div>

                  <div className={"expand-view " + (this.state.passwordExpanded ? '' : 'd-none')}>
  
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <div className="last-changed">Current Password</div>
                    <input className="d-block" name="password" value={mongoDBuser.password} onChange={this.handleUserChange} type="text"/>

                    <hr style={{maxWidth: '200px', marginLeft: '0'}}/>

                    <div className="last-changed">New Password</div>
                    <input className="d-block" name="newPassword" value={mongoDBuser.newPassword} onChange={this.handleUserChange} type="text"/>
                    <div className="last-changed">Retype Password</div>
                    <input className="d-block" name="newPasswordConfirm" value={mongoDBuser.newPasswordConfirm} onChange={this.handleUserChange} type="text"/>

                    <div className="actions mt-2">
                      <div onClick={ () => this.setState( { passwordExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                      <div onClick={ () => this.updatePassword } className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>

                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

            </div>

          </div>

          <div className={"card settings-card mt-3 " + (this.state.settingsTab !== 'Account' ? 'd-none' : '')}>

            <div className="card-header">
              <h5>Subscriptions</h5>
              <p>Some info may be visible to others</p>
            </div>

            <div className="card-body">

              <div className="info-snippet" onClick={() => 
                this.state.subscriptionsExpanded ?
                null
                :
                this.setState({
                  subscriptionsExpanded: !this.state.subscriptionsExpanded
                })
              }>

                <div className="label">ISSUES</div>

                <div className="info">
                  
                  <div className={"detail-view " + (this.state.subscriptionsExpanded ? 'd-none' : '')}>
                    {this.props.user_details.subscriptionsFetched.length} Subscriptions
                  </div>

                  <div className={"expand-view " + (this.state.subscriptionsExpanded ? '' : 'd-none')}>
  
                    <p>Anyone can see this info when they communicate with you or view content you create</p>

                    <div className="row">
                      <div className="col-12 col-md-6">

                        <small>Yours</small>
                        {mongoDBuser?.subscriptionsFetched ? 
                        mongoDBuser?.subscriptionsFetched.map((issue) => (
                          <div key={issue._id} className="sub-item unsubscribe" onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
                        ))
                        :
                        null
                        }

                      </div>
                      <div className="col-12 col-md-6">

                        <small>All</small>
                        {allIssues && mongoDBuser?.subscriptionsFetched ? 

                        allIssues.map((issue) => {
                          return (
                          <div>

                          {(mongoDBuser?.subscriptionsFetched.filter(sub => sub._id === issue._id.toString() )).length > 0
                          ? 
                          // <button onClick={() => this.removeSubscription(issue._id)} className="btn btn-articles-light un">Unsubscribe</button>
                          <div className={"sub-item unsubscribe d-none"} onClick={() => this.removeSubscriptionNew(issue._id)}>{issue.news_title}</div>
                          : 
                          // <button onClick={() => this.addSubscription(issue._id)} className="btn btn-articles-light">Subscribe</button>
                          <div className={"sub-item subscribe"} onClick={() => this.addSubscriptionNew(issue)}>{issue.news_title}</div>
                          }

                          </div>
                          )
                        })

                        // allIssues.map((issue) => (
                        //   console.log("Debuug shit") +
                        //   console.log(issue._id) +
                        //   <div className={"sub-item " + this.state.mongoDBsubscriptionsBulk?.filter(sub => sub._id === issue._id ).length > 0 ? 'sub-item subscribe' : 'sub-item unsubscribe' } onClick={() => this.addSubscription(issue)}>{issue.news_title}</div>
                        // ))
                        :
                        null
                        }

                      </div>
                    </div>

                    <div className="actions mt-2">
                      <div onClick={ () => this.setState( { subscriptionsExpanded: false } ) } className="btn btn-articles-light">Cancel</div>
                      <div onClick={ () => this.setState( { subscriptionsExpanded: false } ) } className="btn btn-articles-light ml-2">Save</div>
                    </div>
 
                  </div>
                </div>

                <div className="arrow"><i className="far fa-hand-point-right"></i></div>

              </div>

              <div className="info-snippet">

                <div className="label">TAGS</div>

                <div className="info">
                  <div>0 Followed</div>
                  <div className="last-changed">Feature coming soon</div>
                </div>

                {/* <div className="arrow"><i className="far fa-hand-point-right"></i></div> */}

              </div>

            </div>

          </div>

          <div className={"card settings-card mt-3 " + (this.state.settingsTab !== 'Billing' ? 'd-none' : '')}>

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
                    {this.state.userPaymentMethods?.map(card => 
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
                    )}
                  </tbody>

                  {this.state.previousUserDonationsLoading ? null : this.state.previousUserDonations.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''}
                  
                </table>

              </div>

              <button className="btn btn-articles-light my-3 mx-auto w-100 d-block" style={{maxWidth: '300px'}}>Add Payment Method</button>

              <Elements stripe={stripePromise}>
                <CheckoutForm/>
              </Elements>

            </div>

          </div>

          <div className={"card settings-card mt-3 " + (this.state.settingsTab !== 'Billing' ? 'd-none' : '')}>

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
                      {this.state.previousUserDonations.map(donation => 
                        <tr className="donation">
                          <th scope="row" className="donation-id">{donation._id}</th>
                          <td className="date">{moment(donation.date).format('LLL')}</td>
                          <td className="type">Donation</td>
                          <td className="amount">${(donation.amount / 100).toFixed(2)}</td>
                        </tr>  
                      )}
                    </tbody>

                    {this.state.previousUserDonationsLoading ? null : this.state.previousUserDonations.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''}
                    
                  </table>

                  

                </div>

              </div>

            </div>

          </div>

          <div className={"card settings-card mt-3 " + (this.state.settingsTab !== 'Billing' ? 'd-none' : '')}>

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
                    {this.state.previousUserOrders.map(order => 
                      <tr className="order" onClick={() => this.handleClick(order._id)}>
                        <th scope="row" className="order-id">{order._id}</th>
                        <td className="date">{moment(order.date).format('LLL')}</td>
                        <td className="type">{order.for}</td>
                        <td className="amount">${(order.payment.total / 100).toFixed(2)}</td>
                      </tr>  
                    )}
                  </tbody>

                  {this.state.previousUserOrdersLoading ? null : this.state.previousUserOrders.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''}
                  
                </table>

              </div>

            </div>

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

          <div className="links d-flex justify-content-between " style={{maxWidth: '800px', marginRight: 'auto', marginLeft: 'auto'}}>

            <div>
              <div className="btn btn-danger">Delete Account</div>
              <div className="btn btn-articles-light">Request Data</div>
            </div>

            <div onClick={this.updateUser} className="btn btn-articles-light">Update</div>
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
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { logoutUser, setUserDetails }
)(Settings);