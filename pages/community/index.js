import React from 'react';

import Link from 'next/link'
import Head from 'next/head'

import ROUTES from 'components/constants/routes'

const itemsToRender = [
    [
        ROUTES.POLLS, 
        'Polls', 
        <i className="fad fa-poll"></i>,
        'Vote on ideas and proposals to shape the future of Articles!'
    ],
    [
        ROUTES.UPDATES, 
        'Updates', 
        <i className="far fa-sparkles"></i>,
        'Weekly updates about what is gooing on at Articles.'
    ],
    [
        ROUTES.FAQ,
        'Frequently Asked Questions',
        <i className="far fa-question-circle"></i>,
        'Answers to common questions about the platform.'
    ],
    [
        ROUTES.ROADMAP,
        'Roadmap',
        <i className="fad fa-map-signs"></i>,
        'What is next for Articles and where we are taking the platform.'
    ],
    [
        ROUTES.PRESS,
        'Press and Contact',
        <i className="fas fa-pen-alt"></i>,
        'Reach out to us about any questions or opportunities.'
    ],
    [
        ROUTES.PRIVACY,
        'Privacy',
        <i className="fas fa-user-secret"></i>,
        'A breakdown of how we use your data to make Articles better.'
    ],
    // [
    //     ROUTES.TRANSLATIONS,
    //     'Translations',
    //     <i className="fas fa-language"></i>,
    //     'A breakdown of how we use your data to make Articles better.'
    // ],
    [
        ROUTES.FORUM,
        'Forum',
        <i className="far fa-comments"></i>,
        'A place to share thought and ideas with us.'
    ],
    // One day!
    //   [ROUTES.JOBS, 'Jobs', <i className="fas fa-briefcase"></i>],
    [
        ROUTES.BETA,
        'Beta Testing',
        <span className="badge badge-dark">!</span>,
        'Try and test new features before they get released to all users.'
    ],
]

export default function CommunityPage(props) {

    return (
        <div className="community-page">

            <Head>
                <title>Community - Articles</title>
            </Head>

            <div className="container">

                <div className="text-center">
                    <h1>Community Hub</h1>
                    <p>Various pages that carry out different tasks for the site</p>
                </div>

                <div className="hub-items">
                    {itemsToRender.map((item, i) => 
                        <Link href={item[0]}>

                            <div className="item card">

                                <div className="card-header">
                                    <b><span className="icon">{item[2]}</span> <span className="title">{item[1]}</span></b>
                                </div>

                                <div className="card-body">
                                    {item[3]}
                                </div>

                                <div className="view-link">
                                    View <i className="fas fa-caret-right"></i>
                                </div>
                                
                            </div>

                        </Link>
                    )}
                </div>

            </div>

        </div>
    )
};