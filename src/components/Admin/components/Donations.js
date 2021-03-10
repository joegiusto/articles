import React, { useState, useEffect, Component } from 'react';
// import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import { Link } from 'react-router-dom';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import socketIOClient from 'socket.io-client'
import { formatDate, parseDate } from 'react-day-picker/moment';

import { connect } from 'react-redux';

import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import MomentUtils from '@date-io/moment';
import { DateTimePicker } from "@material-ui/pickers";
import { ThemeProvider } from "@material-ui/styles";

import AdminViewUserModal from './Shared/AdminViewUserModal'
import materialTheme from './Shared/Material-UI-Theme'

import * as ROUTES from '../../../constants/routes'; 
import { pushNotification } from '../../../actions/notificationArea';



const ENDPOINT = "/";
let socket = undefined;

const stripePromise = loadStripe('pk_live_VE6HtyhcU3HCa6bin4uKgFgL00jeOY6SEW');

const INITIAL_CURRENT = {
  _id: '',
  date: new Date(),
  type: 'Cash',
  matched: false,
  matchedBy: '',
  message: "",
  name: "",
  amount: 500,
  createdBy: "5e90cc96579a17440c5d7d52",
}

class ConfirmDelete extends Component {
  constructor(props) {
    super(props);
    
    this.state = {
      confirm: false
    };

  }

  handleClick() {

    if (this.state.confirm) {
      this.props.afterConfirm()
    } else {
      this.setState({confirm: true})
    }

  }

  render() {
    return (
      this.state.confirm ? 
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Confirm</div>
      :
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect"><i className="far fa-trash-alt mr-0"></i></div>
    )
  }
}

