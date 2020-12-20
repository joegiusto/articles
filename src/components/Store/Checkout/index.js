import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment';
import { useForm } from "react-hook-form";

import { CardElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { removeExpense, clearExpenses } from '../../../actions/expenses';
import scrollLogo from '../../../assets/img/logo.png';
import stripePower from '../../../assets/img/stripe.png'
import CheckoutPageItem from './CheckoutPageItem';
import * as ROUTES from '../../../constants/routes';
import * as KEYS from '../../../constants/public_keys';
// import { setUserLoading } from 'actions/authActions';
import { setUserDetails } from "../../../actions/authActions";
import { addOrder } from "../../../actions/siteActions";

const stripePromise = loadStripe(KEYS.STRIPE_PUBLIC_KEY);

const SavedPaymentMethod = (props) => {
  return (
    <div onClick={() => props.setSavedPaymentId(props.card.id) + props.setIsSavedPayment(true)} className={"payment-method " + props.card.card.brand}>

      {/* <div className="remove"><i onClick={() => removePaymentMethod(card.id)} className="fas fa-times-circle"></i></div> */}

      <div className="select">
        <div className={"circle " + (props.savedPaymentId === props.card.id ? 'active' : '')}></div>
      </div>

      <div className="inline-remove">
        <i onClick={() => props.removePaymentMethod(props.card.id)} className="fas fa-times-circle"></i>
      </div>

      <div className="card-details">
        <div className="card-brand">{props.renderCardBrandIcon(props.card.card.brand)}</div>
        <div className="last4">
          <div className="fake-digits">

            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <div>-</div>

            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <div>-</div>

            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <i className="fas fa-star-of-life"></i>
            <div>-</div>

          </div>
          {props.card.card.last4}
        </div>
      </div>

      <div className="exp">
        {`${props.card.card.exp_month}/${props.card.card.exp_year}`}
      </div>

    </div>
  )
}

const CheckoutForm = (props) => {
  // const { register, handleSubmit, watch, errors } = useForm();

  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [returnedProducts, setReturnedProducts] = useState([]);

  const prevReturnRef = useRef()
  const mounted = useRef();

  const [lineOne, setLineOne] = useState(props.user_details?.address?.lineOne || '');
  const [lineTwo, setLineTwo] = useState(props.user_details?.address?.lineTwo || '');
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

  const [isStoreDisabled, setIsStoreDisabled] = useState(false);

  const [savedPaymentId, setSavedPaymentId] = useState(null);

  const isValid = (lineOne !== '' && city !== '' && state !== '' && zip !== '' && (isSavedPayment ? true : cardComplete !== false) && (props.productsUser.length > 0) )
  
  useEffect(() => {

    if (props.productsUser.length < 1) {
      setCartEmpty(true)
    } else {
      setCartEmpty(false)
      userProductsToServer()
    }

    getUserPaymentMethods()
    storeDisabled()

    if (!mounted.current) {
      // do componentDidMount logic
      mounted.current = true;
    } else {
      // do componentDidUpdate logic
      console.log("UPDATE!")
      // userProductsToServer()
      mounted.current = false;

      if (returnedProducts.length !== props.productsUser.length && returnedProducts.length !== 0) {
        console.log("Not equal, update");
      }
    }
  }, []);

  const tryIntent = () => {
    axios.post('/api/create-payment-intent', {
      amount: (total + tax) * 100,
      _id: props.user_details._id,
      first_name: props.user_details.first_name,
      last_name: props.user_details.last_name,
      email: props.user_details.email,
      customer_id: props.user_details.stripe.customer_id,
      payment_method_id: savedPaymentId
    })
    .then(res => {
      console.log(res.data)
      setClientSecret(res.data.clientSecret);
      return {clientSecret: res.data.clientSecret, paymentIntentID: res.data.paymentIntentID}
    })
    .then( (obj) => {
      console.log(obj)
      handleSubmit(obj.clientSecret, obj.paymentIntentID) 
    })
    .catch(function (error) {
      console.log(error);

      console.log(error.response);

      // TODO - This is GOD AWFUL, need some sort of error code system and a switch case

      if (error.response.data === "Store is temporally disabled, check back later.") {
        setError('Store is temporally disabled, check back later.')
      } else {
        setError('Could not get valid intent')
      }
      
    });
  }

  function storeDisabled() {

    axios.get('/api/storeDisabled')
    .then(function (response) {
      console.log(response)
      if (!response.data) {
        setIsStoreDisabled(true)
      }
    })
    .catch(function (error) {
      console.log(error);
    });

  }

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
        props.addOrder({
          date: moment().d,
          for: "Clothing Store Order",
          _id: response.data.order.upsertedId._id,
          user_id: props.user_details._id,
          payment: {
            ...data,
            total: data.amount,
            trueTotal: data.amount,
          },
          items: props.productsUser
        })
        props.clearExpenses();
        userProductsToServer();
      })
      // .then(
      //   props.setUserDetails()
      // )
      .catch(function (error) {
        console.log(error);
      });
    }
    ).catch(e => console.log(e))

    if (payload.error) {
      setError(`Payment failed ${payload.error.message}`);
      setProcessing(false);
    } else {
      // console.log(payload);
      // setError(null);
      // setProcessing(false);
      // setSucceeded(true);

      // axios.post('/api/userMadePurchase', {
      //   payment: payload,
      //   user_id: props.user_details._id,
      //   items: props.productsUser
      // })
      // .then(function (response) {
      //   console.log(response);
      // })
      // .catch(function (error) {
      //   console.log(error);
      // });

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

        {/* <div> */}
          {/* <div className="alert alert-info alert-articles d-flex w-100 mb-2 mt-3 mt-md-0">Cart Empty</div> */}

          <div className={"success-overlay " + (succeeded ? 'visible' : '')}>

            <i className="fas fa-box"></i>
            <h1>Order Complete!</h1>
            <p>Thank you for your purchase</p>

            <Link to={ROUTES.STORE_ORDERS}>
              <button className="btn btn-articles-light">
                View Orders
              </button>
            </Link>

          </div>

          <StoreDisabledModal isStoreDisabled={isStoreDisabled} setIsStoreDisabled={setIsStoreDisabled}/>
  
          <div className="details card shadow-sm">
  
            <div className="card-body">
  
              <h1 className="d-flex justify-content-between">

                <span>Checkout Process</span>

                <a href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer">
                  <img id="powered-by-stripe" src={stripePower} height="35px" alt=""/>
                </a>

              </h1>
  
            </div>
            
            <div className="customer-info-cards">
  
              <div className="card mx-md-3 mb-3 w-100">
    
                <div className="shiping-info card-body">
                  <h3 className="mb-4">Shipping Info</h3>
    
                  {/* Address One */}
                  <div className="form-group articles">
                    <label htmlFor="address">Address Line 1</label>
                    <div className="prefilled">
                      Prefilled
                    </div>
                    <input className="form-control with-label" value={lineOne} onChange={e => setLineOne(e.target.value)} name="lineOne" id="lineOne" type="text"/>
                  </div>
  
                  {/* Address Two */}
                  <div className="form-group articles">
                    <label htmlFor="address_two">Address Line 2</label>
                    <input className="form-control with-label" value={lineTwo} name="lineTwo" onChange={e => setLineTwo(e.target.value)} id="lineTwo" type="text"/>
                  </div>
  
                  {/* City */}
                  <div className="form-group articles">
                    <label htmlFor="city">City</label>

                    {props.user_details?.address?.city && 
                      <div className="prefilled">
                        Prefilled
                      </div>
                    }

                    <input className="form-control with-label" value={city} onChange={e => setCity(e.target.value)} name="city" id="city" type="text"/>
                  </div>
  
                  {/* State */}
                  <div className="form-group articles">
                    <label htmlFor="state">State</label>
                    <div className="prefilled">
                      Prefilled
                    </div>
                    <input className="form-control with-label" value={state} onChange={e => setState(e.target.value)} name="state" id="state" type="text"/>
                  </div>
  
                  {/* Zip */}
                  <div className="form-group articles">
                    <label htmlFor="zip">Zip</label>
                    <div className="prefilled">
                      Prefilled
                    </div>
                    <input className="form-control with-label" value={zip} onChange={e => setZip(e.target.value)} name="zip" id="zip" type="text"/>
                  </div>
    
                </div>
    
              </div>
    
              <div className="payment-details card mx-md-3 mb-3 w-100">
    
                <div className="card-body">
                  
                  <h3 className="mb-4">Payment {(total + tax).toFixed(2)}</h3>
  
                  <small>We do not store any card information on our servers, all information is stored securely with Stripe.</small>
  
                  <h5 className="stored-cards-label">Saved Cards</h5>
                  <div className="stored-cards">
  
                    {userPaymentMethods.length < 1 ? 
                      <div className="no-card">
                        <small>No saved cards</small>
                      </div>
                      :
                      userPaymentMethods.map(card =>
                        <SavedPaymentMethod 
                          card={card}
                          removePaymentMethod={removePaymentMethod}
                          renderCardBrandIcon={renderCardBrandIcon}
                          setSavedPaymentId={setSavedPaymentId}
                          savedPaymentId={savedPaymentId}
                          setIsSavedPayment={setIsSavedPayment}
                        />
                      )
                    }
                    
                  </div>
  
                  <div className='shadow stripe-card-input' onClick={() => setIsSavedPayment(false) + setSavedPaymentId(null)}>
  
                    <div className={"stripe-card-input-cover " + (isSavedPayment ? '' : 'd-none')}>
                      <span>Using stored payment</span>
                    </div>
  
                    <div className="select">
                      <div className={"circle " + (isSavedPayment ? '' : 'active')}>
                      </div>
                    </div>
  
                    <CardElement onChange={(e) => handleCardChange(e) }/>
                  </div>

                  {isSavedPayment ? 
                  ''
                  : 
                  <div className="remember-card form-group form-check">
                    <input type="checkbox" className="form-check-input" id="exampleCheck1" onClick={() => setSaveCard(!saveCard)} checked={saveCard}/>
                    <label className="form-check-label noselect" for="exampleCheck1">Remember Card?</label>
                    {isSavedPayment ? 
                    <div className="cover">
                      <span>Using stored payment</span>
                    </div> 
                    :
                    ''}
                  </div>
                  }
  
                  <button onClick={() => userProductsToServer()} className={"btn btn-articles-light w-100 mt-2 " + (cartCount === props.productsUser.length ? 'd-none' : '')} disabled={cartLoading ? true : false}>Update</button>
                  <button disabled={isValid ? false : true} onClick={() => tryIntent()} className={"btn btn-articles-light w-100 mt-2 " + (cartCount === props.productsUser.length ? '' : 'd-none')}>Checkout</button>
  
                </div>
    
              </div>
  
            </div>
            
          </div>
        {/* </div> */}

        <div className="cart">

          <div className="card shadow-sm">

            <div className="card-body">
              <h1 className="d-flex justify-content-between">
                <span>Cart</span>
                <span>{props.productsUser.length} Items</span>
              </h1>
            </div>

            <div className="card-body border-top border-dark p-2">

            {props.productsUser.length > 0 ?
              props.productsUser.map(item => 
                <li key={item._id} className="cart-item list-group-item d-flex justify-content-between lh-condensed shadow-sm">
                  <div>
                    <div className="remove" onClick={() => {
                      props.removeExpense({
                        id: item.id
                      });
                    }}>
                      <i className="fas fa-trash-alt"></i>
                    </div>
                    <div className="edit">
                      <i className="fas fa-pen-square"></i>
                    </div>
                    <h6 className="my-0">{item.description}</h6>
                    <small className="text-muted">{ letterToSize[item.size] || '' }</small>
                  </div>
                  <span className="text-muted">${(item.amount / 100).toFixed(2) || ''}</span>
                </li>
              )
              :
              <li key='empty' className="cart-item list-group-item d-flex justify-content-between lh-condensed shadow-sm">
                  <div>
                    {/* <div className="remove" onClick={() => {
                      props.removeExpense({
                        id: item.id
                      });
                    }}>
                      <i className="fas fa-trash-alt"></i>
                    </div> */}
                    {/* <div className="edit">
                      <i className="fas fa-pen-square"></i>
                    </div> */}
                    <h6 className="my-0">{'Cart Empty!'}</h6>
                    {/* <small className="text-muted">{ letterToSize[item.size] || '' }</small> */}
                  </div>
                  {/* <span className="text-muted">${(item.amount / 100).toFixed(2) || ''}</span> */}
                </li>
            }

            </div>

            <div className="card-body p-2">

              <li className="subtotal list-group-item py-1 d-flex justify-content-between">
                <span>Subtotal (USD)</span>
                <strong>${total.toFixed(2)}</strong>
              </li>

              <li className="tax list-group-item py-1 d-flex justify-content-between">
                <span>Tax (USD)</span>
                <strong>${tax.toFixed(2)}</strong>
              </li>

              <li className="total list-group-item py-1 d-flex justify-content-between">
                <span>Total</span>
                <strong>${(total + tax).toFixed(2)}</strong>
              </li>

            </div>

            <div className="card-body p-2">

              <li className="stripe list-group-item py-1 d-flex justify-content-between">
                <span>Stripe Cut</span>
                <strong>${ total === 0 ? 0.00 : (0.029 * (total + tax + .30 ) ).toFixed(2)}</strong>
              </li>

              <li className="articles-profit list-group-item py-1 d-flex justify-content-between">
                <span>Articles Profit</span>
                <strong>${ total === 0 ? 0.00 : ( ( total + tax ) - ( 0.029 * (total + tax + .30 ) ) ).toFixed(2) }</strong>
              </li>

            </div>

            <div className="card-body border-top border-dark p-2">

              <button onClick={() => userProductsToServer()} className={"btn btn-articles-light w-100 " + (cartCount === props.productsUser.length ? 'd-none' : '')} disabled={cartLoading ? true : false}>Update</button>

              <button disabled={isValid ? false : true} onClick={() => tryIntent()} className={"btn btn-articles-light w-100 " + (cartCount === props.productsUser.length ? '' : 'd-none ') + (cartLoading ? 'd-none' : '')}>Checkout</button>

              {cartLoading ? 
              <div className="small text-center pt-2 w-100">Loading details, please wait.</div>
              :
              (cartCount === props.productsUser.length ? 
              <div className="small text-center pt-2 w-100">You will be charged when you click the button</div>
              :
              <div className="small text-center pt-2 w-100">Please update your cart total</div>)
              }

              {/* Show any error that happens when processing the payment */}
              {error && (
                <div className="card-error content-info mt-3" role="alert">
                  <div className="content-info-label">Error</div>
                  {error}
                </div>
              )}

              {/* Show a success message upon completion */}
              <p className={succeeded ? "result-message" : "result-message d-none"}>
                Payment succeeded, see the result in your
                <Link to={ROUTES.SETTINGS_BILLING}>{" "}Account</Link>
                {/* <a
                  href={`https://dashboard.stripe.com/test/payments`}
                >
                  {" "}
                  Stripe dashboard.
                </a>  */}
                {/* Refresh the page to pay again. */}
              </p>

            </div>

          </div>

        </div>

      </div>
  );
}

