import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes';

const ResourcesPage = ({match}) => (
  <div className="resources-page">

    <Helmet>
      <title>Resources - Articles</title>
    </Helmet>

    <div className="container-fluid">

        <div className="row">

            <div className="col-lg-3">
            <div className="hero d-flex justify-content-center flex-column align-items-center mb-3">

                <div className="book-wrapper d-flex justify-content-center align-items-center flex-column mt-lg-5 mb-3">
                <div className="book flex-shrink-0"></div>
                <h2 className="mb-0 mt-3">Resources</h2>
                </div>

            </div>
            </div>

            <div className="col-lg-9">
            <div className="row">

                <div className="col-lg-6 mb-5">

                <div className="card h-100">

                    <div className="card-header">
                    <h5 className="mb-0">Presidents</h5>
                    <div className="text-muted">
                        <span className="badge badge-warning mr-2">In Development</span>
                        <span>Last Updated: 1/9/2020</span>
                    </div>
                    </div>

                    <div className="card-body">

                    <div className="row">

                        <div className="col-lg-6">
                        <ul>
                            <li>Age</li>
                            <li>Accomplishments</li>
                            <li>Terms</li>
                            <li>Birthdays</li>
                        </ul>
                        </div>

                        <div className="col-lg-6">
                        <ul>
                            <li>Pardons</li>
                            <li>Pay</li>
                            <li>Gallery</li>
                            <li>Criticisms</li>
                        </ul>
                        </div>

                    </div>

                    <Link to={ROUTES.RESOURCES_PRESIDENTS}>
                        <button className="btn btn-lg btn-articles-light">Access</button>
                    </Link>
                    
                    </div>

                </div>

                </div>
        
                <div className="col-lg-6 mb-5">

                <div className="card h-100">

                    <div className="card-header">
                    <h5 className="mb-0">Coronavirus</h5>
                    <div className="text-muted">
                        <span className="badge badge-warning mr-2">In Development</span>
                        <span>Last Updated: 1/9/2020</span>
                    </div>
                    </div>

                    <div className="card-body">
                    <ul>
                        <li>Excess Deaths</li>
                        <li>New Cases</li>
                        <li>Deaths</li>
                        <li>Vaccine Projections</li>
                    </ul>

                    <Link to={ROUTES.RESOURCES_CORONAVIRUS}>
                        <button className="btn btn-lg btn-articles-light">Access</button>
                    </Link>

                    </div>

                </div>

                </div>

                <div className="col-lg-6 mb-5">

                <div className="card h-100">

                    <div className="card-header">
                    <h5 className="mb-0">Politicians</h5>
                    <div className="text-muted">
                        <span className="badge badge-warning mr-2">In Development</span>
                        <span>Last Updated: 1/9/2020</span>
                    </div>
                    </div>

                    <div className="card-body">

                    <div className="row">

                        <div className="col-lg-6">
                        <ul>
                            <li>Senate</li>
                            <li>House of Representatives</li>
                            <li>Voting History</li>
                            <li>Lobbyist Involvement</li>
                        </ul>
                        </div>

                        <div className="col-lg-6">
                        <ul>
                            <li>Accomplishments</li>
                            <li>Criticisms</li>
                            <li>Conflict of Interest</li>
                            <li>Gallery</li>
                        </ul>
                        </div>

                    </div>

                    <Link to={ROUTES.RESOURCES_POLITICIANS}>
                        <button className="btn btn-lg btn-articles-light">Access</button>
                    </Link>
                    
                    </div>

                </div>

                </div>

                <div className="col-lg-6 mb-5">

                <div className="card h-100">

                    <div className="card-header">
                    <h5 className="mb-0">Mass Shootings</h5>
                    <div className="text-muted">
                        <span className="badge badge-warning mr-2">In Development</span>
                        <span>Last Updated: 3/25/2021</span>
                    </div>
                    </div>

                    <div className="card-body">

                    <div className="row">

                        <div className="col-lg-6">
                        <ul>
                            <li>Weapon Types</li>
                            <li>Mental Health Status</li>
                            <li>Prior Charges</li>
                            <li>Locations</li>
                        </ul>
                        </div>

                        <div className="col-lg-6">
                        <ul>
                            <li>Weapon Ownership</li>
                            <li>Locked Status</li>
                            <li></li>
                            <li></li>
                        </ul>
                        </div>

                    </div>

                    <Link to={ROUTES.RESOURCES_POLITICIANS}>
                        <button className="btn btn-lg btn-articles-light">Access</button>
                    </Link>
                    
                    </div>

                </div>

                </div>

            </div>
            </div>

        </div>

    </div>

  </div>
);

export default ResourcesPage;