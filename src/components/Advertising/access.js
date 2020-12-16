import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const Access = () => (
  <div className="advertising-page advertising-access-page">

    <div className="top-block-container mb-5">
      <div className="top-block text-center py-5">
        <h3 className="regular-heading"><span className="store-heading" style={{fontSize: '2rem'}}>Articles</span> Advertising</h3>
        <p>Affordable, effective, non-invasive advertising for small to medium sized business's that practice ethical policy.</p>
      </div>
    </div>

    <div className="container">

      <div className="card mb-5">

        <div className="card-header">
          Advertiser Sign In
        </div>

        <div className="card-body">

          <div className="form-group articles">
            <label for="address">Access Text</label>
            <input className="form-control with-label" onChange={(e) => {this.changeAgeFilterOption('range', 'start', e)}} name="age_range_start" id="age_range_start" type="text" value=""/>
          </div>

          <div className="form-group articles">
            <label for="address">Access Code</label>
            <input className="form-control with-label" onChange={(e) => {this.changeAgeFilterOption('range', 'start', e)}} name="age_range_start" id="age_range_start" type="text" value=""/>
          </div>

          <Link to={ROUTES.ADVERTISING_MANAGE}><div className="btn btn-articles-light alt w-100">Sign In</div></Link>

        </div>

        <div className="card-footer d-none">

        </div>

      </div>

    </div>

    <div className="filters-container">

      <div className="filters-content container">

        <div className="text">Thanks to advertisers like you, Articles has raised $0.00 for our platform.</div>
  
        <div className="w-100 d-flex justify-content-around align-items-center">
          <div className="filter"><i className="fas fa-2x fa-user-friends"></i> 1 Employee</div>
          <div className="filter"><i className="fas fa-2x fa-male"></i> 10 Users</div>
          <div className="filter">
            <i className="fas fa-2x fa-newspaper"></i>
            <div className="d-flex flex-column">
              <div>121 News Documents</div>
              <div style={{fontSize: '0.7rem'}}>~ 5 added a week</div>
            </div>
          </div>
          <div className="filter"><i className="fas fa-2x fa-flag-usa"></i> A Better Future</div>
        </div>

      </div>

    </div>

  </div>
);

export default Access