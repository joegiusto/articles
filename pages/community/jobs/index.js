import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import { connect } from 'react-redux';

import ROUTES from 'components/constants/routes';

export default function JobsPage() {

    const [RealId, setRealId] = useState(false);

    return(
        <section className="jobs-page">

            <Head>
                <title>Jobs - Articles</title>
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="text-center mb-3 mb-lg-5">
                    <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i class="fad fa-hand-point-left"></i>Community Home</button></Link>
                    <h1>Jobs Page</h1>
                    <p>Future job postings will go here, at this time we are only looking for part time help!</p>
                </div>

            </div>

        </section>

        // <div style={{height: '100vh', marginTop: '-50px'}} className="container">

        //     <div className="row h-100 justify-content-center">
        //         <div className="col-sm-6 my-auto">
        //             <div className="card card-block p-5">
        //                 <h1>Jobs</h1>
        //                 <p>This will be the place we will put any future job postings.</p>
        //             </div>
        //         </div>
        //     </div>

        // </div>

    )
};