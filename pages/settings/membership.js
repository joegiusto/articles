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
  
    return(
        <section className="settings-membership-page">

            <Head>
                <title>Settings - Articles</title>
            </Head> 

            <div className="">
                <h2>Membership Page</h2>
            </div>
            
        </section>
    )
}

SettingsAccountPage.Layout = SettingsLayout;
export default SettingsAccountPage;