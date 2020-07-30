import React, { useState } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
// import { DateRangePicker } from 'react-dates';
import { Link, Switch, Route, matchPath } from "react-router-dom";
import { withFirebase } from '../Firebase'; 
import { employeeList, sales, donations, expenses } from "../../sample_data/sampleData";

import * as ROUTES from '../../constants/routes';

import axios from 'axios';

import {ClothingTable} from "./table.js"
import moment from 'moment';
import Chart from 'chart.js';
import Component from 'react-live-clock/lib/Component';
import socketIOClient from 'socket.io-client'
import EmployeePage from '../Employees';
import EmployeeDetailsPage from '../Employees/Directory'

const ENDPOINT = "/";
let socket = ''

class Reports extends Component {
  constructor(props) {
    super(props);

     this.state = {
       searchText: '',
       loading: false,
       limit: 5,
       menuExpanded: false,
       tableSelector: 'donations',
       subtableSelector: '',
       chartPeriodSelector: '1y',

       firebaseData: {
        expenses: {
          other: [],
          payroll: [],
        },
        revenue: {
          clothing: [],
          donations: [],
        },
       },

       totals: {
         expenses: 0,
         clothing: 0,
         donations: 0,
       },

     };

     this.setChartPeriodSelector = this.setChartPeriodSelector.bind(this);
  }

  componentDidMount() {
    const self = this;
    
    socket = socketIOClient(ENDPOINT);

    socket.on('online', function(msg){
      console.log(msg)
    });

    socket.on('recieveDonation', function(msg){
      console.log(JSON.stringify(msg));

      // msg.amount = parseInt(msg.amount);

      self.setState({
        firebaseData: {
          ...self.state.firebaseData,
          revenue: {
            ...self.state.firebaseData.revenue,
            donations: [
              ...self.state.firebaseData.revenue.donations,
              msg
            ]
          }
        }
      })
    });

    socket.on('deleteDonation', function(id){

      self.setState({
        firebaseData: {
          ...self.state.firebaseData,
          revenue: {
            ...self.state.firebaseData.revenue,
            donations: self.state.firebaseData.revenue.donations.filter(function( obj ) {
              return obj._id !== id;
            })
          }
        }
      })
    });

    socket.on('recieveExpense', function(msg){
      console.log(JSON.stringify(msg));

      self.setState({
        firebaseData: {
          ...self.state.firebaseData,
          expenses: {
            ...self.state.firebaseData.expenses,
            other: [
              ...self.state.firebaseData.expenses.other,
              msg
            ]
          }
        }
      })
    });

    socket.on('adminMessage', function(msg){
      console.log(`Admin Message: ${msg}`);
    });

    // axios.get('/api/getOrders')
    // .then(function (response) {

    //   console.log(response);

    //   self.setState({
    //     firebaseData: {
    //       ...self.state.firebaseData,
    //       revenue: {
    //         ...self.state.firebaseData.revenue,
    //         orders: response.data.orders
    //       },
    //     },
    //   });

    // })
    // .catch(function (error) {
    //   console.log(error);

    //   self.setState({
    //     products: [],
    //   })
    // });

    axios.get('/api/getExpenses')
    .then(function (response) {

      console.log(response);

      self.setState({
        firebaseData: {
          ...self.state.firebaseData,
          expenses: {
            ...self.state.firebaseData.expenses,
            other: response.data
          },
        },
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        products: [],
      })
    });

    axios.get('/api/getRevenue')
    .then(function (response) {

      self.setState({
        firebaseData: {
          ...self.state.firebaseData,
          revenue: {
            ...self.state.firebaseData.revenue,
            donations: response.data.donations
          },
        },
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        products: [],
      })
    });
  }

  getSnapshotBeforeUpdate(prevProps, prevState) {

    if (prevState.firebaseData.revenue.donations !== this.state.firebaseData.revenue.donations ) {
      console.log("New math needed!");

      var total = 0;

      for (var i=0; i<this.state.firebaseData.revenue.donations.length; i++) {
        total += parseInt(this.state.firebaseData.revenue.donations[i].amount);
      }

      this.setState({totals: {
        ...this.state.totals,
        donations: total
      }});

    }

    if (prevState.firebaseData.expenses.other !== this.state.firebaseData.expenses.other ) {

      var total = 0;

      for (var i=0; i<this.state.firebaseData.expenses.other.length; i++) {
        total += this.state.firebaseData.expenses.other[i].amount;
      }

      this.setState({totals: {
        ...this.state.totals,
        expenses: total
      }})

    }
  }

  componentWillUnmount() {
    socket.disconnect();
    this.props.firebase.donations().off();
    this.props.firebase.expenses().off();
  }

  setChartPeriodSelector(newChartPeriod) {
    this.setState({
      chartPeriodSelector: newChartPeriod
    })
  }

