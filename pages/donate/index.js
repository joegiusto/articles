import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { Elements, CardElement, useStripe, useElements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js'

const stripePromise = loadStripe('pk_test_gTKVWvKf5GGQXxl6oUELsI1X008BFf6xST');

function DonatePage() {
    const router = useRouter()
    const { param } = router.query
  
    return(
        <section className="donate-page-new">

            <Head>
                <title>Donate - Articles</title>
            </Head> 

            <div className="container py-3">

                <h2>Donate Page</h2>
                <p>Donate stuff here.</p>

                <Elements stripe={stripePromise}>
                    <CheckoutForm />
                </Elements>

            </div>

        </section>
    )
}

const CheckoutForm = () => {
    const stripe = useStripe();
    const elements = useElements();
  
    const handleSubmit = async (event) => {
      // Block native form submission.
      event.preventDefault();
  
      if (!stripe || !elements) {
        // Stripe.js has not loaded yet. Make sure to disable
        // form submission until Stripe.js has loaded.
        return;
      }
  
      // Get a reference to a mounted CardElement. Elements knows how
      // to find your CardElement because there can only ever be one of
      // each type of element.
      const cardElement = elements.getElement(CardElement);
  
      // Use your card Element with other Stripe.js APIs
      const {error, paymentMethod} = await stripe.createPaymentMethod({
        type: 'card',
        card: cardElement,
      });
  
      if (error) {
        console.log('[error]', error);
      } else {
        console.log('[PaymentMethod]', paymentMethod);
      }
    };
  
    return (
      <form onSubmit={handleSubmit}>
          
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

        <button className="btn btn-articles-light mt-3" type="submit" disabled={!stripe}>
          Pay
        </button>

      </form>
    );
  };

export default DonatePage;