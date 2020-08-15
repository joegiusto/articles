import React from 'react'
import * as ROUTES from '../../constants/routes'
import { Link, withRouter } from 'react-router-dom'

const Footer = (props) => (
  <footer className={"site-footer " + (props.location.pathname === '/messages' || props.location.pathname === '/outset' ? 'd-none' : '')}>
    <div className="container-fluid">
      <div className="row">

        <div className="col-12 mb-2 mb-md-0 col-md-auto flex-fill">
          <div className="footer-panel first pl-md-5">
            <Link to={ROUTES.LANDING}><div className="brand">Articles</div></Link>
            <div className="copyright">Copyright @2020 Articles Media</div>
          </div>
        </div>

        <div className="col-6 col-md-auto flex-fill">
          <div className="footer-panel">
            <div className="title">Main</div>
            <Link to={ROUTES.REPORTS}>Reports</Link>
            <Link to={ROUTES.PRIVACY}>Privacy</Link>
            <Link to={ROUTES.STORE}>Store</Link>
          </div>
        </div>

        <div className="col-6 col-md-auto mb-3 mb-md-0 flex-fill">
          <div className="footer-panel">
            <div className="title">News</div>
            <Link to={ROUTES.STORIES}>Stories</Link>
            <Link to={ROUTES.ISSUES}>Issues</Link>
            <Link to={ROUTES.MYTHS}>Myths</Link>
          </div>
        </div>

        <div className="col-6 col-auto flex-fill">
          <div className="footer-panel fourth">

            <div className="title">Follow Us</div>

            <div className="icons">
              <a href="https://www.instagram.com/articles.media/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>
              <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-facebook"></i>
              </a>
            </div>

          </div>
        </div>

        <div className="col-6 col-auto flex-fill align-self-end pr-md-5 mb-3 mb-md-0">
          <div className="footer-panel fifth">
            <div className="title">Please Read</div>
            <Link to={ROUTES.MISSION}><button className="btn btn-articles-light mt-2">Our Mission</button></Link>
          </div>
        </div>

      </div>
    </div>
  </footer>
)

export default withRouter(Footer);