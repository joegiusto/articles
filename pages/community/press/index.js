import React, { useState, useEffect } from 'react';

import { connect } from 'react-redux';

import Head from 'next/head'
import Link from 'next/link'

import ROUTES from 'components/constants/routes';

export default function PressPage() {

    return (

        <div className="press-page">

            <Head>
                <title>Press - Articles</title>
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="text-center mb-3 mb-lg-5">
                    <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i class="fad fa-hand-point-left"></i>Community Home</button></Link>
                    <h1 className="">Press and Business</h1>
                    <p className="">To reach out with questions or any other inquires contact us by the following methods.</p>
                </div>

                <div className="row h-100 justify-content-center">
                    <div className="col-sm-6 my-auto">
                        <div className="card shadow-sm">

                            <div className="card-footer p-0 px-2 pt-3">

                                <div className="alert alert-light">
                                    <div className="title">Phone:</div>
                                    <div className="text">845-214-2713</div>

                                    <div className="hover-icon">
                                        <i className="fas fa-phone"></i>
                                    </div>
                                </div>

                                <div className="alert alert-light">
                                    <div className="title">Email:</div>
                                    <div className="text">joey@articles.media</div>

                                    <div className="hover-icon">
                                        <i className="far fa-envelope-open"></i>
                                    </div>
                                </div>

                            </div>

                            {/* <div style={{ backgroundColor: 'rgb(49 49 49);' }} className="card-footer py-2 text-center">
                                <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light">Support Hub</button></Link>
                            </div> */}

                        </div>
                    </div>
                </div>
            </div>
        </div>

    )
};