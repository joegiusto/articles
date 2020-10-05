import React, { Component } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";

import { ConfirmDelete } from '../../../Global'
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
    this.submitReport = this.submitReport.bind(this);
    this.deleteReport = this.deleteReport.bind(this)
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
            _id: response.data.upsertedId._id,
            expense_id: self.state.expense_id,
            reason: self.state.reason,
            date: moment()._d
          }
        ]
      }, () => (
        self.setState({
          _id: '',
          reason: '',
          expense_id: ''
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

  deleteReport(id) {
    const self = this;

    console.log(this.state.previousReports)
    
    console.log(`Delete ${id}`);

    axios.post('/api/deleteReport', {
      _id: id
    })
    .then(function (response) {

      console.log(response)

      self.setState({
        previousReports: self.state.previousReports.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {

      console.log(error);

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
              <p>Any updates to reported items you may have reported will appear here.</p>

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
                      <th>Date</th>
                      <th>Id</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  {
                    this.state.previousReports.map((report) => (
                      <ReportExpenseRow 
                        key={report._id || report.date}
                        report={report}
                        deleteReport={this.deleteReport}
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
                  <textarea className="d-block w-100 p-2" name="reason" id="reason" onChange={this.handleChange} value={this.state.reason} rows="10"></textarea>
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

          <td>{this.props.report._id}</td>

          <td>{this.props.report.responses?.length > 0 ? 'Response' : 'No Response'}</td>

          <td className="">

            {this.state.expanded !== true ? 
              <button onClick={ () => this.setState({expanded: !this.state.expanded}) } className="link badge badge-dark noselect">Expand</button>
              :
              <button onClick={ () => this.setState({expanded: !this.state.expanded}) } className="link badge badge-light border noselect">Collapse</button>
            }

            <ConfirmDelete className={"link"} afterConfirm={() => this.props.deleteReport(this.props.report._id)}/>

          </td>          

        </tr>

        <tr className={(this.state.expanded ? '' : 'd-none')}>
          <td colSpan="4">

            <div>Concern, Recommendation, or Problem:</div>
            <div className="border border-dark p-2">{this.props.report.reason}</div>

            <div className="mt-2">Response:</div>

            <div>
              {this.props.report.responses?.length > 0 ? 
              this.props.report.responses.map(response => 
                <div className="border border-dark p-2">
                  <div className="date">{response.date}</div>
                  <div className="response-text">{response.response}</div>
                </div>  
              )
              : 
              <div className="border border-dark p-2">
                No Response yet, check back soon
              </div>
              }
            </div>

          </td>
        </tr>
      </>
    )
  }
}

export default ReportExpenseCards;