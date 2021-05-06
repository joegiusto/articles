// import Head from 'next/head'
// import Link from 'next/link'
// import React, { Component, useState } from 'react';
// import { useRouter } from 'next/router'



// function AdminHomePage() {
//     const router = useRouter()
//     const { param } = router.query
  
//     return(
//         <section className="submissions-page">

//             <Head>
//                 <title>Admin - Articles</title>
//             </Head> 

//             <div className="container py-3">
//                 <h2>Newsletter Page</h2>
//                 <p>Admin stuff here.</p>
//             </div>

//         </section>
//     )
// }

// AdminHomePage.Layout = AdminLayout;
// export default AdminHomePage;

import React, { useState, useEffect } from 'react';

import Head from 'next/head'

import { connect } from "react-redux";

import axios from 'axios'
import moment from 'moment'

import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button'

import AdminLayout from 'components/layouts/admin.js';

function Newsletter(props) {
    const [generalNewsletterList, setGeneralNewsletterList] = useState([]);
    const [devNewsletterList, setDevNewsletterList] = useState([]);
    const [showDraftModal, setShowDraftModal] = useState(false);

    const [subject, setSubject] = useState('Subject');
    const [videoURL, setVideoURL] = useState('UpGZjP738W0');
    const [startContent, setStartContent] = useState('Start Content');
    const [transparencyContent, setTransparencyContent] = useState('Not much going on here this week! 1');
    const [clothingContent, setClothingContent] = useState('Not much going on here this week! 2');
    const [newsContent, setNewsContent] = useState('Not much going on here this week! 3');
    const [politicsContent, setPoliticsContent] = useState('Not much going on here this week! 4');

    useEffect(() => {
		
		axios.post('/api/secure/getGeneralNewsletterList', {

		})
		.then( (response) => {
			setGeneralNewsletterList(response.data)
			console.log(response.data)
		})
		.catch( (error) => {
			console.log(error);
		});

        axios.post('/api/secure/getDevNewsletterList', {

		})
		.then( (response) => {
			setDevNewsletterList(response.data)
			console.log(response.data)
		})
		.catch( (error) => {
			console.log(error);
		});

	}, []);

    function handleClose() {
		setShowDraftModal(false);
	}

	function handleShow() {
		setShowDraftModal(true);
	}

    return (
        <div className="admin-page admin-newsletter">

            <Head>
                <title>Admin Newsletter - Articles</title>
            </Head> 
		  
            <Modal show={showDraftModal} className="draft-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Drafts</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <h5>General - Week of 1/31</h5>
                    <h5>General - Week of 2/07</h5>
                    <h5>General - Week of 2/14</h5>
                    <h5>General - Week of 2/21</h5>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

            <div className="side-panel">

                <div className="card">
                    <div className="card-header">Metrics</div>
                    <div className="card-body">
                    <div><b>General Newsletter: {generalNewsletterList.length}</b></div>
                    <div><b>Dev Newsletter: {devNewsletterList.length}</b></div>
                    </div>
                </div>

            </div>

            <div className="main-panel p-0">

                <div className="panel list">

                    <h1 className="">General List</h1>

                    <div className="list-wrap">
                    {
                        generalNewsletterList.map( (result) => (
                        <div className="mb-2">
                        <div><b>{result.email}</b></div>
                        {/* <div>{result.first_name}</div>
                        <button className="btn btn-danger btn-sm">Delete</button> */}
                        </div>
                    ))}
                    </div>

                    <h1 className="">Dev List</h1>

                    <div className="list-wrap">
                    {
                        devNewsletterList.map( (result) => (
                        <div className="mb-2">
                        <div><b>{result.email}</b></div>
                        {/* <div>{result.first_name}</div>
                        <button className="btn btn-danger btn-sm">Delete</button> */}
                        </div>
                    ))}
                    </div>

                </div> 

                <div className="panel compose">

                    <h1 className="">Compose</h1>

                    <div className="d-flex justify-content-lg-between mb-3">

                        <button onClick={handleShow} className="btn btn-lg btn-articles-light">
                            <i className="fas fa-file-download mr-2"></i>
                            Load Draft
                        </button>

                        <div className="d-flex justify-content-center">
                            <button className="btn btn-lg btn-success"><i className="fas fa-file-upload mr-2"></i>Save</button>
                            <button className="btn btn-lg btn-articles-light"><i className="fas fa-paper-plane mr-2"></i>Send</button>
                        </div>

                    </div>

                    {/* Subject and Sender */}
                    <div className="d-flex">

                        <div className="form-group articles flex-grow-1">
                            <label for="address">Subject</label>
                            <input className="form-control with-label" name="address" id="address" type="text" value={subject}/>
                        </div>
            
                        <div className="form-group articles flex-grow-1">
                            <label for="address">Sender</label>
                            <input className="form-control with-label" disabled name="address" id="address" type="text" value="Joey Giusto"/>
                        </div>

                    </div>

                    <div className="form-group articles flex-grow-1">
                        <label for="address">Video URL</label>
                        <input className="form-control with-label" name="address" id="address" type="text" value={videoURL}/>
                    </div>

                    <div className="form-group articles flex-grow-1">
                        <label for="address">Start Content</label>
                        <textarea className="form-control with-label" name="address" id="address" type="text" value={startContent}></textarea>
                    </div>

                    <div className="form-group articles flex-grow-1">
                        <label for="address">Transparency Content</label>
                        <textarea className="form-control with-label" name="address" id="address" type="text" value={transparencyContent}></textarea>
                    </div>

                    <div className="form-group articles flex-grow-1">
                        <label for="address">Clothing Content</label>
                        <textarea className="form-control with-label" name="address" id="address" type="text" value={clothingContent}></textarea>
                    </div>

                    <div className="form-group articles flex-grow-1">
                        <label for="address">News Content</label>
                        <textarea className="form-control with-label" name="address" id="address" type="text" value={newsContent}></textarea>
                    </div>

                    <div className="form-group articles flex-grow-1">
                        <label for="address">Politics Content</label>
                        <textarea className="form-control with-label" name="address" id="address" type="text" value={politicsContent}></textarea>
                    </div>

                    <div className="d-flex justify-content-end mt-3">
                    <button className="btn btn-lg btn-success"><i className="fas fa-file-upload mr-2"></i>Save</button>
                        <button className="btn btn-lg btn-articles-light"><i className="fas fa-paper-plane mr-2"></i>Send</button>
                    </div>

                </div>

                <div className="panel preview">

                    <h1 className="">Preview</h1>

                    <div className="email-wrap">

                        <div className="card shadow-articles">
            
                            <div className="card-header">
                                <h3 className="text-center mb-0">{subject}</h3>
                                {/* <div className="text-muted text-center">Sent by: joey@articles.media</div> */}
                            </div>
            
                            <div className="card-body">
            
                                <img height="150px" width="150px" className="d-block mx-auto mb-5" src="https://cdn.articles.media/email/logo.jpg" alt=""/>
            
                                <h4 className="text-center mt-3"><b>Hello {props.user.first_name}</b></h4>

                                <iframe width="560" height="315" src={`https://www.youtube.com/embed/${videoURL}`} title="YouTube video player" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
            
                                <p className="mb-5">{startContent}</p>
            
                                <div className="ongoing-details-wrapper mt-3">
            
                                    <div className="ongoing-details-section">
                                        <h5 className="text-center">Transparency</h5>
                                        <p>{transparencyContent}</p>
                                        <p>Ongoing Data</p>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul>
                                                    <li>10 New Revenues</li>
                                                    <li>$80.00 in Revenue</li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul>
                                                    <li>10 New Revenues</li>
                                                    <li>$80.00 in Revenue</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="ongoing-details-section">
                                        <h5 className="text-center">Clothing</h5>
                                        <p>{clothingContent}</p>
                                        <p>Ongoing Data</p>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul>
                                                    <li>0 New Orders</li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul>
                                                    <li>0 New Items</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="ongoing-details-section">
                                        <h5 className="text-center">News</h5>
                                        <p>{newsContent}</p>
                                        <p>Ongoing Data</p>
                                        <div className="row">
                                            <div className="col-6">
                                                <ul>
                                                    <li>10 New Revenues</li>
                                                    <li>$80.00 in Revenue</li>
                                                </ul>
                                            </div>
                                            <div className="col-6">
                                                <ul>
                                                    <li>10 New Revenues</li>
                                                    <li>$80.00 in Revenue</li>
                                                </ul>
                                            </div>
                                        </div>
                                    </div>
                
                                    <div className="ongoing-details-section">
                                        <h5 className="text-center">Politics</h5>
                                        <p>{politicsContent}</p>
                                        <p>Ongoing Data</p>
                                        <ul>
                                            <li>0 new proposals added</li>
                                        </ul>
                                    </div>
            
                                </div>
            
                            </div>
            
                        </div>
            
                        <div className="bottom-details">
                            <div>© 2021 Articles Media. All rights reserved.</div>
                            <a>Click here to unsubscribe</a>
                        </div>

                    </div>

                </div>

            </div>

      </div>

    )
}

const mapStateToProps = state => ({
  user: state.auth.user_details
});

Newsletter.Layout = AdminLayout;

export default connect(
  mapStateToProps,
)(Newsletter);