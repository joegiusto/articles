import React from 'react';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { Link } from "react-router-dom";
import { employeeList, sales, donations, expenses } from "./SampleData";
import moment from 'moment';

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

      <div className="col-12 col-lg-4 mt-3">

        <div className='reports-left-panel'>
          <div className="page-title" id="transparency">Transparency</div>
          <div className="page-title" id='reports'>Reports</div>

          <div className="page-subtitle mt-5 mb-5">At Articles everthing that can be transparent will be from day one. Payrole, so our employees know they are getting paid similir to what other people in thier department and experecne level are being paid. Sales, sales help suport and drive our platform so it is only fair for those who but to not only see they are helping but to also see where thier money is going to. Donations, in and out we want complete transparency so our supporters know who we take in money from as well where it goes. Lastly expenses, elected representative spending $2,500 in a single day? That doesn't sound fair at all. Obviously we have operating cost but we are mindful to the etc...</div>

          <div className="flex-grow report-active-explanation mb-5 d-none d-lg-block">Current table the user is looking at will be explained here. For example if the user is scrolled down to donations then some examples of donations will be given. This box is hidden on mobile phones.</div>

          <div className='text-muted'>*All content for demo purposes.</div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <button className="btn btn-outline-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Date Range</button>
              <DateRangePicker
              // date={this.state.createdAt}
              // onDateChange={this.onDateChange}
              // focused={this.state.calendarFocused}
              // onFocusChange={this.onFocusChange}
              // numberOfMonths={1}
              // isOutsideRange={() => false}
              />
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

      <div className="col-12 col-lg-7">
        <div className='reports-right-panel'>

          <div className="full-table">
            <div id="div1-top">
              <div id="div2-top">
                <div className='dual-header'><h5>Sales</h5></div>
              </div>
            </div>

            <table className='table articles-table mb-2 table-bordered'>
              <thead>
                <tr className="table-articles-head">
                  <th scope="col">Order #</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Order Summary</th>
                  <th className='text-right' scope="col">Total</th>
                </tr>
              </thead>
              <tbody>

                {sales.map((object, i) =>

                  <tr key={i} className="bg-light">
                    <td><Link to={'sale/' + object.id}>#{pad(object.id, 3)}</Link></td>
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

            <table className='table articles-table mb-2 table-bordered'>
              <thead>
                <tr className="table-articles-head">
                  <th scope="col">Donation #</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Message</th>
                  <th className='text-right' scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>

                {donations.map((object, i) =>

                  <tr key={i} className="bg-light">
                    <td><Link to={'donation/' + object.id}>#{pad(object.id, 3)}</Link></td>
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

          <div className="full-table pt-4">
            <div id="div1-top">
              <div id="div2-top">
                <div className='dual-header'><h5>{moment().format('MMMM')}'s Payrole</h5></div>
              </div>
            </div>

            <table className='table articles-table mb-2 table-bordered'>
              <thead>
                <tr className="table-articles-head">
                  <th scope="col">Employee ID</th>
                  <th scope="col">Date</th>
                  <th scope="col">Name</th>
                  <th scope="col">Department</th>
                  <th className='text-right' scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>

                <tr key={0} className="bg-light">
                  <td><Link to={'employees/1'}>#{pad(1, 3)}</Link></td>
                  <td>{weeksAgoStart(1) + ' - ' + weeksAgoEnd(1)}</td>
                  <td>{'Joey'}</td>
                  <td>{'Admin'}</td>
                  <td className='text-right'>$0.00</td>
                </tr>

                <tr key={1} className="bg-light">
                  <td><Link to={'employees/3'}>#{pad(3, 3)}</Link></td>
                  <td>{weeksAgoStart(1) + ' - ' + weeksAgoEnd(1)}</td>
                  <td style={{ color: 'red' }}>{'Redacted'}</td>
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

            <table className='table articles-table mb-2 table-bordered'>
              <thead>
                <tr className="table-articles-head">
                  <th scope="col">Expense #</th>
                  <th scope="col">Date</th>
                  <th scope="col">For</th>
                  <th scope="col">Department</th>
                  <th className='text-right' scope="col">Amount</th>
                </tr>
              </thead>
              <tbody>

                {expenses.map((object, i) =>

                  <tr key={i} className="bg-light">
                    <td><Link to={'sales/' + pad(object.id, 3)}>#{pad(object.id, 3)}</Link></td>
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

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site
  };
};

export default connect(mapStateToProps)(Reports);