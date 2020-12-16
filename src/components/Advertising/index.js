import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const Advertising = () => (
  <div className="advertising-page">

    <div className="top-block-container mb-5">
      <div className="top-block text-center py-5">
        <h3 className="regular-heading"><span className="store-heading" style={{fontSize: '2rem'}}>Articles</span> Advertising</h3>
        <p>Affordable, effective, non-invasive advertising for small to medium sized business's that practice ethical policy.</p>
      </div>
    </div>

    <div className="container">
      <div className="video-block d-flex my-5">
  
        <div className="embed-responsive embed-responsive-16by9">
          <iframe src="https://www.youtube-nocookie.com/embed/bXcSLI58-h8" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
        </div>
  
        <div className="video-action">
  
          <div className="card">
            <h5 className="starting-at">Starting at</h5>
            <h5 className="price"><span className="enlarge">$50</span> per month</h5>
            <div className="text-muted">CPC $0.50 - Guaranteed 100 clicks</div>
            <div className="arrow">
              <i className="fas fa-caret-down mr-0"></i>
            </div>
          </div>
  
          <div className="mt-5 btn btn-articles-light btn-lg w-100">Get Started</div>

          <Link to={ROUTES.ADVERTISING_ACCESS}><div className="mt-1 btn btn-link btn-lg w-100"><i className="fas fa-sign-in-alt"></i>Access Account</div></Link>
        </div>
        
      </div>
    </div>

    <div className="filters-container">

      <div className="filters-content container">

        <div className="text">Articles offers filters so you can hone in on your target market.</div>
  
        <div className="w-100 d-flex justify-content-around align-items-center">
          <div className="filter"><i className="fas fa-2x fa-user-friends"></i> Age Range</div>
          <div className="filter"><i className="fas fa-2x fa-map-marked-alt"></i> Location Proximity</div>
          <div className="filter"><i className="fas fa-2x fa-sun"></i> Time of Day</div>
          <div className="filter"><i className="fas fa-2x fa-venus-mars"></i> Gender</div>
        </div>

      </div>

    </div>

  </div>
);

export default Advertising