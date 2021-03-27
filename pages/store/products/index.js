import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import StoreLayout from '../../../components/layouts/store.js';

function Products() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="submissions-page">
            <Head>
                <title>Products - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Products Page</h2>
                <p>This is the products page with the StoreLayout set.</p>
            </div>
        </section>
    )
}

Products.Layout = StoreLayout;
export default Products;

