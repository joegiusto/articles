import React, { useState, useEffect } from 'react';
import axios from 'axios'
import moment from 'moment'
// import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ROUTES from '../../components/constants/routes'; 

function AdminViewUserModal(props) {
    const [modalShow, setModalShow] = useState(false);
    const [userData, setUserData] = useState({});

    const handleClose = () => {
        setModalShow(false); 
    }

    useEffect(() => {
    
    }, []);

    function loadUserData() {

        if ( Object.keys(userData).length === 0 ) {
            axios.post('/api/secure/adminGetUser', {
                user_id: props.user_id
            })
            .then(function (response) {
                console.log(response);
                setUserData(response.data)
            })
            .catch(function (error) {
                console.log(error);
            });
        } else {
            console.log("Already loaded")
        }

    }
    
    function renderModalButton(buttonType) {

        switch(buttonType) {
          case 'badge':
            return (
                <button onClick={() => setModalShow(true) + loadUserData()} className="badge badge-articles"> 
                   {props.name}
                </button>
            );
          default:
            return 'Please provide a prop for buttonType!';
        }

    }

    return (
        <>

            {renderModalButton(props.buttonType)}

            <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>User Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="d-flex">

                        <div>
                            <img width="100px" src={userData.photo_url} alt=""/>
                        </div>

                        <div className="ml-3">
                            <div>{userData.first_name} {userData.last_name} ({userData._id})</div>
                            <div>User Since: {moment(userData.sign_up_date).format("LL")}</div>
                            <div>Employee: {userData.employee?.bool ? <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${userData._id}`}><a className="badge badge-articles">True</a></Link> : 'False'}</div>
                            <div>Gender: {userData.gender}</div>
                            <div>State: {userData.address?.state}</div>
                            <div>Cell: {userData.cell}</div>
                        </div>

                    </div>

                    <div className="d-flex mt-3">
                        <div className="btn btn-danger mr-1">Remove Photo</div>
                        <div className="btn btn-danger mr-1">Reset Password</div>
                        <div className="btn btn-danger mr-1">Mute</div>
                        <div className="btn btn-danger">Ban</div>
                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

        </>

    )

}

export default AdminViewUserModal;