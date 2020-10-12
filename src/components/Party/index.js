import React from 'react';
import * as ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';

const Page = () => (
  <div style={{height: '100vh', marginTop: '-50px'}} className="container party-page">
    <div className="row h-100 justify-content-center">
    <div className="col-sm-6 my-auto">

      <div className="card card-block p-5">
        <h1>Party</h1>
        <p>A large part of Articles is the communication of ideas that benefit the people and ensure that everyone can achieve the American Dream. Visit our <Link to={ROUTES.MISSION}>mission</Link> page to learn more about our values.</p>
      </div>

      <Link to={ROUTES.PROPOSALS}>
        <div className="card card-block px-5 py-3 mt-2">
          <h1 className="link"><i class="fas fa-scroll" aria-hidden="true"></i>View Proposals</h1>
        </div>
      </Link>

    </div>
  </div>
  </div>
);

export default Page