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
    
            <div className="container d-flex flex-column justify-content-center mt-5">

                <i style={{color: 'black'}} className="fas fa-user-lock fa-5x my-3"></i>
    
                {/* <img className="align-self-center mt-5" src="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png" height="200px" alt=""/> */}
    
                <div className="card-wrap">
    
                    {/* <i className="watcher fas fa-5x fa-user-secret"></i> */}
        
                    <div className="card">
                        <div className="card-header">Our Ethics and Your Privacy</div>
                        <div className="card-body px-2 px-md-5">
                        <h1>Ethics</h1>
                        <p>The information that you give to a website should belong to you. How that data is processed and used should be completely transparent to the user then.</p>
                        <h1>Privacy</h1>
                        <p>Text</p>
                        </div>
                        <div className="card-footer d-flex justify-content-center align-items-center">Last Updated: <span className="badge badge-light ml-2" style={{fontSize: '0.8rem'}}>June 2020</span></div>
                    </div>
    
                </div>
    
            </div>
  
        </div>
      )   
    }
  }

  
  export default PrivacyPage;