import React, { Component, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { connect } from "react-redux";

import axios from 'axios'
import moment from 'moment'

import ROUTES from 'components/constants/routes'
import SocketContext from 'components/context/socket'
import AdminLayout from 'components/layouts/admin.js';

class Sockets extends Component {
    constructor(props) {
    super(props);
    
        this.state = {
            sockets: [],
            userSockets: {},
            socketMessage: '',
            photos: [],
            fakeImageHash: 0,
            newProfilePhotoLoading: false,
            cacheBust: moment(),
            connectedSockets: 0,
        };

        // this.pingOnlineSoketCount = this.pingOnlineSoketCount.bind(this);
        // this.onChange = this.onChange.bind(this);
        // this.onChangeProfile = this.onChangeProfile.bind(this);
        // this.pushSocket = this.pushSocket.bind(this);
    }

    componentDidMount() {
        // socket = socketIOClient(ENDPOINT);
        this.props.socket.emit('refreshOnline', null);

        // this.props.setLocation(this.props.tabLocation);
        const self = this;

        this.props.socket.on('adminMessage', function(msg) {
            console.log(`Admin Message: ${msg}`);
        });

        self.props.socket.on('online', function(data){
            console.log(data)

            self.setState({
                connectedSockets: data.connections
            })
        });

        this.pingOnlineSoketCount()
        
    }

    componentWillUnmount() {
        // this.props.setLocation('');
        this.props.socket.disconnect();
    }

    handleChange(event) {
        const target = event.target;
        const value = target.type === 'checkbox' ? target.checked : target.value;
        const name = target.name;

        this.setState({
        [name]: value
        });
    }

    pingOnlineSoketCount() {
        const self = this;
        this.props.socket.emit('refreshOnline', null);
    }

    testNotification(details) {
        this.props.socket.emit('notification', details);
    }

    testDonationNotification() {
        this.props.socket.emit('donation-notification', null);
    }

    // pushTestDonation() {
    //   socket.emit('recieveDonation', {
    //     amount: 1000,
    //     date: Math.floor(new Date().getTime()/1000.0),
    //     note: 'Fake Donation',
    //     uid: Date.now(),
    //     name: 'Test',
    //     department: 'other',
    //     file: 'https://en.wikipedia.org/wiki/Rickrolling'
    //   });
    // }

    // pushTestExpense() {
    //   socket.emit('recieveExpense', null);
    // }

    // pushSocket() {
    //   // const self = this;
    //   socket.emit('adminMessage', this.state.socketMessage);
    //   this.setState({
    //     socketMessage: ''
    //   })
    // }

    render() {

        return (
            <div className="admin-page admin-sockets">

                <Head>
                    <title>Admin Sockets - Articles</title>
                </Head>

                <div className="main-panel">

                <div className="text-center">

                    <div><img src="https://cdn.articles.media/sockets/socket-gif.gif" height="100px" alt=""/></div>
                    <div onClick={ () => this.pingOnlineSoketCount() } className="badge badge-primary">Connected Sockets: {this.state.connectedSockets}</div>

                    <div className="mt-3">
                    <div><small className="text-muted">Limit to logged in users?</small></div>

                    <a href="https://www.youtube.com/watch?v=l_lblj8Cq0o&ab_channel=GEazyMusicVEVO" target="_blank">
                        <div className="badge badge-success mb-2">No Limit</div>
                    </a>

                    <div>
                        <button disabled="true" className="btn btn-articles-light btn-sm">No</button>
                        <button className="btn btn-articles-light btn-sm">Yes</button>
                    </div>
                    </div>

                    <hr className="my-3"/>

                    <div className="">

                        <button 
                            className="btn btn-articles-light" 
                            onClick={() => this.testNotification({
                                type: 'basic',
                                message: 'Test notification, please ignore.',
                            })}
                        >
                            Test Notification
                        </button>

                        <button 
                            className="btn btn-articles-light" 
                            onClick={() => this.testNotification({
                                type: 'donation',
                                amount: '$100.00',
                                user: 'Joey G',
                                state: 'NY',
                            })}
                        >
                            Test Donation
                        </button>

                        <button 
                            className="btn btn-articles-light" 
                            onClick={() => this.testNotification({
                                type: 'expense',
                                expense_type: 'recurring',
                                amount: '$17.29',
                                reason: 'Adobe Membership'
                            })}
                        >
                            Test Expense
                        </button>

                        <button 
                            className="btn btn-articles-light" 
                            onClick={() => this.testNotification({
                                type: 'unhandled',
                                message: 'Test notification (stays open)',
                                force_notification_interaction: true
                            })}
                        >
                            Test Unhandled
                        </button>

                        {/* <button className="btn btn-articles-light" onClick={() => this.testDonationNotification()}>Fake Donation</button> */}
                        {/* <button className="btn btn-articles-light">Fake Expense</button> */}

                    </div>

                    <div className="mt-3">

                    </div>

                    <div className="container mt-3 " style={{maxWidth: '500px'}}>
                    <div className="table-responsive text-left">
                        <table className="border table table-sm bg-white">
                        <thead>
                            <tr>
                            <th scope="col">Name</th>
                            <th scope="col">Sockets</th>
                            </tr>
                        </thead>
                        <tbody>

                            <tr>
                            <th scope="row">Guest</th>
                            <td>0</td>
                            </tr>

                            {/* {Object.keys(this.state.userSockets).map((keyName, i) => (

                            <tr>
                                <th scope="row">{this.state.userSockets[keyName]}</th>
                                <td><span className="badge badge-warning">{keyName}</span></td>
                            </tr>

                            ))} */}

                        </tbody>
                        </table>
                    </div>
                    </div>

                </div>

                </div>

            </div>
        );
    }
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