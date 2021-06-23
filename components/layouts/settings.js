import React, { Component, useState, useEffect, useRef } from 'react';

import Link from 'next/link'
import { useRouter } from 'next/router'

import { signOut } from 'next-auth/client'

import { useSelector } from 'react-redux'

import moment from 'moment';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ROUTES from 'components/constants/routes';

function SettingsLayout({ children }) {
    
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    return (

        <div className="settings-page">

            <div className="settings-header">

                <div className="container d-flex justify-content-between align-items-center">

                <div>
                    <div className="page-title">
                    Settings
                    </div>
                    <p className="mb-0 mt-2">Member since {moment(userReduxState?.sign_up_date).format('LL')}</p>
                    {/* <p className="mb-0 mt-2">Member since {moment(this.props.user_details?.sign_up_date).format('LL')}</p> */}
                </div>

                {/* <div onClick={this.props.logoutUser} className="btn btn-articles-light">  */}
                <div onClick={() => signOut()} className="btn btn-articles-light">
                    Sign Out
                </div>

                </div>

            </div>

            <div className="sub-page-nav">

                <div className="container">
                    <div className="tabs mt-3 ">

                        <Link href={ROUTES.SETTINGS_ACCOUNT}>
                            <button className={"btn btn-articles-light " + (router.asPath === ROUTES.SETTINGS_ACCOUNT ? 'alt' : '')}>Account</button>
                        </Link>

                        <Link href={ROUTES.SETTINGS_MEMBERSHIP}>
                            <button className={"btn btn-articles-light " + (router.asPath === ROUTES.SETTINGS_MEMBERSHIP ? 'alt' : '')}>Membership</button>
                        </Link>

                        <Link href={ROUTES.SETTINGS_NEWSLETTER}>
                            <button className={"btn btn-articles-light " + (router.asPath === ROUTES.SETTINGS_NEWSLETTER ? 'alt' : '')}>Newsletter</button>
                        </Link>

                        <Link href={ROUTES.SETTINGS_CONNECTIONS}>
                            <button className={"btn btn-articles-light " + (router.asPath === ROUTES.SETTINGS_CONNECTIONS ? 'alt' : '')}>Connections</button>
                        </Link>

                        <Link href={ROUTES.SETTINGS_BILLING}>
                            <button className={"btn btn-articles-light " + (router.asPath === ROUTES.SETTINGS_BILLING ? 'alt' : '')}>Billing</button>
                        </Link>

                        <Link href={ROUTES.SETTINGS_PROTECTED}>
                            <button className={"btn btn-articles-light " + (router.asPath === ROUTES.SETTINGS_PROTECTED ? 'alt' : '')}>Protected</button>
                        </Link>

                        {/* Employee Only */}
                        {/* {this.props.user_details.employee?.bool === true &&  */}
                        <Link href={ROUTES.SETTINGS_EMPLOYEE}>
                            <button className={"btn btn-articles-light ml-lg-3 " + (router.asPath === ROUTES.SETTINGS_EMPLOYEE ? 'alt' : '')}>
                                Employee<span className="badge badge-warning ml-1"><i className="fas fa-star mr-0"></i></span>
                            </button>
                        </Link>
                        {/* } */}
                        
                    </div>
                </div>

            </div>

            <div className="container">
                <div className="row">

                    <div className="col-lg-8 my-3">
                        {children}
                    </div>

                    <div className="col-lg-4 mb-3">

                        <div className="settings-side mt-lg-3">

                            <div className={`newsletter-extra-card card mb-3 `}>

                                <div className="card-header">
                                    <i className="fas fa-envelope"></i>Like Articles?
                                </div>

                                <div className="card-body p-3">

                                    <p>Get the <b>weekly newsletter!</b> In it, you'll get:</p>

                                    <ul className="pl-4 mb-3">
                                    <li>Transparency report outlines</li>
                                    <li>Important announcements</li>
                                    <li>Questions that need answers</li>
                                    </ul>

                                    <div className="d-flex justify-content-center align-items-center mb-3">
                                    <Link href={ROUTES.SETTINGS_NEWSLETTER}>
                                        <div className="btn btn-articles-light">Sign Up</div>
                                    </Link>
                                    </div>

                                    <div style={{fontSize: '0.9rem'}} className="text-muted text-center newsletter-extra-card-link">see an example newsletter</div>

                                </div>

                            </div>

                            <div className={`newsletter-extra-card card mb-3 `}>

                                <div className="card-header">
                                    <i className="fas fa-link"></i>Faster Login?
                                </div>

                                <div className="card-body p-3">

                                    <p>Connect your account:</p>

                                    <ul className="pl-4 mb-3">
                                        <li>No password to login</li>
                                        <li>Google, Apple, LinkedIn, Twitter</li>
                                    </ul>

                                    <div className="d-flex justify-content-center align-items-center mb-1">
                                        <Link href={ROUTES.SETTINGS_CONNECTIONS}>
                                            <div className="btn btn-articles-light">Connect</div>
                                        </Link>
                                    </div>

                                    {/* <div style={{fontSize: '0.9rem'}} className="text-muted text-center newsletter-extra-card-link">see an example newsletter</div> */}

                                </div>

                            </div>

                            <div className="mb-3">
                                <RequestDataModal/>
                                <DeleteAccountModal/>
                            </div>

                        </div>

                    </div>

                </div>
            </div>

        </div>

    )

};
  
