import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import moment from 'moment'
import axios from 'axios'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

// Articles Absolute
import AdminLayout from 'components/layouts/admin.js';
import AdminViewUserModal from 'components/admin/AdminViewUserModal'
import ConfirmDelete from 'components/ConfirmDelete'
import articlesTheme from 'components/material_ui/articlesTheme'
import ROUTES from 'components/constants/routes'

function AdminHomePage() {
    const router = useRouter()
    const { param } = router.query
  
    return(
        <section className="submissions-page">

            <Head>
                <title>Admin - Articles</title>
            </Head> 

            <div className="container py-3">
                <h2>Donations Page</h2>
                <p>Admin stuff here.</p>
            </div>

        </section>
    )
}

function DonationsAdmin(props) {
	// props.setLocation(props.tabLocation);

	const [donations, setDonations] = useState([]);

    const initialDonation = {
        date: new Date(),
		createdBy: '5e90cc96579a17440c5d7d52',
		amount: 500,
		user_id: '',
		message: '',
        type: 'cash'
    }

	const [donation, setDonation] = useState({
        ...initialDonation
	});

    const [users, setUsers] = useState([
        {
            first_name: 'Joey',
            last_name: 'Giusto'
        },
        {
            first_name: 'John',
            last_name: 'Smith'
        }
    ]);

	const [modalShow, setModalShow] = useState(false);
    const [modalShowUsers, setModalShowUsers] = useState(false);

	const [modalLoading, setModalLoading] = useState(false);
	const [activeDonationID, setActiveDonationID] = useState('');

	const [selectedDate, handleDateChange] = useState(new Date());

	const handleDonationChange = e => {
		const { name, value } = e.target;
		setDonation(prevState => ({
			...prevState,
			[name]: value
		}));
	};

	const handleDonationAmountChange = amount => {
		// const { name, value } = e.target;
		setDonation(prevState => ({
			...prevState,
			amount: amount
		}));
	};

	const handleClose = () => {
		setModalShow(false); 
		setDonation({...initialDonation})
	}

    const handleDate = (date) => {
		// console.log(date)

        setDonation(prevState => ({
            ...prevState,
            date: date._d
        }));
	}

	useEffect(() => {
		
		axios.get('/api/admin/donations')
		.then( (response) => {
            console.log(response)
            setDonations(response.data);
		})
		.catch( (error) => {
		    console.log(error);
		});

        axios.get('/api/admin/donations/users')
		.then( (response) => {
            console.log(response)
            setUsers(response.data.users);
		})
		.catch( (error) => {
		    console.log(error);
		});

	}, []);

	const addDonation = () => {

		if (donation.user_id == '') {
			delete donation.user_id;
		}

		axios.post('/api/admin/donations/upsert', {
			donation
		})
		.then( (response) => {
			console.log(response)
			setDonations(donations.filter(item => item._id !== response.data.populatedDonation._id));
			setDonations(prevState => ([
				...prevState,
				response.data.populatedDonation
			]));
            handleClose()
		})
		.catch( (error) => {
			console.log(error);
		});

	}

	const deleteDonation = (id) => {
		// console.log(id)

		axios.post('/api/admin/donations/delete', {
			id
		})
		.then( (response) => {
			console.log(response)
			setDonations(donations.filter(item => item._id !== response.data.removed_id));
		})
		.catch( (error) => {
			console.log(error);
		});
	}

    const editDonation = (id) => {
		console.log(id);
        setModalShow(true);
        setDonation(
            donations.find(item => item._id == id)
        )
	}

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    return (
        <div className="admin-donations admin-page">

            <Head>
                <title>Admin Donations - Articles</title>
            </Head> 

            {/* Add Donation Modal */}
            <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Donation Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="donate-form">

                        <div className="row">

                            <div className="col-lg-6">
                                <ThemeProvider theme={articlesTheme}>
                                    <MuiPickersUtilsProvider utils={MomentUtils}>
                                        <DateTimePicker
                                            label="Date"
                                            inputVariant="outlined"
                                            value={donation.date}
                                            onChange={handleDate}
                                            className="form-group articles mb-3 w-100"
                                        />
                                    </MuiPickersUtilsProvider>
                                </ThemeProvider>
                            </div>

                            <div className="col-lg-6">
                                <div className="form-group articles">
                                    <label htmlFor="address">Created By</label>
                                    <input 
                                        className="form-control with-label" 
                                        onChange={handleDonationChange}
                                        name="createdBy" 
                                        id="createdBy" 
                                        type="text" 
                                        disabled
                                        value={(donation.createdBy._id ? donation.createdBy._id : donation.createdBy)}
                                    />
                                </div>
                            </div>

                            <div className="col-lg-6">

                                <div className="form-group articles">
                                    <label className="d-flex justify-content-between" htmlFor="address">
                                        <span>Amount</span>
                                        <span>${ numberWithCommas( (donation.amount / 100).toFixed(2) ) }</span>
                                    </label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleDonationChange}
                                        name="amount"
                                        id="amount" 
                                        type="text" 
                                        value={donation.amount}
                                    />
                                </div>

                            </div>

                            <div className="col-lg-6">

                                {donation.user_id?._id && 
                                    <div className="w-100 d-flex justify-content-center align-items-center mt-3">
                                        <div className=""><AdminViewUserModal user_id={donation.user_id._id} name={`${donation.user_id.first_name} ${donation.user_id.last_name}`} buttonType={'badge'} /></div>
                                        <button className="btn btn-articles-light btn-sm" onClick={() => setDonation({...donation, user_id: {_id: undefined, first_name: undefined, last_name: undefined  } }) }>Remove</button>
                                    </div>
                                }


                                {!donation.user_id?._id && 
                                    <div className="d-flex flex-column mt-3">

                                        <div className="w-100 d-flex justify-content-center align-items-center h-100">
                                            <button onClick={() => setModalShowUsers(true)} className="btn btn-articles-light btn-sm mb-3">Add User</button>
                                        </div>


                                            {modalShowUsers && 
                                            <div className="mb-3">
                                                {users.map(user => 
                                                    <button key={user._id} onClick={() => setDonation({...donation, user_id: {_id: user._id, first_name: user.first_name, last_name: user.last_name  } }) + setModalShowUsers(false)} className="btn btn-articles-light btn-sm">{user.first_name} {user.last_name}</button>
                                                )}
                                            </div>
                                            }


                                    </div>
                                }

                                {/* <div className="form-group articles">
                                    <label htmlFor="address">User</label>
                                    <input 
                                        className="form-control with-label"
                                        onChange={handleDonationChange}
                                        name="user_id" 
                                        id="user_id" 
                                        type="text" 
                                        value={donation.user_id,_id}
                                    />
                                </div> */}

                            </div>

                            <div className="col-12">
                            <   div className="mb-3 d-flex flex-wrap justify-content-center">
                                    <button onClick={() => handleDonationAmountChange(100)} className="flex-grow-1 btn btn-articles-light btn-sm">$1.00</button>
                                    <button onClick={() => handleDonationAmountChange(500)} className="flex-grow-1 btn btn-articles-light btn-sm">$5.00</button>
                                    <button onClick={() => handleDonationAmountChange(1000)} className="flex-grow-1 btn btn-articles-light btn-sm">$10.00</button>
                                    <button onClick={() => handleDonationAmountChange(1000)} className="flex-grow-1 btn btn-articles-light btn-sm">$15.00</button>
                                    <button onClick={() => handleDonationAmountChange(2000)} className="flex-grow-1 btn btn-articles-light btn-sm">$20.00</button>
                                    <button onClick={() => handleDonationAmountChange(2000)} className="flex-grow-1 btn btn-articles-light btn-sm">$30.00</button>
                                    <button onClick={() => handleDonationAmountChange(5000)} className="flex-grow-1 btn btn-articles-light btn-sm">$50.00</button>
                                    <button onClick={() => handleDonationAmountChange(10000)} className="flex-grow-1 btn btn-articles-light btn-sm">$100.00</button>
                                </div>
                            </div>

                            {/* <div className="col-12">
                                <hr className="mt-0 mb-3"/>
                            </div> */}

                            <div className="col-lg-12">
                                <div className="form-group articles">
                                    <label htmlFor="address">Message</label>
                                    <textarea className="form-control with-label" onChange={handleDonationChange} name="message" id="message" type="text">
                                        {donation.message}
                                    </textarea>
                                </div>
                            </div>

                        </div>

                    </div>

                </Modal.Body>
                
                <Modal.Footer className="d-flex justify-content-between">

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="articles-light" onClick={addDonation}>
                        Add Donation
                    </Button>

                </Modal.Footer>
            
            </Modal>

            <div className="side-panel">

                <div className="card">

                    <div className="card-header">Details</div>

                    <div className="card-body">
                        <div>Total: <b>${(donations.reduce((a, b) => a + (parseInt(b['amount'] || 0)), 0) / 100).toFixed(2)}</b></div>
                        <hr/>
                        <div>Cash: <b>${(donations.reduce((a, b) => a + (parseInt(b['amount'] || 0)), 0) / 100).toFixed(2)}</b></div>
                        <div>Card: <b>$0.00</b></div>
                    </div>

                </div>

            </div> 

            <div className="main-panel">

                <div className="card manage-card">

                    <div className="card-header flex-column flex-lg-row justify-content-sm-between">

                        <div className="d-flex align-items-center mb-2 mb-sm-0">
                            <i className="fas fa-edit fa-2x"></i>
                            <h3 className="mb-0">Donations</h3>
                            <div className="total">({donations.length})</div>
                        </div>

                        <button onClick={() => setModalShow(true)} className="btn btn-articles-light btn-sm">Add Donation</button>

                    </div>

                    <div className="card-body p-0">

                        <div className="table-responsive">
                        <table className="table table-sm mb-0">
                            <thead className="thead-dark">
                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">User</th>
                                <th scope="col">Amount</th>
                                <th scope="col">Type</th>
                                <th scope="col">Message</th>
                                <th scope="col">Created By</th>
                                <th scope="col">Was Matched</th>
                                <th scope="col">Action</th>
                            </tr>
                            </thead>
                            <tbody>

                            {donations.sort((a, b) => new Date(b.date) - new Date(a.date)).map(donation => (

                                <tr key={donation._id}>
                                    
                                    <th scope="row">{moment(donation.date).format('LL')}</th>

                                    <td>
                                        {donation.user_id?._id ? <AdminViewUserModal user_id={donation.user_id._id} name={`${donation.user_id.first_name} ${donation.user_id.last_name}`} buttonType={'badge'} /> : 'No User'}
                                    </td>

                                    <td>${(donation.amount / 100).toFixed(2)}</td>

                                    <td>
                                        {donation.type == 'cash' && <i className="fas fa-money-bill mr-0"></i>}
                                        {donation.type == 'card' && <i className="far fa-credit-card mr-0"></i>}
                                    </td>

                                    <td>{donation.message}</td>

                                    <td>
                                        <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${donation.createdBy._id}`}> 
                                            <a className="badge badge-articles badge-hover">{donation.createdBy.first_name} {donation.createdBy.last_name}</a>
                                        </Link>
                                    </td>

                                    <td>{donation.matched ? 'True' : 'False'}</td>

                                    <td>
                                        <ConfirmDelete afterConfirm={() => deleteDonation(donation._id)}></ConfirmDelete>
                                        <div style={{cursor: 'pointer'}} onClick={() => editDonation(donation._id)} className="badge badge-dark noselect ml-1">Edit</div>
                                    </td>

                                </tr>
                                
                            ))}

                            </tbody>
                        </table>
                        </div>
                    
                    </div>

                    <div className="card-footer text-center">
                        <div className="text-muted">{donations.length} / {donations.length} Donations being shown</div>
                    </div>

                </div>
            
            </div>

        </div>
    )
}

DonationsAdmin.Layout = AdminLayout;
export default DonationsAdmin