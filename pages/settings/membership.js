import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import QRCode from 'qrcode.react';
import { useSelector } from 'react-redux'

import SettingsLayout from 'components/layouts/settings.js';
import ROUTES from 'components/constants/routes';

function SettingsAccountPage() {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    // console.log(router.pathname)
    // console.log(param);
  
    return(
        <section className="settings-membership-page">

            <Head>
                <title>Settings - Articles</title>
            </Head> 

            <div className="">
                <h2>Membership Page</h2>

                <div>
                    <QRCode value={`https://articles.media/signup?referral=${userReduxState._id}`} />
                </div>

                <Link href={`${ROUTES.SIGN_UP}?referral=${userReduxState._id}`}>
                    <a className="btn btn-articles-light">Referral Link</a>
                </Link>
            </div>
            
        </section>
    )
}

SettingsAccountPage.Layout = SettingsLayout;
export default SettingsAccountPage;