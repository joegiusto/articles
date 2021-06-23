import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/client'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DatePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import SettingsLayout from 'components/layouts/settings.js';
import ProfilePhoto from 'components/user/ProfilePhoto';
import articlesTheme from 'components/material_ui/articlesTheme'

function SettingsAccountPage() {
    const [session, loading] = useSession()
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    // console.log(router.pathname)
    // console.log(param);

    // Fetch content from protected route
    // useEffect(()=>{
    //     const fetchData = async () => {
    //         const res = await fetch('/api/getUserDetails')
    //         const json = await res.json()
    //         console.log(json)
    //         // if (json.content) { setContent(json.content) }
    //     }
    //     fetchData()
    // },[session])

    // useEffect(() => {

    //     axios.post('/api/getUserDetails')
    //     .then(function (response) {

    //         console.log(response.data)

    //     })
    //     .catch(function (error) {
    //         console.log(error);
    //     });

    // }, []);

    // console.log(session)

    return (
        <section className="settings-account">

            <Head>
                <title>Settings - Articles</title>
            </Head>

            <div className={"card settings-card"}>

                <div className="card-header">
                    <h5>Profile Info</h5>
                    <p>Basic info, like your name and photo, that you use on Articles</p>
                </div>

                <div className="card-body">

                    <div className="info-snippet">
                        <div className="label">EMAIL</div>

                        <div className="info">

                            <div className={"detail-view"}>
                                {userReduxState.email}
                                <div className="email-note">
                                    Email can not be changed at this time. Coming Soon.
                                </div>
                            </div>

                        </div>

                        {/* <div className="arrow"><i className="far fa-hand-point-right"></i></div> */}

                    </div>

                    <div className="info-snippet">

                        <div className="label">PHOTO</div>

                        <div className="info profile-photo">
                            <ProfilePhoto changeFocus={() => console.log("Prevent Crash")} user_id={userReduxState._id}/>
                        </div>

                    </div>

                    <ManageAccountPasswordModal userReduxState={userReduxState} />

                    <ManageAccountNameModal userReduxState={userReduxState} />

                    <ManageAccountBirthdayModal userReduxState={userReduxState} />

                    <ManageAccountGenderModal userReduxState={userReduxState} />

                    <ManageAccountAddressModal userReduxState={userReduxState} />

                </div>

            </div>

        </section>
    )
}

SettingsAccountPage.Layout = SettingsLayout;
export default SettingsAccountPage;

function ManageAccountNameModal({ userReduxState }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("Test");

    return (
        <>

            <div className="info-snippet" onClick={handleShow}>

                <div className="label">NAME</div>

                <div className="info">
                    {userReduxState.first_name} {userReduxState.last_name}
                </div>

                <div className="arrow"><i className="far fa-hand-point-right " aria-hidden="true"></i></div>

            </div>

            <Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-lg-5">

                    <p className="mb-3">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

                    <div className="row justify-content-center">
                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="first_name">First Name</label>
                                <input className="form-control with-label" name="first_name" id="address" type="text" value={userReduxState.first_name} />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="last_name">Last Name</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value={userReduxState.last_name} />
                            </div>
                        </div>
                    </div>

                    {/* <div className="text-muted text-center mt-5">Access ID: 1901</div> */}

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    {/* <div className="btn btn-danger btn-sm">Delete</div> */}
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>

                    <div>
                        {/* <Button variant="link" onClick={handleClose}>
            Cancel
          </Button> */}
                        <Button variant="articles-light" onClick={handleClose}>
                            Save
                        </Button>
                    </div>

                </Modal.Footer>

            </Modal>
        </>
    );
}

function ManageAccountBirthdayModal({ userReduxState }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    function handleDate() {

    }

    return (
        <>

            <div className="info-snippet" onClick={handleShow}>

                <div className="label">BIRTHDAY</div>

                <div className="info">
                    {moment(userReduxState.birth_date).format("LL")}
                </div>

                <div className="arrow"><i className="far fa-hand-point-right " aria-hidden="true"></i></div>

            </div>

            <Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-lg-5">

                    <p className="mb-3">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

                    <div className="row justify-content-center">
                        <div className="col-lg-12">

                            <ThemeProvider theme={articlesTheme}>
                                <MuiPickersUtilsProvider utils={MomentUtils}>
                                    <DatePicker
                                        label="Birth Date"
                                        inputVariant="outlined"
                                        value={userReduxState.birth_date}
                                        format="MMM Do yyyy"
                                        onChange={handleDate}
                                        className="form-group articles mb-3 w-100"
                                    />
                                </MuiPickersUtilsProvider>
                            </ThemeProvider>

                        </div>
                    </div>

                    {/* <div className="text-muted text-center mt-5">Access ID: 1901</div> */}

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    {/* <div className="btn btn-danger btn-sm">Delete</div> */}
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>

                    <div>
                        {/* <Button variant="link" onClick={handleClose}>
            Cancel
          </Button> */}
                        <Button variant="articles-light" onClick={handleClose}>
                            Save
                        </Button>
                    </div>

                </Modal.Footer>

            </Modal>
        </>
    );
}

