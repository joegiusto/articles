import React from 'react';
import * as ROUTES from 'constants/routes';
import { Link } from 'react-router-dom';

const Page = () => (
  <div style={{height: '100vh', marginTop: '-50px'}} className="container">
    <div className="row h-100 justify-content-center">
    <div className="col-sm-6 my-auto">
      <div className="card card-block p-5">
        <h1>Party</h1>
        <p>A large part of Articles is the communication of ideas that benifit the people and ensure that everyone can achieve the American Dream. As we build the site out thi spage will get updated but in the mean time visit our <Link to={ROUTES.MISSION}>mission</Link> page.</p>
      </div>
    </div>
  </div>
  </div>
);

export default Page