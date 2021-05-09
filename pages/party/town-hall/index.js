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
        <section className="town-hall-page">

            <Head>
                <title>Town Hall - Articles</title>
            </Head>

            <div className="container py-3">
                <h2>Town Hall Page</h2>
                <p>Return to this page when we have an event going on to interact and share input with us.</p>

                <div className="mb-3">Next Event:<span className="badge badge-dark ml-2">?</span></div>

                <div className="row">
                    
                    <div className="col-lg-8">
                        <div>Livestream is currently offline</div>

                        {/* Bootstrap 5 */}
                        {/* <div className="livestream-wrapper ratio ratio-16x9">
                            <div>16x9</div>
                        </div> */}

                        {/* Bootstrap 4 */}
                        <div className="livestream-wrapper embed-responsive embed-responsive-16by9">
                            {/* <iframe className="embed-responsive-item" src="..."></iframe> */}
                        </div>

                    </div>

                    <div className="col-lg-4">
                        <div className="chat-wrapper shadow">
                            <div className="card">
                                <div className="card-header">
                                    <h2>Chat</h2>
                                </div>
                                <div className="card-body"></div>
                                <div className="card-footer"></div>
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </section>
    )
}

// PartyHomePage.Layout = NewsLayout;
export default PartyHomePage;