import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const Page = () => (
  <div className="roadmap-page">

    <img className="roadmap-trail-image" src="https://cdn.onlinewebfonts.com/svg/img_446438.png" alt=""/>
    <img className="roadmap-map-image" src="https://ddo0fzhfvians.cloudfront.net/uploads/icons/png/568635131536669843-512.png" alt=""/>

    <div className="container">
      <div className="row h-100 justify-content-center">
        <div className="col-sm-6 my-auto">
          <div className="card shadow-sm my-3">

            <div className="card-body">
              <h1>Roadmap</h1>
              <p>An overview of whats to come.</p>
            </div>

            <div className="roadmap-cards">

              <div className="roadmap-card d-none">
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

              <div className="roadmap-card d-none">
                <div className="title">September 2020</div>
                <div className="text">
                  <ul>
                    <li>Grow users to 100</li>
                    <li>Begin clothing sales.</li>
                    <li>Expand Reports page reporting system to be more transparent to users.</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card d-none">
                <div className="title">October 2020</div>
                <div className="text">
                  <ul>
                    <li>Add the ability to send images in Messages.</li>
                    <li>Add the ability to encrypt Messages with custom passphrase (PGP).</li>
                    <li>Add a system for other services to intergrate widgets for the users home screen. Upcoming flights, bank account balance, notepads, etc.</li>
                  </ul>
                </div>
              </div>
  
              <div className="roadmap-card d-none">
                <div className="title">2020</div>
                <div className="text">
                  <ul>
                    <li>Github commit from someone besides Joe...</li>
                    <li>Grow advertiser count to 5</li>
                    <li>Implement "Real ID" system to allow access to a seperate comment channel for users that have verified they are a human and have citizenship in the United States.</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card mb-5">
                <div className="title">2021</div>
                <div className="text">
                  <ul>
                    <li>Grow advertiser count to 5</li>
                    <li>Implement "Real ID" system to allow access to a separate comment channel for users that have verified they are a human and have citizenship in the United States.</li>
                    <li>Weekly general update videos and newsletters about whats happening at Articles</li>
                    <li>Weekly development update videos and newsletters about our website</li>
                    <li>Weekly news update videos and newsletters about whats happening in the country</li>
                    <li>Add the ability for users to subscribe to tags</li>
                    <li>Begin clothing sales</li>
                    <li>Grow users to 5,000</li>
                    <li>Add a system/api for other services to integrate widgets for the users home screen. Upcoming flights, bank account balance, notepads, etc.</li>
                    <li>Add the ability to encrypt Messages with custom passphrase (PGP).</li>
                  </ul>
                </div>
              </div>

              <div className="roadmap-card">
                <div className="title">2022</div>
                <div className="text">
                  <ul>
                    <li>To be announced</li>
                  </ul>
                </div>
              </div>
              
            </div>

            <div className="card-footer py-2 text-center">
              <Link to={ROUTES.COMMUNITY}><button className="btn btn-articles-light alt">Support Hub</button></Link>
            </div>

          </div>
        </div>
      </div>
    </div>

  </div>
);

export default Page 