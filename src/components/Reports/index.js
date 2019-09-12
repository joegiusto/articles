import React, { useState } from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { Link } from "react-router-dom";
import { withFirebase } from '../Firebase';
import { employeeList, sales, donations, expenses } from "../../sample_data/sampleData";
import moment from 'moment';
import Chart from 'chart.js';
import Component from 'react-live-clock/lib/Component';

function weeksAgoStart(weeks) {
  return (
    moment().subtract(weeks, 'weeks').startOf('isoWeek').format('LL')
  )
};

function weeksAgoEnd(weeks) {
  return (
    moment().subtract(weeks, 'weeks').endOf('isoWeek').format('LL')
  )
};

function pad(n, width, z) {
  z = z || '0';
  n = n + '';
  return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

function getWidth() {
  return Math.max(
    document.body.scrollWidth,
    document.documentElement.scrollWidth,
    document.body.offsetWidth,
    document.documentElement.offsetWidth,
    document.documentElement.clientWidth
  );
}

window.onresize = function(event) {
  console.log(getWidth());

  if (getWidth() > 1000) {
    var info = document.getElementById("info");
    info.className += " expanded";
    var info = document.getElementById("footer");
    info.className += " d-none";
  } else {
    var info = document.getElementById("info");
    info.classList.remove("expanded");
    var info = document.getElementById("footer");
    info.classList.remove('d-none');
  }

} 

class ExampleChart extends Component {
  constructor(props) {
    super(props);

    this.state = {
      chartTitle: this.props.chartTitle,
      type: this.props.type
    };
  }

  componentDidMount() {
    var ctx = document.getElementById(this.state.chartTitle);
    var myChart = new Chart(ctx, {
        type: this.state.type,
        data: {
            labels: ['April', 'May', 'June', 'July', 'August', 'September'],
            datasets: [{
                label: '$ in Donations',
                data: [0, 0, 0, 50, 20, 50],
                backgroundColor: [
                    'rgba(63, 191, 127, 0.2)',
                    'rgba(54, 162, 235, 0.2)',
                    'rgba(255, 206, 86, 0.2)',
                    'rgba(75, 192, 192, 0.2)',
                    'rgba(153, 102, 255, 0.2)',
                    'rgba(255, 159, 64, 0.2)'
                ],
                borderColor: [
                    'rgba(63, 191, 127, 1)',
                    'rgba(54, 162, 235, 1)',
                    'rgba(255, 206, 86, 1)',
                    'rgba(75, 192, 192, 1)',
                    'rgba(153, 102, 255, 1)',
                    'rgba(255, 159, 64, 1)'
                ],
                borderWidth: 1,
                lineTension: 0.1,
            },
            {
              label: '$ in Expenses',
              data: [0, 0, 0, 20, 2, 10],
              backgroundColor: [
                  'rgba(255, 99, 132, 0.2)',
                  'rgba(54, 162, 235, 0.2)',
                  'rgba(255, 206, 86, 0.2)',
                  'rgba(75, 192, 192, 0.2)',
                  'rgba(153, 102, 255, 0.2)',
                  'rgba(255, 159, 64, 0.2)'
              ],
              borderColor: [
                  'rgba(255, 99, 132, 1)',
                  'rgba(54, 162, 235, 1)',
                  'rgba(255, 206, 86, 1)',
                  'rgba(75, 192, 192, 1)',
                  'rgba(153, 102, 255, 1)',
                  'rgba(255, 159, 64, 1)'
              ],
              borderWidth: 2,
              lineTension: 0.1,
          }]
        },
        options: {
            scales: {
                yAxes: [{
                    ticks: {
                        beginAtZero: true
                    }
                }]
            }
        }
    });
  }

  render() {
    return (
      <canvas className='chart' id={this.state.chartTitle} width="100%" height="45px"></canvas>
    )
  }

}

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
          return(<h1>Overall Clothing Sales Report</h1>)
        case 'clothing-preorders':
          return(<PreorderTable/>)
        default:
          return(<h1>Specific Clothing Sales Report</h1>)
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
     <span onClick={() => this.setTableSelector(dataValue)} className={"selection " + (this.state.tableSelector === dataValue ? 'selection-active' : '')}>{dataValue}</span>
   )
 }

  /**
  * subTableSelectorChoice - Creates a selector under a table selector
  * @param {number} dataValue description
  * @param {string} printValue description
  * @param {boolean} redirect boolean default:false, if true then 4th arg needed
  * @param {Object} location description
  * 
  * @return {[type]}      [description]
  */
  subTableSelectorChoice(dataValue, printValue, redirect, location) {
    return(
      <span onClick={() => this.setSubTableSelector(dataValue, redirect, location)} className={"selection " + (this.state.subtableSelector === dataValue ? 'selection-active' : '')}>{redirect ? <i style={{marginRight: '2.5px'}} className="fas fa-link"></i> : ''}{printValue}</span>
    )
  }
 
 render() {
   return (
    <div className="reports-page">

      <div className="fixed-total dual-header">
        <span>Help <i class="far fa-question-circle"></i></span>
        <span className="total">+$39.34</span>
      </div>

      <div className="fixed-componsation-50"></div>

      <div className="container-fluid">

        <div className="row">

          <div className="col-12 col-md-4">

            <div className="live">
              <span class="recording-dot d-inline-block"></span>
              <span>Live</span>
            </div>

            <div id='info' className={"info " + (this.state.menuExpanded ? 'expanded' : '')}>

              <div className="normal"></div>

              <div className="extra">
                <h5>Breakdown</h5>

                <table class="table table-hover table-sm">

                  {/* <thead>
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">First</th>
                      <th scope="col">Last</th>
                      <th scope="col">Handle</th>
                    </tr>
                  </thead> */}

                  <tbody>
                    <tr>
                      <th scope="row">Last Month Balance</th>
                      <td className="text-right">$0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">Donations</th>
                      <td className="text-right">$0.00</td>
                    </tr>
                    <tr>
                      <th scope="row">Clothing Sales</th>
                      <td className="text-right">$0.00</td>
                    </tr>
                  </tbody>
                </table>

                <p>Donations</p>
                <p>Clothing Sales</p>
                <p>Ad Revenue</p>
                <p>Purchases</p>
                <p>Payroles</p>
              </div>

              <div className="report">
                {/* Question about one of purchases and think we should provide more details? By all means <a href=''>let us know</a> */}
              </div>

              <div id='footer' onClick={() => this.setState({menuExpanded: !this.state.menuExpanded})} className={"footer"}>
                <span className="mr-2">CLICK FOR {(this.state.menuExpanded === false ? 'MORE' : 'LESS')}</span>
                <i class={"fas fa-caret-down " + (this.state.menuExpanded ? 'expanded' : '')}></i>
              </div>

            </div>
          </div>
  
          <div className="col-12 col-md-8 col-lg-6">
            <div className="table-selector">
    
              <div className="main">
                {this.tableSelectorChoice('donations')}
                {this.tableSelectorChoice('clothing')}
                {this.tableSelectorChoice('payrole')}
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

          <div className="d-none col-12 col-md-3">
            <div className="row">
              <div className="col-12 col-md-12"><ExampleChart type='line' chartTitle={'chartOne'}/></div>
              <div className="col-12 col-md-12"><ExampleChart type='bar' chartTitle={'chartTwo'}/></div>
              {/* <div className="col-6 col-md-12"><ExampleChart type='radar' chartTitle={'chartThree'}/></div> */}
              {/* <div className="col-6 col-md-12"><ExampleChart type='bubble' chartTitle={'chartFour'}/></div> */}
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
          <th scope="row">Payrole</th>
          <td>Mark</td>
          <td>Otto</td>
          <td>@mdo</td>
        </tr>
        <tr>
          <th scope="row">Payrole</th>
          <td>Jacob</td>
          <td>Thornton</td>
          <td>@fat</td>
        </tr>
        <tr>
          <th scope="row">Payrole</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">Reoccuring</th>
          <td>Email</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">Reoccuring</th>
          <td>Domain</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
        <tr>
          <th scope="row">Utilities</th>
          <td>Larry</td>
          <td>the Bird</td>
          <td>@twitter</td>
        </tr>
      </tbody>
    </table>
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
    <table className='table articles-table mt-2 table-bordered'>
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
          <td colspan="2" className="border-right-0 table-articles-head">

              <div className="results-dual-header">

                <div className="page noselect">
                  <i class="fas fa-chevron-circle-left"></i>
                  Page 0/0
                  <i style={{marginLeft: '10px'}} class="fas fa-chevron-circle-right"></i>
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

          <td colspan="1" className="border-right-0 text-right table-articles-head">Total:</td>
          <td colspan="1" className="border-left-0 table-articles-head">$180.00</td>
        </tr>

      </tbody>

    </table>
    <div>*Preorder and unfinalized sales are not included in any reports.</div>
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

function Reports () {

  const [donationsTotal, setDonationsTotal] = useState(0);
  const [salesTotal, setSalesTotal] = useState(0);
  const [adRevenueTotal, setAdRevenueTotal] = useState(0);
  const [expensesTotal, setExpensesTotal] = useState(0);
  const [payroleTotal, setPayroleTotal] = useState(0);

  return (
    <div className='container-fluid'>

      <div className='row justify-content-between pt-4'>

        <div className="col-12 col-lg-3 mt-3 overflow-hidden">

          <div className='reports-left-panel'>

            <div className="page-title-wrapper">
              <div className="page-title" id="transparency">Transparency</div>
              <div className="page-title" id='reports'>Reports</div>
            </div>

            <div className="page-subtitle mt-5 mb-5">At Articles everthing that can be transparent will be from day one. Payrole, so our employees know they are getting paid similir to what other people in thier department and experecne level are being paid. Sales, sales help suport and drive our platform so it is only fair for those who but to not only see they are helping but to also see where thier money is going to. Donations, in and out we want complete transparency so our supporters know who we take in money from as well where it goes. Lastly expenses, elected representative spending $2,500 in a single day? That doesn't sound fair at all. Obviously we have operating cost but we are mindful to the etc...</div>

            Account Balance: $50.00

            <div className="flex-grow report-active-explanation mb-5 d-none d-lg-block">Current table the user is looking at will be explained here. For example if the user is scrolled down to donations then some examples of donations will be given. This box is hidden on mobile phones.</div>

            <div className="input-group mb-3">
              <div className="input-group-prepend">
                <button className="btn btn-outline-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Date Range</button>
                {/* <DateRangePicker
                date={this.state.createdAt}
                onDateChange={this.onDateChange}
                focused={this.state.calendarFocused}
                onFocusChange={this.onFocusChange}
                numberOfMonths={1}
                isOutsideRange={() => false}
                /> */}
                {/* <div className="dropdown-menu">
                  <a className="dropdown-item" href="#">Yesterday</a>
                  <a className="dropdown-item" href="#">Last Week</a>
                  <a className="dropdown-item" href="#">Last Month</a>
                  <div role="separator" className="dropdown-divider"></div>
                  <a className="dropdown-item" href="#">YTD</a>
                </div> */}
              </div>
            </div>

          </div>

        </div>

        <div className="col-12 col-lg-3 mb-3">
          <div className="report-details">

            <div className="live-tag">
              <span className="recording-dot d-inline-block"></span>
              <span>Live</span>
            </div>

            <div class="account-activity-summary">

              <h2 class="recent-summary">
                <span class="summary-title d-block">Activity Summary</span>
                <span id="statement-dates" class="statement-summary text-muted">Current Statement ({moment().startOf('month').format('MMM D')} - {moment().endOf('month').format('MMM D')})</span>
              </h2>

              <button className="btn btn-articles-light mr-1">Print</button>
              <button className="btn btn-articles-light">Download</button>

              {/* <a href="#" class="summary-links preventDefaultBehaviour print-link"><i class="ra-icons icon-print"></i>Print<span class="sr-only">opens a popup window</span></a> */}
                
              {/* <a href="#" class="summary-links download-link preventDefaultBehaviour" data-toggle="modal" data-target=".download-modal"><i class="ra-icons icon-download"></i>Download<span class="sr-only">Opens modal dialog</span></a> */}
              
              {/* <a href="/cardmembersvcs/statements/app/stmtPDF?view=true&amp;date=20190723" class="btn-primary btn-view-statement preventDefaultBehaviour" role="button">View Billing Statement PDF</a> */}
            </div>

            <div className="table-wrap">
              <table>
                <caption class="sr-only">Summary Details</caption>
                <tbody>
                  <tr class="last-month-balance">
                    <th scope="row">Last Month Balance</th>
                    <td id="last-statement-balance" class="text-bold"> $0.00</td>
                  </tr>

                  <tr class="statement-summary">
                    <th scope="row">Donations</th>
                    <td id="posted-transactions" class="text-bold">{donationsTotal >= 0 ? '+':'-'} ${donationsTotal}</td>
                  </tr>
                  <tr class="statement-summary">
                    <th scope="row">Clothing Sales</th>
                    <td id="previous-balance" class="text-bold">{salesTotal >= 0 ? '+':'-'} ${salesTotal}</td>
                  </tr>
                  <tr>
                    <th scope="row">Ad Revenue</th>
                    <td id="payments-credits" class="text-bold">{adRevenueTotal >= 0 ? '+':'-'} ${adRevenueTotal}</td>
                  </tr>

                  <tr class="statement-summary expense">
                    <th scope="row">Purchases</th>
                    <td id="purchases-statement" class="text-bold">{expensesTotal >= 0 ? '+':'-'} ${expensesTotal}</td>
                  </tr>
                  <tr class="statement-summary expense">
                    <th scope="row">Payrole</th>
                    <td id="balance-transfers" class="text-bold">- $0.00</td>
                  </tr>

                  <tr class="this-month-net">
                    <th scope="row">This Month Net</th>
                    <td id="balance-transfers" class="text-bold">+ $39.34</td>
                  </tr>

                  {/* <tr class="statement-summary">
                    <th scope="row">Cash Advances</th>
                    <td id="cash-advances" class="text-bold">+ $0.00</td>
                  </tr> */}
                  {/* <tr class="statement-summary">
                    <th scope="row">Fees Charged</th>
                    <td id="fees-charged" class="text-bold">+ $28.00</td>
                  </tr> */}
                  {/* <tr class="statement-summary">
                    <th scope="row">Interest Charged</th>
                    <td id="interest-charged" class="text-bold">+ $71.22</td>
                  </tr> */}
                </tbody>
              </table>
            </div>
          </div>

          <div className="account-balance">
            <h4>Articles Balance: </h4>
            <h2 className="text-muted"><span style={{color: 'limegreen'}}>+$</span>{100 - 23.57}</h2>
          </div>

        </div>

        <div className="col-12 col-lg-6">
          <div className='reports-right-panel'>

            <div className="full-table">
              <div id="div1-top">
                <div id="div2-top">
                  <div className='dual-header'><h5>Sales</h5></div>
                </div>
              </div>

              <table className='table table-responsive articles-table mb-2 table-bordered'>
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

                </tbody>

              </table>

              <div id="div1">
                <div id="div2">
                  <div className="dual-header">
                    <h5>{sales.length} Sales</h5>
                    <h5>${sales.reduce((a, b) => +a + +b.total, 0).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="full-table pt-4">
              <div id="div1-top">
                <div id="div2-top">
                  <div className='dual-header'><h5>Donations</h5></div>
                </div>
              </div>
              <table className='table table-responsive articles-table mb-2 table-bordered'>
          <thead>
            <tr className="table-articles-head">
              {/* <th scope="col">Donation #</th> */}
              <th scope="col">Date</th>
              <th scope="col">Name</th>
              <th scope="col">Message</th>
              <th className='text-right' scope="col">Amount</th>
            </tr>
          </thead>
          <tbody>

            {donations.map((object, i) =>

              <tr key={i} className="bg-light">
                {/* <td><Link to={'donation/' + object.id}>#{pad(object.id, 3)}</Link></td> */}
                <td>{object.date || 'test'}</td>
                <td>{object.name}</td>
                <td>{object.message}</td>
                <td className='text-right'>${object.amount.toFixed(2)}</td>
              </tr>

            )}

          </tbody>

        </table>
              <div id="div1">
                <div id="div2">
                  <div className="dual-header">
                    <h5>{donations.length} Donations</h5>
                    <h5>${donations.reduce((a, b) => +a + +b.amount, 0).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="my-3 mt-5"><DonationTable/></div>

            <div className="full-table pt-4">
              <div id="div1-top">
                <div id="div2-top">
                  <div className='dual-header'><h5>{moment().format('MMMM')}'s Payrole</h5></div>
                </div>
              </div>

              <table className='table table-responsive articles-table mb-2 table-bordered'>
                <thead>
                  <tr className="table-articles-head">
                    {/* <th scope="col">Employee ID</th> */}
                    <th scope="col">Name</th>
                    <th scope="col">Date</th>
                    <th scope="col">Hours</th>
                    <th scope="col">Department</th>
                    <th className='text-right' scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>

                  <tr key={0} className="bg-light">
                    <td><Link to={'employees/42'}>Joey Giusto</Link></td>
                    <td>{moment().week(27).format('LL') + ' - ' + moment().week(27).endOf('week').format('LL')}</td>
                    <td>...</td>
                    <td>{'Admin'}</td>
                    <td className='text-right'>$0.00</td>
                  </tr>

                  <tr key={1} className="bg-light">
                    <td><Link to={'employees/42'}>Joey Giusto</Link></td>
                    <td>{moment().week(28).format('LL') + ' - ' + moment().week(28).endOf('week').format('LL')}</td>
                    <td>...</td>
                    <td>{'Admin'}</td>
                    <td className='text-right'>$0.00</td>
                  </tr>

                  <tr key={2} className="bg-light">
                    <td><Link to={'employees/42'}>Joey Giusto</Link></td>
                    <td>{moment().week(29).format('LL') + ' - ' + moment().week(29).endOf('week').format('LL')}</td>
                    <td>...</td>
                    <td>{'Admin'}</td>
                    <td className='text-right'>$0.00</td>
                  </tr>

                  <tr key={3} className="bg-light">
                    <td><Link to={'employees/42'}>Joey Giusto</Link></td>
                    <td>{moment().week(30).format('LL') + ' - ' + moment().week(30).endOf('week').format('LL')}</td>
                    <td>...</td>
                    <td>{'Admin'}</td>
                    <td className='text-right'>$0.00</td>
                  </tr>

                  <tr key={4} className="bg-light">
                    <td><Link to={'employees/3'} style={{ color: 'red' }}>Redacted Example</Link></td>
                    <td>{moment().week(30).format('LL') + ' - ' + moment().week(30).endOf('week').format('LL')}</td>
                    <td style={{ color: 'red' }}>Redacted</td>
                    <td>{'Consulting'}</td>
                    <td className='text-right'>$0.00</td>
                  </tr>

                  {/* {donations.map((object, i) => 
    
                    <tr key={i} className="bg-light">
                      <td><Link to={'employees/' + pad(object.id, 3)}>#{pad(object.id, 3)}</Link></td>
                      <td>{object.date || 'test'}</td>
                      <td>{object.name}</td>
                      <td>{object.message}</td>
                      <td className='text-right'>${object.amount.toFixed(2)}</td>
                    </tr>
    
                    )} */}

                </tbody>

              </table>

              <div id="div1">
                <div id="div2">
                  <div className="dual-header">
                    <h5>Payed:</h5>
                    <h5>$0.00</h5>
                  </div>
                </div>
              </div>
            </div>

            <div className="full-table pt-4">
              <div id="div1-top">
                <div id="div2-top">
                  <div className='dual-header'><h5>Expenses</h5></div>
                </div>
              </div>

              <table className='table table-responsive articles-table mb-2 table-bordered'>
                <thead>
                  <tr className="table-articles-head">
                    <th scope="col">Receipt</th>
                    <th scope="col">Date</th>
                    <th scope="col">For</th>
                    <th scope="col">Department</th>
                    <th className='text-right' scope="col">Amount</th>
                  </tr>
                </thead>
                <tbody>

                  {expenses.map((object, i) =>

                    <tr key={i} className="bg-light">
                      <td><a href={object.file}><i class="fas fa-file-invoice-dollar"></i></a></td>
                      <td>{object.date || 'test'}</td>
                      <td>{object.name}</td>
                      <td>{object.department}</td>
                      <td className='text-right'>${object.total.toFixed(2)}</td>
                    </tr>

                  )}

                </tbody>

              </table>

              <div id="div1">
                <div id="div2">
                  <div className="dual-header">
                    <h5>Spent:</h5>
                    <h5>${expenses.reduce((a, b) => +a + +b.total, 0).toFixed(2)}</h5>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

      </div>

    </div>
  );

  

};

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
      <div className="mt-2">
        {loading && <div>Loading ...</div>}
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
          <td colspan="2" className="border-right-0 table-articles-head">

              <div className="results-dual-header">

                <div className="page noselect">
                  <i onClick={() => props.changePage(props.page - 1)} class="fas fa-chevron-circle-left"></i>
                  Page {props.page}/3
                  <i onClick={() => props.changePage(props.page + 1)} style={{marginLeft: '10px'}} class="fas fa-chevron-circle-right"></i>
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

          <td colspan="1" className="border-right-0 text-right table-articles-head">Total:</td>
          <td colspan="1" className="border-left-0 table-articles-head">${(props.donationsFirebase.reduce((a, b) => a + (b['amount'] || 0), 0) / 100).toFixed(2)}</td>
        </tr>
      </tbody>
    </table>

    <div className="donation-snippet">
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
    <td>{moment(donation.createdAt).format('LLL') }</td>
    <td>{donation.name}</td>
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