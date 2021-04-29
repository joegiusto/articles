import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import axios from 'axios'

// Articles Absolute
import ROUTES from 'components/constants/routes';
import NewsLayout from 'components/layouts/news.js';
import NewsHead from 'components/News/NewsHead';
import NewsPreviewSlider from 'components/News/NewsPreviewSlider';

function News() {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)
    const reduxStories = useSelector((state) => state.stories.stories)
    const reduxIssues = useSelector((state) => state.issues.issues)
    const reduxMyths = useSelector((state) => state.myths.myths)

    const [ newsDocumentCount, setNewsDocumentCount ] = useState({
        stories: 30,
        issues: 17,
        myths: 13
    })

    const swiper_settings = {
        spaceBetween: 10,
        slidesPerView: 'auto',
        scrollbar: { draggable: true },
        navigation: {
            nextEl: '.preview-next',
            prevEl: '.preview-prev',
        },
    }

    useEffect(() => {

        axios.get(`/api/news/count`)
        .then(res => {
            console.log(res);
            setNewsDocumentCount(res.data)
        })
        .catch(err => {
            console.log(err)
        });
    
    }, []);
  
    return(
        <section className="news-front-page">

            <Head>
                <title>News - Articles</title>
                <meta name="description" content="Explore what's going on in the country, keep up to date with stories, issues and myths as well as current stock and crypto prices."/>
            </Head>

            <div className="container py-3">

                {/* Recent Stories */}
                <NewsPreviewSlider type={'Stories'} documents={reduxStories} swiper_settings={swiper_settings} newsDocumentCount={newsDocumentCount}/>

                {/* Recent Issues */}
                <NewsPreviewSlider type={'Issues'} documents={reduxIssues} swiper_settings={swiper_settings} newsDocumentCount={newsDocumentCount}/>

                {/* Recent Myths */}
                <NewsPreviewSlider type={'Myths'} documents={reduxMyths} swiper_settings={swiper_settings} newsDocumentCount={newsDocumentCount}/>

            </div>

        </section>
    )
}

News.Layout = NewsLayout;
export default News;