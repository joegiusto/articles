import React, { useState } from 'react';
import { connect } from 'react-redux';
// import { DateRangePicker } from 'react-dates';
import { Link } from "react-router-dom";
import { withFirebase } from '../Firebase';
import { employeeList, sales, donations, expenses } from "../../sample_data/sampleData";
import moment from 'moment';
import Chart from 'chart.js';
import Component from 'react-live-clock/lib/Component';

class ImprovedReports extends Component {
  constructor(props) {
    super(props);

     this.state = {
       text: '',
       loading: false,
       donationsFirebase: [],
       limit: 5,
       menuExpanded: false,
       tableSelector: 'donations',
       subtableSelector: ''
     };
  }

  componentDidMount() {
    window.dispatchEvent(new Event('resize'));
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
        return(<DonationTable/>)
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
        return(<ExpenseTable/>)
      case 'payrole':
        return(<PayroleTable/>)
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
        <span>Help <i className="far fa-question-circle"></i></span>
        <span className="total">+$76.37</span>
      </div>

      <div className="fixed-componsation-50"></div>

      <div className="container home-container">

        <div className="row justify-content-center">

          <div className="col-12 col-md-4 col-lg-4">

            <div className="live">
              <span className="recording-dot d-inline-block"></span>
              <span>Live</span>
            </div>

            <div id='info' className={"info " + (this.state.menuExpanded ? 'expanded' : '')}>

              <div className="normal">
                <div className="px-2 pt-4">

                  <div>Current Balance:</div>
                  <h2>$76.37</h2>

                  <div class="progress">
                    <div class="progress-bar bg-success" role="progressbar" style={{width: "90%"}} aria-valuenow="15" aria-valuemin="0" aria-valuemax="100"></div>
                    <div class="progress-bar bg-danger" role="progressbar" style={{width: "10%"}} aria-valuenow="30" aria-valuemin="0" aria-valuemax="100"></div>
                  </div>

                  <div className="text-muted">Revenue compared to Expenses spending</div>

                  <div className="mt-4">

                    <div className="row">
                      <div className="col-6">
                        <div className="stat-card">
                        Donations: $50.00
                        </div>
                        </div>
                      <div className="col-6">
                        <div className="stat-card">
                        Expenses: -$23.63
                        </div>
                        </div>
                      <div className="col-6">
                        <div className="stat-card">
                        Payrole: $00.00
                        </div>
                        </div>
                      <div className="col-6">
                        <div className="stat-card">
                        Yearly Expenses: ~$24
                        </div>
                        </div>
                    </div>

                    <div>Donations: $50.00</div>
                    <div>Expenses: $23.63</div>
                    <div>Payrole: $00.00</div>
                    <div>Yearly Expenses: ~$24</div>
                    <div>Payrole: 0</div>
                    <div>Yearly Expenses: ~$24</div>
                    <div>Payrole: 0</div>
                  </div>

                </div>
              </div>

            </div>

          </div>
  
          <div className="col-12 col-md-8 col-lg-8">

            <div className="search">
              <input className="mt-3 search-input" type="text"/>
              <div className="mt-3 date-input"><i className="fas fa-calendar-alt"></i>2019</div>
            </div>

            <div className="reports-side">
              <div className="table-selector">
      
                <div className="main">
                  {this.tableSelectorChoice('donations')}
                  {this.tableSelectorChoice('clothing')}
                  {this.tableSelectorChoice('payrole')}
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
                  {this.subTableSelectorChoice('expenses-payrole', 'payrole', true, {tableSelector: 'payrole'})}
                  {this.subTableSelectorChoice('expenses-production-inventory', 'inventory')}
                  {this.subTableSelectorChoice('expenses-reoccuring', 'reoccuring')}
                  {this.subTableSelectorChoice('expenses-utilities', 'utilities')}
                </div>
      
                <div className={"sub sub-payrole " + (this.state.tableSelector === 'payrole' ? '' : 'd-none')}>
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

        </div>

      </div>
    </div>
   )
  }
}

