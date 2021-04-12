import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSession } from 'next-auth/client'

import axios from 'axios'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import SettingsLayout from '../../components/layouts/settings.js';

function SettingsAccountPage() {
    const [ session, loading ] = useSession()
    const router = useRouter()
    const { param } = router.query

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
  
    return(
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

                    <ManageAccountNameModal/>

                    <ManageAccountBirthdayModal/>

                    <ManageAccountGenderModal/>
                    
                </div>

            </div>

        </section>
    )
}

SettingsAccountPage.Layout = SettingsLayout;
export default SettingsAccountPage;

function ManageAccountNameModal() {
	const [show, setShow] = useState(false);
  
	const [ad, setAd] = useState({
	  _id: '',
	  business: '',
  
	  ageFilters: {
		range: {
		  active: false,
		  start: 0,
		  end: 0,
		},
		above: {
		  active: false,
		  age: 0
		},
		below: {
		  active: false,
		  age: 0
		}
	  },
  
	  zipFilters: {
		list: {
		  active: false,
		  list: []
		},
		nearby: {
		  active: false,
		  zip: ''
		},
		around: {
		  active: false,
		  zip: ''
		}
	  },
	  
	  timeFilters: {
		between:{
		  active: false,
		  timeOne: '',
		  timeTwo: ''
		}
	  }
	});
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	console.log("Test");
  
	return (
	  <>
		
		<div className="info-snippet" onClick={handleShow}>

			<div className="label">NAME</div>

			<div className="info">
				Joey Giusto
			</div>

		</div>
  
		<Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>
  
		  <Modal.Header closeButton>
			  <Modal.Title>Edit Account</Modal.Title>
		  </Modal.Header>
  
		  <Modal.Body className="px-lg-5">

			<p className="mb-5">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

			<div className="row justify-content-center">
				<div className="col-lg-12">
					<div className="form-group articles">
						<label for="address">First Name</label>
						<input className="form-control with-label" name="address" id="address" type="text" value=""/>
					</div>
				</div>
	
				<div className="col-lg-12">
					<div className="form-group articles">
						<label for="address">Last Name</label>
						<input className="form-control with-label" name="address" id="address" type="text" value=""/>
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

function ManageAccountBirthdayModal() {
	const [show, setShow] = useState(false);
  
	const handleClose = () => setShow(false);
	const handleShow = () => setShow(true);
  
	return (
	  <>
		
		<div className="info-snippet" onClick={handleShow}>

			<div className="label">BIRTHDAY</div>

			<div className="info">
				May 5 1998
			</div>

		</div>
  
		<Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>
  
		  <Modal.Header closeButton>
			  <Modal.Title>Edit Account</Modal.Title>
		  </Modal.Header>
  
		  <Modal.Body className="px-lg-5">

			<p className="mb-5">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

			<div className="row justify-content-center">
				<div className="col-lg-12">

					<div className="form-group articles">
						<label for="address">Birthday</label>
						{/* <input className="form-control with-label" name="address" id="address" type="text" value=""/> */}
						{/* <Cleave
							placeholder=""
							options={{date: true, delimiter: '/', datePattern: ['m','d','Y']}}
							className={"form-control"}
							// onChange={(e) => this.handleUserChange(e)}
							// value={this.state.user.age}
							name="age"
						/> */}
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

function ManageAccountGenderModal() {
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

		</div>
  
		<Modal className="articles-modal account-modal" show={show} centered onHide={handleClose}>
  
		  <Modal.Header closeButton>
			  <Modal.Title>Edit Account</Modal.Title>
		  </Modal.Header>
  
		  <Modal.Body className="px-lg-5">

			<p className="mb-5">Your public profile appears in collaborations across Adobe products and services and on public-facing sites.</p>

			<div className="row justify-content-center">
				<div className="col-lg-12">

					<div className="form-group articles">
						<label for="address">Gender</label>
						
						
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
