import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import NewsLayout from '../../../components/layouts/news.js';

function LocalPage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="local-page">

            <Head>
                <title>Local - Articles</title>
            </Head>

            <div className="container py-3">
                <h2>Local Page</h2>
                <p>This is the Local Page of the news section.</p>

                <div className="row mr-3">

                    <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
                    <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://data.poughkeepsiejournal.com/media/brand_map_logo/POU.png" alt=""/>
                    </div>

                    <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
                    <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://townsquare.media/site/854/files/2017/08/hudsonvalleypost-logo-v2.jpg" alt=""/>
                    </div>

                    <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
                    <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://midhudsonnews.com/wp-content/uploads/2021/01/rsz_mhn-logo-with-tagline-optimized.png" alt=""/>
                    </div>

                    <div className="mb-3 col col-6 col-lg-3 d-flex justify-content-center align-items-center" style={{maxHeight: "150px"}}>
                    <img className="card shadow-sm w-100 h-100" style={{objectFit: 'contain'}} src="https://daily-voice-res.cloudinary.com/image/upload/v1437498082/static/dv-logo-large.png" alt=""/>
                    </div>

                </div>
                
            </div>

        </section>
    )
}

LocalPage.Layout = NewsLayout;
export default LocalPage;