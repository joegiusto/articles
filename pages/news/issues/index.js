import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import NewsLayout from '../../../components/layouts/news.js';
import NewsCard from '../../../components/News/NewsCard';

function NewsIssues() {
    const router = useRouter()
    const { param } = router.query

    const reduxIssues = useSelector((state) => state.issues.issues)

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="issues-section">

            <Head>
                <title>Issues - Articles</title>
            </Head>

            <div className="container py-3">

                <h2>Stories</h2>

                <DropdownButton variant="articles-light" id="dropdown-basic-button" title={ <span><i className="fas fa-filter"></i> Newest</span> }>
                    <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                </DropdownButton>
                
            </div>

            <div className="news-static container mb-5">
                <div className="news-preview-container story">
                    {reduxIssues.map( (document, i) => (
                        <NewsCard key={document._id} document={document}/>
                    ))}
                </div>
            </div>

        </section>
    )
}

NewsIssues.Layout = NewsLayout;
export default NewsIssues;