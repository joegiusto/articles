import React, { Component, useState, useEffect, useRef } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { removeExpense } from '../../../actions/expenses';

import { CardElement, PaymentRequestButtonElement, useStripe, useElements, Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';

import scrollLogo from '../../../assets/img/logo.png';
import stripePower from '../../../assets/img/stripe.png'
import CheckoutPageItem from './CheckoutPageItem';
import * as ROUTES from '../../../constants/routes';
import * as KEYS from '../../../constants/public_keys';

const stripePromise = loadStripe(KEYS.STRIPE_PUBLIC_KEY);

const CheckoutForm = (props) => {
  const [tax, setTax] = useState(0);
  const [total, setTotal] = useState(0);
  const [cartCount, setCartCount] = useState(0);
  const [returnedProducts, setReturnedProducts] = useState([]);

  const prevReturnRef = useRef()
  const mounted = useRef();
  
  const [succeeded, setSucceeded] = useState(false);
  const [error, setError] = useState(null);
  const stripe = useStripe();
  const [processing, setProcessing] = useState('');
  const [clientSecret, setClientSecret] = useState('');
  const [disabled, setDisabled] = useState(true);
  const elements = useElements();
  
  useEffect(() => {

    userProductsToServer()

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
      email: props.user_details.email
    })
    .then(res => {
      setClientSecret(res.data.clientSecret);
      return res.data.clientSecret
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

  let userProductsToServer = () => {

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
      // tryIntent();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

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

      axios.post('/api/userMadePurchase', {
        payment: payload,
        user_id: props.user_details._id,
      })
      .then(function (response) {
        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });

    }
  };

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

          <div className="card-body">

            <h1 className="d-flex justify-content-between">
              <span>Checkout Process</span>
              <a href="https://stripe.com/pricing" target="_blank" rel="noopener noreferrer">
                <img src={stripePower} height="35px" alt=""/>
              </a>
            </h1>

          </div>
          
          <div className="d-flex">

            <div className="card mx-3 mb-3 w-100">
  
              <div className="shiping-info card-body">
                <h3 className="mb-4">Shipping Info</h3>
  
                <div className="form-group">
                  <label htmlFor="address">Address</label>
                  <input className="form-control with-label" name="address" id="address" type="text"/>
                </div>

                <div className="form-group">
                  <label htmlFor="city">City</label>
                  <div className="prefilled">
                    Prefilled
                  </div>
                  <input className="form-control with-label" value={props.user_details?.address?.city} name="city" id="city" type="text"/>
                </div>

                <div className="form-group">
                  <label htmlFor="state">State</label>
                  <div className="prefilled">
                    Prefilled
                  </div>
                  <input className="form-control with-label" value={props.user_details?.address?.state} name="state" id="state" type="text"/>
                </div>

                <div className="form-group">
                  <label htmlFor="zip">Zip</label>
                  <div className="prefilled">
                    Prefilled
                  </div>
                  <input className="form-control with-label" value={props.user_details?.address?.zip} name="zip" id="zip" type="text"/>
                </div>
  
              </div>
  
            </div>
  
            <div className="payment-details card mx-3 mb-3 w-100">
  
              <div className="card-body">
                
                <h3 className="mb-4">Payment</h3>

                <div className='shadow'>
                  <CardElement/>
                </div>

                <div class="remember-card form-group form-check">
                  <input type="checkbox" class="form-check-input" id="exampleCheck1"/>
                  <label class="form-check-label noselect" for="exampleCheck1">Remember Card?</label>
                </div>

                <small>We do not store any card information on our servers, all information stored with Stripe.</small>

                <div className="stored-cards mt-5">
                  <small>No saved cards</small>
                </div>

              </div>
  
            </div>

          </div>
          
        </div>

        <div className="cart">

          <div className="card shadow-sm">

            <div className="card-body">
              <h1 className="d-flex justify-content-between">
                <span>Cart</span>
                <span>{props.productsUser.length} Items</span>
              </h1>
            </div>

            <div className="card-body border-top border-dark p-2">

              {props.productsUser.map(item => 
                <li key={item._id} onClick={() => {

                  // console.log(item._id)

                  // props.dispatch(props.removeExpense({
                  //   id: item._id
                  // }));

                  // props.removeExpense({
                  //   id: item.cart_id
                  // }, () => userProductsToServer() );

                  props.removeExpense({
                    id: item.cart_id
                  });

                  // userProductsToServer()

                  // removeItemAndRefresh(item, 'dispatch')
                  // .then( thing => {
                  //   console.log("DONE")
                  //   console.log(props.productsUser)
                  //   // setReturnedProducts(returnedProducts)
                  //   userProductsToServer()
                  //   // userProductsToServer()
                  // })

                  // props.removeExpense({
                  //   id: item.cart_id
                  // })

                  // setTimeout(() => userProductsToServer(), 2000)
                  
                  // props.history.push('/');

                }} className="cart-item list-group-item d-flex justify-content-between lh-condensed shadow-sm">
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
              )}

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

              <button onClick={() => userProductsToServer()} className="btn btn-articles-light w-100" disabled={cartCount === props.productsUser.length ? true : false}>Update</button>

              <button onClick={() => tryIntent()} className={"btn btn-articles-light w-100 " + (cartCount === props.productsUser.length ? '' : 'd-none')}>Checkout</button>

              <div className="small text-center pt-2 w-100">You will be charged when you click the button</div>

              {/* Show any error that happens when processing the payment */}
              {error && (
                <div className="card-error" role="alert">
                  {error}
                </div>
              )}

              {/* Show a success message upon completion */}
              <p className={succeeded ? "result-message" : "result-message d-none"}>
                Payment succeeded, see the result in your
                <Link to={ROUTES.SETTINGS}>{" "}Account</Link>
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
const Test = connect(mapStateToProps, { removeExpense })(CheckoutForm);
export default connect(mapStateToProps, { removeExpense })(CheckoutPage);