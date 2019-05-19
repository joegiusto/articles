import React from 'react';
import ArticlesReportsNotifications from './ArticlesReportNotification';
import { connect } from 'react-redux';
import { DateRangePicker } from 'react-dates';
import { Link } from "react-router-dom";

const ArticlesReports = (props) => (
  <div className='container'>
    <div className="page-title">Transparency Reports</div>
    <div className="page-subtitle">At Articles everthing that can be transparent will be from day one. Payrole, so our employees know they are getting paid similir to what other people in thier department and experecne level are being paid. Sales, sales help suport and drive our platform so it is only fair for those who but to not only see they are helping but to also see where thier money is going to. Donations, in and out we want complete transparency so our supporters know who we take in money from as well where it goes. Lastly expenses, elected representative spending $2,500 in a single day? That doesn't sound fair at all. Obviously we have operating cost but we are mindful to the   etc...</div>

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

    <div className='row'>

      <div className="col-12 col-lg-6 pt-3">
        <div className='border border-primary'>
          <p className='alert alert-primary d-flex justify-content-between'> <span>Clothing Sales: $35.00</span> <span>See All</span></p>
      
          <table className={props.site.ui_mode === 'day' ? 'table table-hover':'table table-dark'}>
            <thead>
              <tr>
                <th scope="col">Total</th>
                <th scope="col">First</th>
                <th className='text-right' scope="col">Item</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <th scope="row">$10.00</th>
                <td>Joe</td>
                <td className='text-right'><a href="#">#70403551</a></td>
              </tr>

              <tr>
                <th scope="row">$7.00</th>
                <td>Jacob</td>
                <td className='text-right'><a href="#">#50343551</a></td>
              </tr>

              <tr>
                <th scope="row">$18.00</th>
                <td>Larry</td>
                <td className='text-right'><a href="#">#20403551</a></td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 col-lg-6 pt-3">
        <div className='border border-primary'>
          <p className='alert alert-primary'>Donations: $400.00</p>
      
          <table className={props.site.ui_mode === 'day' ? 'table table-hover':'table table-dark'}>
            <thead>
              <tr>
                <th scope="col">Amount</th>
                <th scope="col">First</th>
                <th className='text-right' scope="col">Message</th>
              </tr>
            </thead>
            <tbody>

              <tr>
                <th scope="row">$200.00</th>
                <td>Joey</td>
                <td className='text-right'>Great Work!</td>
              </tr>

              <tr>
                <th scope="row">$150.00</th>
                <td>Jacob</td>
                <td className='text-right'>@someoneshandle</td>
              </tr>

              <tr>
                <th scope="row">$50.00</th>
                <td>Larry</td>
                <td className='text-right'>(Not Approved)</td>
              </tr>

            </tbody>
          </table>
        </div>
      </div>

      <div className="col-12 col-lg-6 pt-3">
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
      </div>

      <div className='w-100'></div>

      <div className="col-12 pt-3">
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
      </div>

    </div>

    <p></p>
    <p></p>
  </div>
);

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site
  };
};

export default connect(mapStateToProps)(ArticlesReports);