import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { AuthUserContext } from '../Session';
import SignOutButton from '../SignOut';
import Modals from './Modals';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

import gunIcon from '../../assets/img/icons/gun.svg'

import moment from 'moment';
import Clock from 'react-live-clock';

const Navigation = (props) => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? (
        <span>
          <NavigationAuthRework expensesTotal={props.expenses.length} authUser={authUser}/>
          {/* <NavigationAuth authUser={authUser} /> */}
          {/* <Test authUser={authUser}/> */}
        </span>
      ) : (
        <span>
          <NavigationAuthRework expensesTotal={props.expenses.length} authUser={authUser}/>
          {/* <NavigationNonAuth /> */}
          {/* <NavigationAuthRework authUser={authUser}/> */}
        </span>
      )
    }
  </AuthUserContext.Consumer>
);

// const Navigation = ({ authUser }) => (
//   <AuthUserContext.Consumer>
//       {authUser =>
//         authUser ? <NavigationAuth /> : <NavigationNonAuth />
//       }
//     </AuthUserContext.Consumer>
// );

// TODO - Figure out a way to take the <Link/> component and add onClick={() => {setMenuState('closed')}} to it so all that needs to be written is somthing like <MenuLink to={ROUTES.LANDING}>Landing</MenuLink>.

function NavigationAuth({ authUser }) {
  return (
    <div>
      <ul>
        <li>
          <Link to={ROUTES.LANDING}>Landing</Link>
        </li>
        <li>
          <Link to={ROUTES.OUTSET}>Outset</Link>
        </li>
        <li>
          <Link to={ROUTES.HOME}>Home</Link>
        </li>
        <li>
          <Link to={ROUTES.ACCOUNT}>Account</Link>
        </li>
        <li>
          <Link to={ROUTES.CHECKOUT}>Checkout</Link>
        </li>
        {!!authUser.roles[ROLES.ADMIN] && (
          <div>
            <li>
              <Link to={ROUTES.ADMIN}>Admin</Link>
            </li>
            <li>
              <Link to={ROUTES.DONATE}>Donate</Link>
            </li>
          </div>
        )}
        <li>
          <SignOutButton />
        </li>
      </ul>

    </div>
  );
}

const NavigationNonAuth = () => (
  <ul>
    <li>
      <Link to={ROUTES.LANDING}>Landing</Link>
    </li>
    <li>
      <Link to={ROUTES.SIGN_IN}>Sign In</Link>
    </li>
  </ul>
);

function Test({ authUser }) {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [cartPreview, setCartPreview] = useState(false);
  // const [pinOpen, setPinOpen] = useState(false);

  return (
    <div>
      {!!authUser.roles[ROLES.ADMIN] && (
        <div>
          <li>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.LANDING}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Landing {menuOpen}</p></Link>
            <Link to={ROUTES.ADMIN}>Admin {authUser.email}</Link>
          </li>
          <li>
            <Link to={ROUTES.DONATE}>Donate</Link>
          </li>
        </div>
      )}
    </div>
  )
}

