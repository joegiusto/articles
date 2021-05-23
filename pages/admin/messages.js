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
                <p>Different metrics and actions for managing the messages portion of the website.</p>

                <div className="d-flex">

                    <div style={{width: '100px'}} className="m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                Threads
                            </div>
                        </div>
    
                    </div>
                    
                    <div style={{width: '100px'}} className="m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                Groups
                            </div>
                        </div>
    
                    </div>
    
                    <div style={{width: '100px'}} className="m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                GB
                            </div>
                        </div>
    
                    </div>

                    <div style={{width: '100px'}} className="m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                Reports
                            </div>
                        </div>
    
                    </div>

                    <div style={{width: '100px'}} className="m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                GB
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