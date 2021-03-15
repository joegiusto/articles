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
                <h1>Beta Testing</h1>
                <p>To help us test upcoming features opt into some of the below features. These features may break parts of the site and cause pages to sop working. During the testing we ask you provide us with a summary of your thoughts and issues you had when using the feature.</p>
            </div>

            <div className="card-footer p-0 px-2 pt-3">
  
                {/* <div className="d-flex justify-content-between">
                    <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.HOME}>Home Page</Link></p>
                    <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.LANDING}>Landing Page</Link></p>
                </div> */}
    
                <div className="alert alert-light">
                    <div className="title">NOT ENABLED</div>
                    <div className="text mb-1"><b>Animated Side Menu Section Headers</b></div>
                    <div className="text">Animated backgrounds on the headers of sections in the side menu of the site.</div>

                    <div className="hover-icon">
                        <i className="fas fa-phone"></i>
                    </div>
                </div>

                <div className="alert alert-light">
                    <div className="title">NOT ENABLED</div>
                    <div className="text mb-1"><b>Animated Side Menu Section Headers</b></div>
                    <div className="text">Animated backgrounds on the headers of sections in the side menu of the site.</div>

                    <div className="hover-icon">
                        <i className="fas fa-phone"></i>
                    </div>
                </div>

                {/* <div className="alert alert-light">
                    <div className="title">Email:</div>
                    <div className="text">joey@articles.media</div>

                    <div className="hover-icon">
                    <i className="far fa-envelope-open"></i>
                    </div>
                </div> */}
              
            </div>

            <div style={{backgroundColor: 'rgb(49 49 49);'}} className="card-footer py-2 text-center">
              <Link to={ROUTES.COMMUNITY}><button className="btn btn-articles-light alt">Support Hub</button></Link>
            </div>

          </div>
        </div>
      </div>
    </div>
  </div>
);

export default Page 