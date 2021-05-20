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
                <title>Admin Messages - Articles</title>
            </Head> 

            <div className="container py-3">

                <h2>Messages Page</h2>
                <p>Admin stuff here.</p>

                <div className="">

                    <div style={{width: '100px'}} class="embed-responsive embed-responsive-1by1 border bg-white shadow d-flex justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                Threads
                            </div>
                        </div>
    
                    </div>
    
                    <div style={{width: '100px'}} class="embed-responsive embed-responsive-1by1 border bg-white shadow d-flex justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                Threads
                            </div>
                        </div>
    
                    </div>

                </div>

            </div>

        </section>
    )
}

AdminHomePage.Layout = AdminLayout;
export default AdminHomePage;