function DonationsAdmin(props) {
	props.setLocation(props.tabLocation);

	const [donations, setDonations] = useState([]);

	const [donation, setDonation] = useState({
		createdBy: '5e90cc96579a17440c5d7d52',
		amount: 100,
		user_id: '',
		message: ''
	});

	const [modalShow, setModalShow] = useState(false);
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
		setActiveDonationID(''); 
		// setActivePresident({}); 
		// props.history.push(ROUTES.ADMIN_DONATIONS);
	}

	useEffect(() => {
		
		axios.get('/api/getRevenueMongoose', {

		})
		.then( (response) => {
            console.log(response)
            setDonations(response.data);
		})
		.catch( (error) => {
		    console.log(error);
		});

		if (props.match.params.id) {
		// setModalLoading(true);
		// setModalShow(true);

		// axios.post('/api/getPresident', {
		//   president_id: props.match.params.id
		// })
		// .then( (response) => {
		//   console.log(response)
		//   // setActivePresident(response.data)
		//   setModalLoading(false);
		// })
		// .catch( (error) => {
		//   console.log(error);
		// });
		}

	}, []);

	const addDonation = () => {

		if (donation.user_id == '') {
			delete donation.user_id;
		}

		axios.post('/api/secure/addDonation', {
			donation,
			selectedDate
		})
		.then( (response) => {
			console.log(response)
			// setDonations(donations.filter(item => item._id !== response.data.removed_id));
			setDonations(prevState => ([
				...prevState,
				response.data.populatedDonation
			]));
		})
		.catch( (error) => {
			console.log(error);
		});
	}

	const deleteDonation = (id) => {
		// console.log(id)

		axios.post('/api/secure/deleteDonation', {
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

        // setExpense(prevState => ({
		// 	...prevState,
		// 	_id: id
		// }));

		// axios.post('/api/secure/deleteDonation', {
		// 	id
		// })
		// .then( (response) => {
		// 	console.log(response)
		// 	setDonations(donations.filter(item => item._id !== response.data.removed_id));
		// })
		// .catch( (error) => {
		// 	console.log(error);
		// });
	}

    function numberWithCommas(x) {
        return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
    }

  return (
    <div className="admin-donations admin-page">

        {/* Add Donation Modal */}
        <Modal show={modalShow} className="donations-modal articles-modal" centered onHide={handleClose}>

			<Modal.Header closeButton>
				<Modal.Title>Donation Info</Modal.Title>
			</Modal.Header>

			<Modal.Body>

				<div className="donate-form">

					<div className="row">

						<div className="col-lg-6">
							<ThemeProvider theme={materialTheme}>
								<MuiPickersUtilsProvider utils={MomentUtils}>
									<DateTimePicker
										label="Date"
										inputVariant="outlined"
										value={selectedDate}
										onChange={handleDateChange}
										className="form-group articles mb-3 w-100"
									/>
								</MuiPickersUtilsProvider>
							</ThemeProvider>
						</div>

						<div className="col-lg-6">
							<div className="form-group articles">
								<label for="address">Created By</label>
								<input 
									className="form-control with-label" 
									onChange={handleDonationChange}
									name="createdBy" 
									id="createdBy" 
									type="text" 
									disabled
									value={donation.createdBy}
								/>
							</div>
						</div>

						<div className="col-lg-6">

							<div className="form-group articles">
                                <label className="d-flex justify-content-between" for="address">
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
							<div className="form-group articles">
								<label for="address">User</label>
								<input 
									className="form-control with-label"
									onChange={handleDonationChange}
									name="user_id" 
									id="user_id" 
									type="text" 
									value={donation.user_id}
								/>
							</div>
						</div>

                        <div className="col-12">
                        <   div className="mb-3 d-flex justify-content-center">
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
								<label for="address">Message</label>
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

            <div className="card-header">

                <div className="d-flex align-items-center">
                    <i className="fas fa-edit fa-2x"></i>
                    <h3 className="mb-0">Manage Donations</h3>
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
                                <Link className="badge badge-articles" to={ROUTES.TRANSPARENCY_EMPLOYEES + `/${donation.createdBy._id}`}> 
                                    {donation.createdBy.first_name} {donation.createdBy.last_name}
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

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      donations: [],
      total: 0,
      isFake: false,
      modalOpen: false,

      current: {
        ...INITIAL_CURRENT,
      }
    };

    this.handleCurrentChange = this.handleCurrentChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.props.setLocation(this.props.tabLocation);
    const self = this;
    socket = socketIOClient(ENDPOINT);

    axios.get('/api/getDonations')
    .then(function (response) {

      let total = 0;

      for (var i=0; i < self.state.donations.length; i++) {
        total += self.state.donations[i].ammount
      }

      self.setState({ 
        donations: response.data,
        total: total
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        donations: [],
      })
    });

    // if (this.state.current._id !== undefined) {
    //   console.log('Load Donation Into Form')
    // }
  }

  componentDidUpdate(prevProps, prevState) {
    // Typical usage (don't forget to compare props):
    if ((prevState.current._id !== this.state.current._id && this.state.current._id !== '')) {
      console.log("Update occurred");
    }
  }

  componentWillUnmount() {
    this.props.setLocation('');
    socket.disconnect();
  }

  changeIsFake(newValue) {
    this.setState({
      isFake: newValue
    })
  }

  handleCurrentChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      current: {
        ...this.state.current,
        [name]: value
      }
    });
  }

  handleDateChange(day) {
    this.setState({ 
      ...this.state,
      current: {
        ...this.state.current,
        date: day,
      }
    });
  }

  handleSelectChange(event) {
    this.setState({     
      ...this.state,
      current: {
        ...this.state.current,
        matchedBy: event.target.value
      }
    });
  }

  changeType(type) {
    this.setState({
      ...this.state,
      current: {
        ...this.state.current,
        type: type
      }
    });
  }

  cardSubmit() {
    console.log("card tried")
  }

  cashSubmit() {
    const self = this;
    console.log("cash tried");

    if (this.state.isFake) {

      socket.emit('recieveDonation', this.state.current);

      this.setState({
        donations: [
          ...this.state.donations,
          this.state.current
        ],
        current: {
          ...INITIAL_CURRENT,
        }
      })

    } else {

      axios.post('/api/upsertDonation', {
        donation: self.state.current
      })
      .then(function (response) {

        console.log(`Should be: ${response.data.upsertedId._id}`);
        socket.emit('recieveDonation', self.state.current);
  
        self.setState({
          donations: [
            ...self.state.donations,
            {
              ...self.state.current,
              _id: response.data.upsertedId._id
            }
          ],
          current: {
            ...INITIAL_CURRENT,
          }
        })
        
      })
      .catch(function (error) {
        console.log(error);
      });

    }
    
  }

  editDonation(id) {
    this.setState({
      current: this.state.donations.find(function( obj ) {
        return obj._id === id;
      })
    });

    // this.props.pushNotification({
    //   text: 'Donation Loaded',
    //   clearAfter: '3',
    //   visible: true,
    //   styleType: 'success',
    //   animationType: 'fade'
    // })
  }

  removeDonation(id) {
    const self = this;

    console.log(id);

    console.log("Stopping deletes until confirm option added")

    axios.post('/api/deleteDonation', {
      _id: id 
    })
    .then(function (response) {

      socket.emit('deleteDonation', id);

      self.setState({
        donations: self.state.donations.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day, date: moment(day, 'Y-M-D') });
  }

  handleModalShow = () => {
    this.setState({
      modalOpen: true
    });
  }

  handleClose = () => {
    this.setState({
      modalOpen: false
    });
    // setShow(false); setActivePresidentID(''); 
    // setActivePresident({}); 
    // props.history.push(ROUTES.RESOURCES_PRESIDENTS);
  }

  render() {

    return (
      <div className="admin-donations admin-page">

        <Modal show={this.state.modalOpen} className="donations-modal articles-modal" centered onHide={this.handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>President Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {/* <div className="d-flex flex-column flex-lg-row"> */}

            <div className="admin-side-by-side-form donate-form">

              <div className="payment-type">

                <div onClick={() => this.changeType('Cash')} className={"type " + (this.state.current.type === 'Cash' ? 'active' : '')}>
                  <i className="fas fa-money-bill fa-3x"></i>
                </div>

                <div onClick={() => this.changeType('Card')} className={"type " + (this.state.current.type === 'Card' ? 'active' : '')}>
                  <i className="far fa-credit-card fa-3x"></i>
                </div>

              </div>

              <div className="form-group">
                <DayPickerInput 
                  style={{display: 'block'}}
                  onDayChange={this.handleDateChange} 
                  inputProps={{className: 'form-control'}}
                  value={`${formatDate(this.state.current.date)}`}
                  formatDate={formatDate}
                  parseDate={parseDate}
                  dayPickerProps={{
                    showWeekNumbers: true,
                    todayButton: 'Today',
                  }}
                />
              </div>

              <div className="form-group">
                <input className="form-control" autoComplete={"off"} type="text" name="name" onChange={this.handleCurrentChange} value={this.state.current.name} placeholder="Name"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="number" name="amount" onChange={this.handleCurrentChange} value={this.state.current.amount} placeholder="Amount"/>
              </div>

              <div className="match-details">
                <small>Matched?</small>
                <div className="content">
                  <div onClick={() => this.setState({current: {...this.state.current, matched: false, matchedBy: ''} })} className={"match-button mr-2 " + (this.state.current.matched ? '' : 'active')}>No</div>
                  <div onClick={() => this.setState({current: {...this.state.current, matched: true} })} className={"match-button mr-2 " + (this.state.current.matched ? 'active' : '')}>Yes</div>
                  <select className="form-control" onChange={this.handleSelectChange} value={this.state.current.matchedBy} disabled={(this.state.current.matched ? false : true)} id="exampleFormControlSelect1">
                    <option value={''}>Select</option>
                    <option value={'5e90cc96579a17440c5d7d52'}>Joey Giusto</option>
                    <option value={'angel 101'}>Angel 1</option>
                    <option value={'angel 102'}>Angel 2</option>
                    <option value={'angel 103'}>Angel 3</option>
                  </select>
                </div>
              </div>

              <div className="match-details">
                <small>Is Fake? (Click No)</small>
                <div className="content">
                  <div onClick={() => this.changeIsFake(false)} className={"match-button mr-2 " + (this.state.isFake === true ? '' : 'active')}>No</div>
                  <div onClick={() => this.changeIsFake(true)} className={"match-button mr-2 " + (this.state.isFake ? 'active' : '')}>Yes</div>
                  {/* <div>Just fake on reports not database</div> */}
                </div>
              </div>

              <div className="form-group">
                <textarea className="form-control" type="text" name="message" onChange={this.handleCurrentChange} value={this.state.current.message} rows="5" placeholder="Message"/>
              </div>

              {this.state.current.type === 'Card' ?

              <Elements stripe={stripePromise}>
                <CardElement
                  options={{
                    style: {
                      base: {
                        border: '1px solid #000!important',
                        fontSize: '16px',
                        color: '#424770',
                        '::placeholder': {
                          color: '#aab7c4',
                        },
                      },
                      invalid: {
                        color: '#9e2146',
                      },
                    },
                  }}
                />
              </Elements>

              :

              ''

              }

              <div className="submit">
                {this.state.current._id === '' ? null :
                  <div className={"btn btn-articles-light w-100 mb-3 " + (this.state.current.type === '' ? 'disabled' : '')} onClick={() => ( this.setState({current: { ...INITIAL_CURRENT } }) ) }>Cancel Edit</div>
                }
                <div className={"btn btn-articles-light w-100 mb-3 " + (this.state.current.type === '' ? 'disabled' : '')} onClick={() => (this.state.current.type === 'Card' ? this.cardSubmit() : this.cashSubmit() ) }>{this.state.current._id === '' ? 'Submit' : 'Update'}</div>
              </div>

            </div>
            
          {/* </div> */}

        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={this.handleClose}>
            Close
          </Button>
        </Modal.Footer>
        
      </Modal>

        <div className="side-panel">
        
        </div> 

        <div className="main-panel">

          <div className="card manage-card mb-5">

            <div className="card-header">

              <div className="d-flex align-items-center">
                <i className="fas fa-edit fa-2x"></i>
                <h3 className="mb-0">Manage Donations</h3>
                <div className="total">({this.state.donations.length})</div>
              </div>

              <button onClick={this.handleModalShow} className="btn btn-articles-light btn-sm">Add Donation</button>

            </div>

            <div className="card-body p-0">
              <div className="table-responsive">
                <table className="table table-sm table-bordered mb-0">
                  <thead className="thead-dark">
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Name</th>
                      <th scope="col">Amount</th>
                      <th scope="col">Type</th>
                      <th scope="col">Message</th>
                      <th scope="col">Created By</th>
                      <th scope="col">Was Matched</th>
                      <th scope="col">Action</th>
                    </tr>
                  </thead>
                  <tbody>

                    {this.state.donations.map(donation => (

                      <tr key={donation._id}>
                        <th scope="row">{moment(donation.date).format('LL')}</th>
                        <td>{donation.name}</td>
                        <td>${(donation.amount / 100).toFixed(2)}</td>
                        <td>{donation.type}</td>
                        <td>{donation.message}</td>
                        <td>{donation.createdBy}</td>
                        <td>{donation.matched ? 'True' : 'False'}</td>
                        <td>
                          <ConfirmDelete afterConfirm={() => this.removeDonation(donation._id)}></ConfirmDelete>
                          {/* <div onClick={() => this.removeDonation(donation._id)} className="badge badge-danger">Delete</div> */}
                          <div style={{cursor: 'pointer'}} onClick={() => this.editDonation(donation._id)} className="badge badge-dark noselect ml-1">Edit</div>
                        </td>
                      </tr>
                      
                    ))}

                  </tbody>
                </table>
              </div>
            </div>

            <div className="card-footer text-center">
              <div className="text-muted">{this.state.donations.length} / {this.state.donations.length} Donations being shown</div>
            </div>

          </div>

          <div className="row">

            <div className="col-12 col-md-4">

              <div className="admin-side-by-side-form donate-form">

                <div className="payment-type">

                  <div onClick={() => this.changeType('Cash')} className={"type " + (this.state.current.type === 'Cash' ? 'active' : '')}>
                    <i className="fas fa-money-bill fa-3x"></i>
                  </div>

                  <div onClick={() => this.changeType('Card')} className={"type " + (this.state.current.type === 'Card' ? 'active' : '')}>
                    <i className="far fa-credit-card fa-3x"></i>
                  </div>

                </div>

                <div className="form-group">
                  <DayPickerInput 
                    style={{display: 'block'}}
                    onDayChange={this.handleDateChange} 
                    inputProps={{className: 'form-control'}}
                    value={`${formatDate(this.state.current.date)}`}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                      showWeekNumbers: true,
                      todayButton: 'Today',
                    }}
                  />
                </div>

                <div className="form-group">
                  <input className="form-control" autoComplete={"off"} type="text" name="name" onChange={this.handleCurrentChange} value={this.state.current.name} placeholder="Name"/>
                </div>

                <div className="form-group">
                  <input className="form-control" type="number" name="amount" onChange={this.handleCurrentChange} value={this.state.current.amount} placeholder="Amount"/>
                </div>

                <div className="match-details">
                  <small>Matched?</small>
                  <div className="content">
                    <div onClick={() => this.setState({current: {...this.state.current, matched: false, matchedBy: ''} })} className={"match-button mr-2 " + (this.state.current.matched ? '' : 'active')}>No</div>
                    <div onClick={() => this.setState({current: {...this.state.current, matched: true} })} className={"match-button mr-2 " + (this.state.current.matched ? 'active' : '')}>Yes</div>
                    <select className="form-control" onChange={this.handleSelectChange} value={this.state.current.matchedBy} disabled={(this.state.current.matched ? false : true)} id="exampleFormControlSelect1">
                      <option value={''}>Select</option>
                      <option value={'5e90cc96579a17440c5d7d52'}>Joey Giusto</option>
                      <option value={'angel 101'}>Angel 1</option>
                      <option value={'angel 102'}>Angel 2</option>
                      <option value={'angel 103'}>Angel 3</option>
                    </select>
                  </div>
                </div>

                <div className="match-details">
                  <small>Is Fake? (Click No)</small>
                  <div className="content">
                    <div onClick={() => this.changeIsFake(false)} className={"match-button mr-2 " + (this.state.isFake === true ? '' : 'active')}>No</div>
                    <div onClick={() => this.changeIsFake(true)} className={"match-button mr-2 " + (this.state.isFake ? 'active' : '')}>Yes</div>
                    {/* <div>Just fake on reports not database</div> */}
                  </div>
                </div>

                <div className="form-group">
                  <textarea className="form-control" type="text" name="message" onChange={this.handleCurrentChange} value={this.state.current.message} rows="5" placeholder="Message"/>
                </div>

                {this.state.current.type === 'Card' ?

                <Elements stripe={stripePromise}>
                  <CardElement
                    options={{
                      style: {
                        base: {
                          border: '1px solid #000!important',
                          fontSize: '16px',
                          color: '#424770',
                          '::placeholder': {
                            color: '#aab7c4',
                          },
                        },
                        invalid: {
                          color: '#9e2146',
                        },
                      },
                    }}
                  />
                </Elements>

                :

                ''

                }

                <div className="submit">
                  {this.state.current._id === '' ? null :
                    <div className={"btn btn-articles-light w-100 mb-3 " + (this.state.current.type === '' ? 'disabled' : '')} onClick={() => ( this.setState({current: { ...INITIAL_CURRENT } }) ) }>Cancel Edit</div>
                  }
                  <div className={"btn btn-articles-light w-100 mb-3 " + (this.state.current.type === '' ? 'disabled' : '')} onClick={() => (this.state.current.type === 'Card' ? this.cardSubmit() : this.cashSubmit() ) }>{this.state.current._id === '' ? 'Submit' : 'Update'}</div>
                </div>

              </div>
              
            </div>
            
          </div>

        </div>

      </div>
    );
  }
}

// export default Donations

const mapStateToProps = (state) => {
  // console.log(state.auth.user_details?.user?.first_name)
  return {
    // site: state.site,
  };
};

// export default connect(
//   mapStateToProps, 
//   { pushNotification } 
// )(Donations);

export default connect(
  mapStateToProps, 
  { pushNotification } 
)(DonationsAdmin);