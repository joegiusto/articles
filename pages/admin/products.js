import Head from 'next/head'
import Link from 'next/link'
import React, { Component, useState } from 'react';
import { useRouter } from 'next/router'

import AdminLayout from '../../components/layouts/admin.js';

function AdminHomePage() {
    const router = useRouter()
    const { param } = router.query
  
    return(
        <section className="submissions-page">

            <Head>
                <title>Admin - Articles</title>
            </Head> 

            <div className="container py-3">
                <h2>Products Page</h2>
                <p>Admin stuff here.</p>
            </div>

        </section>
    )
}

AdminHomePage.Layout = AdminLayout;
export default AdminHomePage;