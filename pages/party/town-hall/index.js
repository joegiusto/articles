import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

// import NewsLayout from '../../components/layouts/news.js';

function PartyHomePage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="party-page">

            <Head>
                <title>Town Hall - Articles</title>
            </Head>

            <div className="container py-3">
                <h2>Town Hall Page</h2>
                <p>This is the Town Hall Page of the party section.</p>
            </div>
            
        </section>
    )
}

// PartyHomePage.Layout = NewsLayout;
export default PartyHomePage;