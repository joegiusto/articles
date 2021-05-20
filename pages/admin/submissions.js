import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'

import axios from 'axios'
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";

import AdminLayout from 'components/layouts/admin.js';
import AdminViewUserModal from 'components/admin/AdminViewUserModal';
// import ROUTES from 'components/constants/routes'

function SubmissionsAdmin(props) {
    const [submissions, setSubmissions] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [selectedDate, handleDateChange] = useState(new Date());

    useEffect(() => {
        // props.setLocation(props.tabLocation);
    
        axios.get('/api/submissions')
        .then(function (response) {
            console.log(response);
            setSubmissions(response.data.submissions);
        })
        .catch(function (error) {
            console.log(error);
        });
    
    }, []);

    const handleClose = () => {
        setModalShow(false); 
        // setActiveDonationID(''); 
        // setActivePresident({}); 
        // props.history.push(ROUTES.ADMIN_DONATIONS);
    }

    return(
        <div className="admin-page admin-submissions">

            <Head>
                <title>Admin Submissions - Articles</title>
            </Head>

            <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>Submission Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="donate-form">

                        <MuiPickersUtilsProvider utils={MomentUtils}>
                            <DateTimePicker
                                label="DateTimePicker"
                                inputVariant="outlined"
                                value={selectedDate}
                                onChange={handleDateChange}
                            />
                        </MuiPickersUtilsProvider>

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

            <div className="side-panel">
                <div className="card">
                    <div className="card-header">Details</div>
                    <div className="card-body">
                        <div>Submissions: {submissions.length}</div>
                    </div>
                </div>
            </div>

            <div className="main-panel">
                
                <div className="card manage-card">

                    <div className="card-header">

                    <div className="d-flex align-items-center">
                        <i className="fas fa-edit fa-2x"></i>
                        <h3 className="mb-0">Manage Submissions</h3>
                        <div className="total">({submissions.length})</div>
                    </div>

                    <button onClick={() => setModalShow(true)} className="btn btn-articles-light btn-sm">Add Submission</button>

                </div>

                    <div className="card-body p-0">

                    <div className="table-responsive">
                        <table className="table table-sm mb-0">
                        <thead className="thead-dark">

                            <tr>
                                <th scope="col">Date</th>
                                <th scope="col">User</th>
                                <th scope="col">Title</th>
                                <th scope="col">Likes</th>
                                <th scope="col">Dislikes</th>
                                <th scope="col">Reports</th>
                                <th scope="col">Actions</th>
                            </tr>

                        </thead>
                        <tbody>

                            {submissions.sort((a, b) => new Date(b.date) - new Date(a.date)).map(submission => (

                                <tr key={submission._id}>
                                    <th scope="row">{moment(submission.date).format('LL')}</th>
                                    <td>
                                        <AdminViewUserModal user_id={submission.user_id._id} name={`${submission.user_id.first_name} ${submission.user_id.last_name}`} buttonType={'badge'} />
                                    </td>
                                    <td>{submission.title}</td>
                                    <td>{submission.up.length}</td>
                                    <td>{submission.down.length}</td>
                                    <td>0</td>
                                    <td>
                                        {/* <ConfirmDelete afterConfirm={() => this.removeDonation(submission._id)}></ConfirmDelete> */}
                                        <a target="_blank" rel="noopener noreferrer" href={submission.preview} className="badge badge-dark noselect ml-1">View</a>
                                        <div style={{cursor: 'pointer'}} onClick={() => this.editDonation(submission._id)} className="badge badge-warning noselect ml-1">Edit</div>
                                    </td>
                                </tr>
                            
                            ))}

                        </tbody>
                        </table>
                    </div>

                </div>

                    <div className="card-footer text-center">
                        <div className="text-muted">{submissions.length} / {submissions.length} Submissions being shown</div>
                    </div>

                </div>

            </div>

        </div>
    )
}

SubmissionsAdmin.Layout = AdminLayout;
export default SubmissionsAdmin