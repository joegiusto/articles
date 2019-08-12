import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { Link } from "react-router-dom";
import { withFirebase } from '../Firebase';
import { employeeList, sales, donations, expenses } from "../../sample_data/sampleData";
import moment from 'moment';
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

const Reports = (props) => (

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

          <div className='text-muted'>*All content for demo purposes.</div>

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
                  <td id="posted-transactions" class="text-bold">+ $50.00</td>
                </tr>
                <tr class="statement-summary">
                  <th scope="row">Clothing Sales</th>
                  <td id="previous-balance" class="text-bold">+ $0.00</td>
                </tr>
                <tr>
                  <th scope="row">Ad Revenue</th>
                  <td id="payments-credits" class="text-bold">+ $0.00</td>
                </tr>

                <tr class="statement-summary expense">
                  <th scope="row">Purchases</th>
                  <td id="purchases-statement" class="text-bold">- 10.60</td>
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
          <h4>Account Balance:</h4>
          <h2 className="text-muted">+ $39.34</h2>
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
                    {/* <td><Link to={'sale/' + object.id}>#{pad(object.id, 3)}</Link></td> */}
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

class DonationTableBase extends Component {
   constructor(props) {
     super(props);

      this.state = {
        text: '',
        loading: false,
        donationsFirebase: [],
        limit: 5,
      };
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

  render () {
    const { donationsFirebase, loading } = this.state;

    console.log(donationsFirebase);

    return (

      <div>
        {loading && <div>Loading ...</div>}
        {donationsFirebase ? (
        <div>
          <StyledDonationList
            donationsFirebase={donationsFirebase}
          />
        </div>
        ) : (
        <div>There are no donations yet ...</div>
        )}

      </div>

    )
  }
}

const StyledDonationList = ({donationsFirebase}) => (
  <div className="full-table">
    TOTAL AMOUNT: {(donationsFirebase.reduce((a, b) => a + (b['amount'] || 0), 0) / 100).toFixed(2)}
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
        {donationsFirebase.map(donation => (
          <StyledDonationItem
            key={donation.uid}
            donation={donation}
          />
        ))}
      </tbody>
    </table>
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

export default connect(mapStateToProps)(Reports);