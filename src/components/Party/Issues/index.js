import React from 'react';

const Issues = () => (
  <div className='container issues-page text-center'>

    <div className="mt-4 mb-5">
      <h1>Issues</h1>
      <p>Overview of the most pressing issues and status updates on them. </p>
    </div>

    <div className="row">

      <div className="col-md-4">
        <div className="g-card effect8">
          <div className="g-card-background"></div>

        </div>
      </div>

      <div className="col-md-4">
        <div className="g-card effect8">
          <div className="g-card-background"></div>
          <div className="g-card-text-card">
            <div className="top-text">G-Eazy  FT. KYLE</div>
            <div className="mid-text">LAST NIGHT</div>
            <div className="bottom-text">PRODUCED BY G-EAZY</div>
          </div>
        </div>
      </div>

      <div className="col-md-4">
        <div className="g-card effect8">
          <div className="g-card-background"></div>

        </div>
      </div>

      <div className="col-12 col-md-6 mt-5">
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