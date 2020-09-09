import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";

import * as ROUTES from '../../../../constants/routes';

class ReportExpenseCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
      reportsLoading: false,
      previousReports: [],

      expenses: [],
      expense_id: '',
      reason: '',
      user_id: this.props.user_id
    }

    this.handleChange = this.handleChange.bind(this);
    this.submitReport = this.submitReport.bind(this)
  }

  componentDidMount() {
    const self = this;

    self.setState({
      reportsLoading: true
    })

    axios.get('/api/getExpenseReports', {
      params: {
        user_id: this.props.user_id
      }
    })
    .then(function (response) {

      console.log(response)

      self.setState({ 
        previousReports: response.data,
        reportsLoading: false
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        // loading: false
        reportsLoading: false
      })
    });

  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  submitReport() {
    const self = this;

    axios.post('/api/upsertExpenseReport', {
      report: {
        ...this.state
      }
    })
    .then(function (response) {

      console.log(response)

      self.setState({ 
        previousReports: [
          ...self.state.previousReports,
          {
            expense_id: self.state.expense_id,
            reason: self.state.reason,
            date: moment()._d
          }
        ]
      }, () => (
        self.setState({
          _id: '',
          reason: ''
        })
      ));

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        error: true
      })
    });

  }

  render() {
    return(
      <>
      {this.props.user_id !== undefined ?
        <div className="reports-table reports-shadow chart-block">
          <div className="row">

            <div className="col-12 col-md-12">

              <h5>Previous Reports</h5>
              <p>Any updates to reported items you may have reported will apprear here.</p>

              <hr/>

              {this.state.reportsLoading ? 
              <div>Loading...</div>
              :
              ''
              }

              {this.state.reportsLoading === true ?
               '' 
               : 
               this.state.previousReports.length < 1 ? 
                <p className="mb-0"><b>No reported items to display</b></p>
                :
                <table className="table articles-table table-sm table-hover table-bordered">
                  <thead>
                    <tr className="table-articles-head">
                      <th>DATE</th>
                      <th>ID</th>
                      <th>ACTIONS</th>
                    </tr>
                  </thead>
                  {
                    this.state.previousReports.map((report) => (
                      <ReportExpenseRow 
                        key={report._id || report.date}
                        report={report}
                      />
                    ))
                  }
                </table>
              }

            </div>
 
          </div>

        </div>
        :
        null
        }

        <div className="reports-table reports-shadow chart-block">

          <div className="row">

            <div className="col-12 col-md-12">

              <h5>Report An Expense</h5>
              <p>If you have any concerns, recommendations, or problems with a charge feel free to voice them below.</p>
              
              {this.props.user_id !== undefined ? 
              <>

                <div className="form-group">
                  <label for="newsType">Expense:</label>

                  <select className="form-control" name="expense_id" disabled={this.state.editLoading ? 'disabled' : ''} id="expense_id" value={this.state.expense_id} onChange={this.handleChange}>
                    <option value={''}>Choose One</option>
                    {this.props.expenses.map((expense) => (
                      <option key={expense._id} value={expense._id}>{moment(expense.date).format("LL")} - {expense.reason} - ${expense.amount / 100}</option>
                    ))}
                  </select>

                </div>

                <div className="form-group">
                  <label for="newsType">Concern, Recommendation, or Problem:</label>
                  <textarea className="d-block w-100 p-2" name="reason" id="reason" onChange={this.handleChange} rows="10"></textarea>
                </div>

                <div className="pb-3 d-flex justify-content-end">
                  <button onClick={() => this.submitReport()} className="btn btn-articles-light" disabled={this.state.reason === '' || this.state.expense_id === '' ? true : false}>Submit</button>
                </div>

              </>
              :
              <>
              <div className="signin-notice">You must be signed in to report an expense.</div>
              <Link to={ROUTES.SIGN_IN}><div className="btn btn-articles-light mt-2 w-100 mx-auto">Sign In</div></Link>
              </>
              }

            </div>

          </div>

        </div>
      </>
    )
  }
}

class ReportExpenseRow extends Component {
  constructor(props) {
    super(props);

    this.state = {
      expanded: false
    }

  }

  componentDidMount() {

  }

  render() {
    return(
      <>
        <tr>
          <td>{moment(this.props.report.date).format("LL")}</td>
          <td>{this.props.report.expense_id}</td>

          {this.state.expanded !== true ? 
          <td onClick={() => this.setState({expanded: !this.state.expanded})} className="link badge badge-dark noselect" style={{cursor: 'pointer'}}>Click to Expand</td>
          :
          <td onClick={() => this.setState({expanded: !this.state.expanded})} className="link badge badge-light border noselect" style={{cursor: 'pointer'}}>Click to Collapse</td>
          }

        </tr>

        <tr className={(this.state.expanded ? '' : 'd-none')}>
          <td colSpan="3">
            <div>Reason:</div>
            <div>{this.props.report.reason}</div>
          </td>
        </tr>
      </>
    )
  }
}

export default ReportExpenseCards;