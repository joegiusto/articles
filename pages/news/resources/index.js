import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import moment from 'moment'

import ROUTES from 'components/constants/routes';
import NewsLayout from 'components/layouts/news.js';

const resourceItems = [
    {
        title: 'Presidents',
        location: 'presidents',
        last_updated: '6/12/21',
        card_items: ['Age', 'Accomplishments', 'Terms', 'Birthdays', 'Pardons', 'Pay', 'Gallery', 'Criticisms']

    },
    {
        title: 'Coronavirus',
        location: 'coronavirus',
        last_updated: '6/12/21',
        card_items: ['Excess Deaths', 'New Cases', 'Deaths', 'Vaccine Projections']

    },
    {
        title: 'Politicians',
        location: 'politicians',
        last_updated: '6/12/21',
        card_items: ['Senate Members', 'HOR Members', 'Voting History', 'Lobbyist Involvement', 'Accomplishments', 'Pay', 'Criticisms', 'Conflict of Interest', 'Gallery']

    },
    {
        title: 'Mass Shootings',
        location: 'mass-shootings',
        last_updated: '6/12/21',
        card_items: ['Weapon Types', 'Mental Health Status', 'Terms', 'Birthdays', 'Pardons', 'Pay', 'Gallery', 'Criticisms']

    },
    {
        title: 'Abuse of Power',
        location: 'abuse-of-power',
        last_updated: '6/12/21',
        card_items: ['Crimes Against People', 'Crimes Against Humanity', 'Abuse of Power']

    }
]

function ResourcesPage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname);
    console.log(param);
  
    return(
        <section className="resources-page">

            <Head>
                <title>Resources - Articles</title>
            </Head>

            <div className="container py-3">

                <h2>Resources</h2>
                {/* <p className="mb-4">This is the Resources Page of the news section.</p> */}

                <div className="row">

                    <div className="col-lg-12">
                        <div className="row">

                            {resourceItems.map(item => (
                                <div key={item.title} className="col-lg-6 mb-3">

                                    <div className="card h-100 shadow-articles rounded-0">

                                        <div className="card-header d-flex justify-content-between">
                                            <h5 className="mb-0">{item.title}</h5>
                                            <div className="text-muted">
                                                {/* <span className="badge badge-warning mr-2">In Development</span> */}
                                                <span>Last Updated: {moment(item.last_updated).format("LL")}</span>
                                            </div>
                                        </div>

                                        <div className="card-body">

                                            <div className="row">

                                                <div className="col-lg-6">
                                                <ul>
                                                    <li>Age</li>
                                                    <li>Accomplishments</li>
                                                    <li>Terms</li>
                                                    <li>Birthdays</li>
                                                </ul>
                                                </div>

                                                <div className="col-lg-6">
                                                <ul>
                                                    <li>Pardons</li>
                                                    <li>Pay</li>
                                                    <li>Gallery</li>
                                                    <li>Criticisms</li>
                                                </ul>
                                                </div>

                                            </div>

                                            <Link href={ `${ROUTES.RESOURCES}/${item.location}` }>
                                                <a className="btn btn-lg btn-articles-light">Access</a>
                                            </Link>
                                        
                                        </div>

                                    </div>

                                </div>
                            ))}

                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

ResourcesPage.Layout = NewsLayout;
export default ResourcesPage;