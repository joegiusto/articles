import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'
import moment from 'moment';

import ROUTES from 'components/constants/routes';

import StoreLayout from 'components/layouts/store.js';

function Collections() {
    const router = useRouter()
    const { param } = router.query

    const [ orders, setOrders ] = useState([]);
    const [ ordersLoading, setOrdersLoading ] = useState(false);

    console.log(router.pathname)
    console.log(param);

    useEffect(() => {

        axios.get('/api/user/orders', {

        })
            .then((response) => {
                console.log(response)
                setOrders(response.data);
            })
            .catch((error) => {
                console.log(error);
            });

    }, []);

    return (
        <section className="orders-page">

            <Head>
                <title>Orders - Articles</title>
            </Head>

            {/* <div className="container py-3">
                <h2>Orders Page</h2>
                <p>This is the products page with the StoreLayout set.</p>
            </div> */}

            <div className="order-details">
                <div className="container d-flex flex-column align-items-center">

                    <div className="orders-card card">

                        <div className="card-header d-flex flex-column flex-lg-row align-items-center justify-content-lg-between">

                            <h1 className="mb-0">Orders</h1>

                            <div className="">
                                <button className="btn btn-articles-light alt">Active - {orders.length || 0}</button>
                                {/* <button className="btn btn-articles-light">Archived</button> */}
                            </div>

                        </div>

                        <div className="card-body">

                            {ordersLoading ?
                                'Loading'
                                :
                                orders?.map((order) => (
                                    <Link href={ROUTES.STORE_ORDERS + '/' + order._id}>

                                        {/* <OrderCard order={order} /> */}
                                        <div className="card mb-3">

                                            <div className="card-header">
                                                {moment(order.date).format("LL")} Order
                                            </div>

                                            <div className="card-body">
                                                {JSON.stringify(order, null, 4)}
                                            </div>
                                            
                                        </div>

                                    </Link>
                                ))
                            }

                            {/* <div className="sign-in-required-global-tag">
                                <div>Please Sign In to see recent orders</div>
                                <Link to={ROUTES.SIGN_IN}><button className="btn btn-articles-light mt-3">Sign In</button></Link>
                            </div> */}

                        </div>

                        {/* <div className="card-footer"></div> */}

                    </div>

                    {/* <Link to={ROUTES.STORE}><div className="btn btn-articles-light">Back To Store</div></Link> */}

                </div>
            </div>

        </section>
    )
}

Collections.Layout = StoreLayout;
export default Collections;