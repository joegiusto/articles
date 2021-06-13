import React, { Component, useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

// import StoryAd from '../../../components/Ads/StoryAd'
// import ROUTES from '../../../components/constants/routes'
import ROUTES from 'components/constants/routes';

// const DynamicComponentTest = dynamic(() => import('components/News/Resources/Politicians'))

const PoliticiansPage = dynamic(
    () => import('components/News/Resources/Politicians'),
    { ssr: false }
)

const PresidentsPage = dynamic(
    () => import('components/News/Resources/Presidents'),
    { ssr: false }
)

const CoronavirusPage = dynamic(
    () => import('components/News/Resources/Coronavirus'),
    { ssr: false }
)

const AbuseOfPowerPage = dynamic(
    () => import('components/News/Resources/AbuseOfPower'),
    { ssr: false }
)

// const MassShootings = dynamic(
//     () => import('components/News/Resources/AbuseOfPower'),
//     { ssr: false }
// )

import MassShootingsPage from 'components/News/Resources/MassShootings'

function ResourceWrapperPage() {
    const router = useRouter()
    let resource = ['']
    resource = router.query.resource || ['']

    const userReduxState = useSelector((state) => state.auth.user_details)

    useEffect(() => {

	}, []);

    useEffect(()=>{
        if (!router.isReady) return;
    
        // codes using router.query
        console.log(resource)
    
    }, [router.isReady]);

    function renderResource(resource) {
        switch(resource) {
            case 'abuse-of-power':
                return <AbuseOfPowerPage/>
            case 'presidents':
                return <PresidentsPage/>
            case 'politicians':
                return <PoliticiansPage/>
            case 'coronavirus':
                    return <CoronavirusPage/>
            case 'mass-shootings':
                    return <MassShootingsPage/>
            default:
                return (
                    <div className="container text-center py-5">
                        {/* <div className="d-flex flex-column justify-content-center py-5"> */}
                            <h2>No resource found with that ID</h2>
                            <Link href={ROUTES.RESOURCES}>
                                <a className="btn btn-articles-light">View Resources</a>
                            </Link>
                        {/* </div> */}
                    </div>
                )
          }
    }
  
    return(
        <section className="resource-page">

            <Head>
                <title>Resource - Articles</title>
            </Head>

            {
                
            }

            {/* {resource == 'politicians' && <ResourcePage/>} */}
            {/* {resource == 'presidents' && <PresidentsPage/>} */}

            {renderResource(resource[0])}

        </section>
    )
}

export default ResourceWrapperPage;