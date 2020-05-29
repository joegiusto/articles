import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import {CardElement} from '@stripe/react-stripe-js';
import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import socketIOClient from 'socket.io-client'
const ENDPOINT = "/";
let socket = undefined;

const stripePromise = loadStripe('pk_live_VE6HtyhcU3HCa6bin4uKgFgL00jeOY6SEW');

const INITIAL_CURRENT = {
  _id: moment().unix(),
  date: moment().unix(),
  type: '',
  matched: false,
  message: "",
  name: "",
  amount: 500,
  wasMatched: false,
  createdBy: "5e90cc96579a17440c5d7d52"
}

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      donations: [],
      total: 0,

      current: {
        ...INITIAL_CURRENT,
      }
    };

    this.handleCurrentChange = this.handleCurrentChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
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
  }

  componentWillUnmount() {
    this.props.setLoaction('');
    socket.disconnect();
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
    console.log("cash tried")

    this.setState({
      donations: [
        ...this.state.donations,
        this.state.current
      ],
      current: {
        ...INITIAL_CURRENT,
        _id: moment().unix(),
        date: moment().unix(),
      }
    })

    socket.emit('recieveDonation', this.state.current);
  }

  editDonation(id) {
    console.log(`edit tried ${id}`)
    console.log(
      ...this.state.donations.filter(function( obj ) {
        return obj._id == id;
      })
    )
    this.setState({
      // donations: this.state.donations.filter(function( obj ) {
      //   return obj._id !== id;
      // })
    });
  }

  removeDonation(id) {
    this.setState({
      donations: this.state.donations.filter(function( obj ) {
        return obj._id !== id;
      })
    });
  }

  handleDayChange(day) {
    this.setState({ selectedDay: day, date: moment(day, 'Y-M-D').unix() });
  }

  render() {

    return (
      <div className="admin-donations container-fluid">

        <div className="row">

          <div className="col-12 col-md-4">

            <div className="admin-side-by-side-form donate-form">

              <div className="payment-type">

                <div onClick={() => this.changeType('cash')} className={"type " + (this.state.current.type === 'cash' ? 'active' : '')}>
                  <i className="fas fa-money-bill fa-3x"></i>
                </div>

                <div onClick={() => this.changeType('card')} className={"type " + (this.state.current.type === 'card' ? 'active' : '')}>
                  <i className="far fa-credit-card fa-3x"></i>
                </div>

              </div>

              <div className="form-group">
                <input className="form-control" type="text" value={moment().format("LL")} placeholder="Date"/>
              </div>

              <div className="form-group">
                <DayPickerInput 
                  style={{display: 'block'}}
                  onDayChange={this.handleDayChange} 
                  inputProps={{className: 'form-control'}}
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
                  <div className="match-button active mr-2">No</div>
                  <div className="match-button mr-2">Yes</div>
                  <select className="form-control" disabled id="exampleFormControlSelect1">
                    <option>Joey Giusto</option>
                    <option>Investment Firm XYZ</option>
                  </select>
                </div>
              </div>

              <div className="match-details">
                <small>Created By</small>
                <div className="content">
                  <div className="match-button active mr-2">User</div>
                  <div className="match-button mr-2">Admin</div>
                  <select className="form-control" disabled id="exampleFormControlSelect1">
                    <option>Joey Giusto</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <textarea className="form-control" type="text" name="message" onChange={this.handleCurrentChange} value={this.state.current.message} rows="5" placeholder="Message"/>
              </div>

              {this.state.current.type === 'card' ?

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
                <div className={"btn btn-articles-light w-100 " + (this.state.current.type === '' ? 'disabled' : '')} onClick={() => (this.state.current.type === 'card' ? this.cardSubmit() : this.cashSubmit() ) }>Submit</div>
              </div>

            </div>
            
          </div>

          <div className="col-12 col-md-8">

            <div className="table-responsive">
              <table className="table table-sm table-bordered bg-white mt-3">
                <thead className="thead-dark">
                  <tr>
                    <th scope="col">Date</th>
                    <th scope="col">Name</th>
                    <th scope="col">Amount</th>
                    <th scope="col">Message</th>
                    <th scope="col">Created By</th>
                    <th scope="col">Was Matched</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>

                  {this.state.donations.map(donation => (

                    <tr>
                      <th scope="row">{moment.unix(donation.date).format('LL')}</th>
                      <td>{donation.name}</td>
                      <td>${(donation.amount / 100).toFixed(2)}</td>
                      <td>{donation.message}</td>
                      <td>{donation.createdBy}</td>
                      <td>{donation.wasMatched ? 'True' : 'False'}</td>
                      <td>
                        <div onClick={() => this.removeDonation(donation._id)} className="badge badge-danger">Delete</div>
                        <div onClick={() => this.editDonation(donation._id)} className="badge badge-dark ml-1">Edit</div>
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

export default Donations