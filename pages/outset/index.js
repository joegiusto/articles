import Head from 'next/head'
import React from 'react';
import { useRouter } from 'next/router'

function OutsetPage() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="outset-page">

            <Head>
                <title>Outset - Articles</title>
            </Head>

            <div className="container py-3">
                <h2>Outset Page</h2>
                <p>Coming Soon.</p>
            </div>

        </section>
    )
}

export default OutsetPage;