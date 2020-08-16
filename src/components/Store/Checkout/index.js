import React, { Component, useState, useEffect } from 'react';
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
  const [returnedProducts, setReturnedProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const [error, setError] = useState(null);
  const [tax, setTax] = useState(0);

  const stripe = useStripe();
  // const [paymentRequest, setPaymentRequest] = useState(null);
  const [clientSecret, setClientSecret] = useState('');

  const tryIntent = () => {
    axios.post('/api/create-payment-intent', {
      amount: 599
    })
    .then(res => {
      console.log(res)
      return res;
    })
    .then(data => {
      setClientSecret(data.clientSecret);
      // return data.clientSecret
    })
    .catch(function (error) {
      console.log(error);
      setError('Could not get valid intent')
    });
  }

  const userProductsToServer = () => {
    const productsUserToServer = props.productsUser.map( (product) => { return {
      _id: product.note,
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
      tryIntent();
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  useEffect(() => {

    userProductsToServer()

  }, []);

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
  
            <div className="card mx-3 mb-3 w-100">
  
              <div className="card-body">
                <h3 className="mb-4">Payment</h3>
                <div className='shadow'>
                  <CardElement/>
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
                <span>{returnedProducts.length} Items</span>
              </h1>
            </div>

            <div className="card-body border-top border-dark p-2">

              {returnedProducts.map(item => 
                <li onClick={() => {
                  console.log(item._id)
                  props.dispatch(removeExpense({
                    id: item._id
                  }));
                  // props.history.push('/');
                }} className="cart-item list-group-item d-flex justify-content-between lh-condensed shadow-sm">
                  <div>
                    <h6 className="my-0">{item.title}</h6>
                    <small className="text-muted">{ letterToSize[item.size] || '' }</small>
                  </div>
                  <span className="text-muted">${(item.price / 100).toFixed(2) || ''}</span>
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
                <strong>${ total === 0 ? 0.00 : ( total + tax ) - ( 0.029 * (total + tax + .30 ) ).toFixed(2) }</strong>
              </li>

            </div>

            <div className="card-body border-top border-dark p-2">
              <button className="btn btn-articles-light w-100">Checkout</button>
              <div className="small text-center pt-2 w-100">You will be charged when you click the button</div>
            </div>

          </div>

        </div>

      </div>
  );
}
  
const CheckoutPage = (props) => (

  <div className='checkout-page container'>

    <Elements stripe={stripePromise}>
      <CheckoutForm {...props}></CheckoutForm>
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
export default connect(mapStateToProps)(CheckoutPage);