function StoreDisabledModal(props) {
  const [show, setShow] = useState(false);

  const handleClose = () => props.setIsStoreDisabled(false);
  // const handleShow = () => setShow(true);

  useEffect(() => {

  }, []);

  return (
    <>
      {/* <DropdownButton variant={props.config.banner.enabled ? 'success' : 'primary'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Banner: ${props.config.banner.enabled}`}>
        <Dropdown.Item onClick={() => {
          props.setConfig({
            ...props.config,
            banner: {
              enabled: false,
              text: '',
              last_change: new Date()
            }
          });
        }}>Off</Dropdown.Item>
        <Dropdown.Item onClick={handleShow}>On</Dropdown.Item>
      </DropdownButton> */}

      <Modal className="articles-modal" show={props.isStoreDisabled} onHide={handleClose} centered backdropClassName={'articles-modal-backdrop'}>
        <Modal.Header closeButton>
          <Modal.Title>Store Notice</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Sorry about this, our store is currently disabled right now while we stock up on products and get the rest of the site working. Sign up for our newsletter to get an alert when the store is open.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}
  
const CheckoutPage = (props) => (

  <div className='checkout-page container'>

    <Elements stripe={stripePromise}>
      {/* <CheckoutForm {...props}></CheckoutForm> */}
      <Test></Test>
    </Elements>

  </div>
);

const mapStateToProps = (state) => {
  return {
    productsUser: state.expenses,
    user_details: state.auth.user_details
  };
};

// const CheckoutPageNewConnected = connect(mapStateToProps)(CheckoutForm);

// export default CheckoutPage;
const Test = connect(mapStateToProps, { removeExpense, clearExpenses, setUserDetails, addOrder })(CheckoutForm);
export default connect(mapStateToProps, { removeExpense })(CheckoutPage);