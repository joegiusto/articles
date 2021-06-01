import React, { Component, useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

import StoryAd from '../../../components/Ads/StoryAd'
import ROUTES from '../../../components/constants/routes'

// const DynamicComponentTest = dynamic(() => import('components/News/Resources/Politicians'))

const ResourcePage = dynamic(
    () => import('components/News/Resources/Politicians'),
    { ssr: false }
)

const PresidentsPage = dynamic(
    () => import('components/News/Resources/Presidents'),
    { ssr: false }
)

function Proposal() {
    const router = useRouter()
    const { resource } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    useEffect(() => {

	}, []);

    useEffect(()=>{
        if (!router.isReady) return;
    
        // codes using router.query
        console.log(resource)
    
    }, [router.isReady]);
  
    return(
        <section className="resource-page">

            <Head>
                <title>Resource - Articles</title>
            </Head>

            {resource == 'politicians' && <ResourcePage/>}
            {resource == 'presidents' && <PresidentsPage/>}

        </section>
    )
}

export default Proposal;