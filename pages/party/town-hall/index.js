import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import TextareaAutosize from 'react-textarea-autosize';

function PartyHomePage() {
    const router = useRouter()
    const { param } = router.query

    const [  participationSideBarTab, setParticipationSideBarTab ] = useState('Chat');
    const [ chatMessage, setChatMessage ] = useState('');
  
    return(
        <section className="town-hall-page">

            <Head>
                <title>Town Hall - Articles</title>
            </Head>

            <div className="container py-3 py-lg-5">

                <div className="text-center mb-3 mb-lg-5">
                    <h2>Town Hall</h2>
                    <p>Return to this page when we have an event going on to interact and share input with us.</p>
                </div>

                {/* <div className="mb-3">Next Event:<span className="badge badge-dark ml-2">?</span></div> */}

                <div className="row">
                    
                    <div className="col-lg-8 mb-3 mb-lg-0">
                        {/* <div>Livestream is currently offline</div> */}

                        {/* Bootstrap 5 */}
                        {/* <div className="livestream-wrapper ratio ratio-16x9">
                            <div>16x9</div>
                        </div> */}

                        {/* Bootstrap 4 */}
                        <div className="livestream-wrapper embed-responsive embed-responsive-16by9">
                            <h2 className="stream-status-badge badge badge-light badge-lg border"><i className="fas fa-video-slash"></i>Offline</h2>
                            <h2 className="stream-status-message badge badge-light badge-lg border">Next event: TBA</h2>
                            {/* <iframe className="embed-responsive-item" src="..."></iframe> */}
                        </div>

                    </div>

                    <div className="col-lg-4">
                        <div className="chat-wrapper shadow">
                            <div className="card">

                                <div className="card-header d-flex justify-content-around">
                                    <button onClick={ () => setParticipationSideBarTab('Chat') } className={`btn btn-articles-light px-5 ${participationSideBarTab == 'Chat' && 'active'}`}>Chat</button>
                                    <button onClick={ () => setParticipationSideBarTab('Polls') } className={`btn btn-articles-light px-5 ${participationSideBarTab == 'Polls' && 'active'}`}>Polls</button>
                                </div>

                                {/* Chat */}
                                {participationSideBarTab == 'Chat' && 
                                    <>
                                        <div className="card-body">
                                            <div className="chat-offline-wrapper">
                                                <div className="chat-offline">Chat offline.</div>
                                            </div>
                                        </div>

                                        <div className="card-footer">

                                            <div className="form-group articles">

                                                <label for="chatMessage">Message</label>

                                                <TextareaAutosize
                                                    className="form-control with-label"
                                                    name="chatMessage"
                                                    id="chatMessage"
                                                    disabled
                                                    value={chatMessage}
                                                    onChange={e => setChatMessage(e.target.value)}
                                                />

                                            </div>

                                            <button className="btn btn-articles-light d-block mx-auto" disabled >SEND</button>

                                        </div>
                                    </>
                                }

                                {/* Polls */}
                                {participationSideBarTab == 'Polls' && 
                                <div className="card-body">
                                    <div className="chat-offline-wrapper">
                                        <div className="chat-offline">No polls active.</div>
                                    </div>
                                </div>
                                }

                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
        </section>
    )
}

// PartyHomePage.Layout = NewsLayout;
export default PartyHomePage;