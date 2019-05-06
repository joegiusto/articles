
 import React from 'react';
 import { connect } from 'react-redux';
 import { DateRangePicker } from 'react-dates';
 import { Link } from "react-router-dom";
 
 const ArticlesReportNotifications = (props) => (

<div>
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
</div>

 );

 export default ArticlesReportNotifications;