  setTableSelector(newSelector) {
  this.setState({
    tableSelector: newSelector,
    subtableSelector: ''
  });

  switch(newSelector) {
    case 'clothing':
      this.setState({
        subtableSelector: 'clothing-all'
      });
      break;
    case 'expenses':
      this.setState({
        subtableSelector: 'expenses-all'
      });
      break;
    case 'revenue':
      this.setState({
        subtableSelector: 'revenue-all'
      });
      break;
    default:
      // code block
  };

 }

  getTableComponent(tableSelector, subtableSelector) {
    switch(tableSelector) {
      case 'donations':
        return(<DonationTable firebaseData={this.state.firebaseData} fetch="donations"/>)
      case 'clothing':
        switch (subtableSelector) {
          case 'clothing-all':
            return(<ClothingTable/>)
          case 'clothing-preorders':
            return(<PreorderTable/>)
          default:
            return(<ClothingTable/>)
        }
      case 'expenses':
        return(<DonationTable firebaseData={this.state.firebaseData} fetch="expenses"/>)
      case 'payroll':
        return(<PayrollTable/>)
      case 'revenue':
        return(<DonationTable firebaseData={this.state.firebaseData} fetch="expenses"/>)
      default:
        // Useless because tableSelector state always starts at something
    };
  }

  setSubTableSelector(newSelector, redirect, location) {
    if ( redirect === true ) {
      console.log("Is a redirect");
      this.setTableSelector(location.tableSelector);
    } else {
      console.log("Is not a redirect");
      this.setState({
        subtableSelector:  newSelector
      });
    }
  }

  tableSelectorChoice(dataValue) {
    return(
      <div onClick={() => this.setTableSelector(dataValue)} className={"selection d-inline-block " + (this.state.tableSelector === dataValue ? 'selection-active' : '')}>{dataValue}</div>
    )
  }

  subTableSelectorChoice(dataValue, printValue, redirect, location) {
    return(
      <span onClick={() => this.setSubTableSelector(dataValue, redirect, location)} className={"selection " + (this.state.subtableSelector === dataValue ? 'selection-active' : '')}>{redirect ? <i style={{marginRight: '2.5px'}} className="fas fa-link"></i> : ''}{printValue}</span>
    )
  }

  filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
 
