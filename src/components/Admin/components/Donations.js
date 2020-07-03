import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import socketIOClient from 'socket.io-client'
import { formatDate, parseDate } from 'react-day-picker/moment';

import { connect } from 'react-redux';
import { pushNotification } from '../../../actions/notificationArea'

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
      <div style={{cursor: 'pointer'}} onClick={() => this.handleClick()} className="badge badge-danger noselect">Delete</div>
    )
  }
}

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      donations: [],
      total: 0,
      isFake: false,

      current: {
        ...INITIAL_CURRENT,
      }
    };

    this.handleCurrentChange = this.handleCurrentChange.bind(this);
    this.handleSelectChange = this.handleSelectChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    this.props.setLoaction(this.props.tabLocation);
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
    this.props.setLoaction('');
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

  render() {

    return (
      <div className="admin-donations container-fluid">

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

              {/* <div className="match-details">
                <small>Created By</small>
                <div className="content">
                  <div className="match-button active mr-2">User</div>
                  <div className="match-button mr-2">Admin</div>
                  <select className="form-control" disabled id="exampleFormControlSelect1">
                    <option>Joey Giusto</option>
                  </select>
                </div>
              </div> */}

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

          <div className="col-12 col-md-8">

            <div className="mt-3">{this.state.donations.length} / {this.state.donations.length} Donations being shown</div>

            <div className="table-responsive">
              <table className="table table-sm table-bordered bg-white">
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
        </div>

        

        {/* <div className="btn btn-articles-light">Add Submission</div> */}

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

export default connect(
  mapStateToProps, 
  { pushNotification } 
)(Donations);