function ExpenseTable () {
  return (
    <div className="px-1">
      <table class="table table-bordered">
      <thead>
        <tr>
          <th scope="col">Receipt</th>
          <th scope="col">Date</th>
          <th scope="col">For</th>
          <th scope="col">Total</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row"><a target="_blank" href="https://cdn.articles.media/2019/documents/domain-order.pdf"><i class="fas fa-file-invoice"></i></a></th>
          <td>06/26/2019</td>
          <td>Domain Registration</td>
          <td>$10.66</td>
        </tr>
        <tr>
          <th scope="row"><a target="_blank" href="https://cdn.articles.media/2019/documents/email-order.pdf"><i class="fas fa-file-invoice"></i></a></th>
          <td>08/09/2019</td>
          <td>Email Account</td>
          <td>$12.97</td>
        </tr>
        <tr>
          {/* <th scope="row">3</th> */}
          <td colspan="3">Total</td>
          <td>$23.63</td>
        </tr>
      </tbody>
    </table>
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

function SampleTable () {
  return (
    <table className="table table-sm table-hover mt-2">
      <thead className="thead-dark">
        <tr>
          <th scope="col">#</th>
          <th scope="col">First</th>
          <th scope="col">Last</th>
          <th scope="col">Handle</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <th scope="row">1</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">2</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">3</th>
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

                  <div className="page noselect">
                    <i className="fas fa-chevron-circle-left"></i>
                    Page 0/0
                    <i style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                  </div>
                
                  <span className="results noselect">
                    <span>Results:</span>
                    <span className={"result result-active"}>10</span>
                    <span className={"result"}>50</span>
                    <span className={"result"}>100</span>
                    <span className={"result"}>250</span>
                  </span>

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

function ClothingTable () {
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

          <tr>
            <td colspan="4">No clothing sales yet to report for this category</td>
          </tr>

          {/* {sales.map((object, i) =>

            <tr key={i} className="bg-light">
              <td>{object.date || 'test'}</td>
              <td>{object.name}</td>
              <td>{object.note}</td>
              <td className='text-right'>${object.total.toFixed(2)}</td>
            </tr>

          )} */}

          <tr>
            <td colSpan="2" className="border-right-0 table-articles-head">

                <div className="results-dual-header">

                  <div className="page noselect">
                    <i className="fas fa-chevron-circle-left"></i>
                    Page 0/0
                    <i style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                  </div>
                
                  <span className="results noselect">
                    <span>Results:</span>
                    <span className={"result result-active"}>10</span>
                    <span className={"result"}>50</span>
                    <span className={"result"}>100</span>
                    <span className={"result"}>250</span>
                  </span>

                </div>

            </td>

            <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
            <td colSpan="1" className="border-left-0 table-articles-head">$00.00</td>
          </tr>

        </tbody>

      </table>
    </div>
    <div className="pl-2 pb-2 d-none">Preorder and unfinalized sales are not included in any reports.</div>
    </>
  )
}

function PayroleTable () {
  return (
    <div>
      <p className="mt-2">We currently do not have any employee under payrole but this is a sample of what an entry may look like.</p>
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

    this.props.firebase
    .donations()
    .orderByChild('createdAt')
    .on('value', snapshot => {
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

    return (
      <div>
        {loading && <div className="p-2">Loading data...</div>}
        {donationsFirebase ? (
        <div>
          <StyledDonationList
            donationsFirebase={donationsFirebase}
            changeLimit={this.changeLimit}
            changePage={this.changePage}
            limit={limit}
            page={page}
          />
        </div>
        ) : (
        <div>There are no donations yet ...</div>
        )}

      </div>
    )
  }
}

const StyledDonationList = (props) => (
  <div className="full-table">
    <table className="table articles-table table-bordered">
      <thead>
        <tr className="table-articles-head">
          {/* <th scope="col">DONATION ID</th> */}
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
          />
        ))}
        <tr>
          <td colSpan="2" className="border-right-0 table-articles-head">

              <div className="results-dual-header">

                <div className="page noselect">
                  <i onClick={() => props.changePage(props.page - 1)} className="fas fa-chevron-circle-left"></i>
                  Page {props.page}/3
                  <i onClick={() => props.changePage(props.page + 1)} style={{marginLeft: '10px'}} className="fas fa-chevron-circle-right"></i>
                </div>
              
                <span className="results noselect">
                  <span>Results:</span>
                  <span onClick={() => props.changeLimit(10)} className={"result" + (props.limit === 10 ? ' result-active' : '')}>10</span>
                  <span onClick={() => props.changeLimit(50)} className={"result" + (props.limit === 50 ? ' result-active' : '')}>50</span>
                  <span onClick={() => props.changeLimit(100)} className={"result" + (props.limit === 100 ? ' result-active' : '')}>100</span>
                  <span onClick={() => props.changeLimit(250)} className={"result" + (props.limit === 250 ? ' result-active' : '')}>250</span>
                </span>

              </div>

          </td>

          <td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td>
          <td colSpan="1" className="border-left-0 table-articles-head">${(props.donationsFirebase.reduce((a, b) => a + (b['amount'] || 0), 0) / 100).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <div className="donation-snippet d-none">
      {/* <header><h1>Consider Donating!</h1></header> */}
      <p>All donations go towards supporting the platform and encouraging more transparency and voice in American Politics.<br/><span>The next revoulution needs you!</span></p>
      <div className="dual-header">
        <button className="mt-2 btn btn-lg btn-articles-light">Donate</button>
        {/* <div className='raised'>So far <span>$100.00</span> was raised by the people.</div> */}
      </div>
    </div>

  </div>
)

const StyledDonationItem = ({donation}) => (
  <tr>
    {/* <th scope="row">{donation.uid}</th> */}
    <td>{moment(donation.createdAt).format('LL') }</td>
    <td>{donation.name.split(" ")[0] + " " + (donation.name.split(' ')[1]).charAt(0)}</td>
    <td>{donation.note === "match" ? (<div><span role="img" aria-label="emoji">⭐</span>Matched</div>) : (<div>{donation.note}</div>) }</td>
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

export default connect(mapStateToProps)(ImprovedReports);