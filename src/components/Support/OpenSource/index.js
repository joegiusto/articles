import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const Page = () => (
  <div className="press-page">
    <div className="container">
      <div className="row h-100 justify-content-center">
        <div className="col-sm-6 my-auto">
          <div className="card shadow-sm">

            <div className="card-body">
              <h1>Open Source Credits</h1>
              <p>To reach out with questions or any other inquires contact us by the following methods.</p>
            </div>

            <div className="card-footer p-0 px-2 pt-3">
  
              {/* <div className="d-flex justify-content-between">
                <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.HOME}>Home Page</Link></p>
                <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.LANDING}>Landing Page</Link></p>
              </div> */}
  
              <div className="alert alert-light">
                <div className="title">Phone:</div>
                <div className="text">845-214-2713</div>

                <div className="hover-icon">
                  <i className="fas fa-phone"></i>
                </div>
              </div>

              <div className="alert alert-light">
                <div className="title">Email:</div>
                <div className="text">joey@articles.media</div>

                <div className="hover-icon">
                  <i className="far fa-envelope-open"></i>
                </div>
              </div>
              
            </div>

            <div style={{backgroundColor: 'rgb(49 49 49);'}} className="card-footer py-2 text-center">
              <Link to={ROUTES.SUPPORT}><button className="btn btn-articles-light alt">Support Hub</button></Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page 