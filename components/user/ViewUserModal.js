import React, { useState, useEffect } from 'react';

import Link from 'next/link'

import axios from 'axios'
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import ROUTES from 'components/constants/routes'; 

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
            axios.post('/api/admin/user', {
                user_id: props.user_id
            })
            .then(function (response) {
                console.log(response);
                setUserData(response.data.user)
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
                <button onClick={() => setModalShow(true) + loadUserData()} className="badge badge-articles badge-hover"> 
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

            <Modal show={modalShow} className="view-users-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <div className="w-100 d-flex justify-content-between align-items-center"><h3 className="mb-0">User Info</h3> {userData.employee?.bool ? <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${userData._id}`}><a className="badge badge-light badge-lg border"><i className="fad fa-star mr-1"></i>Employee</a></Link> : 'False'}</div>
                </Modal.Header>

                <Modal.Body>

                    <div className="d-flex">

                        <div>
                            <img width="100px" src={userData.photo_url} alt=""/>
                        </div>

                        <div className="ml-3 flex-grow-1">

                            <div className="d-flex justify-content-between align-items-center">
                                <h5 className="mb-0">{userData.first_name} {userData.last_name}</h5>
                                <div className="badge badge-articles">User Since: {moment(userData.sign_up_date).format("LL")}</div>
                            </div>

                            <div style={{fontSize: "0.8rem"}} className="text-muted mb-3">({userData._id})</div>
                            <div>Gender: {userData.gender}</div>
                            <div>State: {userData.address?.state}</div>
                        </div>

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="articles-light" onClick={handleClose}>
                        Message
                    </Button>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

        </>

    )

}

export default AdminViewUserModal;