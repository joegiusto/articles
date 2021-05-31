import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head'

import ROUTES from '../../../components/constants/routes';

const Page = () => (
    <div className="roadmap-page">

        <Head>
            <title>Roadmap - Articles</title>
        </Head>

        <img className="roadmap-trail-image" src="https://cdn.onlinewebfonts.com/svg/img_446438.png" alt="" />
        <img className="roadmap-map-image" src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/568635131536669843-512.png" alt="" />

        <div className="container py-3 py-lg-5">

            <div className="text-center mb-3 mb-lg-5">
                <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i class="fad fa-hand-point-left"></i>Community Home</button></Link>
                <h1 className="">Forums</h1>
                <p className="">Help shape the future of Articles.</p>
            </div>

            <div className="row h-100 justify-content-center">
                <div className="col-sm-6 my-auto">

                    <div className="card shadow mb-3">

                        <div className="card-body text-center">
                            <h2 className="mb-0">2021</h2>
                            <p className="mb-0">An overview of whats to come.</p>
                        </div>

                        <div className="roadmap-cards card">

                            <div className="card-body roadmap-card">
                                {/* <div className="title">2021</div> */}
                                <div className="text">
                                    <ul className="mb-0">
                                        <li>Grow advertiser count to 5</li>
                                        <li>Implement "Real ID" system to allow access to a separate comment channel for users that have verified they are a human and have citizenship in the United States.</li>
                                        <li>Weekly general update videos and newsletters about whats happening at Articles</li>
                                        <li>Weekly development update videos and newsletters about our website</li>
                                        <li>Weekly news update videos and newsletters about whats happening in the country</li>
                                        <li>Add the ability for users to subscribe to tags</li>
                                        <li>Begin clothing sales</li>
                                        <li>Grow users to 5,000</li>
                                        <li>Add a system/api for other services to integrate widgets for the users home screen. Upcoming flights, bank account balance, notepads, etc.</li>
                                        <li>Add the ability to encrypt Messages with custom passphrase (PGP).</li>
                                    </ul>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className="card shadow mb-3">

                        <div className="card-body text-center">
                            <h2 className="mb-0">2022</h2>
                            <p className="mb-0">To be determined.</p>
                        </div>

                        <div className="roadmap-cards card">

                            <div className="card-body roadmap-card">

                                <div className="text">
                                    <ul className="mb-0">...</ul>
                                </div>
                            </div>

                        </div>

                    </div>

                </div>
            </div>
        </div>

    </div>
);

export default Page