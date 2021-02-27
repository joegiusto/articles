import React, { Component } from 'react';
import { Helmet } from "react-helmet";
import { connect } from 'react-redux';
import axios from 'axios';
import { Link, Switch, Route, matchPath } from "react-router-dom";
import moment from 'moment';
import Chart from 'chart.js';
import socketIOClient from 'socket.io-client'
 
import { sales } from "../../sample_data/sampleData";
import * as ROUTES from '../../constants/routes';
import {ClothingTable} from "./table.js"

// import DataCharts from './components/Charts'
import EmployeePage from './components/Employees';
import EmployeeDetailsPage from './components/Employees/Directory';
import ReportExpenseCards from './components/Reporting';
import BalanceHistoryChart from './components/Charts/BalanceHistory';

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

        tableSelector: 'revenue',
        subtableSelector: 'revenue-all',
		subClothingTableSelector: 'clothing-all',

        chartPeriodSelector: '1y',

        expenses_inventory: [],
        expenses_payrole: [],
        expenses_recurring: [],

        revenues_ads: [],
        revenues_clothing: [],
        revenues_clothing_total: 0,
        revenues_donations: [],
        revenues_memberships: [],

        reportsData: {

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
        clothing: 0,
        donations: 0,
        memberships: 0,
        
        ads: 0,
        inventory: 0,
        payrole: 0,
        recurring: 0
       },

       monthBreakdown: []

     };

     this.setChartPeriodSelector = this.setChartPeriodSelector.bind(this);
  }

  componentDidMount() {
    const self = this;
    
    socket = socketIOClient(ENDPOINT);

    // socket.on('online', function(msg){
    //   console.log(msg)
    // });

    socket.on('recieveDonation', function(msg){
      console.log(JSON.stringify(msg));

      // msg.amount = parseInt(msg.amount);

      self.setState({
        reportsData: {
          ...self.state.reportsData,
          revenue: {
            ...self.state.reportsData.revenue,
            donations: [
              ...self.state.reportsData.revenue.donations,
              msg
            ]
          }
        }
      })
    });

    socket.on('deleteDonation', function(id){

      self.setState({
        reportsData: {
          ...self.state.reportsData,
          revenue: {
            ...self.state.reportsData.revenue,
            donations: self.state.reportsData.revenue.donations.filter(function( obj ) {
              return obj._id !== id;
            })
          }
        }
      })
    });

    socket.on('recieveExpense', function(msg){
      console.log(JSON.stringify(msg));

      self.setState({
        reportsData: {
          ...self.state.reportsData,
          expenses: {
            ...self.state.reportsData.expenses,
            other: [
              ...self.state.reportsData.expenses.other,
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
    //     reportsData: {
    //       ...self.state.reportsData,
    //       revenue: {
    //         ...self.state.reportsData.revenue,
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

	console.log("Did mount os revenue should be displayed");

    axios.get('/api/getRevenuesDonations', {
      params: {
        fromDate: '',
        toDate: '',
        limit: '100',
        page: '1',
        user_id: self.props.user_id || ''
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        revenues_donations: response.data
      }, () => {

        console.log("revenues_donations was set!")

        let total = 0

        var val = self.state.revenues_donations.map(function(item) {
          return total += item.amount
        });

        console.log(val);

        self.setState({

          totals: {
            ...self.state.totals,
            donations: total
          } 

        })

      })
    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/getRevenuesClothing', {
      params: {
        fromDate: '',
        toDate: '',
        limit: '100',
        page: '1',
        user_id: self.props.user_id || ''
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        revenues_clothing: response.data
      }, () => {
        console.log("Done")

        let total = 0

        var val = self.state.revenues_clothing.map(function(item) {
          return total += item.payment.trueTotal
        });

        // console.log(val);

        self.setState({

          totals: {
            ...self.state.totals,
            // clothing: self.state.revenues_clothing.reduce(function(previousValue, currentValue) {
            //   return previousValue.payment.trueTotal + currentValue.payment.trueTotal
            // })
            clothing: total
          } 

        })

      })

    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/getExpensesRecurring', {
      params: {
        fromDate: '',
        toDate: '',
        limit: '100',
        page: '1',
        user_id: self.props.user_id || ''
      }
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        expenses_recurring: response.data
      }, () => {
        let total = 0

        self.state.expenses_recurring.map(function(item) {
          return total += item.amount
        });

        self.setState({

          totals: {
            ...self.state.totals,
            recurring: total
          } 

        })

      })

    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/getExpenses')
    .then(function (response) {

      console.log(response);

      self.setState({
        reportsData: {
          ...self.state.reportsData,
          expenses: {
            ...self.state.reportsData.expenses,
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
        reportsData: {
          ...self.state.reportsData,
          revenue: {
            ...self.state.reportsData.revenue,
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

    // if (prevState.reportsData.revenue.donations !== this.state.reportsData.revenue.donations ) {
    //   console.log("New math needed!");

    //   var total = 0;

    //   for (var i=0; i<this.state.reportsData.revenue.donations.length; i++) {
    //     total += parseInt(this.state.reportsData.revenue.donations[i].amount);
    //   }

    //   this.setState({totals: {
    //     ...this.state.totals,
    //     donations: total
    //   }});

    // }

  //   if (prevState.reportsData.expenses.other !== this.state.reportsData.expenses.other ) {

  //     var total = 0;

  //     for (var i=0; i<this.state.reportsData.expenses.other.length; i++) {
  //       total += this.state.reportsData.expenses.other[i].amount;
  //     }

  //     this.setState({totals: {
  //       ...this.state.totals,
  //       expenses: total
  //     }})

  //   }
  }

  componentWillUnmount() {
    socket.disconnect();
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

  sum(key) {
    return this.reduce((a, b) => a + (b[key] || 0), 0);
  }

  getTableComponent(tableSelector, subtableSelector) {
    switch(tableSelector) {

      case 'donations':
        return(<DonationTable reportsData={this.state.reportsData} fetch="donations"/>)
      case 'clothing':
        switch (subtableSelector) {
          case 'clothing-all':

            // console.log(val)

            return (
              <table className='table articles-table table-sm table-hover table-bordered'>

                <thead>
                  <tr className="table-articles-head">
                    <th scope="col">Date</th>
                    {/* <th scope="col">Name</th> */}
                    <th scope="col">Order Summary</th>
                    <th className='text-right' scope="col">Total</th>
                  </tr>
                </thead>

                <tbody>
                  
                  {this.state.revenues_clothing.map(sale => 
                    <tr>
                      <td colSpan="1" className="border-right-0 ">{moment(sale.date).format("LLL")}</td>
                      <td colSpan="1" className="border-right-0 ">{sale.for}</td>
                      <td colSpan="1" className="">${(sale.payment.trueTotal / 100).toFixed(2)}</td>
                    </tr> 
                  )}

                  <tr>
                    <td colSpan="1" className="border-right-0 table-articles-head"></td>
                    <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
                    <td colSpan="1" className="border-left-0 table-articles-head">${(this.state.totals.clothing / 100).toFixed(2)}</td>
                  </tr>

                </tbody>
              </table>
            )
          case 'clothing-preorders':
            return(<PreorderTable/>)
          default:
            return(<ClothingTable/>)
        }
      case 'payroll':
        return <PayrollTable/>

      case 'expenses':
        return(<ExpenseTable subtableSelector={this.state.subtableSelector} reportsData={this.state.reportsData} fetch="expenses"/>)
      case 'revenue':
        return(
			<RevenueTable 
				subClothingTableSelector={this.state.subClothingTableSelector}
				subtableSelector={this.state.subtableSelector} 
				revenues_clothing={this.state.revenues_clothing} 
				reportsData={this.state.reportsData} 
				fetch="expenses"
			/>
		)

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

  setSubClothingTableSelector(newSelector) {
	this.setState({
		subClothingTableSelector:  newSelector
	});
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

  subClothingTableSelectorChoice(dataValue, printValue) {
    return(
      <span onClick={() => this.setSubClothingTableSelector(dataValue)} className={"selection " + (this.state.subClothingTableSelector === dataValue ? 'selection-active' : '')}>{printValue}</span>
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
          <title>Transparency - Articles</title>
        </Helmet>

        <div className="fixed-total dual-header">
          {/* <span className="help">Help <i className="far fa-question-circle"></i></span> */}
          <span className="total">+${((this.state.totals.donations - this.state.totals.recurring + this.state.totals.clothing) / 100 ).toFixed(2)}</span>
        </div>

        <div className="fixed-componsation-50"></div>

        <div className="container home-container">

          <div className="row justify-content-center">

            <div className="col-12 col-md-4 col-lg-4">

              <div className="reports-side-menu">

                <div className="static-wrapper">

                  <div className="live">
                      <span className="recording-dot d-inline-block"></span>
                      <span>Live</span>
                    </div>
      
                  <div id='info' className={"info " + (this.state.menuExpanded ? 'expanded' : '')}>
      
                    <div className="normal">
                      <div className="px-2 pt-4">
      
                        <div className="balance-label">Current Balance:</div>
                        <h2>${((this.state.totals.donations - this.state.totals.recurring + this.state.totals.clothing) / 100 ).toFixed(2)}</h2>
      
                        <div className="time-container">
                          <div className="progress">
                            <div className="progress-bar bg-rev" role="progressbar" 
                            style={{
                              width: ((this.state.totals.donations + this.state.totals.clothing) / ((this.state.totals.donations + this.state.totals.recurring + this.state.totals.clothing) / 100) ).toFixed(0) +"%"
                            }}
                            aria-valuenow="15" 
                            aria-valuemin="0" 
                            aria-valuemax="100"
                            >
                              {( (this.state.totals.donations + this.state.totals.clothing) / ((this.state.totals.donations + this.state.totals.recurring + this.state.totals.clothing) / 100) ).toFixed(0)}%
                            </div>

                            <div className="progress-bar bg-danger" role="progressbar" style={{width: (this.state.totals.recurring / ((this.state.totals.donations + this.state.totals.recurring + this.state.totals.clothing) / 100) ).toFixed(0) + "%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100">{( this.state.totals.recurring / ((this.state.totals.donations + this.state.totals.recurring + this.state.totals.clothing) / 100) ).toFixed(0)}%</div>
                          </div>
        
                          {/* <div className="text-muted">Revenue | Expenses</div> */}
        
                          <div className="mt-4">
        
                            <div className="row">
        
                              <div className="col-12 col-xl-6 pr-xl-1">
                                <div className="snippet positive">
                                Revenue: ${ ( this.state.totals.donations + this.state.totals.clothing ) / 100}
                                </div>
                              </div>
        
                              <div className="col-12 col-xl-6 pl-xl-1">
                                <div className="snippet negative">
                                Expenses: -${this.state.totals.recurring / 100}
                                </div>
                              </div>
        
                            </div>
        
                          </div>
                        </div>
      
                      </div>
                    </div>
      
                  </div>
                </div>

                <div className="quick-links">

                  <div className="report-link mt-3">
                    <Link to={ROUTES.TRANSPARENCY_REPORTS}>
                      <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (this.props.location.pathname === ROUTES.TRANSPARENCY_REPORTS ? 'active ' : null) + (this.props.location.pathname === ROUTES.TRANSPARENCY ? ' active' : null)}>
                        <div>
                          <i className="fas fa-paste" aria-hidden="true"></i>
                          <span className="text">Reports</span>
                        </div>
                      </button>
                    </Link>
                  </div>

                  <div className="report-link mt-3">
                    <Link to={ROUTES.TRANSPARENCY_CHARTS}>
                      <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (this.props.location.pathname === ROUTES.TRANSPARENCY_CHARTS ? 'active' : null)}>
                        <div>
                          <i className="fas fa-chart-line"></i>
                          <span className="text">Charts</span>
                        </div>
                      </button>
                    </Link>
                  </div>
                  
                  <div className="report-link mt-3">
                    <Link to={ROUTES.TRANSPARENCY_EMPLOYEES}>
                      <button className={"btn btn-articles-light btn-lg w-100 report-quick-links" + (this.props.location.pathname === ROUTES.TRANSPARENCY_EMPLOYEES ? ' active' : '') + ( matchPath(this.props.location.pathname, ROUTES.TRANSPARENCY_EMPLOYEES_DETAILS ) ? ' active' : '')}>
                        <div>
                          <i className="fas fa-paste" aria-hidden="true"></i>
                          <span className="text">Employees</span>
                        </div>
                      </button>
                    </Link>
                  </div>
      
                  <div className="report-link mt-3">
                    <Link to={ROUTES.TRANSPARENCY_FLAG}>
                      <button className={"btn btn-articles-light btn-lg w-100 report-quick-links " + (this.props.location.pathname === ROUTES.TRANSPARENCY_FLAG ? 'active' : null)}>
                        <div>
                          <i className="fas fa-flag"></i>
                          <span className="text">Flag</span>
                        </div>
                      </button>
                    </Link>
                  </div>

                </div>

              </div>
              
            </div>

            <Switch>

              <Route exact={true} path={[ROUTES.TRANSPARENCY, ROUTES.TRANSPARENCY_REPORTS]} render={() => 
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

                          this.filterByValue(this.state.reportsData.expenses.other, this.state.searchText).map((item, i) => (
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
            
						<div className="main d-flex flex-row justify-content-lg-between align-items-center">

							<div className="d-flex">
								{this.tableSelectorChoice('revenue')}
								{this.tableSelectorChoice('expenses')}
							</div>

							<div className="d-flex">
								<div className="btn btn-articles-light btn-sm"><i className="fas fa-filter"></i>Filter</div>
							</div>

						</div>
            
						{/* Expenses Sub Nav */}
						<div className={"sub sub-expenses " + (this.state.tableSelector === 'expenses' ? '' : 'd-none')}>
							{this.subTableSelectorChoice('expenses-all', 'all')}
							{this.subTableSelectorChoice('expenses-payroll', 'payroll')}
							{this.subTableSelectorChoice('expenses-inventory', 'inventory')}
							{this.subTableSelectorChoice('expenses-recurring', 'recurring')}
							{this.subTableSelectorChoice('expenses-utilities', 'utilities')}
							{this.subTableSelectorChoice('expenses-other', 'other')}
						</div>
						  
						{/* Revenue Sub Nav */}
						<div className={"sub sub-revenue " + (this.state.tableSelector === 'revenue' ? '' : 'd-none')}>
							{this.subTableSelectorChoice('revenue-all', 'all')}
							{this.subTableSelectorChoice('revenue-donations', 'donations')}
							{this.subTableSelectorChoice('revenue-clothing', 'clothing')}
							{this.subTableSelectorChoice('revenue-ads', 'ads')}
							{this.subTableSelectorChoice('revenue-memberships', 'memberships')}
							{/* {this.subTableSelectorChoice('revenue-grants', 'grants')} */}
							{/* {this.subTableSelectorChoice('revenue-sponsorships', 'sponsorships')} */}
						</div>

						{/* Clothing Sub Nav */}
						<div className={"sub sub-clothing dual-header " + (this.state.subtableSelector === 'revenue-clothing' ? '' : 'd-none')}>
							<div>
								{this.subClothingTableSelectorChoice('clothing-all', 'all')}
								{this.subClothingTableSelectorChoice('clothing-originals', 'originals')}
								{this.subClothingTableSelectorChoice('clothing-partnerships', 'partnerships')}
								{this.subClothingTableSelectorChoice('clothing-submissions', 'submissions')}
								{this.subClothingTableSelectorChoice('clothing-sponsored', 'sponsored')}
							</div>
                      	</div>
            
						{/* Future Payroll Sub Nav */}
					  	<div className={"sub sub-payroll " + (this.state.tableSelector === 'payroll' ? '' : 'd-none')}>
							{/* For the future */}
						</div>

                    </div>
            
                    {this.getTableComponent(this.state.tableSelector, this.state.subtableSelector)}

                  </div>

                </div>
              }/>

              <Route path={ROUTES.TRANSPARENCY_CHARTS} render={() => 
                <div className="col-12 col-md-8 col-lg-8">
                  <DataCharts reportsData={this.state.reportsData} data={this.state.reportsData.revenue.donations} setChartPeriodSelector={this.setChartPeriodSelector} chartPeriodSelector={this.state.chartPeriodSelector}></DataCharts>
                </div>
              }/>

              <Route exact path={ROUTES.TRANSPARENCY_EMPLOYEES} render={() => 
                <div className="col-12 col-md-8 col-lg-8 mb-3">

                  <Link to={ROUTES.TRANSPARENCY_REPORTS}>
                    <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1 d-none d-md-inline-block">
                      <i className="far fa-hand-point-left"></i>
                      <span>Back to Reports</span>
                    </div>
                  </Link>

                  <EmployeePage></EmployeePage>

                </div>
              }/>

              <Route exact path={ROUTES.TRANSPARENCY_EMPLOYEES_DETAILS} render={() => 
                <div className="col-12 col-md-8 col-lg-8 mb-3">

                  <Link to={ROUTES.TRANSPARENCY_REPORTS}>
                    {/* <div className="border d-inline-block"> */}
                      <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1 d-none d-md-inline-block">
                        <i className="far fa-hand-point-left"></i>
                        <span>Back to Reports</span>
                      </div>
                    {/* </div> */}
                  </Link>

                  <EmployeeDetailsPage match={this.props.match}></EmployeeDetailsPage>

                </div>
              }/>

              <Route path={ROUTES.TRANSPARENCY_FLAG} render={() => 
                <div className="col-12 col-md-8 col-lg-8">

                  <Link to={ROUTES.TRANSPARENCY_REPORTS}>
                    <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1 d-none d-md-inline-block">
                      <i className="far fa-hand-point-left"></i>
                      <span>Back to Reports</span>
                    </div>
                  </Link>

                  <div className="alert alert-warning border mt-3 d-none d-md-block">Warning: We are working on ways to make this section more transparent with our users, such as number of reports and ways to agree with other peoples reports. Data is saved for Admins to look at for now.</div>

                  <ReportExpenseCards 
                    expenses={this.state.reportsData.expenses.other}
                    user_id={this.props.user_id}
                    last_report={this.props.last_report}
                  />

                </div>
              }/>

            </Switch>

          </div>

        </div>
      </div>
    )
  }
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
            <th scope="row"><Link to={ROUTES.TRANSPARENCY_EMPLOYEES + '/5e90cc96579a17440c5d7d52'}>Joey Giusto</Link></th>
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

class DonationTable extends Component {
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

  //  var render = undefined

   const render = this.props.reportsData.revenue.donations;

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

class RevenueTable extends Component {
  	constructor(props) {

		super(props);

		this.state = {
			text: '',
			loading: false,
			donationsFirebase: [],
			expensesFirebase: [],
			limit: 10,
			page: 1,

			// all: [...props.revenues_clothing.map(order => {
			// 	// var o = Object.assign({}, order);
			// 	order.type = 'Store Sale';
			// 	order.unifiedPrice = order.payment.trueTotal
			// 	return order;
			// }), ...props.reportsData.revenue.donations.map(order => {
			// 	// var o = Object.assign({}, order);
			// 	order.type = 'Donation';
			// 	order.unifiedPrice = order.amount
			// 	return order;
			// })]

			all: []

		};

		this.changeLimit = this.changeLimit.bind(this);
		this.changePage = this.changePage.bind(this);
  	}

    componentDidUpdate(prevProps) {
		if (this.props.reportsData.revenue.donations !== prevProps.reportsData.revenue.donations) { // check if your props is changed

			console.log(`reportsData.revenue.donations received an update`);

			this.setState({
				all: [...this.props.reportsData.revenue.donations.map(order => {
					order.type = 'Donation';
					order.unifiedPrice = order.amount
					return order;
				})]
			});

		}
    }

	componentDidMount() {
		console.log(`RevenueTable was mounted!`)

		this.setState({
			all: [...this.props.reportsData.revenue.donations.map(order => {
				order.type = 'Donation';
				order.unifiedPrice = order.amount
				return order;
			})]
		});
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

	renderTable() {

		const megaGroup = [...this.props.revenues_clothing.map(order => {
			// var o = Object.assign({}, order);
			order.type = 'Store Sale';
			order.unifiedPrice = order.payment.trueTotal
			return order;
		}), ...this.props.reportsData.revenue.donations.map(order => {
			// var o = Object.assign({}, order);
			order.type = 'Donation';
			order.unifiedPrice = order.amount
			return order;
		})]

		switch(this.props.subtableSelector) {
			case 'revenue-donations':
				return(<div className="p-3">There are no donation revenue yet.</div>)
			case 'revenue-clothing':

				switch(this.props.subClothingTableSelector) {
					case 'clothing-all':
						return(<div className="p-3">There is no clothing revenue yet.</div>)
					case 'clothing-originals':
						return(<div className="p-3">There is no original clothing revenue yet.</div>)
					case 'clothing-partnerships':
						return(<div className="p-3">There is no partnership clothing revenue yet.</div>)
					case 'clothing-submissions':
						return(<div className="p-3">There is no submission clothing revenue yet.</div>)
					case 'clothing-sponsored':
						return(<div className="p-3">There is no sponsored clothing revenue yet.</div>)
				}
				
			case 'revenue-ads':
				return(<div className="p-3">There is no ad revenue yet.</div>)
			case 'revenue-memberships':
				return(<div className="p-3">There is no membership revenue yet.</div>)
			// case 'revenue-grants':
			// 	return(<div className="p-3">There is no grant revenue yet.</div>)
			// case 'revenue-sponsorships':
			// 	return(<div className="p-3">There is no sponsorship revenue yet.</div>)

			default:
				return (
				<table className={`table articles-table table-sm table-hover table-bordered`}>

					<thead>
						<tr className="table-articles-head">
						{/* <th scope="col">Order #</th> */}
						<th scope="col">Date</th>
						<th scope="col">Type</th>
						{/* <th scope="col">Name</th> */}
						<th scope="col">Order Summary</th>
						<th className='text-right' scope="col">Total</th>
						</tr>
					</thead>

					<tbody>

						{/* {console.log("Logging mega")}
						{console.log(megaGroup)} */}

						{this.state.all
						.sort((a, b) => new Date(b.date) - new Date(a.date))
						.map(sale => 
						<tr onClick={() => this.props.history.push(ROUTES.TRANSPARENCY_REPORTS + `?id=${sale._id}&type=revenue`)}>
							<td colSpan="1" className="border-right-0 ">{moment(sale.date).format("LLL")}</td>
							<td colSpan="1" className="border-right-0 ">{sale.type}</td>
							<td colSpan="1" className="border-right-0 "></td>
							<td colSpan="1" className="border-right-0 ">${(sale.unifiedPrice / 100).toFixed(2)}</td>
						</tr>
						)}

						<tr>
							<td colSpan="2" className="border-right-0 table-articles-head">

							</td>

							<td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
							<td colSpan="1" className="border-left-0 table-articles-head">${(this.state.all.reduce((a, b) => a + (parseInt(b['unifiedPrice'] || 0)), 0) / 100).toFixed(2)}</td>
						</tr>

					</tbody>

				</table>
				)
		};

	}

 	render () {

   	// const { donationsFirebase, loading, limit, page } = this.state;

   	// const render = this.props.reportsData.revenue.donations;

	return (
		<div>

			{/* {loading && <div className="p-2">Loading data...</div>} */}

			{this.renderTable()}

		</div>
   	)
 }
}

class ExpenseTable extends Component {
  constructor(props) {
    super(props);

		this.state = {
			text: '',
			loading: false,
			donationsFirebase: [],
			expenses: [],
			limit: 10,
			page: 1,
		};
		this.changeLimit = this.changeLimit.bind(this);
		this.changePage = this.changePage.bind(this);
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

  	renderTable() {

	switch(this.props.subtableSelector) {

		case 'expenses-payroll':
			return(<PayrollTable/>)
		case 'expenses-inventory':
			return(<div className="p-3">There is no inventory expenses yet.</div>)
		case 'expenses-recurring':
			return(<div className="p-3">There is no ad revenue yet.</div>)
		case 'expenses-utilities':
			return(<div className="p-3">There is no utility expenses yet.</div>)
		case 'expenses-other':
			return(<div className="p-3">There is no other expenses yet.</div>)

		// All Expenses
		default:
			return (
				<table className="table articles-table table-sm table-hover table-bordered">

					<thead>
						<tr className="table-articles-head">
							<th scope="col">File</th>
							<th scope="col">DATE</th>
							<th scope="col">TYPE</th>
							<th scope="col">FOR</th>
							<th scope="col">AMOUNT</th>
						</tr>
					</thead>

					<tbody>
						{this.props.reportsData.expenses.other
						.sort((a, b) => new Date(b.date) - new Date(a.date))
						.map(donation => (
			
							<tr>
							<td><a rel="noopener noreferrer" target="_blank" href={donation.file}><i className="fas fa-file-invoice mr-0"></i></a></td>
							<td>{moment(donation.date).format('LL')}</td>
							<td>Recurring</td>
							<td>{donation.reason}</td>
							<td>${(donation.amount / 100).toFixed(2)}</td>
							</tr>
			
						))}
						<tr>
							<td colSpan='3' className="border-right-0 table-articles-head">
			
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
							<td colSpan="1" className="border-left-0 table-articles-head">${(this.props.reportsData.expenses.other.reduce((a, b) => a + (parseInt(b['amount'] || 0)), 0) / 100).toFixed(2)}</td>
						</tr>
					</tbody>

			  	</table>
			)
	};

	}

	render () {
		const { donationsFirebase, loading, limit, page } = this.state;

		return (
		<div>

			{loading && <div className="p-2">Loading data...</div>}
			
			{this.renderTable()}

		</div>
		)
	}
}

const StyledDonationList = (props) => (
  <div className="full-table">

    <table className="table articles-table table-sm table-hover table-bordered">
      <thead>
        <tr className="table-articles-head">
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
          
          (donation.department === 'payrole' ? 
          <StyledDonationItem
            key={donation.uid}
            donation={donation}
            fetch={props.fetch}
            isPayrole={true}
          />
           : 
           <StyledDonationItem
            key={donation.uid}
            donation={donation}
            fetch={props.fetch}
          />
          )

          

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

const StyledDonationItem = ({fetch, donation, isPayrole}) => (
  <tr>
    {/* <th scope="row">{donation.uid}</th> */}

    {isPayrole ? 'True' : fetch === 'expenses' ? <td><a rel="noopener noreferrer" target="_blank" href={donation.file}><i className="fas fa-file-invoice"></i></a></td> : undefined}

    {/* <td>{fetch === 'donations' ? moment(donation.createdAt).format('LL') : moment.unix(donation.date).format('LL')}</td> */}
    <td>{moment(donation.date).format('LLL')}</td>

    {/* <td>{moment(donation.createdAt).format('LL') }</td> */}

    <td>{`${donation.first_name || 'Private'} ${donation.last_name || ''}`}</td>

    {/* {fetch === 'donations' ? 
      <td>{fetch === 'donations' ? ( donation.name.split(" ")[0] ) + " " + ( (donation.name.split(' ')[1]) ? 
        donation.name.split(' ')[1].charAt(0) 
        : 
        ' '
        ) 
      : 
      donation.name}</td> 
      : 
      undefined 
    } */}

    {/* <td>{donation.name.split(" ")[0] + " " + (donation.name.split(' ')[1]).charAt(0)}</td> */}
    {fetch === 'donations' ?
      <td>{donation.note === "match" ? (<div><span role="img" aria-label="emoji">⭐</span>Matched</div>) : (<div>...</div>) }</td>
      :
      <td>{donation.reason}</td>
    }

    <td>${(donation.amount / 100).toFixed(2)}</td>
  </tr>
)

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
    const self = this

    axios.get('/api/getMonthlyExpense')
    .then(function (response) {

      console.log(response);

      self.setState({
        monthBreakdown: response.data
      }, () => {
        console.log('done')
        // self.getBreakdownTotal('expenses', 8, 2020);
        self.renderCharts();
      })

    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/getMonthlyPayrole')
    .then(function (response) {

      console.log(response);

      self.setState({
        payroleBreakdown: response.data
      }, () => {
        // console.log('done')
        // self.getBreakdownTotal('expenses', 8, 2020);
        // self.renderCharts();
      })

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  // componentDidUpdate(prevProps, prevState, snapshot) {

  //   console.log("Update");

  //   if (prevProps.data !== this.props.data) {

  //     // this.renderCharts();

  //   }
  // }

  getBreakdownTotal(type, month, year) {
    if (type === "expenses") {

      console.log(`Trying to return ${type} that occured in ${month} of ${year}`);
      console.log("This will be the result")

      let result = this.state.monthBreakdown.filter(singleMonth => {
        return singleMonth._id.month === month && singleMonth._id.year === year;
      } );

      console.log(result[0])
      return result[0]

    } else if (type === "revenues") {

		console.log(`Trying to return ${type} that occured in ${month} of ${year}`);
		console.log("This will be the result")
  
		let result = this.state.monthBreakdown.filter(singleMonth => {
		  return singleMonth._id.month === month && singleMonth._id.year === year;
		} );
  
		console.log(result[0])
		return result[0]

    }
  }

  renderCharts() {
    const years = (back) => {
      const year = new Date().getFullYear();
      return Array.from({length: back}, (v, i) => year - back + i + 1);
    }

    var revenueMonths = [];
	var expenseMonths = [];

    var lastRevenues = [];
	var lastExpenses = [];

	var monthsCount = 12;

    var months = [];

    var totalsRevenues = [];
	var totalsExpenses = [];

	var realExpensesTotals = [];
	var realRevenuesTotals = [];
    var realTotals = [];
    
    for (let i = 0; i < monthsCount; i++) {

      expenseMonths.push({
        month: parseInt(moment().subtract(i, 'months').format('MM')),
        year: parseInt(moment().subtract(i, 'months').format('Y'))
      });
      
      lastExpenses.push(this.getBreakdownTotal(
        'expenses', 
        parseInt(moment().subtract(i, 'months').format('MM')),  
        parseInt(moment().subtract(i, 'months').format('Y')) 
      ));

    }

	for (let i = 0; i < monthsCount; i++) {
		revenueMonths.push({
		  month: parseInt(moment().subtract(i, 'months').format('MM')),
		  year: parseInt(moment().subtract(i, 'months').format('Y'))
		});
		
		lastRevenues.push(this.getBreakdownTotal(
		  'revenues', 
		  parseInt(moment().subtract(i, 'months').format('MM')),  
		  parseInt(moment().subtract(i, 'months').format('Y')) 
		));
  
	}

	console.log("Look here")
	console.log(revenueMonths)

	console.log(this.props.data)
	console.log(this.props.reportsData.expenses.other)

    console.log(lastRevenues)

    // console.log(expenseMonths)
    // console.log(lastExpenses)

	// Revenues
    for (let i = 0; i < monthsCount; i++) {
      months.push(moment().subtract(i, 'months').format('MMM'))

      var temp = this.props.data.filter((item) => {
        return moment(item.date).isSame(moment().subtract(i, 'months'), 'month');
      })

      totalsRevenues.push(temp.reduce((a, b) => a + (b['amount'] || 0), 0))

      realRevenuesTotals = totalsRevenues.map(function(item) {return item / 100})

    }

	// Expenses
	for (let i = 0; i < monthsCount; i++) {
		// months.push(moment().subtract(i, 'months').format('MMM'))
  
		var temp = this.props.reportsData.expenses.other.filter((item) => {
		  return moment(item.date).isSame(moment().subtract(i, 'months'), 'month');
		})
  
		totalsExpenses.push(temp.reduce((a, b) => a + (b['amount'] || 0), 0))
  
		realExpensesTotals = totalsExpenses.map(function(item) {return item / 100})
  
	}

    this.setState({
      monthRevenuesTotals: realRevenuesTotals,
	  monthExpensesTotals: realExpensesTotals,
    }, () => {

      if (this.state.monthRevenuesTotals.length !== 0) {

        var vsReveneueExpense = document.getElementById(this.state.chartRevenueExpense);

        new Chart(vsReveneueExpense, {
            type: 'line',
            data: {
                labels: [ ...months.reverse() ],
                datasets: [{
                    label: 'Revenues',
                    data: [
						...this.state.monthRevenuesTotals.reverse()
					],
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
                  data: [
					...this.state.monthExpensesTotals.reverse()
                    // ( (lastExpenses[11]?.total / 100) || 0 ), 
                    // ( (lastExpenses[10]?.total / 100) || 0 ), 
                    // ( (lastExpenses[9]?.total / 100) || 0 ),
                    // ( (lastExpenses[8]?.total / 100) || 0 ), 
                    // ( (lastExpenses[7]?.total / 100) || 0 ), 
                    // ( (lastExpenses[6]?.total / 100) || 0 ), 
                    // ( (lastExpenses[5]?.total / 100) || 0 ), 
                    // ( (lastExpenses[4]?.total / 100) || 0 ), 
                    // ( (lastExpenses[3]?.total / 100) || 0 ), 
                    // ( (lastExpenses[2]?.total / 100) || 0 ), 
                    // ( (lastExpenses[1]?.total / 100) || 0 ), 
                    // ( (lastExpenses[0]?.total / 100) || 0 ) 
                  ],
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
						callback: function(value, index, values) {

							if (value % 1 === 0) {
	  
							  if(parseInt(value) >= 1000){
								return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
							  } else {
								return '$' + value;
							  }
	  
							}
							
						  }
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
                },
                hover: {
                  mode: 'nearest',
                  intersect: true
                },
				tooltips: {
					mode: 'index',
					intersect: false,
					callbacks: {
						label: function(tooltipItems, data) { 
							return '$' + tooltipItems.yLabel.toFixed(2) ;
						}
					}
				},
            }
        });

      }

    })

    var vsPayroleExpenses = document.getElementById(this.state.chartPayroleExpenses);

    new Chart(vsPayroleExpenses, {
        type: 'pie',
        data: {
          labels: [ 'Expenses', 'Payrole' ],
          datasets: [
            {
              label: '$ in Donations',
              data: [76.42, 4.00],
              backgroundColor: [
                'rgba(255, 99, 132, 0.2)',
                'rgba(249, 237, 205, 0.2)'
              ],
              borderColor: [
                'rgba(255, 99, 132, 1)',
                'rgba(249, 237, 205, 1)'
              ],
              borderWidth: 1,
              lineTension: 0.1,
            }
          ]
        },
        options: {
          hover: {
            mode: 'nearest',
            intersect: true
          },
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
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
        }
    });

    var chartNewYorkEmployeeOurEmployee = document.getElementById(this.state.chartNewYorkEmployeeOurEmployee);

    new Chart(chartNewYorkEmployeeOurEmployee, {
        type: 'line',
        data: {
          labels: [ ...years(10) ],
          datasets: [
            {
              label: 'USA Per Capita Income',
              data: [30830, 30988, 31127, 32420, 32039, 33549, 34746, 35330, 35902, 36080],
              backgroundColor: [
                'rgba(51, 51, 255, 0.2)'
              ],
              borderColor: [
                'rgba(51, 51, 255, 1)'
              ],
              pointBackgroundColor: 'rgba(51, 51, 255, 1)',
              pointBorderColor: 'rgba(51, 51, 255, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: 'NY Per Capita Income',
              data: [ 0, 0, 0, 0, 0, 0, 0, 0, 0, 37470 ],
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
              label: "NY Per Capita Income With Bachelor's",
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
              label: 'Articles Per Capita Income',
              data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 4],
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
                    // max: 100000,
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
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
        }
    });
  }

  changeExpandSource(state) {
    this.setState({
      expandSource: state
    })
  }

  render(props) {
    return (
      <div className="chart-component">

        <Link to={ROUTES.TRANSPARENCY_REPORTS}>
          <div style={{marginTop: '2rem'}} className="btn btn-articles-light py-1 d-none d-md-inline-block">
            <i className="far fa-hand-point-left"></i>
            <span>Back to Reports</span>
          </div>
        </Link>

        {/* <div className="alert alert-danger border mt-3">Warning: This section is still in development and will not be ready unitll <b>August 8th 2020</b></div> */}

        <div className="chart-blocks">

          <div className="chart-block">
            <h5>Balance History</h5>
            <BalanceHistoryChart/>
          </div>

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
          </div>

          <div className="row">

            <div className="col-lg-4">
              <div className="chart-block">
                <h5>Employee Average Pay</h5>
                <h3 className="mb-0">$0</h3>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="chart-block">
                <h5>CEO Pay</h5>
                <h3 className="mb-0">$0</h3>
              </div>
            </div>

            <div className="col-lg-4">
              <div className="chart-block">
                <h5>Percent Difference</h5>
                <h3 className="mb-0">0.00%</h3>
              </div>
            </div>

          </div>
  
          <div className="chart-block">
            <h5>Median USA Income vs Our Employees</h5>
            <p>The amount of money being spent on payrole compared to revenues and expenses.</p>
  
            {/* <ChartBlockTimeFrame setChartPeriodSelector={this.props.setChartPeriodSelector} chartPeriodSelector={this.props.chartPeriodSelector} /> */}
            <span className="badge badge-dark">10 Years</span>
  
            <canvas className='chart mb-3 bg-white' id={this.state.chartNewYorkEmployeeOurEmployee} width="100%" height="45px"></canvas>

            <div onClick={() => this.changeExpandSource(!this.state.expandSource)} className="btn btn-articles-light mb-2">
              {this.state.expandSource ? 
              <i className="fas fa-caret-square-up"></i>
              :
              <i className="fas fa-caret-square-down"></i>
              }
              
              Expand Source Info
            </div>

            <div className={"source-info " + (this.state.expandSource ? "show" : null)}>
              <hr/>
              <div>Information sourced from the following:</div>
              <div className="sources">
                <ul className="mb-0">

                  <li>
                    <a target="_blank" rel="noopener noreferrer" href="https://www.census.gov/quickfacts/fact/table/NY,US/PST045219">https://www.census.gov/quickfacts/fact/table/NY,US/PST045219</a>
                  </li>

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
          </div>
        </div>

      </div>
    )
  }

}

function ChartBlockTimeFrame (props) {
  	return (
		<div className="scale">
			{/* <span onClick={() => props.setChartPeriodSelector('all')} className={"badge border mr-1 " + (props.chartPeriodSelector === "all" ? 'badge-dark' : 'badge-light')}>All</span> */}
			<span onClick={() => props.setChartPeriodSelector('1y')} className={"badge border mr-1 " + (props.chartPeriodSelector === "1y" ? 'badge-dark' : 'badge-light')}>1 Year</span>
			{/* <span onClick={() => props.setChartPeriodSelector('6m')} className={"badge border mr-1 " + (props.chartPeriodSelector === "6m" ? 'badge-dark' : 'badge-light')}>6 Months</span>
			<span onClick={() => props.setChartPeriodSelector('1m')} className={"badge border mr-1 " + (props.chartPeriodSelector === "1m" ? 'badge-dark' : 'badge-light')}>1 Month</span>
			<span onClick={() => props.setChartPeriodSelector('1w')} className={"badge border " + (props.chartPeriodSelector === "1w" ? 'badge-dark' : 'badge-light')}>1 Week</span> */}
		</div>
  	)
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site,
    user_id: state.auth.user.id,
    last_report: state.auth.user_details.last_report
  };
};

export default connect(mapStateToProps)(Reports);