function NavigationAuthRework(props) {
  // Declare a new state variable, which we'll call "count"
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartPreview, setCartPreview] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [partySectionOpen, setPartySectionOpen] = useState(false);

  return (
    <div>
        <Modals/>
        
        <section onClick={() => {setMenuOpen(false)}} className={'side-menu-overlay' + (menuOpen || pinOpen ? " show" : "")}></section>

        <section className="menu-spacer"></section>

        <section>
          <div className="nav-tab">
            <button className={'hamburger hamburger--spin' + (menuOpen ? " is-active" : "")} type="button" onClick={() => {setMenuOpen(!menuOpen)}}>
                <span className="hamburger-box">
                <span className="hamburger-inner"></span>
                </span>
            </button> 
          </div> 
        </section>

        {/* <section>
            <div className="pin-tab d-none">
                <button className={'pin' + (menuOpen ? " is-active" : "")} type="button" onClick={() => {setPinOpen(true)}}>
                    <i className="fas fa-thumbtack text-danger"></i>
                </button> 
            </div> 
        </section> */}

        <section className={"side-menu-notch-top " + (menuOpen ? "show" : "")}>
            <div className="side-menu-notch-top-end"></div>
        </section>

        {/* <section className={"side-pin-notch-top d-lg-none " + (pinOpen ? "show" : "")}>
            <div className="side-pin-notch-top-end"></div>
        </section> */}

        <section>
            <div className={'side-menu-notch-top-end-custom ' + (menuOpen ? 'show' : '')}>
                <div className={'d-none d-lg-flex'}>
                    
                  {/* <h3 data-toggle="modal" data-target="#cookie" className="top-headline top-headline-cookie d-inline"><span className="badge badge-danger badge-shape-poly ">Agree to Cookies?<span className="badge badge-success badge-sub-red ml-2"><i class="far fa-check-square mx-1"></i></span><span className="badge badge-warning badge-sub-red ml-1"><i class="far fa-times-circle mx-1"></i></span></span></h3> */}

                  {!props.authUser ? (
                    <span>
                      <h3 data-toggle="modal" data-target="#muellerReports" className="top-headline mx-1 ml-5 d-inline"><span className="badge badge-black badge-shape-poly "><i class="far fa-hand-point-left"></i>Open The Menu!&nbsp;</span></h3>
                    </span>
                  ) : (
                    <span>
                      <h3 data-toggle="modal" data-target="#muellerReports" className="top-headline mx-1 ml-5 d-inline"><span className="badge badge-black badge-shape-poly ">Mueller Report Highlights<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3>
                      <h3 data-toggle="modal" data-target="#sale" className="top-headline mx-1 d-inline"><span className="badge badge-black badge-shape-poly ">15% Sale<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3>
                    </span>
                  )}

                </div>
                <div className={'d-none d-lg-flex'}>

                  {!props.authUser ? (
                    <span>
                      <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles"><i className="fas fa-file-signature"/>Terms and Privacy<span className="badge badge-danger ml-2">!</span></span></h3>
                      <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles"><i className="fas fa-id-badge"/>Sign Up Benefits<span className="badge badge-danger ml-2">!</span></span></h3>
                    </span>
                  ) : (
                    <span>
                      <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles-light"><i className="fas fa-tint" style={{color: '#9494ff', fontSize: '1rem', marginLeft: '10px'}}></i>Flint Water Cleanup<span className="badge badge-danger ml-2">7</span></span></h3>
                      <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles-light"><img className="gun-icon-img" src={gunIcon} alt=""/>Gun Laws<span className="badge badge-danger ml-2">4</span></span></h3>
                    </span>
                  )}
                  
                  {/* <h3 className="top-headline mx-1 d-inline"><span className="badge badge-light"><i className="fas fa-map-pin"></i>Pinned Stories<span className="badge badge-danger ml-2">7</span></span></h3> */}

                </div>
            </div>
        </section>

        {/* Pinned storys for mobile users, get desktop site working first */}
        {/* <section className={"side-pin d-none " + (pinOpen ? "show" : "")}>
            <h3 className="subheading-font ml-3 mt-2">Site News</h3>
            <h3 className="top-headline"><span className="badge badge-black badge-shape-poly shadow-sm ml-3">Mueller Report Highlights<span className="badge badge-danger badge-sub-red ml-2">!</span><div className="d-inline"></div></span></h3>
            <h3 className="top-headline"><span className="badge badge-black badge-shape-poly shadow-sm ml-3">15% Sale<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3>
            <hr/>
            <h3 className="subheading-font ml-3 mt-2">Your Pins</h3>
            <h3 className="top-headline w-100"><span className="badge badge-light mx-3 shadow-sm"><i className="fas fa-map-pin"></i>Flint Water Cleanup<span className="badge badge-danger ml-2">1</span></span></h3>
            <h3 className="top-headline w-100"><span className="badge badge-light mx-3 shadow-sm"><i className="fas fa-map-pin"></i>Gun Laws<span className="badge badge-danger ml-2">4</span></span></h3>
            <hr/>
        </section> */}

        <section className={"side-menu " + (menuOpen ? "show" : "")}>

            {/* Profile Section */}
            <div className="profile">
                <div className="profile-photo" >
                    <img alt="" className="" style={{borderRadius: '100px'}} width="100%" height="100%" src=""/>
                    <i className={!props.authUser ? 'fas fa-question':'fas fa-question'}></i>
                </div> 

                <div className="profile-welcome">

                  <p id="nav-welcome" className="subheading-font m-0 py-0">
                    <span>Hello,&nbsp;
                    {!props.authUser ? (
                    <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SIGN_IN} id='nav-sign-in'>Log In / Sign Up</Link>
                    ) : (
                    <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ACCOUNT} id='nav-sign-in'>{props.authUser.nameFirst} {props.authUser.nameLast}</Link>
                    )}
                    </span>
                  </p>

                  <p id="nav-member-message" className='subheading-font m-0 py-0'>
                    {!props.authUser ? (
                      <span></span>
                    ) : (
                      <span>Member Since {/* moment().unix(props.authUserdateCreation).format("MMMM Y") */} {moment.unix(props.authUser.dateCreation).format("MMMM Y")}</span>
                    )
                    }
                    
                  </p>


                </div>

            </div>

            <hr/>

            {/* Todays Info Section  */}
            <p className="subheading-font m-0 py-0"><span id="date">{moment().format('dddd MMMM Do, YYYY')}</span></p>
            <p className="subheading-font m-0 py-0"><Clock format={'h:mm:ss A'} ticking={true} /></p>
        
            <hr/>

            {/* Main Links Section */}
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.HOME}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Home</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MISSION}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Mission</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.REPORTS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Transparency Reports</p></Link>

            <hr/>

            {/* Clothing Section */}

            <div className="dual-header">
              <p className="heading-font no-link">
                <b>Articles Clothing</b>
              </p>
              <span onClick={() => {setCartPreview(!cartPreview)}} to="cart"><span className="ml-auto" id="shopping-card"><i className="fas fa-shopping-basket mr-0"></i><span id="menu-pill" className="badge badge-pill badge-dark">{props.expensesTotal}</span></span></span>
            </div>

            {/* <p className="heading-font no-link d-flex justify-content-between"><b>Articles Clothing</b><span onClick={() => {setCartPreview(!cartPreview)}} to="cart"><span className="ml-auto" id="shopping-card"><i className="fas fa-shopping-basket mr-0"></i><span id="menu-pill" className="badge badge-pill badge-dark">{props.expensesTotal}</span></span></span></p> */}

            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Store</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE_SUBMISSIONS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Design Submissions</p></Link>
            {cartPreview ? 
              (
              <div className="subheading-font text-center mx-4 border border-dark">
                <p className="d-inline-block">1</p><p className="d-inline-block">2</p><p className="d-inline-block">3</p>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.CHECKOUT}><p className="btn btn-dark subheading-font mb-2">Checkout</p></Link>
              </div>
              ) : (
                <span></span>
              )}
            <hr/> 

            {/* New Section */}
            <p className="heading-font no-link"><b>Articles News</b></p>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.NEWS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>News</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TOWN_HALL}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Town Hall</p></Link>

            <hr/>

            {/* Party Section */}

            <div className="dual-header">
              <p className="heading-font no-link">
                <b>Articles Party</b>
              </p>
              <div onClick={() => {setPartySectionOpen(!partySectionOpen)}} className={"section-collapse " + (partySectionOpen ? "" : "hide")}><i class="fas fa-chevron-circle-down"></i></div>
            </div>

            <div className={"tab-content " + (partySectionOpen ? "" : "hide")}>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PARTY}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Info</p></Link>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ISSUES}><p className="subheading-font"><i class="fas fa-person-booth "></i>Issues</p></Link>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MYTHS}><p className="subheading-font"><i class="fas fa-ghost fa-pulse"></i>Myths</p></Link>
            </div>
            <hr/>

            {!props.authUser ? (
              <span></span>
            ) : (
            <div>

              {/* Account */}
              {/* <div className="{ props.currentUser.displayName ? 'side-menu-footer' : 'side-menu-footer d-none'}">
                  <p className="heading-font no-link"><b>Account</b></p>
                  <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ACCOUNT}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Profile</p></Link>
              </div>
              <hr/> */}

            </div>
            )}
            
            
            {/* Support Section */}
            <p className="heading-font no-link"><b>Support</b></p>
            {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SUPPORT}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Help Us</p></Link> */}
            {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.JOBS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Jobs</p></Link> */}
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PRESS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Press</p></Link>
            {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TRANSLATIONS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Translations</p></Link> */}
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.LANDING}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Landing</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.OUTSET}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Outset</p></Link>
            
            {!props.authUser ? (
              <span></span>  
            ) : (
              <div>
                {/* <hr/> here because Support is last thing for everyone else. */}
                <hr/>

                {/* Admin */}
                <p className="heading-font no-link"><b>Admin</b></p>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Admin</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.DONATE}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Donation</p></Link>
                <hr/>

                {/* Playground */}
                <p className="heading-font no-link"><b>Playground</b></p>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PLAYGROUND}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Playground</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MESH}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Mesh</p></Link>
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-alternate_2x.png" height="45px" alt=""/>
                <img className="p-0" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" height="40px" alt=""/>
                {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Donation</p></Link> */}
                <hr/>

              </div>
            )}

            {/* {props.uiMode === 'day' ? <a id="night-mode" onClick={props.uiNight} href="JavaScript:void(0);"><p className="subheading-font"><i id="night-mode-icon" className="fas fa-toggle-off"></i>Night Mode</p></a> : <a id="night-mode" onClick={props.uiDay} href="JavaScript:void(0);"><p className="subheading-font"><i id="night-mode-icon" className="fas fa-toggle-on"></i>Night Mode</p></a>} */}

            <div className='side-menu-bottom-spacer'></div>
        </section>

    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    expenses: state.expenses,
    site: state.site,
    // startLogout: () => dispatch(startLogout()) 
  };
};

export default connect(mapStateToProps)(Navigation);

// export default Navigation;