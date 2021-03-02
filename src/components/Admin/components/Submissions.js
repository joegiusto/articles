import React, { Component, useState, useEffect } from 'react';
import axios from 'axios'
import { Link } from 'react-router-dom';
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";

import AdminViewUserModal from './Shared/AdminViewUserModal'

import * as ROUTES from '../../../constants/routes'; 

function SubmissionsAdmin(props) {
    const [submissions, setSubmissions] = useState([]);
    const [modalShow, setModalShow] = useState(false);

    const [selectedDate, handleDateChange] = useState(new Date());

    useEffect(() => {
        props.setLocation(props.tabLocation);
    
        axios.get('/api/getSubmissionsMongoose')
        .then(function (response) {
            console.log(response);
            setSubmissions(response.data);
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

class Submissions extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      submissions: [],
    };

  }

  componentDidMount() {
    this.props.setLocation(this.props.tabLocation);
    const self = this;

    axios.get('/api/getSubmissions')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        submissions: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        submissions: [],
      })
    });
  }

  componentWillUnmount() {
    this.props.setLocation('');
  }

  render() {

    return (
      <div className="admin-submissions container-fluid">

        <div className="row">

          <div className="col-12 col-md-4">

            <div className="admin-side-by-side-form">

              <div className="form-group">
                <input className="form-control" type="text" value="" placeholder="Title"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="text" value="" placeholder="User ID"/>
              </div>

              <div className="form-group">
                <textarea className="form-control" type="text" rows="5" placeholder="Notes"/>
              </div>

              {/* <div className="form-group">
                <input className="form-control" type="text" placeholder="File"/>
              </div> */}

              <div className="submit">
                <div className="btn btn-articles-light w-100">Submit</div>
              </div>

            </div>

          </div>

          <div className="col-12 col-md-8">
            <table className="table table-sm table-bordered bg-white mt-3">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">User</th>
                  <th scope="col">Title</th>
                  <th scope="col">Actions</th>
                  {/* <th scope="col">Price</th> */}
                  {/* <th scope="col">Card Photos</th> */}
                </tr>
              </thead>
              <tbody>

                {this.state.submissions.map(product => (

                  <tr>
                    <th scope="row">{product.user_id}</th>
                    <td>{product.title}</td>
                    <td><div className="badge badge-danger">Delete</div></td>
                    {/* <td>${product.price / 100}</td> */}
                    {/* <td>p-c</td> */}
                  </tr>
                  
                ))}

              </tbody>
            </table>
          </div>

        </div>

        

        {/* <div className="btn btn-articles-light">Add Submission</div> */}

      </div>
    );
  }
}

// export default Submissions
export default SubmissionsAdmin