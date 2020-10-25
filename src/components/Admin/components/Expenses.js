import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

import DayPickerInput from 'react-day-picker/DayPickerInput';
import 'react-day-picker/lib/style.css';
import { formatDate, parseDate } from 'react-day-picker/moment';

import ConfirmDelete from './ConfirmDelete';

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      expenses: [],
      form: {
        _id: '',
        amount: 0,
        reason: '',
        file: '',
        note: '',
        date: new Date()
      }
    };

    this.handleFormChange = this.handleFormChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  cancelExpense() {
    this.setState({
      form: {
        _id: '',
        amount: 0,
        reason: '',
        file: '',
        note: '',
        date: new Date()
      }
    });
  }

  loadExpense(id) {
    this.setState({
      form: this.state.expenses.find(function( obj ) {
        return obj._id === id;
      })
    });
  }

  componentDidUpdate(prevProps, prevState) {

    if ((prevState.form._id !== this.state.form._id && this.state.form._id !== '')) {
      console.log("Update occurred");
    }

  }

  componentDidMount() {
    this.props.setLocation(this.props.tabLocation);
    const self = this;

    axios.get('/api/getExpenses')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        expenses: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);

      // self.setState({
      //   expenses: [],
      //   form: {
      //     amount: 0,
      //     reason: '',
      //     file: '',
      //     note: '',
      //     date: new Date()
      //   }
      // })

    });
  }

  handleDateChange(day) {
    this.setState({ 
      ...this.state,
      form: {
        ...this.state.form,
        date: day,
      }
    });
  }

  handleFormChange(event) {
    const self = this;
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      form: {
        ...this.state.form,
        [name]: value
      }
    })
  }

  removeExpense(id) {
    const self = this;

    console.log(id);

    axios.post('/api/deleteExpense', {
      _id: id 
    })
    .then(function (response) {

      // socket.emit('deleteExpense', id);

      self.setState({
        expenses: self.state.expenses.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  componentWillUnmount() {
    this.props.setLocation('');
  }

  upsertExpense() {
    console.log("Ran")
    const self = this;
    const form = self.state.form;

    axios.post('/api/upsertExpense', {
      form
    })
    .then(function (response) {

      console.log(response.data)

      // console.log(`Should be: ${response.data.upsertedId._id}`);

      if (response.data.upsertedId == null) {

        // self.setState({
        //   expenses: self.state.expenses.filter(function( obj ) {
        //     return obj._id !== form._id;
        //   })
        // });

        self.setState({
          expenses: self.state.expenses.filter(function( obj ) {
            return obj._id !== form._id;
          })
        }, () => self.setState({
          expenses: [
            ...self.state.expenses,
            self.state.form
          ]
        }));

        // console.log(self.state.expenses.filter(function( obj ) {
        //   return obj._id !== form._id;
        // }))

      } else {
        
        self.setState({
          expenses: [
            ...self.state.expenses,
            {
              ...self.state.form,
              _id: response.data.upsertedId._id
            }
          ]
        });

      }

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    // TODO - I want to be able to do this but then the state does not update in the form, could have swore I used it this way before?
    let { amount, reason, file, note, date } = this.state;

    return (
      <div className="admin-page admin-expenses">

        <div className="side-panel">
          <div className="card">
            <div className="card-header">Details</div>
            <div className="card-body">
              <div>Payroll: 0</div>
              <div>Inventory: 0</div>
              <div>Reoccurring: 0</div>
              <div>Utilities: 0</div>
              <div>Other: 0</div>
            </div>
          </div>
        </div>

        <div className="main-panel">

          <div className="admin-side-by-side-form">

            <div className="form-group">
              <input className="form-control" type="text" name="reason" onChange={this.handleFormChange} value={this.state.form.reason} placeholder="Reason"/>
            </div>

            <div className="form-group">
              <input className="form-control" type="number" name="amount" onChange={this.handleFormChange} value={this.state.form.amount} placeholder="Amount"/>
            </div>

            <DayPickerInput 
              style={{display: 'block'}}
              onDayChange={this.handleDateChange} 
              inputProps={{className: 'form-control mb-3'}}
              value={`${formatDate(this.state.form.date)}`}
              formatDate={formatDate}
              parseDate={parseDate}
              dayPickerProps={{
                showWeekNumbers: true,
                todayButton: 'Today',
              }}
            />

            <div className="form-group">
              <textarea className="form-control" type="text" rows="5" name="note" onChange={this.handleFormChange} value={this.state.form.note} placeholder="Note"/>
            </div>

            <div className="form-group">
              <input className="form-control" type="text" name="file" onChange={this.handleFormChange} value={this.state.form.file} placeholder="File"/>
            </div>

            <div className="submit">
              <div onClick={() => this.upsertExpense()} className="btn btn-articles-light w-100">Submit</div>
            </div>

            {this.state.form._id === '' ? 
            null
            :
            <div className="submit">
              <div onClick={() => this.cancelExpense()} className="btn btn-danger w-100">Cancel</div>
            </div>
            }
            

          </div>

          <div className="table-responsive mt-4">
            <table className="table table-sm table-bordered bg-white">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Reason</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Note</th>
                  <th scope="col">File</th>
                  <th scope="col">Actions</th>
                </tr>
              </thead>
              <tbody>

                {this.state.expenses.sort( (a, b) => new Date(b.date) - new Date(a.date) ).map(expense => (

                  <tr key={expense._id}>
                    <th scope="row">{expense.reason}</th>
                    <td>${expense.amount / 100}</td>
                    <td>{moment(expense.date).format("LL")}</td>
                    <td>{expense.note}</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={expense.file}><i className="far fa-file-pdf"></i></a></td>
                    <td>
                      <div className="btn btn-sm btn-articles-light alt" onClick={() => this.loadExpense(expense._id)}>Edit</div>
                      <ConfirmDelete afterConfirm={() => this.removeExpense(expense._id)}/>
                    </td>
                  </tr>
                  
                ))}

              </tbody>
            </table>
          </div>

        </div>

      </div>
    );
  }
}

export default Donations