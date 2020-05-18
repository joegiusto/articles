import React from 'react'
import * as ROUTES from '../../constants/routes'
import { Link } from 'react-router-dom'

const Footer = (props) => (
  <footer className="site-footer">
    <div className="container-fluid">
      <div className="row">

        <div className="col col-auto flex-fill">
          <div className="footer-panel first pl-md-5">
            <Link to={ROUTES.LANDING}><div className="brand">Articles</div></Link>
            <div className="copyright">Copyright @2020 Articles Media</div>
          </div>
        </div>

        <div className="col col-auto flex-fill">
          <div className="footer-panel">
            <div className="title">Main</div>
            <Link to={ROUTES.REPORTS}>Reports</Link>
            <Link to={ROUTES.REPORTS}>Privacy</Link>
            <div className="title mt-3">Clothing</div>
            <Link to={ROUTES.REPORTS}>Store</Link>
            <Link to={ROUTES.REPORTS}>Submissions</Link>
          </div>
        </div>

        <div className="col col-auto flex-fill">
          <div className="footer-panel">
            <div className="title">News</div>
            <Link to={ROUTES.REPORTS}>Stories</Link>
            <Link to={ROUTES.REPORTS}>Issues</Link>
            <Link to={ROUTES.REPORTS}>Myths</Link>
            <div className="title mt-3">Politics</div>
            <Link to={ROUTES.REPORTS}>About</Link>
            <Link to={ROUTES.REPORTS}>Involvements</Link>
          </div>
        </div>

        <div className="col col-auto flex-fill">
          <div className="footer-panel fourth">
            <div className="title">Follow Us</div>
            <div className="icons"><i class="fab fa-instagram"></i><i class="fab fa-youtube"></i><i class="fab fa-facebook"></i></div>
          </div>
        </div>

        <div className="col col-auto flex-fill pr-md-5">
          <div className="footer-panel fifth">
            <button className="btn btn-articles-light">Our Mission</button>
          </div>
        </div>

      </div>
    </div>
  </footer>
)

export default Footer;