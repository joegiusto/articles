import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import SettingsLayout from '../../components/layouts/settings.js';

function SettingsAccountPage() {
    const router = useRouter()
    const { param } = router.query

    const [newsletterGeneral, setNewsletterGeneral] = useState(false)
    const [newsletterDev, setNewsletterDev] = useState(false)

    // console.log(router.pathname)
    // console.log(param);

    return (
        <section className="submissions-page">

            <Head>
                <title>Settings - Articles</title>
            </Head>

            <div className="settings-account mb-3">

                <div className="card settings-card w-100 mt-3">

                    <div className="card-header">
                        <h5>Newsletter Settings</h5>
                        <p>‎‎Manage your Newsletter settings here</p>
                    </div>

                    <div className="card-body p-3">

                        <div className="newsletter-options">

                            <div className="newsletter-option-wrapper noselect">

                                <div onClick={() => setNewsletterGeneral(!newsletterGeneral)} className={"newsletter-option " + (newsletterGeneral && 'checked')}>

                                    General

                                    <div className="box">
                                        <i className="fas fa-check mr-0"></i>
                                    </div>

                                </div>

                                <div className="badge badge-articles">Every Tuesday</div>

                            </div>

                            <div className="newsletter-option-wrapper noselect">

                                <div onClick={() => setNewsletterDev(!newsletterDev)} className={"newsletter-option " + (newsletterDev && 'checked')}>

                                    Dev

                                    <div className="box">
                                        <i className="fas fa-check mr-0"></i>
                                    </div>

                                </div>

                                <div className="badge badge-articles">Every Sunday</div>

                            </div>

                        </div>

                        <p><b>General:</b> Newsletter focused on general updates about Articles. Financial status, added content, announcements all to your inbox once a week.</p>
                        <p><b>Dev:</b> Newsletter geared around the more technical side of things, website development, news internal tools an upcoming features.</p>

                    </div>

                </div>

            </div>

        </section>
    )
}

SettingsAccountPage.Layout = SettingsLayout;
export default SettingsAccountPage;