import React from 'react';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../constants/routes';
import gone from '../../assets/img/404.jpg'

const EmployeePage = ({match}) => (
  <div className="not-found-page">

    <div className="container">
      <div className="row h-100 justify-content-center">
        <div className="col-sm-6 my-auto">
  
          <div className="img-container">
            <img className="image" src={gone} alt=""/>
            <a href="http://caglecartoons.com/cartoonist/bob-englehart" rel="noopener noreferrer" target="_blank">
              <div className="credit">
                Credit: Bob Englehart
              </div>
            </a>
          </div>
  
          <div className="card shadow-sm">
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

  </div>
);

export default EmployeePage;