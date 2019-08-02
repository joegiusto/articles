import React from 'react';
import { Link } from 'react-router-dom';

const EmployeePage = ({match}) => (
  <div style={{height: '100vh', marginTop: '-50px'}} className="container">
    <div class="row h-100 justify-content-center">
      <div class="col-sm-6 my-auto">
        <div class="card card-block p-5">
          <h1>Page Not Found</h1>
          <p>Please check the address and try again.</p>

          <p className="text-muted mb-0 mt-5">Return To <Link to="">Landing Page</Link></p>
        </div>
      </div>
    </div>
  </div>
);

export default EmployeePage;