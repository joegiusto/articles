import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import NewsLayout from '../../../components/layouts/news.js';

function Home() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="submissions-page">
            <Head>
                <title>Stories - Articles</title>
            </Head>
            <div className="container py-3">
                <h2>Stories Page</h2>
                <p>This is the Stories Page of the news section.</p>
            </div>
        </section>
    )
}

Home.Layout = NewsLayout;
export default Home;