function ManageAccountGenderModal({ userReduxState }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <div className="info-snippet" onClick={handleShow}>

                <div className="label">GENDER</div>

                <div className="info">
                    Male
                </div>

                <div className="arrow"><i className="far fa-hand-point-right " aria-hidden="true"></i></div>

            </div>

            <Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-lg-5">

                    <p className="mb-3">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

                    <div className="row justify-content-center">
                        <div className="col-lg-12">

                            <div style={{ backgroundColor: 'rgb(249 237 205 / 50%)', borderRadius: '10px' }} className="form-group articles">

                                <label className="rounded-pill" htmlFor="address">Gender</label>

                                <div className="p-2 pt-0">
                                    <button className={`btn btn-articles-light rounded-pill mr-1 ` + (userReduxState.gender == "female" && 'active')}>Female</button>
                                    <button className={`btn btn-articles-light rounded-pill mr-1 ` + (userReduxState.gender == "male" && 'active')}>Male</button>
                                    <button className={`btn btn-articles-light rounded-pill ` + (userReduxState.gender == "" && 'active')}>Other</button>
                                </div>

                            </div>

                        </div>
                    </div>

                    {/* <div className="text-muted text-center mt-5">Access ID: 1901</div> */}

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    {/* <div className="btn btn-danger btn-sm">Delete</div> */}
                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>

                    <div>
                        {/* <Button variant="link" onClick={handleClose}>
            Cancel
          </Button> */}
                        <Button variant="articles-light" onClick={handleClose}>
                            Save
                        </Button>
                    </div>

                </Modal.Footer>

            </Modal>
        </>
    );
}

function ManageAccountPasswordModal({ userReduxState }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    return (
        <>

            <div className="info-snippet" onClick={handleShow}>

                <div className="label">PASSWORD</div>

                <div className="info">
                    <div className={"detail-view"}>
                        ******
                        <div className="last-changed">Last Changed May 5, 2020 12:00 AM</div>
                        
                    </div>
                </div>

                <div className="arrow"><i className="far fa-hand-point-right " aria-hidden="true"></i></div>

            </div>

            <Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-lg-5">

                    <p className="mb-3">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

                    <div className="row justify-content-center">

                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="first_name">Current Password</label>
                                <input className="form-control with-label" name="first_name" id="address" type="text" value="" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div style={{fontSize: '12px'}} className="text-muted">At least 8 characters | One Letter | One Number | One Symbol</div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="last_name">New Password</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value="" />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="last_name">Confirm New Password</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value="" />
                            </div>
                        </div>

                    </div>

                    {/* <div className="text-muted text-center mt-5">Access ID: 1901</div> */}

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button variant="articles-light" onClick={handleClose}>
                        Save
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    );
}

function ManageAccountAddressModal({ userReduxState }) {
    const [show, setShow] = useState(false);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    console.log("Test");

    return (
        <>

            <div className="info-snippet" onClick={handleShow}>

                <div className="label">ADDRESS</div>

                <div className="info">
                    {userReduxState?.address?.city + ', '}
                    {userReduxState?.address?.state + ' | '} 
                    {userReduxState?.address?.zip}
                </div>

                <div className="arrow"><i className="far fa-hand-point-right " aria-hidden="true"></i></div>

            </div>

            <Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Edit Account</Modal.Title>
                </Modal.Header>

                <Modal.Body className="px-lg-5">

                    <p className="mb-3">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

                    <div className="row justify-content-center">

                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="first_name">Address Line One</label>
                                <input className="form-control with-label" name="first_name" id="address" type="text" value={userReduxState.address.lineOne} />
                            </div>
                        </div>

                        <div className="col-lg-12">
                            <div className="form-group articles">
                                <label htmlFor="last_name">Address Line Two</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value={userReduxState.address.lineTwo} />
                            </div>
                        </div>

                        <div className="col-lg-5 pr-lg-1">
                            <div className="form-group articles">
                                <label htmlFor="last_name">City / Town</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value={userReduxState.address.city} />
                            </div>
                        </div>

                        <div className="col-lg-3 px-lg-1">
                            <div className="form-group articles">
                                <label htmlFor="last_name">State</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value={userReduxState.address.state} />
                            </div>
                        </div>

                        <div className="col-lg-4 pl-lg-1">
                            <div className="form-group articles">
                                <label htmlFor="last_name">Zip</label>
                                <input className="form-control with-label" name="last_name" id="address" type="text" value={userReduxState.address.zip} />
                            </div>
                        </div>

                    </div>

                    {/* <div className="text-muted text-center mt-5">Access ID: 1901</div> */}

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <Button variant="outline-dark" onClick={handleClose}>
                        Cancel
                    </Button>

                    <Button variant="articles-light" onClick={handleClose}>
                        Save
                    </Button>

                </Modal.Footer>

            </Modal>
        </>
    );
}
