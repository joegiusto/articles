import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';

const EmployeePage = ({match}) => (
  <div style={{height: '100vh', marginTop: '-50px'}} className="container">
    <div class="row h-100 justify-content-center">
      <div class="col-sm-6 my-auto">
        <div class="card shadow-sm">
          <div className="card-body">
            <h1>Page Not Found</h1>
            <p>Please check the address and try again.</p>
          </div>
          <div className="card-footer d-flex justify-content-between">
            <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.HOME}>Home Page</Link></p>
            <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.LANDING}>Landing Page</Link></p>
          </div>
        </div>
      </div>
    </div>
  </div>
);

export default EmployeePage;