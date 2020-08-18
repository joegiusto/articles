import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const Page = () => (
  <div className="roadmap-page">
    <div className="container">
      <div className="row h-100 justify-content-center">
        <div className="col-sm-6 my-auto">
          <div className="card shadow-sm my-3">

            <div className="card-body">
              <h1>Roadmap</h1>
              <p>An overview of whats to come.</p>
            </div>

            <div className="roadmap-cards">

              <div className="roadmap-card">
                <div className="title">August 2020</div>
                <div className="text">
                  <ul>
                    <li><del>Add the ability to donate</del></li>
                    <li>Add the ability to subscribe to tags</li>
                    <li>Weekly updates to users email and Home page.</li>
                    <li>Weekly development updates via Youtube.</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="title">September 2020</div>
                <div className="text">
                  <ul>
                    <li>Grow users to 100</li>
                    <li>Begin clothing sales.</li>
                    <li>Expand Reports page reporting system to be more transparent to users.</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="title">October 2020</div>
                <div className="text">
                  <ul>
                    <li>Add the ability to send images in Messages.</li>
                    <li>Add the ability to encrypt Messages with custom passphrase (PGP).</li>
                    <li>Add a system for other services to intergrate widgets for the users home screen. Upcoming flights, bank account balance, notepads, etc.</li>
                  </ul>
                </div>
              </div>
  
              <div className="roadmap-card">
                <div className="title">2020</div>
                <div className="text">
                  <ul>
                    <li>Github commit from someone besides Joe...</li>
                    <li>Grow advertiser count to 5</li>
                    <li>Implement "Real ID" system to allow access to a seperate comment channel for users that have verified they are a human and have citizenship in the United States.</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="title">2021</div>
                <div className="text">
                  <ul>
                    <li>Start production of weekly Youtube videos.</li>
                    <li>Show Github commits of Development roles inside of their employee data.</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="title">2022</div>
                <div className="text">
                  <ul>
                    <li>Phase out use of the Google Maps JavaScript API Places Autocomplete Service with custom in house solution. This is currenly used in the Outset and Settings pages to insure proper format of address details.</li>
                  </ul>
                </div>
              </div>
              
            </div>

            <div className="card-footer py-2 text-center">
              <Link to={ROUTES.SUPPORT}><button className="btn btn-articles-light alt">Support Hub</button></Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page 