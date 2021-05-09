import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import Image from 'next/image'

import { useRouter } from 'next/router'

import ROUTES from 'components/constants/routes';
import StoreLayout from 'components/layouts/store.js';

function Collections() {
    const router = useRouter()
    const { param } = router.query

    console.log(router.pathname)
    console.log(param);
  
    return(
        <section className="store-collections-page">

            <Head>
                <title>Collections - Articles</title>
            </Head>

            <div className="container py-5">

                <div className="text-center">
                    <h2>Collections Page</h2>
                    <p>List of all of our themed store collections.</p>
                </div>

                <div className="collections mx-auto" style={{maxWidth: '600px'}}>

                    <div className="card collection mb-3">

                        <div className="background-image">
                            <Image
                                src="/images/store/hero.jpg"
                                alt="People wearing branded Articles clothing"
                                layout="fill"
                                objectFit="cover"
                            />
                        </div>

                        <div className="card-body">
                            <h5>Founders Collection</h5>
                            <p>Upcoming release of our first clothing and accessory items.</p>
                            <Link href={ROUTES.STORE}><div className="btn btn-articles-light">View Collection</div></Link>
                        </div>
                    </div>

                </div>

            </div>

        </section>
    )
}

Collections.Layout = StoreLayout;
export default Collections;