import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import SettingsLayout from '../../components/layouts/settings.js';

function SettingsAccountPage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);

    return (
        <section className="submissions-page">

            <Head>
                <title>Settings - Articles</title>
            </Head>

            <div className="settings-connections mb-3">

                {/* Subscription */}

                <div className={"card settings-card mt-3"}>

                    <div className="card-header">
                        <h5>Connections</h5>
                        <p>Connect your account with the following services to make signing in easier.</p>
                    </div>

                    <div className="card-body connections">

                        <div className="connection">

                            <div className="name">
                                <i className="fab fa-google ml-2"></i>
                                <span>Google</span>
                            </div>

                            <button type="button" className="btn btn-outline-secondary btn-sm">
                                <span>Not Connected</span>
                                <i className="far fa-plus-square mx-2"></i>
                            </button>

                        </div>

                        <div className="connection">

                            <div className="name">
                                <i className="fab fa-apple ml-2"></i>
                                <span>Apple</span>
                            </div>

                            <button type="button" className="btn btn-outline-secondary btn-sm">
                                <span>Not Connected</span>
                                <i className="far fa-plus-square mx-2"></i>
                            </button>

                        </div>

                        <div className="connection">

                            <div className="name">
                                <i className="fab fa-linkedin ml-2"></i>
                                <span>LinkedIn</span>
                            </div>

                            <button type="button" className="btn btn-outline-secondary btn-sm">
                                <span>Not Connected</span>
                                <i className="far fa-plus-square mx-2"></i>
                            </button>

                        </div>

                        <div className="connection">

                            <div className="name">
                                <i className="fab fa-twitter ml-2"></i>
                                <span>Twitter</span>
                            </div>

                            <button type="button" className="btn btn-outline-secondary btn-sm">
                                <span>Not Connected</span>
                                <i className="far fa-plus-square mx-2"></i>
                            </button>

                        </div>

                    </div>

                </div>
            </div>

        </section>
    )
}

SettingsAccountPage.Layout = SettingsLayout;
export default SettingsAccountPage;