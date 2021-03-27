import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import StoreLayout from '../../../components/layouts/store.js';
import ROUTES from '../../../components/constants/routes';

function SavedPage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="submissions-page">
            <Head>
                <title>Saved - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Saved Page</h2>
                <p>This is the products page with the StoreLayout set.</p>
                <Link href={ROUTES.STORE_PRODUCTS}>
                    <button className="btn btn-articles-light">Browse All Products</button>
                </Link>
            </div>
        </section>
    )
}

SavedPage.Layout = StoreLayout;
export default SavedPage;