import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

// import moment from 'moment'

// import DropdownButton from 'react-bootstrap/DropdownButton'
// import Dropdown from 'react-bootstrap/Dropdown'

// import { Swiper, SwiperSlide } from 'swiper/react';

import ROUTES from '../../components/constants/routes';

import NewsLayout from '../../components/layouts/news.js';
// import NewsCard from '../../components/News/NewsCard';
import NewsHead from '../../components/News/NewsHead';
import NewsPreviewSlider from '../../components/News/NewsPreviewSlider';

// import background from '../../assets/img/card-1.png'

function News() {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)
    const reduxStories = useSelector((state) => state.stories.stories)
    const reduxIssues = useSelector((state) => state.issues.issues)
    const reduxMyths = useSelector((state) => state.myths.myths)

    const swiper_settings = {
        spaceBetween: 10,
        slidesPerView: 'auto',
        scrollbar: { draggable: true },
        navigation: {
            nextEl: '.fa-forward',
            prevEl: '.fa-backward',
        },
    }

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="news-front-page">

            <Head>
                <title>News - Articles</title>
                <meta name="description" content="Explore what's going on in the country, keep up to date with stories, issues and myths as well as current stock and crypto prices."/>
            </Head>

            <div className="container py-3">

                {/* Recent Stories */}
                <NewsPreviewSlider type={'Stories'} documents={reduxStories} swiper_settings={swiper_settings}/>

                {/* Recent Issues */}
                <NewsPreviewSlider type={'Issues'} documents={reduxIssues} swiper_settings={swiper_settings}/>

                {/* Recent Myths */}
                <NewsPreviewSlider type={'Myths'} documents={reduxMyths} swiper_settings={swiper_settings}/>

            </div>

        </section>
    )
}

News.Layout = NewsLayout;
export default News;