 render(props) {
   return (
    <div className="reports-page">

      <Helmet>
        <title>Reports - Articles</title>
      </Helmet>

      <div className="fixed-total dual-header">
        <span className="help">Help <i className="far fa-question-circle"></i></span>
        <span className="total">+${((this.state.totals.donations - this.state.totals.expenses) / 100 ).toFixed(2)}</span>
      </div>

      <div className="fixed-componsation-50"></div>

      <div className="container home-container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-4 col-lg-4">

            <div className="reports-side-menu">

              <div className="static-wrapper">

                <Route exact path={ROUTES.REPORTS} render={() => 
                  <div className="live">
                    <span className="recording-dot d-inline-block"></span>
                    <span>Live</span>
                  </div>
                }/>
    
                <div id='info' className={"info " + (this.state.menuExpanded ? 'expanded' : '')}>
    
                  <div className="normal">
                    <div className="px-2 pt-4">
    
                      <div>Current Balance:</div>
                      <h2>${((this.state.totals.donations - this.state.totals.expenses) / 100 ).toFixed(2)}</h2>
    
                      <div className="time-container">
                        <div className="progress">
                          <div className="progress-bar bg-rev" role="progressbar" style={{width: (this.state.totals.donations / ((this.state.totals.donations + this.state.totals.expenses) / 100) ).toFixed(0) +"%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100">{( this.state.totals.donations / ((this.state.totals.donations + this.state.totals.expenses) / 100) ).toFixed(0)}%</div>
                          <div className="progress-bar bg-danger" role="progressbar" style={{width: (this.state.totals.expenses / ((this.state.totals.donations + this.state.totals.expenses) / 100) ).toFixed(0) + "%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{( this.state.totals.expenses / ((this.state.totals.donations + this.state.totals.expenses) / 100) ).toFixed(0)}%</div>
                        </div>
      
                        <div className="text-muted">Revenue | Expenses</div>
      
                        <div className="mt-4">
      
                          <div className="row">
      
                            <div className="col-12 col-xl-6 pr-xl-1">
                              <div className="snippet positive">
                              Revenue: ${this.state.totals.donations / 100}
                              </div>
                            </div>
      
                            <div className="col-12 col-xl-6 pl-xl-1">
                              <div className="snippet negative">
                              Expenses: -${this.state.totals.expenses / 100}
                              </div>
                            </div>
      
                          </div>
      
                        </div>
                      </div>
    
                    </div>
                  </div>
    
                </div>
              </div>

              <div className="mt-3">
                <Link to={ROUTES.REPORTS}>
                  <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (this.props.location.pathname === ROUTES.REPORTS ? 'active' : null)}>
                    <div>
                      <i class="fas fa-paste" aria-hidden="true"></i>
                      <span>Reports</span>
                    </div>
                  </button>
                </Link>
              </div>

              <div className="mt-3">
                <Link to={ROUTES.REPORTS_CHARTS}>
                  <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (this.props.location.pathname === ROUTES.REPORTS_CHARTS ? 'active' : null)}>
                    <div>
                      <i className="fas fa-chart-line"></i>
                      <span>Data Charts</span>
                    </div>
                  </button>
                </Link>
              </div>
  
              <div className="mt-3">
                <Link to={ROUTES.REPORTS_REPORT}>
                  <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (this.props.location.pathname === ROUTES.REPORTS_REPORT ? 'active' : null)}>
                    <div>
                      <i className="fas fa-flag"></i>
                      <span>Report Expense</span>
                    </div>
                  </button>
                </Link>
              </div>

              <div className="mt-3">
                <Link to={ROUTES.EMPLOYEES}>
                  <button className={"btn btn-articles-light btn-lg w-100 report-quick-links" + (this.props.location.pathname === ROUTES.EMPLOYEES ? ' active' : '') + (matchPath(this.props.location.pathname, ROUTES.EMPLOYEES_DETAILS) ? ' active' : '')}>
                    <div>
                      <i class="fas fa-paste" aria-hidden="true"></i>
                      <span>Employee Data</span>
                    </div>
                  </button>
                </Link>
              </div>

              {/* <div className="mt-3"> */}
                {/* <div className="badge badge-light border border-black other-tag mt-3 mx-auto d-none d-md-block">Or Check Out</div> */}
              {/* </div> */}
  
              {/* <div className="d-none d-md-block mt-3">
                <Link to={ROUTES.EMPLOYEES}><button className="btn btn-articles-light btn-lg w-100 report-quick-links">
                  <div>
                    <i className="fas fa-user-tie"></i>
                    <span>Employee Data</span>
                  </div>
                </button></Link>
              </div> */}
  
              {/* <div className="d-none d-md-block mt-3">
                <Link to={ROUTES.DONATE}>
                  <button className="btn btn-articles-light btn-lg w-100 mb-3 report-quick-links">
                    <div>
                      <i className="fas fa-money-bill"></i>
                      <span>Donate</span>
                    </div>
                  </button>
                </Link>
              </div> */}

            </div>
            
          </div>
  
          <Switch>

            <Route exact={true} path={ROUTES.REPORTS} render={() => 
              <div className="col-12 col-md-8 col-lg-8">

                <div className="search reports-shadow">
                  
                  <div className="input-wrap dual-header">
                    
                    <div className="icon">
                      <i className="fas fa-search-dollar d-flex align-items-center fa-2x h-100 "></i>
                    </div>

                    <div className="dropdown-wrap">

                      <input 
                      className="search-input d-flex align-content-center pl-2" 
                      type="text" 
                      placeholder="Search service is currently limited"
                      value={this.state.searchText}
                      name="searchText"
                      onChange={this.onChange} 
                      />

                      <div className="results-wrap">
                      {
                        this.state.searchText !== '' ?

                        this.filterByValue(this.state.firebaseData.expenses.other, this.state.searchText).map((item, i) => (
                        <div className="result">
                          <div>{item.reason} - ${(item.amount / 100).toFixed(2)}</div>
                          <div>{moment(item.date).format("LL")}</div>
                        </div>
                        ))

                        :

                        null

                      }
                      </div>

                    </div>

                  </div>

                  

                </div>

                <div className="reports-table reports-shadow">
                  <div className="table-selector">
          
                    <div className="main">
                      {this.tableSelectorChoice('donations')}
                      {this.tableSelectorChoice('clothing')}
                      {this.tableSelectorChoice('payroll')}
                      {this.tableSelectorChoice('revenue')}
                      {this.tableSelectorChoice('expenses')}
                    </div>
      
                    <div className={"sub sub-donations " + (this.state.tableSelector === 'donations' ? '' : 'd-none')}>
                      {/* For the future */}
                    </div>
      
                    <div className={"sub sub-clothing dual-header " + (this.state.tableSelector === 'clothing' ? '' : 'd-none')}>
                      <div>
                        {this.subTableSelectorChoice('clothing-all', 'all')}
                        {this.subTableSelectorChoice('clothing-originals', 'originals')}
                        {this.subTableSelectorChoice('clothing-partnerships', 'partnerships')}
                        {this.subTableSelectorChoice('clothing-submissions', 'submissions')}
                        {this.subTableSelectorChoice('clothing-sponsored', 'sponsored')}
                      </div>
                      <div>
                        {this.subTableSelectorChoice('clothing-preorders', 'preorders')}
                      </div>
                    </div>
          
                    <div className={"sub sub-expenses " + (this.state.tableSelector === 'expenses' ? '' : 'd-none')}>
                      {this.subTableSelectorChoice('expenses-all', 'all')}
                      {this.subTableSelectorChoice('expenses-payroll', 'payroll', true, {tableSelector: 'payroll'})}
                      {this.subTableSelectorChoice('expenses-production-inventory', 'inventory')}
                      {this.subTableSelectorChoice('expenses-reoccuring', 'reoccuring')}
                      {this.subTableSelectorChoice('expenses-utilities', 'utilities')}
                      {this.subTableSelectorChoice('expenses-other', 'other')}
                    </div>
          
                    <div className={"sub sub-payroll " + (this.state.tableSelector === 'payroll' ? '' : 'd-none')}>
                      {/* For the future */}
                    </div>
          
                    <div className={"sub sub-revenue " + (this.state.tableSelector === 'revenue' ? '' : 'd-none')}>
                      {this.subTableSelectorChoice('revenue-all', 'all')}
                      {this.subTableSelectorChoice('revenue-donations', 'donations', true, {tableSelector: 'donations'})}
                      {this.subTableSelectorChoice('revenue-clothing', 'clothing', true, {tableSelector: 'clothing'})}
                      {this.subTableSelectorChoice('revenue-grants', 'grants')}
                      {this.subTableSelectorChoice('revenue-ads', 'ads')}
                      {this.subTableSelectorChoice('revenue-sponsorships', 'sponsorships')}
                    </div>
          
                  </div>
          
                  {this.getTableComponent(this.state.tableSelector, this.state.subtableSelector)}

                </div>

              </div>
            }/>

            <Route path={ROUTES.REPORTS_CHARTS} render={() => 
              <div className="col-12 col-md-8 col-lg-8">
                <DataCharts data={this.state.firebaseData.revenue.donations} setChartPeriodSelector={this.setChartPeriodSelector} chartPeriodSelector={this.state.chartPeriodSelector}></DataCharts>
              </div>
            }/>

            <Route path={ROUTES.REPORTS_REPORT} render={() => 
              <div className="col-12 col-md-8 col-lg-8">

                <Link to={ROUTES.REPORTS}>
                  <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1">
                    <i class="far fa-hand-point-left"></i>
                    <span>Back to Reports</span>
                  </div>
                </Link>

                <div className="alert alert-warning border mt-3">Warning: We are working on ways to make this section more transparent with our users, such as number of reports and ways to agree with other peoples reports. Data is saved for Admins to look at for now.</div>

                <ReportExpenseCards 
                  expenses={this.state.firebaseData.expenses.other}
                  user_id={this.props.user_id}
                />

              </div>
            }/>

            <Route exact path={ROUTES.EMPLOYEES} render={() => 
              <div className="col-12 col-md-8 col-lg-8">

                <Link to={ROUTES.REPORTS}>
                  <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1">
                    <i class="far fa-hand-point-left"></i>
                    <span>Back to Reports</span>
                  </div>
                </Link>

                <div className="alert alert-danger border mt-3">Warning: This section is still in development and will not be ready unitll <b>August 8th 2020</b></div>

                <EmployeePage></EmployeePage>

              </div>
            }/>

            <Route exact path={ROUTES.EMPLOYEES_DETAILS} render={() => 
              <div className="col-12 col-md-8 col-lg-8">

                <Link to={ROUTES.REPORTS}>
                  {/* <div className="border d-inline-block"> */}
                    <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1">
                      <i class="far fa-hand-point-left"></i>
                      <span>Back to Reports</span>
                    </div>
                  {/* </div> */}
                </Link>

                <EmployeeDetailsPage match={this.props.match}></EmployeeDetailsPage>

              </div>
            }/>

          </Switch>

        </div>

      </div>
    </div>
   )
  }
}

class ReportExpenseCards extends Component {
  constructor(props) {
    super(props);

    this.state = {
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

    axios.get('/api/getExpenseReports', {
      params: {
        user_id: this.props.user_id
      }
    })
    .then(function (response) {

      console.log(response)

      self.setState({ 
        previousReports: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        loading: false
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

              {this.state.previousReports.length < 1 ? 
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

class DataCharts extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartRevenueExpense: 'chartRevenueExpense',
      chartPayroleExpenses: 'chartPayroleExpenses',
      chartEmployeeAdmin: 'chartEmployeeAdmin',
      chartNewYorkEmployeeOurEmployee: 'chartNewYorkEmployeeOurEmployee',
      expandSource: false,
      julyTotal: 0
    };
  }

  componentDidMount() {

    const years = (back) => {
      const year = new Date().getFullYear();
      return Array.from({length: back}, (v, i) => year - back + i + 1);
    }

    var vsPayroleExpenses = document.getElementById(this.state.chartPayroleExpenses);

    new Chart(vsPayroleExpenses, {
        type: 'pie',
        data: {
          labels: [ 'Expenses', 'Payrole' ],
          datasets: [
            {
              label: '$ in Donations',
              data: [31.22, 0],
              backgroundColor: [
                'rgba(63, 191, 127, 0.2)',
                'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                'rgba(63, 191, 127, 1)',
                'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 1,
              lineTension: 0.1,
            }
          ]
        },
        options: {
          // scales: {
          //     yAxes: [{
          //       ticks: {
          //         fontFamily: "brandon-grotesque",
          //         beginAtZero: true
          //       }
          //     }],
          //     xAxes: [{
          //       gridLines: {
          //         display: false
          //       },
          //       ticks: {
          //         fontFamily: "brandon-grotesque",
          //       }
          //     }]
          // }
        }
    });

    var vsCeoEmployee = document.getElementById(this.state.chartEmployeeAdmin);

    new Chart(vsCeoEmployee, {
        type: 'line',
        data: {
          labels: [ 'July', 'August', 'September', 'October', 'November', 'December', 'January', 'Febuary', 'March', 'April', 'May', 'June' ],
          datasets: [
            {
              label: 'CEO Pay',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: [
                'rgba(63, 191, 127, 0.2)'
              ],
              borderColor: [
                'rgba(63, 191, 127, 1)'
              ],
              pointBackgroundColor: 'rgba(63, 191, 127, 1)',
              pointBorderColor: 'rgba(63, 191, 127, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: 'Average Employee Pay',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: [
                  'rgba(226, 167, 89, 0.2)'
              ],
              borderColor: [
                'rgba(226, 167, 89, 1)'
              ],
              borderWidth: 2,
              lineTension: 0.1,
            },
            {
              label: 'Lowest Paid Employee',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              lineTension: 0.1,
            }
          ]
        },
        options: {
            scales: {
                yAxes: [{
                  ticks: {
                    fontFamily: "brandon-grotesque",
                    beginAtZero: true,
                    min: 0,
                    max: 100000,
                    callback: function(value, index, values) {return  '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  }
                }],
                xAxes: [{
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    fontFamily: "brandon-grotesque",
                  }
                }]
            }
        }
    });

    var chartNewYorkEmployeeOurEmployee = document.getElementById(this.state.chartNewYorkEmployeeOurEmployee);

    new Chart(chartNewYorkEmployeeOurEmployee, {
        type: 'line',
        data: {
          labels: [ ...years(10) ],
          datasets: [
            {
              label: 'Median New York Income',
              data: [64894, 62909, 0, 0, 0, 0, 58,878, 60,850, 62,909, 64894],
              backgroundColor: [
                'rgba(63, 191, 127, 0.2)'
              ],
              borderColor: [
                'rgba(63, 191, 127, 1)'
              ],
              pointBackgroundColor: 'rgba(63, 191, 127, 1)',
              pointBorderColor: 'rgba(63, 191, 127, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: 'Median New York Income With College',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: [
                  'rgba(226, 167, 89, 0.2)'
              ],
              borderColor: [
                'rgba(226, 167, 89, 1)'
              ],
              borderWidth: 2,
              lineTension: 0.1,
            },
            {
              label: 'Median Articles Employee Income',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)'
              ],
              borderWidth: 2,
              lineTension: 0.1,
            }
          ]
        },
        options: {
            scales: {
                yAxes: [{
                  ticks: {
                    fontFamily: "brandon-grotesque",
                    beginAtZero: true,
                    min: 0,
                    max: 100000,
                    callback: function(value, index, values) {return  '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",")}
                  }
                }],
                xAxes: [{
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    fontFamily: "brandon-grotesque",
                  }
                }]
            }
        }
    });
  }

  componentDidUpdate(prevProps, prevState, snapshot) {

    console.log("Update");

    // function sum(key) {
    //   return this.reduce((a, b) => a + (b[key] || 0), 0);
    // }

    if (prevProps.data !== this.props.data) {

      var months = [];
      var totals = [];
      var realTotals = [];

      // let i;

      for (let i = 0; i < 12; i++) {
        months.push(moment().subtract(i, 'months').format('MMM'))

        var temp = this.props.data.filter((item) => {
          return moment(item.date).isSame(moment().subtract(i, 'months'), 'month');
        })

        // temp = temp.map((item) => {
        //   return item / 100
        // })

        totals.push(temp.reduce((a, b) => a + (b['amount'] || 0), 0))

        realTotals = totals.map(function(item) {return item / 100})

      }

      this.setState({
        monthTotals: realTotals,
      }, () => {

        if (this.state.monthTotals.length !== 0) {

          // console.log(`Not equal to zero at ${this.state.julyTotal}`)

          var vsReveneueExpense = document.getElementById(this.state.chartRevenueExpense);

          new Chart(vsReveneueExpense, {
              type: 'line',
              data: {
                  labels: [ ...months.reverse() ],
                  datasets: [{
                      label: 'Donations',
                      data: [...this.state.monthTotals.reverse()],
                      backgroundColor: [
                        'rgba(63, 191, 127, 0.2)'
                      ],
                      borderColor: [
                        'rgba(63, 191, 127, 1)'
                      ],
                      pointBackgroundColor: 'rgba(63, 191, 127, 1)',
                      pointBorderColor: 'rgba(63, 191, 127, 1)',
                      borderWidth: 1,
                      lineTension: 0.1,
                  },
                  {
                    label: 'Expenses',
                    data: [10.66, 0, 12.97, 0, 0, 0, 0, 0, 0, 0, 0, 7.59],
                    backgroundColor: [
                        'rgba(255, 99, 132, 0.2)'
                    ],
                    borderColor: [
                        'rgba(255, 99, 132, 1)'
                    ],
                    pointBackgroundColor: 'rgba(255, 99, 132, 0.2)',
                    pointBorderColor: 'rgba(255, 99, 132, 1)',
                    borderWidth: 2,
                    lineTension: 0.1,
                }]
              },
              options: {
                  scales: {
                      yAxes: [{
                        ticks: {
                          fontFamily: "brandon-grotesque",
                          beginAtZero: true,
                        }
                      }],
                      xAxes: [{
                        gridLines: {
                          display: false
                        },
                        ticks: {
                          fontFamily: "brandon-grotesque",
                        }
                      }]
                  }
              }
          });
        }

      })

    }
  }

  changeExpandSource(state) {
    this.setState({
      expandSource: state
    })
  }

  render(props) {
    return (
      <div className="chart-component">

        <Link to={ROUTES.REPORTS}>
          {/* <div className="border d-inline-block"> */}
            <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1">
              <i class="far fa-hand-point-left"></i>
              <span>Back to Reports</span>
            </div>
          {/* </div> */}
        </Link>

        <div className="alert alert-danger border mt-3">Warning: This section is still in development and will not be ready unitll <b>August 8th 2020</b></div>

        <div className="chart-blocks">
          <div className="chart-block">
            <h5>Revenue vs Expenses</h5>
            <p>How much we are spending a month compared to how much we are making.</p>
  
            <ChartBlockTimeFrame setChartPeriodSelector={this.props.setChartPeriodSelector} chartPeriodSelector={this.props.chartPeriodSelector} />
  
            <canvas className='chart mb-3 bg-white' id={this.state.chartRevenueExpense} width="100%" height="45px"></canvas>
          </div>
  
          <div className="chart-block">
            <h5>Payrole Comparison</h5>
            <p>The amount of money being spent on payrole compared to expenses.</p>
  
            <ChartBlockTimeFrame setChartPeriodSelector={this.props.setChartPeriodSelector} chartPeriodSelector={this.props.chartPeriodSelector} />
  
            <canvas className='chart mb-3 bg-white' id={this.state.chartPayroleExpenses} width="100%" height="45px"></canvas>
            {/* <div className="badge badge-info mt-3">No Chart Added Yet</div> */}
          </div>
  
          <div className="chart-block">
            <h5>Median USA Income vs Our Employees</h5>
            <p>The amount of money being spent on payrole compared to revenues and expenses.</p>
  
            {/* <ChartBlockTimeFrame setChartPeriodSelector={this.props.setChartPeriodSelector} chartPeriodSelector={this.props.chartPeriodSelector} /> */}
            <span className="badge badge-dark">10 Years</span>
  
            {/* <canvas className='chart mb-3 bg-white' id={this.state.chartTitle} width="100%" height="45px"></canvas> */}
            <canvas className='chart mb-3 bg-white' id={this.state.chartNewYorkEmployeeOurEmployee} width="100%" height="45px"></canvas>
            <div onClick={() => this.changeExpandSource(!this.state.expandSource)} className="btn btn-articles-light mb-2">
              {this.state.expandSource ? 
              <i class="fas fa-caret-square-up"></i>
              :
              <i class="fas fa-caret-square-down"></i>
              }
              
              Expand Source Info
              </div>

            <div className={"source-info " + (this.state.expandSource ? "show" : null)}>
              <hr/>
              <div>Information sourced from the following:</div>
              <div className="sources">
                <ul className="mb-0">
                  <li>Link</li>
                  <li>Link</li>
                  <li>Static Image</li>
                  <li>Static Image</li>
                </ul>
              </div>
            </div>

          </div>
  
          <div className="chart-block">
            <h5>Employee to CEO Pay Diffrence</h5>
            <p>The % of employee worth to CEO pay. (Lowest Paid Employee, Median Employee Pay, Top Employee pay)</p>
  
            <ChartBlockTimeFrame setChartPeriodSelector={this.props.setChartPeriodSelector} chartPeriodSelector={this.props.chartPeriodSelector} />
  
            <canvas className='chart mb-3 bg-white' id={this.state.chartEmployeeAdmin} width="100%" height="45px"></canvas>
            {/* <div className="badge badge-info mt-3">No Chart Added Yet</div> */}
          </div>
        </div>

      </div>
    )
  }

}

function ChartBlockTimeFrame (props) {
  return (
    <div className="scale">
      <span onClick={() => props.setChartPeriodSelector('1y')} className={"badge border mr-1 " + (props.chartPeriodSelector === "1y" ? 'badge-dark' : 'badge-light')}>1 Year</span>
      <span onClick={() => props.setChartPeriodSelector('6m')} className={"badge border mr-1 " + (props.chartPeriodSelector === "6m" ? 'badge-dark' : 'badge-light')}>6 Months</span>
      <span onClick={() => props.setChartPeriodSelector('1m')} className={"badge border mr-1 " + (props.chartPeriodSelector === "1m" ? 'badge-dark' : 'badge-light')}>1 Month</span>
      <span onClick={() => props.setChartPeriodSelector('1w')} className={"badge border " + (props.chartPeriodSelector === "1w" ? 'badge-dark' : 'badge-light')}>1 Week</span>
    </div>
  )
}

function RevenueTable () {
  return (
    <table className="table table-sm table-hover mt-2">
      <thead className="thead-dark">
        <tr>
          <th scope='col'>Type</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">Donation</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">Donation</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">Clothing</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">Clothing</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">Clothing</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">Grant</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
  )
}

function PreorderTable () {
  return (
    <>
    <div className="full-table">
      <table className='table articles-table table-bordered'>
        <thead>
          <tr className="table-articles-head">
            <th scope="col">Date</th>
            <th scope="col">Name</th>
            <th scope="col">Order Summary</th>
            <th className='text-right' scope="col">Total</th>
          </tr>
        </thead>
        <tbody>

          {sales.map((object, i) =>

            <tr key={i} className="bg-light">
              <td>{object.date || 'test'}</td>
              <td>{object.name}</td>
              <td>{object.note}</td>
              <td className='text-right'>${object.total.toFixed(2)}</td>
            </tr>

          )}

          <tr>
            <td colSpan="2" className="border-right-0 table-articles-head">

                <div className="results-dual-header">

                  {/* <div className="page noselect">
                    <i className="fas fa-chevron-circle-left"></i>
                    Page 0/0
                    <i style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                  </div> */}
                
                  {/* <span className="results noselect">
                    <span>Results:</span>
                    <span className={"result result-active"}>10</span>
                    <span className={"result"}>50</span>
                    <span className={"result"}>100</span>
                    <span className={"result"}>250</span>
                  </span> */}

                </div>

            </td>

            <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
            <td colSpan="1" className="border-left-0 table-articles-head">$180.00</td>
          </tr>

        </tbody>

      </table>
    </div>

    <div style={{paddingBottom: '0.25rem'}}>
      <div className="alert alert-warning pl-2 pb-2 m-2">Preorder and unfinalized sales are not included in any reports.</div>
    </div>

    </>
  )
}

function PayrollTable () {
  return (
    <div>
      <table className='table articles-table table-sm table-bordered'>
        <thead>
          <tr className="table-articles-head">
            <th scope="col">Name</th>
            <th scope="col">Role</th>
            <th scope="col">Total</th>
            {/* <th className='text-right' scope="col">Total</th> */}
          </tr>
        </thead>
        <tbody>

          {/* {sales.map((object, i) =>

            <tr key={i} className="bg-light">
              <td>{object.date || 'test'}</td>
              <td>{object.name}</td>
              <td>{object.note}</td>
              <td className='text-right'>${object.total.toFixed(2)}</td>
            </tr>

          )} */}

          <tr>
            <th scope="row"><Link to={ROUTES.EMPLOYEES + '/5e90cc96579a17440c5d7d52'}>Joey Giusto</Link></th>
            <td>Admin</td>
            <td>$0.00</td>
          </tr>

          <tr>
            <td colSpan="1" className="border-right-0 table-articles-head">

                <div className="results-dual-header">

                  {/* <div className="page noselect">
                    <i className="fas fa-chevron-circle-left"></i>
                    Page 0/0
                    <i style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                  </div> */}
                
                  {/* <span className="results noselect">
                    <span>Results:</span>
                    <span className={"result result-active"}>10</span>
                    <span className={"result"}>50</span>
                    <span className={"result"}>100</span>
                    <span className={"result"}>250</span>
                  </span> */}

                </div>

            </td>

            <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
            <td colSpan="1" className="border-left-0 table-articles-head">$0.00</td>
          </tr>

        </tbody>

      </table>
    </div>
  )
}

class DonationTableBase extends Component {
   constructor(props) {
     super(props);

      this.state = {
        text: '',
        loading: false,
        donationsFirebase: [],
        expensesFirebase: [],
        limit: 10,
        page: 1,
      };
      this.changeLimit = this.changeLimit.bind(this);
      this.changePage = this.changePage.bind(this);
   }

  componentWillUnmount() {
    this.props.firebase.donations().off();
  }

  changeLimit(limit) {
    this.setState({
      limit: limit
    });
  }

  changePage(page) {
    this.setState({
      page: page
    });
  }

  render () {
    const { donationsFirebase, loading, limit, page } = this.state;

    var render = undefined

    if (this.props.fetch === 'donations') {
      render = this.props.firebaseData.revenue.donations
    } else if (this.props.fetch === 'expenses') {
      render = this.props.firebaseData.expenses.other
    }

    return (
      <div>
        {loading && <div className="p-2">Loading data...</div>}
        {donationsFirebase ? (
        <div>
          <StyledDonationList
            donationsFirebase={render}
            changeLimit={this.changeLimit}
            changePage={this.changePage}
            limit={limit}
            page={page}
            fetch={this.props.fetch}
          />
        </div>
        ) : (
        <div>There are no {this.props.fetch} yet ...</div>
        )}

      </div>
    )
  }
}

const StyledDonationList = (props) => (
  <div className="full-table">
    <table className="table articles-table table-sm table-hover table-bordered">
      <thead>
        <tr className="table-articles-head">
          {/* <th scope="col">DONATION ID</th> */}
          {props.fetch === 'expenses' ? <th scope="col">File</th> : undefined}
          <th scope="col">DATE</th>
          {props.fetch === 'expenses' ? undefined : <th scope="col">NAME</th>}
          {/* <th scope="col">NAME</th> */}
          <th scope="col">NOTE</th>
          <th scope="col">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {props.donationsFirebase
        .sort((a, b) => new Date(b.date) - new Date(a.date))
        .map(donation => (
          <StyledDonationItem
            key={donation.uid}
            donation={donation}
            fetch={props.fetch}
          />
        ))}
        <tr>
          <td colSpan={props.fetch === 'expenses' ? '2' : '2'} className="border-right-0 table-articles-head">

              <div className="results-dual-header">

                {/* <div className="page noselect">
                  <i onClick={() => props.changePage(props.page - 1)} className="fas fa-chevron-circle-left"></i>
                  Page {props.page}/1
                  <i onClick={() => props.changePage(props.page + 1)} style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                </div> */}
              
                {/* <span className="results noselect">
                  <span>Results:</span>
                  <span onClick={() => props.changeLimit(10)} className={"result" + (props.limit === 10 ? ' result-active' : '')}>10</span>
                  <span onClick={() => props.changeLimit(50)} className={"result" + (props.limit === 50 ? ' result-active' : '')}>50</span>
                  <span onClick={() => props.changeLimit(100)} className={"result" + (props.limit === 100 ? ' result-active' : '')}>100</span>
                  <span onClick={() => props.changeLimit(250)} className={"result" + (props.limit === 250 ? ' result-active' : '')}>250</span>
                </span> */}

              </div>

          </td>

          <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
          <td colSpan="1" className="border-left-0 table-articles-head">${(props.donationsFirebase.reduce((a, b) => a + (parseInt(b['amount'] || 0)), 0) / 100).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

  </div>
)

const StyledDonationItem = ({fetch, donation}) => (
  <tr>
    {/* <th scope="row">{donation.uid}</th> */}

    {fetch === 'expenses' ? <td><a rel="noopener noreferrer" target="_blank" href={donation.file}><i className="fas fa-file-invoice"></i></a></td> : undefined}

    {/* <td>{fetch === 'donations' ? moment(donation.createdAt).format('LL') : moment.unix(donation.date).format('LL')}</td> */}
    <td>{moment(donation.date).format('LL')}</td>

    {/* <td>{moment(donation.createdAt).format('LL') }</td> */}

    {fetch === 'donations' ? 
      <td>{fetch === 'donations' ? donation.name.split(" ")[0] + " " + ( (donation.name.split(' ')[1]) ? 
        donation.name.split(' ')[1].charAt(0) 
        : 
        ' '
        ) 
      : 
      donation.name}</td> 
      : 
      undefined 
    }

    {/* <td>{donation.name.split(" ")[0] + " " + (donation.name.split(' ')[1]).charAt(0)}</td> */}
    {fetch === 'donations' ?
      <td>{donation.note === "match" ? (<div><span role="img" aria-label="emoji">⭐</span>Matched</div>) : (<div>...</div>) }</td>
      :
      <td>{donation.reason}</td>
    }

    <td>${(donation.amount / 100).toFixed(2)}</td>
  </tr>
)

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site,
    user_id: state.auth.user.id
  };
};

const DonationTable = withFirebase(DonationTableBase);

const ImprovedReports = withFirebase(Reports)

export default connect(mapStateToProps)(ImprovedReports);