export default SettingsLayout;

function DeleteAccountModal() {
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	return (
	  <>
        <div onClick={handleShow} className="btn btn-danger w-50">Delete Account</div>
  
		<Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>
    
            <Modal.Header closeButton>
                <Modal.Title>Delete Account?</Modal.Title>
            </Modal.Header>
  
            <Modal.Body className="px-lg-5">

                <p className="mb-3"><b>Are you sure you want to delete your account?</b></p>

                <p>After typing &quot;Delete Account&quot; and pressing the button you will be signed out and sent a confirmation email. After 7 days of inactivity we will delete your account, if you login at any point during the 7 days this process will be canceled.</p>

                <div className="form-group articles">
                    <label htmlFor="confirm-delete">Type &quot;Delete Account&quot;</label>
                    <input className="form-control with-label" name="confirm-delete" id="confirm-delete" type="text" value=""/>
                </div>
    
            </Modal.Body>
  
            <Modal.Footer className="justify-content-between">

                <Button variant="outline-dark" onClick={handleClose}>
                    Cancel
                </Button>

                <Button variant="danger" disabled onClick={handleClose}>
                    Delete Account
                </Button>

            </Modal.Footer>
  
		</Modal>
	  </>
	);
}

function RequestDataModal() {
	const [show, setShow] = useState(false);

    const [requestedData, setRequestedData] = useState(null);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);

    function requestUserData() {
        axios.post('/api/secure/requestUserData', {
    
        })
        .then( (response) => {
          console.log(response);
          setRequestedData(response.data)
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  
	return (
	  <>
        <div onClick={handleShow} className="btn btn-articles-light w-50">Request Data</div>
  
		<Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>
    
            <Modal.Header closeButton>
                <Modal.Title>Account Data</Modal.Title>
            </Modal.Header>
  
            <Modal.Body className="px-lg-5">

                {!requestedData &&
                    <button className="btn btn-articles-light" onClick={() => requestUserData()}>Load</button>
                }

                {requestedData && 
                    <div className={""}>

                        <p>Data related to you</p>

                        <div><pre>{JSON.stringify(requestedData, null, 2) }</pre></div>

                    </div>
                }

            </Modal.Body>
  
            <Modal.Footer className="justify-content-between">

                <Button variant="outline-dark" onClick={handleClose}>
                    Cancel
                </Button>

            </Modal.Footer>
  
		</Modal>
	  </>
	);
}