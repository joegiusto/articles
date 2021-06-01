import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import { useRouter } from 'next/router'

import SettingsLayout from 'components/layouts/settings.js';
import ROUTES from 'components/constants/routes';

SettingsAccountPage.Layout = SettingsLayout;

export default function SettingsAccountPage() {
    const router = useRouter()
    const { param } = router.query

    const [userDonations, setUserDonations] = useState([])
    const [userDonationsLoading, setUserDonationsLoading] = useState(true)

    const [orders, setOrders] = useState([])
    const [ordersLoading, setOrdersLoading] = useState([])

    const [paymentMethods, setPaymentMethods] = useState([])
    const [userPaymentMethodsLoading, setUserPaymentMethodsLoading] = useState(true)

    console.log(router.pathname)
    console.log(param);

    return (
        <section className="settings-billing-page">

            <Head>
                <title>Settings - Articles</title>
            </Head>

            <div className="settings-account mb-3">

                {/* Billing */}

                <div className={"card settings-card mt-3"}>

                    <div className="card-header">
                        <h5>Payment Methods</h5>
                        <p>Saved payment methods for subscriptions and orders</p>
                    </div>

                    <div className="card-body">

                        <div className="info donations w-100 table-responsive" style={{ borderBottom: '1px solid #000' }}>
                            <table className="table mb-0">
                                <thead className="">
                                    <tr>
                                        <th scope="col">Brand</th>
                                        <th scope="col">Last 4</th>
                                        <th scope="col">Exp</th>
                                        <th scope="col">Primary</th>
                                        <th scope="col">Action</th>
                                    </tr>
                                </thead>

                                <tbody>
                                    {
                                        userPaymentMethodsLoading ?

                                            <tr>
                                                <td colSpan="4" className="text-center w-100 p-3">
                                                    <h4 className="mb-0"><i className="fas fa-spinner fa-spin"></i>Loading payment methods...</h4>
                                                </td>  
                                            </tr>

                                            :
                                            userPaymentMethods?.map(card => {

                                                function renderedBrandImage(card_brand) {

                                                    switch (card_brand) {
                                                        case 'visa':
                                                            // code block
                                                            return <i className="fab fa-2x fa-cc-visa"></i>
                                                        // break;
                                                        default:
                                                            // code block
                                                            return card_brand
                                                    }

                                                }

                                                return (
                                                    <tr className="donation">

                                                        <th scope="row" className="" >{renderedBrandImage(card.card.brand)}</th>

                                                        <td className="">{card.card.last4}</td>

                                                        <td className="">{card.card.exp_month}/{card.card.exp_year}</td>

                                                        <td className="">
                                                            {
                                                                this.state.defaultUserPaymentMethod === card.id ?
                                                                    // <span className="badge badge-primary">Primary</span>
                                                                    <button className="btn btn-sm btn-articles-light alt" disabled>Primary</button>
                                                                    :
                                                                    // <span className="badge badge-secondary" onClick={() => this.setDefaultPaymentMethod(card.id)}>Make Primary</span>
                                                                    <button className="btn btn-articles-light btn-sm" onClick={() => this.setDefaultPaymentMethod(card.id)}>Make Primary</button>
                                                            }
                                                        </td>

                                                        <td className="">
                                                            <DeletePaymentMethod card={card} />
                                                        </td>

                                                    </tr>
                                                )

                                            })
                                    }

                                </tbody>

                                {/* {this.state.previousUserDonationsLoading ? null : this.state.previousUserDonations.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''} */}

                            </table>

                        </div>

                        <button className="btn btn-articles-light my-3 mx-auto w-100 d-block" style={{ maxWidth: '300px' }}>Add Payment Method</button>

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

                                        {userDonationsLoading ?
                                            <tr>
                                                <td colSpan="4" className="text-center w-100 p-3">
                                                    <h4 className="mb-0"><i className="fas fa-spinner fa-spin"></i>Loading donations...</h4>
                                                </td>  
                                            </tr>

                                            :

                                            userDonations.length > 1 ?

                                                userDonations.map(donation => (
                                                    <tr className="donation">
                                                        <th scope="row" className="donation-id">{donation._id}</th>
                                                        <td className="date">{moment(donation.date).format('LLL')}</td>
                                                        <td className="type">Donation</td>
                                                        <td className="amount">${(donation.amount / 100).toFixed(2)}</td>
                                                    </tr>
                                                ))

                                                :

                                                <tr>
                                                    <th>No Donations yet, place one here <Link href={ROUTES.DONATE}>Donate</Link></th>
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

                                    <tr>
                                        {ordersLoading && 
                                            <td colSpan="4" className="text-center w-100 p-3">
                                                <h4 className="mb-0"><i className="fas fa-spinner fa-spin"></i>Loading orders...</h4>
                                            </td>        
                                        }
                                    </tr>

                                    { (orders.length > 0 && ordersLoading == false) &&
                                        orders?.map(order =>
                                            <tr className="order" onClick={() => this.redirectToOrder(order._id)}>
                                                <th scope="row" className="order-id">{order._id}</th>
                                                <td className="date">{moment(order.date).format('LLL')}</td>
                                                <td className="type">{order.for}</td>
                                                <td className="amount">${(order.payment.total / 100).toFixed(2)}</td>
                                            </tr>
                                        )
                                    }
                                </tbody>

                                {/* {this.state.previousUserOrdersLoading ? null : this.state.previousUserOrders.length < 1 ? <div className="pl-3 pt-3">No donations to display</div> : ''} */}

                            </table>

                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}