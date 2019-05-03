import React from 'react';

const Issues = () => (
  <div className='container text-center'>
    <div className="mb-5">
      <h1>Issues</h1>
      <p>Overview of the most pressing issues and status updates on them. </p>
    </div>
    <div className="row">
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm">
          <div>Title:</div>
          <div>History:</div>
          <div>House Support:</div>
          <div>Senate Support:</div>
          <button className="btn btn-black">Contact Rep</button>
        </div>
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>      
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>      
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>      
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>      
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>      
      </div>
      <div className="col-12 col-md-6">
        <div className="issue-item shadow-sm"></div>      
      </div>
    </div>
  </div>
);

export default Issues;