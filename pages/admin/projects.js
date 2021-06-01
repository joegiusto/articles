// import Head from 'next/head'
// import Link from 'next/link'
// import React, { Component, useState } from 'react';
// import { useRouter } from 'next/router'

// import AdminLayout from '../../components/layouts/admin.js';

// function AdminHomePage() {
//     const router = useRouter()
//     const { param } = router.query

//     return(
//         <section className="submissions-page">

//             <Head>
//                 <title>Admin - Articles</title>
//             </Head> 

//             <div className="container py-3">
//                 <h2>Projects Page</h2>
//                 <p>Admin stuff here.</p>
//             </div>

//         </section>
//     )
// }

// AdminHomePage.Layout = AdminLayout;
// export default AdminHomePage;

// import React, { Component, useState } from 'react'
import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'
import TextareaAutosize from 'react-textarea-autosize';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import AdminLayout from 'components/layouts/admin.js';

function AdminProjects() {
    const router = useRouter()
    const { param } = router.query

    const [modalShow, setModalShow] = useState(false);

    const [itemName, setItemName] = useState('Project');

    const [projects, setProjects] = useState([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {

        axios.get('/api/admin/projects', {
            params: {
                // fromDate: '',
                // toDate: '',
                // limit: '100',
                // page: '1',
            }
        })
            .then(function (response) {
                console.log(response);

                setProjects(response.data)

            })
            .catch(function (error) {
                console.log(error);
            });

    }, []);

    useEffect(async () => {

    });

    const handleClose = () => {
        setModalShow(false);
        // setActiveDonationID(''); 
    }

    const handleFieldChange = e => {
        const { name, value } = e.target;
        setOrder(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

    const addItem = () => {

        if (donation.user_id == '') {
            delete donation.user_id;
        }

        // axios.post('/api/admin/donations/add', {
        // 	donation,
        // 	selectedDate
        // })
        // .then( (response) => {
        // 	console.log(response)
        // 	// setDonations(donations.filter(item => item._id !== response.data.removed_id));
        // 	setDonations(prevState => ([
        // 		...prevState,
        // 		response.data.populatedDonation
        // 	]));
        // })
        // .catch( (error) => {
        // 	console.log(error);
        // });
    }

    function deleteItem(item_id) {
        console.log("Delete Item called")
    }

    // if (true == true) {
    //     return (
    //         <div>Test</div>
    //     )
    // }

    return (
        <section className="admin-page admin-projects">

            <Head>
                <title>Admin Projects - Articles</title>
            </Head>

            {/* Add Order Modal */}
            <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>{itemName} Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {/*  */}

                </Modal.Body>

                <Modal.Footer className="d-flex justify-content-between">

                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>

                    <Button variant="articles-light" onClick={addItem}>
                        Add {itemName}
                    </Button>

                </Modal.Footer>

            </Modal>

            <div className="side-panel">

                <div className="card">
                    <div className="card-header">Status</div>
                    <div className="card-body">

                    </div>
                </div>

            </div>

            <div className="main-panel projects">

                {/* <h1 className="text-center">Projects ({projects.length})</h1> */}

                <div className="projects">
                    {projects.map((project) =>
                        <div className="project">

                            <h3>{project.public_title}</h3>
                            <p>{project.public_description}</p>

                            <ViewProject id={project._id} />
                        </div>
                    )}
                </div>

                {/* <h1 className="text-center mt-4">Archived Projects (0)</h1>

                <div className="archived-projects text-center">
                    <h3>No archived projects to display</h3>
                </div> */}

            </div>

        </section>
    )
}

class Projects extends Component {
    constructor(props) {
        super(props);

        this.state = {
            projects: []
        };

    }

    componentDidMount() {
        const self = this;
        // this.props.setLocation(this.props.tabLocation);

        axios.get('/api/admin/projects', {

        })
            .then((response) => {
                console.log(response)
                this.setState({ projects: response.data })
            })
            .catch((error) => {
                console.log(error);
            });
    }

    render() {

        return (
            <div className="admin-page admin-projects">

                <div className="main-panel">

                    <h1 className="text-center my-4">Projects ({projects.length})</h1>

                    <div className="projects justify-content-center">
                        {projects.map((project) =>

                            <div className="project">
                                <h3>{project.public_title}</h3>
                                <p>{project.public_description}</p>
                                <ViewProject id={project._id} />
                            </div>

                        )}
                    </div>

                    {/* <h1 className="text-center mt-4">Archived Projects (0)</h1>

                    <div className="archived-projects text-center">
                        <h3>No archived projects to display</h3>
                    </div> */}

                </div>

            </div>
        );
    }
}

function ViewProject(props) {
    const [show, setShow] = useState(false);
    const [project, setProject] = useState(null);
    const [projectKey, setProjectKey] = useState();
    const [error, setError] = useState(null);

    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);

    const handleEnter = (e) => {

        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();

            // if (this.state.chatMessage !== '') {
            //   this.sendMessage();
            // }
            console.log("Submit");
            handleKeySubmit();
        }

    }

    const handleKeySubmit = () => {

        axios.post('/api/secure/getProject', {
            key: projectKey,
            id: props.id
        })
            .then((response) => {
                console.log(response)

                setError(null)
                setProjectKey(null)

                setProject({
                    ...response.data
                });
            })
            .catch((error) => {
                console.log(error);

                setError(error.response.data)
            });

    }

    return (
        <>

            <Button variant="articles-light mt-auto" onClick={handleShow}>
                {project ? <i className="fas fa-unlock"></i> : <i className="fas fa-lock"></i>}
                View
            </Button>

            <Modal centered className="admin-ads articles-modal" show={show} onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>View Project</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    {/* Form to get Project */}
                    {!project &&
                        <div className="form-group articles flex-grow-1">
                            <label htmlFor="project_key">Project Key</label>

                            <TextareaAutosize
                                className="form-control with-label" 
                                id="project_key" 
                                name="project_key"
                                // value={this.state.news_notes}
                                value={projectKey}
                                onChange={e => setProjectKey(e.target.value)}
                                // onChange={this.handleChange}
                                // rows="7"
                                // disabled={this.state.editLoading ? 'disabled' : ''}
                            >
                            </TextareaAutosize>

                            {/* <input className="form-control with-label" name="project_key" onKeyPress={handleEnter} id="project_key" type="text" style={{ webkitTextSecurity: 'disc' }} value={projectKey} onChange={e => setProjectKey(e.target.value)} /> */}

                        </div>
                    }

                    {/* Display Project */}
                    {project &&
                        <div>
                            <div className="title">{project.title}</div>
                            <div>{project.purpose}</div>

                            <h5 className="mt-2">Links</h5>
                            <div className="mt-2">
                                {project.links.map((link) =>
                                    <div>{link.title} - {link.link}</div>
                                )}
                            </div>

                            <div className="mt-2">{project.encrypted_bytes}</div>

                            {/* <button className="btn btn-articles-light">View Encryption</button> */}
                        </div>
                    }

                    {/* Display Errors */}
                    {error && <div className="mt-2 text-danger">{error}</div>}

                </Modal.Body>

                <Modal.Footer className="justify-content-between">

                    <Button variant="link" onClick={handleClose}>
                        Close
                    </Button>

                    {!project &&
                        <Button variant="articles-light" onClick={handleKeySubmit}>
                            Submit
                        </Button>
                    }

                </Modal.Footer>

            </Modal>
        </>
    );
}

const mapStateToProps = state => ({
    user_id: state.auth.user.id
});

AdminProjects.Layout = AdminLayout;

export default connect(
    mapStateToProps,
)(AdminProjects);