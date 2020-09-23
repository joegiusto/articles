import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes'

const threads = [
  {
    title: 'News Content Suggestions',
    url_title: 'news-content-suggestions'
  },
  {
    title: 'Youtube Video Suggestions',
    url_title: 'youtube-video-suggestions'
  },
  {
    title: 'Site Suggestions',
    url_title: 'site-suggestions'
  },
  {
    title: 'Reports Disscusion',
    url_title: 'reports-disscusion'
  },
  {
    title: 'Clothing Disscusion and Suggestions',
    url_title: ''
  }
]

const Page = () => (
  <div className="forum-page">
    <div className="container">
      <div className="row h-100 justify-content-center">
        <div className="col-sm-12 my-auto">
          <div className="card shadow-sm">

            <div className="card-body">
              <h1>Forum</h1>
              <p>Help shape the future of Articles.</p>
            </div>

            <div className="threads card-footer p-0 px-2 pt-3">
  
              {/* <div className="d-flex justify-content-between">
                <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.HOME}>Home Page</Link></p>
                <p className="text-muted mb-0 badge">Return To <Link to={ROUTES.LANDING}>Landing Page</Link></p>
              </div> */}

              {threads.map(thread => 
                <Link to={ROUTES.FORUM + '/' + thread.url_title}>
                  <div className="thread alert alert-light">
                    <div className="title">0 Threads</div>
                    <div className="text">{thread.title}</div>
  
                    <div className="hover-icon">
                      <i className="fas fa-eye"></i>
                    </div>
                  </div>
                </Link>
              )}
              
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