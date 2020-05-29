import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { DateRangePicker } from 'react-dates';
import { Link } from "react-router-dom";
import { withFirebase } from '../Firebase';
import { employeeList, sales, donations, expenses } from "../../sample_data/sampleData";

import * as ROUTES from '../../constants/routes';

import axios from 'axios';

import {ClothingTable} from "./table.js"
import moment from 'moment';
import Chart from 'chart.js';
import Component from 'react-live-clock/lib/Component';
import socketIOClient from 'socket.io-client'
const ENDPOINT = "/";
let socket = ''

class Reports extends Component {
  constructor(props) {
    super(props);

     this.state = {
       text: '',
       loading: false,
       limit: 5,
       menuExpanded: false,
       tableSelector: 'donations',
       subtableSelector: '',

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
       }

     };
  }

  componentDidMount() {
    const self = this;
    
    // this.onListenForDonations();
    
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

    axios.get('/api/getOrders')
    .then(function (response) {

      console.log(response);

      self.setState({
        firebaseData: {
          ...self.state.firebaseData,
          revenue: {
            ...self.state.firebaseData.revenue,
            orders: response.data.orders
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

  onListenForDonations() {
    this.setState({ loading: true });

    this.props.firebase.donations().orderByChild('createdAt').on('value', snapshot => {
      const donationObject = snapshot.val();

      if (donationObject) {

        const donationList = Object.keys(donationObject).map(key => ({
          ...donationObject[key],
          uid: key,
        }
        ));

        // this.setState({

        //   firebaseData: {
        //     revenue: {
        //       ...this.state.firebaseData.revenue,
        //       donations: donationList,
        //     },
        //   },
          
        //   loading: false,

        // });

        // var total = 0;

        // for (var i=0; i<this.state.firebaseData.revenue.donations.length; i++) {
        //   total += this.state.firebaseData.revenue.donations[i].amount;
        // }

        // this.setState({totals: {
        //   ...this.state.totals,
        //   donations: total
        // }})


      } else {
        this.setState({ donationsFirebase: null, loading: false });
      }
    }); 

    this.props.firebase.expenses().orderByChild('createdAt').on('value', snapshot => {
      const expenseObject = snapshot.val();

      if (expenseObject) {

        const expenseList = Object.keys(expenseObject).map(key => ({
          ...expenseObject[key],
          uid: key,
        }
        ));

        expenseList.sort(function(a, b){
          var keyA = new Date(a.date),
              keyB = new Date(b.date);
          // Compare the 2 dates
          if(keyA < keyB) return -1;
          if(keyA > keyB) return 1;
          return 0;
        });

        // this.setState({
          // expensesFirebase: expenseList,

        //   firebaseData: {
        //     ...this.state.firebaseData,
        //     expenses: {
        //       ...this.state.firebaseData.expenses,
        //       other: expenseList,
        //     },
        //   },

        //   loading: false,
        // });

        // var total = 0;

        // for (var i=0; i<this.state.firebaseData.expenses.other.length; i++) {
        //   total += this.state.firebaseData.expenses.other[i].amount;
        // }

        // this.setState({totals: {
        //   ...this.state.totals,
        //   expenses: total
        // }})

      } else {
        this.setState({ donationsFirebase: null, loading: false });
      }

    }); 

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
        return(<RevenueTable/>)
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
 
 render() {
   return (
    <div className="reports-page">

      <div className="fixed-total dual-header">
        <span className="help">Help <i className="far fa-question-circle"></i></span>
        <span className="total">+${((this.state.totals.donations - this.state.totals.expenses) / 100 ).toFixed(2)}</span>
      </div>

      <div className="fixed-componsation-50"></div>

      <div className="container home-container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-4 col-lg-4">

            <div className="static-wrapper">
              <div className="live">
                <span className="recording-dot d-inline-block"></span>
                <span>Live</span>
              </div>
  
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
    
                          <div className="col-12 col-xl-6">
                            <div className="snippet positive">
                            Revenue: ${this.state.totals.donations / 100}
                            </div>
                          </div>
    
                          <div className="col-12 col-xl-6">
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
              <Link to={ROUTES.EMPLOYEES}><button className="btn btn-articles-light btn-lg w-100 report-quick-links">
                <div>
                  <i className="fas fa-user-tie"></i>
                  <span>Employee Data</span>
                </div>
              </button></Link>
            </div>

            <div className="mt-3">
              <Link to={ROUTES.DONATE}>
                <button className="btn btn-articles-light btn-lg w-100 report-quick-links">
                  <div>
                    <i className="fas fa-money-bill"></i>
                    <span>Donate</span>
                  </div>
                </button>
              </Link>
            </div>

            <div className="mt-3">
              <button className="btn btn-articles-light btn-lg w-100 report-quick-links">
                <div>
                  <i className="fas fa-chart-line"></i>
                  <span>Data Charts <span style={{fontSize: '0.8rem'}}>(Coming soon!)</span></span>
                </div>
              </button>
            </div>

            <div className="mt-3">
              <button className="btn btn-articles-light btn-lg w-100 report-quick-links">
                <div>
                  <i className="fas fa-flag"></i>
                  <span>Report Expense <span style={{fontSize: '0.8rem'}}>(Coming soon!)</span></span>
                </div>
              </button>
            </div>
            
          </div>
  
          <div className="col-12 col-md-8 col-lg-8">

            <div className="search">
              
              <div className="input-wrap reports-shadow mt-3 dual-header">
                <div className=""><i className="fas fa-search-dollar mx-2"></i></div>
                <input className="search-input pl-2" type="text" placeholder="Search service is currently offline"/>
              </div>

              {/* <div className="mt-3 reports-shadow date-input">

                <div className="pt-1">
                  <i className="fas fa-calendar-alt"></i>
                  <span>20</span>
                </div>

              </div> */}
            </div>

            <div className="reports-side reports-shadow">
              <div className="table-selector">
      
                <div className="main">
                  {this.tableSelectorChoice('donations')}
                  {this.tableSelectorChoice('clothing')}
                  {this.tableSelectorChoice('payroll')}
                  <div className="d-inline-block main-seperation"><div className="wall"></div></div>
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

            {/* <div className="donation-snippet mt-3">
              <p>All donations go towards supporting the platform and encouraging more transparency and voice in American Politics.</p>
              <p><span>The next revoulution needs you!</span></p>
            </div> */}

          </div>

        </div>

      </div>
    </div>
   )
  }
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
            {/* <th scope="col">Order #</th> */}
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
    <div className="pl-2 pb-2">Preorder and unfinalized sales are not included in any reports.</div>
    </>
  )
}

function PayrollTable () {
  return (
    <div>
      <p className="mt-2">We currently do not have any employee under payroll but this is a sample of what an entry may look like.</p>
      <table className="table table-sm table-hover mt-2">
        <thead className="thead-dark">
          <tr>
            <th scope="col">Name</th>
            <th scope="col">Period</th>
            <th scope="col">Department</th>
            <th scope="col">Amount</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <th scope="row"><Link to={'employees/42'}>Joey Giusto</Link></th>
            <td>September</td>
            <td>Administration</td>
            <td>$00.00</td>
          </tr>
        </tbody>
      </table>
      <p>Click on an employee name to navagate to the employee directory</p>
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

  componentDidMount() {
    this.onListenForDonations();
  }

  onListenForDonations() {
    this.setState({ loading: true });

    this.props.firebase.donations().orderByChild('createdAt').on('value', snapshot => {
      const donationObject = snapshot.val();

      if (donationObject) {
        const donationList = Object.keys(donationObject).map(key => ({
          ...donationObject[key],
          uid: key,
        }
        ));
        this.setState({
          donationsFirebase: donationList,
          loading: false,
        });
      } else {
        this.setState({ donationsFirebase: null, loading: false });
      }
    }); 

    this.props.firebase.expenses().orderByChild('date').startAt(0).on('value', snapshot => {
      const expenseObject = snapshot.val();

      if (expenseObject) {

        const expenseList = Object.keys(expenseObject).map(key => ({
          ...expenseObject[key],
          uid: key,
        }
        ));
        this.setState({
          expensesFirebase: expenseList,
          loading: false,
        });
      } else {
        this.setState({ donationsFirebase: null, loading: false });
      }
    }); 

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
          <th scope="col">NAME</th>
          <th scope="col">NOTE</th>
          <th scope="col">AMOUNT</th>
        </tr>
      </thead>
      <tbody>
        {props.donationsFirebase.map(donation => (
          <StyledDonationItem
            key={donation.uid}
            donation={donation}
            fetch={props.fetch}
          />
        ))}
        <tr>
          <td colSpan={props.fetch === 'expenses' ? '3' : '2'} className="border-right-0 table-articles-head">

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
    <td>{moment.unix(donation.date).format('LL')}</td>

    {/* <td>{moment(donation.createdAt).format('LL') }</td> */}

    <td>{fetch === 'donations' ? donation.name.split(" ")[0] + " " + ( (donation.name.split(' ')[1]) ? donation.name.split(' ')[1].charAt(0) : ' ' ) : donation.name}</td>

    {/* <td>{donation.name.split(" ")[0] + " " + (donation.name.split(' ')[1]).charAt(0)}</td> */}
    <td>{donation.note === "match" ? (<div><span role="img" aria-label="emoji">⭐</span>Matched</div>) : (<div>...</div>) }</td>
    <td>${(donation.amount / 100).toFixed(2)}</td>
  </tr>
)

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site
  };
};

const DonationTable = withFirebase(DonationTableBase);

const ImprovedReports = withFirebase(Reports)

export default connect(mapStateToProps)(ImprovedReports);