import React, { Component, useState, useEffect } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { connect } from "react-redux";

import axios from 'axios'
import moment from 'moment'

import ROUTES from 'components/constants/routes'
import SocketContext from 'components/context/socket'
import AdminLayout from 'components/layouts/admin.js';

function Sockets(props) {

    const [ sockets, setSockets ] = useState([])
    const [ userSockets, setUserSockets ] = useState({})
    const [ socketMessage, setSocketMessage ] = useState('')
    const [ connectedSockets, setConnectedSockets ] = useState(0)
    const [ connected, setConnected ] = useState(false);

    useEffect(() => {

        props.socket.emit('refreshOnline', null);

    }, []);

    useEffect(() => {

        props.socket.on('connect', () => {
            setConnected(true);
        });

        props.socket.on('disconnect', () => {
            setConnected(false);
        });

        props.socket.on('online', function(data){
            console.log(data)

            setConnectedSockets(data.connections)
            setUserSockets(data.list)
            setConnected(true);

        });

    })

    function testNotification(details) {
        props.socket.emit('notification', details);
    }

    return (
        <div className="admin-page admin-sockets">

            <Head>
                <title>Admin Sockets - Articles</title>
            </Head>

            <div className="main-panel">

                <div className="container">
                    <div className="row">

                        <div className="col-lg-3 mb-3 mb-lg-0">
                            <div >

                                <div>

                                    {connected ? 
                                        <img src="https://cdn.articles.media/sockets/socket-gif.gif" height="100px" alt=""/> 
                                        :
                                        <img src="https://i.gifer.com/fyFm.gif" height="150px" alt="" />
                                    }

                                </div>

                                
                                {connected ? 
                                        <div className="badge badge-primary">Connected Sockets: {connectedSockets}</div>
                                        :
                                        <div className="badge badge-danger">Offline</div>
                                }
            
                                <div className="mt-3">
                                    <div><small className="text-muted">Limit to logged in users?</small></div>
            
                                    <div className="d-flex">
                
                                        <div className="mr-2">
                                            <button disabled="true" className="btn btn-articles-light btn-sm">No</button>
                                            <button className="btn btn-articles-light btn-sm">Yes</button>
                                        </div>

                                        <a rel="noreferrer" href="https://www.youtube.com/watch?v=l_lblj8Cq0o&ab_channel=GEazyMusicVEVO" target="_blank">
                                            <div className="badge badge-success mb-2">No Limit</div>
                                        </a>

                                    </div>

                                </div>
                            </div>
                        </div>

                        <div className="col-lg-3">
                            <div className="d-flex flex-column mb-3 mb-lg-0">
        
                                <button 
                                    className="btn btn-articles-light mb-1" 
                                    onClick={() => testNotification({
                                        type: 'basic',
                                        message: 'Test notification, please ignore.',
                                    })}
                                >
                                    Test Notification
                                </button>
        
                                <button 
                                    className="btn btn-articles-light mb-1" 
                                    onClick={() => testNotification({
                                        type: 'donation',
                                        amount: '$100.00',
                                        user: 'Joey G',
                                        state: 'NY',
                                    })}
                                >
                                    Test Donation
                                </button>
        
                                <button 
                                    className="btn btn-articles-light mb-1" 
                                    onClick={() => testNotification({
                                        type: 'expense',
                                        expense_type: 'recurring',
                                        amount: '$17.29',
                                        reason: 'Adobe Membership'
                                    })}
                                >
                                    Test Expense
                                </button>

                                <button 
                                    className="btn btn-articles-light mb-1" 
                                    onClick={() => testNotification({
                                        type: 'message',
                                        user: 'Joey Giusto',
                                        profile_photo: 'https://articles-website.s3.amazonaws.com/profile_photos/5e90cc96579a17440c5d7d52.jpg',
                                        message_preview: 'Ah I see you are on Articles, good shit!',
                                    })}
                                >
                                    Test Message
                                </button>
        
                                <button 
                                    className="btn btn-articles-light" 
                                    onClick={() => testNotification({
                                        type: 'unhandled',
                                        message: 'Test notification (stays open)',
                                        force_notification_interaction: true
                                    })}
                                >
                                    Test Unhandled
                                </button>
        
                            </div>
                        </div>


                        <div className="col-lg-6">
                            <div className="table-responsive text-left">

                                <table className="border table table-sm bg-white">

                                    <thead>
                                        <tr>
                                        <th scope="col">User</th>
                                        <th scope="col">Sockets</th>
                                        </tr>
                                    </thead>

                                    <tbody>
            
                                        {Object.keys(userSockets).map((keyName, i) => (
                                            <tr key={keyName}>
                                                <th scope="row">{userSockets[keyName]}</th>
                                                <td><span className="badge badge-warning">{keyName}</span></td>
                                            </tr>       
                                        ))}
            
                                    </tbody>

                                </table>

                            </div>
                        </div>


                    </div>
                </div>

            </div>

        </div>

    )
}

const mapStateToProps = state => ({
    user_id: state.auth.user.id
});

const WithSocket = props => (
    <SocketContext.Consumer>
        { socket => <Sockets {...props} socket={socket}/> }
    </SocketContext.Consumer>
)

WithSocket.Layout = AdminLayout;

export default connect(
    mapStateToProps,
)(WithSocket);