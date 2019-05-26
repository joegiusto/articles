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

const ArticlesReports = (props) => (

    <div className='container'>

      {/* <div className="page-title-wrapper"> */}
        <div className="page-title" id="see-through">Transparency Reports</div>
      {/* </div> */}

      {/* <div className="shadow-extension"> */}
        <div className="page-subtitle mb-5">At Articles everthing that can be transparent will be from day one. Payrole, so our employees know they are getting paid similir to what other people in thier department and experecne level are being paid. Sales, sales help suport and drive our platform so it is only fair for those who but to not only see they are helping but to also see where thier money is going to. Donations, in and out we want complete transparency so our supporters know who we take in money from as well where it goes. Lastly expenses, elected representative spending $2,500 in a single day? That doesn't sound fair at all. Obviously we have operating cost but we are mindful to the   etc...</div>

        <div className='text-muted'>All content for demo purposes.</div>
        {/* <div className="btn btn-custom-white">learn more</div> */}
      {/* </div> */}
      
  
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
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Yesterday</a>
            <a className="dropdown-item" href="#">Last Week</a>
            <a className="dropdown-item" href="#">Last Month</a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">YTD</a>
          </div>
        </div>
        {/*<input type="text" className="form-control" aria-label="Text input with dropdown button"/>*/}
      </div>
  
      <div className='row justify-content-center'>

        {/* <div className='col-lg-2 table-description pt-3'>
          Hello
        </div> */}
  
        <div className="col-12 col-lg-10 pt-3">

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

        <hr className='w-100 mt-3'/>

        {/* <div className='col-lg-2 table-description pt-3'>
          Hello
        </div> */}

        <div className="col-12 col-lg-10 pt-3">

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

        <hr className='w-100 mt-3'/>

        {/* <div className='col-lg-2 table-description pt-3'>
          Hello
        </div> */}

        <div className="col-12 col-lg-10 pt-3">

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
                  <td style={{color: 'red'}}>{'Redacted'}</td>
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

        <hr className='w-100 mt-3'/>

        {/* <div className='col-lg-2 table-description pt-3'>
          Hello
        </div> */}

        <div className="col-12 col-lg-10 pt-3">

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
  
        {/* <div className="col-12 col-lg-6 pt-3">
          <div className='border border-warning'>
            <p className='alert alert-warning'>May Payrole: $578.55</p>
        
            <table className={props.site.ui_mode === 'day' ? 'table table-striped':'table table-dark'}>
              <thead>
                <tr>
                  <th scope="col">ID</th>
                  <th scope="col">Employee</th>
                  <th scope="col">Amount</th>
                  <th className='text-right' scope="col">Role</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <th scope="row"><Link className="wiggle" to="/employees/1">#1</Link></th>
                  <td>Joey Giusto</td>
                  <td>$203.45</td>
                  <td className='text-right'>Admin</td>
                </tr>
                <tr>
                  <th scope="row"><Link className="wiggle" to="/employees/2">#2</Link></th>
                  <td>John Doe</td>
                  <td>$75.00</td>
                  <td className='text-right'>IT</td>
                </tr>
                <tr>
                  <th scope="row"><Link className="wiggle" to="/employees/3">#3</Link></th>
                  <td><span className='redacted' style={{color: 'red'}}>*Redacted*</span></td>
                  <td>$300.10</td>
                  <td className='text-right'>Finance</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div> */}
  
        {/* <div className='w-100'></div> */}
  
        {/* <div className="col-12 pt-3">
          <div className='border border-danger'>
            <p className='alert alert-danger'>Expenses: $2150.00</p>
        
            <div className="table-responsive">
              <table className={props.site.ui_mode === 'day' ? 'table table-striped':'table table-dark'}>
                <thead>
                  <tr>
                    <th scope="col">Transaction ID</th>
                    <th scope="col">Paid To</th>
                    <th scope="col">Amount</th>
                    <th className='text-right' scope="col">Date</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <th scope="row"><a href='#'>#0001</a></th>
                    <td>Oriental Trading</td>
                    <td>$2000.00</td>
                    <td className='text-right'>04/01/2019</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href='#'>#0002</a></th>
                    <td>Amazon Web Services</td>
                    <td>$75.00</td>
                    <td className='text-right'>04/17/2019</td>
                  </tr>
                  <tr>
                    <th scope="row"><a href='#'>#0003</a></th>
                    <td>Supplies</td>
                    <td>$75.00</td>
                    <td className='text-right'>04/21/2019</td>
                  </tr>
                </tbody>
              </table>
            </div>
  
          </div>
        </div> */}
  
      </div>

    </div>

);

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site
  };
};

export default connect(mapStateToProps)(ArticlesReports);