import React, { useState, useEffect, Component } from 'react';
import { connect } from 'react-redux';
import Link from 'next/link'
import Head from 'next/head'

import ROUTES from '../../../components/constants/routes';

class PrivacyPage extends Component {
    constructor(props) {
      super(props);
  
      this.state = {
  
      }
    }
  
    render(props) {
  
      return (
        <div className="privacy-page">
  
            <Head>
                <title>Privacy - Articles</title>
            </Head>
    
            <div className="container py-3 py-lg-5">

                <div className="text-center mb-3 mb-lg-3">
                    <Link href={ROUTES.COMMUNITY}><button className="btn btn-articles-light btn-lg mb-3"><i className="fad fa-hand-point-left"></i>Community Home</button></Link>
                    <h1 className="">Privacy</h1>
                    <p className="">The information that you give to a website belongs to you! Here is how that data is processed and used.</p>
                    <i style={{color: 'black'}} className="fas fa-user-lock fa-5x mt-3 mb-0"></i>
                </div>
    
                {/* <img className="align-self-center mt-5" src="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png" height="200px" alt=""/> */}
    
                <div className="card-wrap">
    
                    {/* <i className="watcher fas fa-5x fa-user-secret"></i> */}
        
                    <div style={{maxWidth: '600px'}} className="card mx-auto">

                        {/* <div className="card-header">Our Ethics and Your Privacy</div> */}

                        <div className="d-none">
                            <div className="card-body px-2 px-md-5">
                                <h1>Ethics</h1>
                                <p>The information that you give to a website should belong to you. How that data is processed and used should be completely transparent to the user then.</p>
                                <h1>Privacy</h1>
                                <p>Text</p>
                            </div>
                            <div className="card-footer d-flex justify-content-center align-items-center">Last Updated: <span className="badge badge-light ml-2" style={{fontSize: '0.8rem'}}>June 2020</span></div>
                        </div>

                        <div className="card-body">

                            <h3>First Name</h3>
                            <p>Your first name will be used to address you throughout the site. Your first name will also be given to others if you choose to comment or submit content, participate in messages with other users, or purchase something on our site and choose to share it with the Transparency Reports.</p>

                            <h3>Address</h3>
                            <p>Your address will never be sent off site or given to others, address will only be used to get relevant ads, pre-fill order details, pull local news and internal statistics for Articles such as users per State/Zip.</p>

                            <h3>Password</h3>
                            <p>Your password is encrypted so even if your user information was to get out your password remains safe</p>

                            <h3>Clothing Details</h3>
                            <p>We will use your clothing cut, shirt size, and shoe size to pre-fill data when you browse the store</p>

                            <h3>Gender</h3>
                            <p>We will use your gender to get relevant ads, pre-fill data when you browse the store, and for internal statistics for Articles such as % of members male/female.</p>

                            <h3>Political</h3>
                            <p>Your political affiliation will never be sent off site or given to others, for internal statistics for Articles such as % of members Republican/Democrat/Green party.</p>

                        </div>

                    </div>
    
                </div>
    
            </div>
  
        </div>
      )   
    }
  }

  
  export default PrivacyPage;