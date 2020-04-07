import React, { Component } from 'react'
import { withFirebase } from '../../Firebase';
import DayPickerInput from 'react-day-picker/DayPickerInput';
import moment from 'moment'
import 'react-day-picker/lib/style.css';

export default function Page() {
  return (
    <div className="container">
      <div className="row">
        <div className="col-4">
          <DonateForm/>
        </div>
      </div>
    </div>
  )
}

const INITIAL_STATE = {
  success: false,
  error: null,

  selectedDay: undefined,
  date: undefined,
  name: '',
  file: '',
  note: '',
  department: 'other',
  total: 0,
  amount: undefined,
};

class DonateFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

    this.handleInputChange = this.handleInputChange.bind(this);
    this.handleDayChange = this.handleDayChange.bind(this);
  }

  onSubmit = (event, authUser) => {

    this.props.firebase.expenses().push({
      date: this.state.date,
      name: this.state.name,
      file: this.state.file,
      note: this.state.note,
      department: this.state.department,
      amount: parseInt(this.state.amount),
    })

    // Was a succesful push
    // this.setState({ success: true });

    // Clear success after 2 seconds for UX reasons
    // setTimeout(() => {
    //   this.setState({ ...INITIAL_STATE });
    // }, 2000);

    event.preventDefault();
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  // buttonAmount = (number) => {
  //   this.setState({ amount: number });
  // };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  handleDayChange(day) {
    this.setState({ selectedDay: day, date: moment(day, 'Y-M-D').unix() });
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    const { email, name, error, department, selectedDay } = this.state;

    return (
      <div className="mt-5">
        <h1>Add Expense</h1>

        <form autoComplete="off" onSubmit={this.onSubmit}>
  
          {this.state.success ? (
          <div className={this.state.type === "Cash" ? ("alert alert-success") : ("alert alert-danger") }>{this.state.type === "Cash" ? (<span>{this.state.type} donation successfull.</span>) : (<span>{this.state.type} donation not supported yet.</span>)} </div>
          ) : (
          <span></span>
          )}

          

          <div className="input-group mb-3">

            <div className="input-group-prepend">
              <label className="input-group-text" for="inputGroupSelect01">Type</label>
            </div>

            <select name="department" value={this.state.department} onChange={this.handleInputChange} className="custom-select" id="blank">
              <option value="other">Other</option>
              <option value="payrole">Payrole</option>
              <option value="inventory">Inventory</option>
              <option value="reoccuring">Reoccuring</option>
              <option value="utilities">Utilities</option>
            </select>

          </div>

          <div className="input-group mb-3">
            <input 
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              type="text" 
              className="form-control" 
              placeholder="Display name" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-lg"
            />
          </div>

          <div>
            {selectedDay && <p>Day: {selectedDay.toLocaleDateString()} Epoch: {moment(selectedDay, 'Y-M-D').unix()}</p>}
            {!selectedDay && <p>Choose a day</p>}
            <DayPickerInput 
              onDayChange={this.handleDayChange} 
            />
          </div>
          
          <div className="input-group">

          </div>

          <div className="input-group mb-3">

            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>

            <input
              name='amount'
              value={this.state.amount}
              onChange={this.onChange}
              type="number" 
              placeholder="Amount"
              className="form-control" 
              aria-label="Amount (to the nearest dollar)"
            />

          </div>

          <div className="form-group">
            <label for="exampleFormControlTextarea1">File URL:</label>
            <input
              className="form-control" 
              name="file"
              type="text"
              placeholder="Plz confirm url b4 post"
              value={this.state.file}
              onChange={this.onChange}
            />
          </div>

          <div className="form-group">
            <label for="exampleFormControlTextarea1">Note:</label>
            <textarea 
              className="form-control" 
              id="exampleFormControlTextarea1" 
              rows="3"
              name="note"
              value={this.state.note}
              onChange={this.onChange}
            />
          </div>
  
          <div className="row mt-3">

            <div className="col-6">
              <button type="submit" className="btn btn-dark w-100">
                <i className="far fa-money-bill-alt"></i>Submit
              </button>
            </div>
  

          </div>
  
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const DonateForm = withFirebase(DonateFormBase);