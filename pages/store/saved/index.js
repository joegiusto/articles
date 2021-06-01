import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { connect, useSelector } from 'react-redux'

import moment from 'moment'

import StoreLayout from 'components/layouts/store.js';
import StoreItem from 'components/store/StoreItem';
import ROUTES from 'components/constants/routes';

function SavedPage() {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="submissions-page">
            <Head>
                <title>Saved - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Saved Page</h2>
                <p>All of your saved store products.</p>

                <Link href={ROUTES.STORE_PRODUCTS}>
                    <button className="btn btn-articles-light">Browse All Products</button>
                </Link>

                <div className="mt-3">
                    {userReduxState.saved_products?.map( product => {
                        return(
                            <div>
                                <div className="mb-1 badge badge-articles">Saved: {moment(product.date).format("LL")}</div>
                                <StoreItem
                                    // setPopOutVisible={this.setPopOut}
                                    product={product}
                                    color="articles"
                                    isSaved={true}
                                />
                            </div>
                        )   
                    })}
                </div>

            </div>
        </section>
    )
}

SavedPage.Layout = StoreLayout;
export default (SavedPage);