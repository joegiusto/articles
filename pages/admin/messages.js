import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios'

import AdminLayout from 'components/layouts/admin.js';

function AdminHomePage() {
    const router = useRouter()
    const { param } = router.query

    const [totals, setTotals] = useState({
        chat_count: 0,
        group_chat_count: 0,
        messages_aws_storage: 0
    })

    useEffect(() => {

        axios.get('/api/admin/messages/totals')
        .then(function (response) {
            console.log(response);
            setTotals(response.data.totals)
        })
        .catch(function (error) {
            console.log(error);
        });

    }, []);
  
    return(
        <section className="admin-page admin-messages">

            <Head>
                <meta name="robots" content="noindex"/>
                <title>Admin Messages - Articles</title>
            </Head>

            <div className="container py-3">

                <h2>Messages Page</h2>
                <p>Different metrics and actions for managing the messages portion of the website.</p>

                <div className="d-flex">

                    <div style={{width: '100px'}} className="metric-item m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">{totals?.chat_count}</h2></div>
        
                            <div className="text-muted">
                                Chats
                            </div>

                            <div className="encrypted badge badge-articles">Encrypted: {totals?.encrypted_chat_count}</div>

                        </div>
    
                    </div>
                    
                    <div style={{width: '100px'}} className="metric-item m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">{totals?.group_chat_count}</h2></div>
        
                            <div className="text-muted">
                                Groups
                            </div>

                            <div className="encrypted badge badge-articles">Encrypted: {totals?.encrypted_group_chat_count}</div>

                        </div>
    
                    </div>
    
                    <div style={{width: '100px'}} className="metric-item m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                GB
                            </div>
                        </div>
    
                    </div>

                    <div style={{width: '100px'}} className="metric-item m-1 embed-responsive embed-responsive-1by1 border card shadow-sm d-flex flex-row justify-content-center align-items-center">
    
                        <div className="text-center">
                            <div><h2 className="mb-0">0</h2></div>
        
                            <div className="text-muted">
                                Reports
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