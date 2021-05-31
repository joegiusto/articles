import React, { useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head'

import ROUTES from '../../../components/constants/routes';

const threads = [
    {
      title: 'News Content Suggestions',
      url_title: 'news-content-suggestions'
    },
    {
      title: 'Youtube Video Suggestions',
      url_title: 'youtube-video-suggestions'
    },
    {
      title: 'Site Suggestions',
      url_title: 'site-suggestions'
    },
    {
      title: 'Reports Discussion',
      url_title: 'reports-discussion'
    },
    {
      title: 'Clothing Discussion and Suggestions',
      url_title: ''
    }
  ]
  
export default function Page() {

    return ( <div className="forum-page">

        <Head>
            <title>Forum - Articles</title>
        </Head>

        <div className="container py-3 py-lg-5">

            <div className="text-center mb-3 mb-lg-5">
                <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i class="fad fa-hand-point-left"></i>Community Home</button></Link>
                <h1 className="">Forums</h1>
                <p className="">Help shape the future of Articles.</p>
            </div>

            <div className="card threads p-2">
        
                {/* <div className="d-flex justify-content-between">
                <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.HOME}>Home Page</Link></p>
                <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.LANDING}>Landing Page</Link></p>
                </div> */}

                {threads.map(thread => 
                <Link href={ROUTES.FORUM + '/' + thread.url_title}>
                    <div className="thread alert alert-light">
                        <div className="title">0 Threads</div>
                        <div className="text">{thread.title}</div>

                        <div className="hover-icon">
                            <i className="fas fa-eye"></i>
                        </div>
                    </div>
                </Link>
                )}
                
            </div>

        </div>

    </div> )
};