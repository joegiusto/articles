import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import axios from 'axios'

import { useRouter } from 'next/router'

import AdminLayout from 'components/layouts/admin.js';

AdminComments.Layout = AdminLayout;

export default function AdminComments() {
    const router = useRouter()
    const { param } = router.query

    // const [comments, setComments] = useState([]);
    // const [commentsLoading, setCommentsLoading] = useState(true);

    // useEffect(() => {

    //     axios.get('/api/admin/comments')
    //         .then((response) => {
    //             console.log(response)
    //             setComments(response.data);
    //             setCommentsLoading(false)
    //         })
    //         .catch((error) => {
    //             console.log(error);
    //             setCommentsLoading(false)
    //         });

    // }, []);

    return (
        <section className="admin-page email-page">

            <Head>
                <title>Admin Email - Articles</title>
            </Head>

            <div className="side-panel">

                <div className="card">
                    <div className="card-header">Email</div>
                    <div className="card-body">
                        <div>Sent Today: <b>0</b></div>
                    </div>
                </div>

            </div>

            <div className="main-panel">

                <div className="container py-3">

                    <h2>Hello</h2>

                </div>

            </div>

        </section>
    )
}