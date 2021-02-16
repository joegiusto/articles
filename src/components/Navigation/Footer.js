import React from 'react'
import * as ROUTES from '../../constants/routes'
import { Link, withRouter } from 'react-router-dom'

function Footer(props) {
  const has =  props.location.pathname.toString().includes("/admin/news") 

  // console.log(props.location)
  // console.log(`Has is equal to ${has}`)

  return (
    <footer className={"site-footer " + (props.location.pathname === '/mission' || props.location.pathname === '/messages' || props.location.pathname === '/messages/' || props.location.pathname === '/outset' || has ? 'd-none' : '')}>

      {/* New February 2021 */}      
      <div className="container py-4">

        <div className="row mb-4">

          <div className="col-lg-3 footer-panel first">

            <Link to={ROUTES.LANDING}><div className="brand">Articles Media</div></Link>

            <div className="icons">

              <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-youtube"></i>
              </a>

              <a href="https://www.instagram.com/articles.media/" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-instagram"></i>
              </a>

              <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-twitter"></i>
              </a>

              <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer">
                <i className="fab fa-linkedin"></i>
              </a>

            </div>

          </div>

          <div className="col-lg-3 ml-lg-5 footer-panel mb-3 mb-lg-0">

            <div className="panel-title title border-bottom border-dark mb-2">Main</div>

            <div className="row">

              <div className="col-6">
                <Link to={ROUTES.TRANSPARENCY_REPORTS}>Transparency</Link>
                <Link to={ROUTES.STORE}>Store</Link>
                <Link to={ROUTES.PARTY}>Politics</Link>
              </div>

              <div className="col-6">
                <Link to={ROUTES.STORIES}>Stories</Link>
                <Link to={ROUTES.ISSUES}>Issues</Link>
                <Link to={ROUTES.MYTHS}>Myths</Link>
              </div>

            </div>

          </div>

          <div className="col-6 col-lg-2 ml-lg-5 footer-panel">
            <div className="panel-title title border-bottom border-dark mb-2">Community</div>
            <Link to={ROUTES.FORUM}>Forum</Link>
            <Link to={ROUTES.TRANSPARENCY_FLAG}>Flag Transaction</Link>
            <Link to={ROUTES.PARTY}>Real ID</Link>
          </div>

          <div className="col-6 col-lg-2 ml-lg-5 footer-panel">
            <div className="panel-title title border-bottom border-dark mb-2">About Us</div>
            <Link to={ROUTES.MISSION}>Mission</Link>
            <Link to={ROUTES.PRESS}>Press and Business</Link>
            <Link to={ROUTES.UPDATES}>Updates</Link>
          </div>

        </div>

        <div style={{lineHeight: '1'}} className="row border-top footer-panel copyright pt-3 px-3">
          <span>©2021 Articles Media</span>
          <span className="ml-1 pl-1 border-left border-dark"><Link to={ROUTES.PRIVACY}>Terms</Link></span>
          <span className="ml-1 pl-1 border-left border-dark"><Link to={ROUTES.PRIVACY}>Privacy</Link></span>
        </div>

      </div>
      
      {/* Old */}
      <div className="container-fluid d-none ">
        <div className="row justify-content-center">

          <div className="col-12 mb-2 mb-md-0 col-md-auto flex-fill">
            <div className="footer-panel first pl-md-5">
              <Link to={ROUTES.LANDING}><div className="brand">Articles</div></Link>
              <div className="copyright">Copyright @2020 Articles Media</div>
            </div>
          </div>

          <div className="col-6 col-md-auto flex-fill">
            <div className="footer-panel">
              <div className="title">Main</div>
              <Link to={ROUTES.TRANSPARENCY_REPORTS}>Reports</Link>
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
}

export default withRouter(Footer);