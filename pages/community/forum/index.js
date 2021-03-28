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
  
  const Page = () => (
    <div className="forum-page">

        <Head>
            <title>Forum - Articles</title>
        </Head>

        <div className="container">
            <div className="row h-100 justify-content-center">
            <div className="col-sm-12 my-auto">
                <div className="card shadow-sm">
    
                <div className="card-body">
                    <h1>Forum</h1>
                    <p>Help shape the future of Articles.</p>
                </div>
    
                <div className="threads card-footer p-0 px-2 pt-3 py-5">
        
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
    
                <div style={{backgroundColor: 'rgb(49 49 49);'}} className="card-footer py-2 text-center">
                    <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light">Support Hub</button></Link>
                </div>
    
                </div>
            </div>
            </div>
        </div>
    </div>
  );
  
  export default Page 