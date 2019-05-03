import React from 'react';
import { connect } from 'react-redux';
import { Link } from "react-router-dom";

const ArticlesReports = (props) => (
  <div className='container'>
    <h1>Transparency Reports</h1>

    <div>

      <div className="input-group mb-3">
        <div className="input-group-prepend">
          <button className="btn btn-outline-secondary dropdown-toggle" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">Date</button>
          <button className="btn btn-outline-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">04/01/2019</button>
          <button className="btn btn-outline-secondary" type="button" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">04/30/2019</button>
          <div className="dropdown-menu">
            <a className="dropdown-item" href="#">Action</a>
            <a className="dropdown-item" href="#">Another action</a>
            <a className="dropdown-item" href="#">Something else here</a>
            <div role="separator" className="dropdown-divider"></div>
            <a className="dropdown-item" href="#">Separated link</a>
          </div>
        </div>
        {/*<input type="text" className="form-control" aria-label="Text input with dropdown button"/>*/}
      </div>


  <div className="toast d-none d-xl-block" data-autohide="false" style={{position: 'fixed', bottom: '20px', right: '20px', opacity: '1', width: '300px'}}>
    <div className="toast-header">
      <img src="..." className="rounded mr-2" alt="..."/>
      <strong className="mr-auto">Clothing Sale</strong>
      <small>10 mins ago</small>
      <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">
      Joe from NY just purchased a <a href="">Shirt</a>
    </div>
  </div>

  <div className="toast d-none d-xl-block" data-autohide="false" style={{position: 'fixed', bottom: '120px', right: '20px', opacity: '1', width: '300px'}}>
    <div className="toast-header">
      <img src="..." className="rounded mr-2" alt="..."/>
      <strong className="mr-auto">Expense</strong>
      <small>3 mins ago</small>
      <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">
      Money was spent on advertiseing materials
    </div>
  </div>

  <div className="toast d-none d-xl-block" data-autohide="false" style={{position: 'fixed', bottom: '235px', right: '20px', opacity: '1', width: '300px'}}>
    <div className="toast-header">
      <img src="..." className="rounded mr-2" alt="..."/>
      <strong className="mr-auto">Donation</strong>
      <small>1 mins ago</small>
      <button type="button" className="ml-2 mb-1 close" data-dismiss="toast" aria-label="Close">
        <span aria-hidden="true">&times;</span>
      </button>
    </div>
    <div className="toast-body">
      John from Idaho donated $5.00
      <div className="card">
        <div className="card-header py-1">
          Message:
        </div>
        <div className="card-body py-1">
          Keep it up!
        </div>
      </div>
    </div>
  </div>


      {/*<div className="btn-group btn-group-toggle" data-toggle="buttons">
        <label className="btn btn-secondary active">
          <input type="radio" name="options" id="option1" autocomplete="off" checked /> Branch
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option2" autocomplete="off"/> Clothing
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option3" autocomplete="off"/> News
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option3" autocomplete="off"/> Party
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option3" autocomplete="off"/> Mesh
        </label>
        <label className="btn btn-secondary">
          <input type="radio" name="options" id="option3" autocomplete="off"/> Other
        </label>
      </div>*/}

    </div>

    <div className='row'>

      <div className="col-12 col-lg-6 pt-3">
        <div className='border border-primary'>
          <p className='alert alert-primary d-flex justify-content-between'> <span>Clothing Sales: $35.00</span> <span>See All</span></p>
      
          <table className={props.site.ui_mode == 'day' ? 'table table-hover':'table table-dark'}>
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
                <th scope="row"><Link to="/employees/1">#1</Link></th>
                <td>Joey Giusto</td>
                <td>$203.45</td>
                <td className='text-right'>Admin</td>
              </tr>
              <tr>
                <th scope="row"><Link to="/employees/2">#2</Link></th>
                <td>John Doe</td>
                <td>$75.00</td>
                <td className='text-right'>IT</td>
              </tr>
              <tr>
                <th scope="row"><Link to="/employees/3">#3</Link></th>
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