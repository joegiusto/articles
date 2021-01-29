import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import moment from 'moment';
import Clock from 'react-live-clock';
import Dropdown from 'react-bootstrap/Dropdown';

import SocketContext from '../../utils/socket_context/context'

import CartPreview from './components/CartPreview'
import NotificationArea from './components/NotificationArea'
import { toggleSideMenuFixed, toggleColorMode, toggleSideMenuOpen } from '../../actions/siteActions';

function Menu(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  // const [menuFixedWarning, setMenuFixedWarning] = useState(false);
  const [cartPreview, setCartPreview] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [partySectionOpen, setPartySectionOpen] = useState(false);
  
  const [shouldShowElement, setShouldShowElement] = useState(false);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);

  const [connected, setConnected] = useState(false);

  const [notificationVisible, setNotificationVisible] = useState(false);
  const [notificationProgress, setNotificationProgress] = useState(0);
  
  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;
  const scrollBarWidth = windowWidth - documentWidth;
  
  useEffect(() => {

    props.socket.on('connect', () => {
      console.log("Connected to server!");
      setConnected(true);
      props.socket.emit('login', {userId: props.user?._id})
    });

    props.socket.on('notification', () => {
      console.log("Notification received");
      showNotification();
    });

    props.socket.on('disconnect', () => {
      console.log("Disconnected from server!");
      setConnected(false);
    });

    // return () => {
    //   socket.current.disconnect();
    // };

  }, []);

  function showNotification(seconds) {
    setNotificationVisible(true)

    // let progressBar = setInterval(() => { 
    //   console.log(`Ran ${notificationProgress}`)

    //   if (notificationProgress < 100) {
    //     console.log("Less then")
    //     setNotificationProgress(prevProgress => (101) )
    //   } else {
    //     console.log("Not less then")
    //     clearInterval(progressBar);
    //     setNotificationProgress(0);
    //   }
      
    // }, 1000 )

    setTimeout(() => { 
      setNotificationVisible(false)
    }, 4000);
  }

  function logUserWasOnline(seconds) {

    // TODO / SUDO
    // Check if user is logged in or not

    // If user is logged in check if lastLoginDaily cookie is set
    // If it is then do nothing, if not then set it after logging to database and checking if it exist

    // Else if user is not logged in generate lastLoginDaily cookie along with lastLoginDailyID and log to database
    // If this ID then logs in, delete the ID from database and log it to proper user.
    
    // Check if user has already been online today
    // if (localStorage.lastLoginDaily <= new Date()) {
      
    // }

  }

  function menuFixedWarning() {
    console.log("Menu is fixewd so menu can not be collapsed");

    // setMenuFixedWarning;
  }

  if ( menuOpen === false || props.site.sideMenuFixed === true ) {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px';
  } else {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollBarWidth + 'px';
  }

  if ( props.site.colorModeDark === true ) {
    document.body.classList.add('dark')
  } else {
    document.body.classList.remove('dark')
  }

  return (
    <div className={'menu-wrap noselect' + (props.site?.sideMenuFixed ? ' fixed' : '') + (props.site?.colorModeDark ? ' dark-mode' : '')}>

        <section onClick={() => ( setMenuOpen(false) + props.toggleSideMenuOpen() )} className={'side-menu-overlay' + (menuOpen || pinOpen ? " show" : "")}></section>

        <section className="menu-spacer"></section>

        <NotificationArea/>

        <section>
          <div className="nav-tab">
            <button className={'hamburger hamburger--spin' + (props.site?.sideMenuFixed ? ' is-active' : menuOpen ? " is-active" : "")} type="button" onClick={() => props.site?.sideMenuFixed ? (props.toggleSideMenuFixed(), setMenuOpen(!menuOpen), props.toggleSideMenuOpen() ) : ( setMenuOpen(!menuOpen), props.toggleSideMenuOpen() ) }>
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
          <div className={"side-menu-notch-top-end " + (menuOpen ? "show" : "")}></div>
        </section>

        <section>
          <div className={'side-menu-notch-top-end-custom align-items-center ' + (menuOpen ? 'show' : '')}>

            {
              props.isAuth ? 

              <>
              {!props.user?.outset ? 
              <Link className="menu-bar-link mr-3" to={ROUTES.OUTSET}>
              <span className="badge badge-articles-light">
                <i className="fas fa-file-signature"/>Please Complete Outset 
              </span>
              </Link>
              :
              null}

              {!props.user?.isVerified ? 
                <Link className="menu-bar-link mr-3" to={ROUTES.VERIFY_EMAIL}>
                <span className="badge badge-articles-light badge-danger">
                  <i className="fas fa-file-signature"/>Please Verify Email 
                </span>
                </Link>
              :
              null}
              </>

              :
              null
            }

            <div className={"notification " + (notificationVisible && 'show')}>

              <div className="close">
                <i className="far fa-times-circle mr-0"></i>
              </div>
              
              <div style={{width: notificationProgress + '%'}} className="progress"></div>

              Hello! New Message!
            </div>

            <Dropdown 
              className="weather-badge mr-2"
            >
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                <img src="https://icon-library.com/images/cloudy-icon/cloudy-icon-3.jpg" alt=""/>
                <div>50°F</div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="">

                <div className="px-2 d-flex justify-content-between align-items-center" style={{fontSize: '1.3rem'}}>

                  <div className="display-flex align-items-center">
                    <div className="badge badge-articles mr-1">12524</div>
  
                    <div className="badge badge-dark mr-1">
                      +
                    </div>
                  </div>

                  <div className="badge badge-dark">
                    <div><i className="fas fa-cog mr-0"></i></div>
                  </div>

                </div>

                <Dropdown.Divider/>

                <div className="weather">

                  <div className="icon">
                    <img src="https://icon-library.com/images/cloudy-icon/cloudy-icon-3.jpg" alt=""/>
                  </div>

                  <div className="details">
                    <div className="temp">
                      50
                      <span className="deg">°F</span>
                    </div>
                  </div>

                  <div className="details-extra">

                    <div className="precipitation">
                      <img src="https://media.istockphoto.com/vectors/water-drop-symbol-vector-rain-drop-icon-vector-id1156487494?k=6&amp;m=1156487494&amp;s=170667a&amp;w=0&amp;h=RD9wBtK827d_3rdeOvSez9bboMBf4_E_0MIEtus9cUo=" alt="Precipitation Symbol"/>
                      0%
                    </div>

                    <div className="humidity">
                      <img src="https://w7.pngwing.com/pngs/65/666/png-transparent-drawing-humidity-indicator-angle-triangle-illustrator-thumbnail.png" alt="Humidity Symbol"/>
                      0%
                    </div>

                    <div className="wind">
                      <img src="https://www.pinclipart.com/picdir/middle/140-1405202_windy-weather-icon-wind-weather-symbols-clipart.png" alt="Wind Symbol"/>
                      5 mph
                      </div>
                    </div>

                  </div>

              </Dropdown.Menu>

            </Dropdown>

            <Dropdown 
              className="notification-badge mr-3"
            >
              <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                <div className="notification-count">0</div>
                <div className={"message-count " + (connected ? 'bg-success' : 'bg-danger')}>0</div>

                <div>{' '} <i className="far fa-bell mr-0"></i> {' '}</div>
              </Dropdown.Toggle>

              <Dropdown.Menu className="super-colors">

                {/* <Dropdown.Item className="px-1" eventKey="2">
                  <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                  <span style={{fontSize: '0.8rem'}}>Order shipped</span>
                </Dropdown.Item> */}

                {/* <Dropdown.Item className="px-1" eventKey="2">
                  <i className="fas fa-paste" aria-hidden="true"></i>
                  <span style={{fontSize: '0.8rem'}}>Report Response</span>
                </Dropdown.Item> */}

                <div className="text-muted text-center" style={{fontSize: '0.8rem'}}>0 Notifications</div>

                <Dropdown.Divider />

                <div className="w-100 px-2">
                  <Link to={ROUTES.MESSAGES}>
                    <div style={{cursor: 'pointer'}} className="badge badge-success w-100">0 Messages</div>
                  </Link>
                </div>

                {/* <Dropdown.Item eventKey="4">Manage</Dropdown.Item> */}

              </Dropdown.Menu>

            </Dropdown>

            {/* <div className="notification-badge">
              <div className="count">2</div>
              <i className="far fa-bell"></i>
            </div> */}

          </div>
            
        </section>

        {/* Pinned storys for mobile users, get desktop site working first */}
        {/* <section className={"side-pin " + (pinOpen ? "show" : "")}>
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

          {/* Profile Photo and Account Section */}
          <div className="profile">

              <div className="menu-pin-button" onClick={props.toggleSideMenuFixed}>
                <i className="fas fa-columns"></i>
                <div className={'columns-fill-in ' + (props.site.sideMenuFixed ? 'active' : '')}></div>
              </div>

              <div className="color-mode-button" onClick={props.toggleColorMode}>
                {props.site.colorModeDark ? <i className="far fa-moon"></i> : <i className="fas fa-sun"></i>}
                {/* <i className="fas fa-columns"></i> */}
                {/* <div className={'columns-fill-in ' + (props.site.colorModeDark ? 'active' : '')}></div> */}
              </div>

              <div className="profile-photo" >
                  {props?.user?.photo_url === undefined ? 
                  null
                  :
                  <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SETTINGS_ACCOUNT}><img alt="" className="" style={{borderRadius: '0px'}} width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${props?.user?._id}.jpg` || ''}/></Link>
                  }
                  <i className={props?.user?.photo_url ? '':'fas fa-question'}></i>
              </div> 

              <div className="profile-welcome">

                <p id="nav-welcome" className="subheading-font m-0 pl-2 py-0">
                  <span>Hello,&nbsp;
                  {!props.isAuth ? (
                  <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SIGN_IN} id='nav-sign-in'>Log In / Sign Up</Link>
                  ) : (
                  <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SETTINGS_ACCOUNT} id='nav-sign-in'>{props?.user?.first_name} {props?.user?.last_name}</Link>
                  )}
                  </span>
                </p>

                <p id="nav-member-message" className='subheading-font m-0 pl-2 py-0'>
                  {!props.isAuth ? (
                    <span></span>
                  ) : (
                    // <span>Member Since{moment.unix(props.user?.sign_up_date).format("MMMM Y")}</span>
                    <div>
                      <div style={{fontSize: '0.8rem'}}>Member Since {moment(props.user?.sign_up_date).format("MMMM Y") || "Loading..."}</div>
                      {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MESSAGES}><button className="btn btn-sm btn-articles-light">Chat</button></Link> */}
                    </div>
                  )
                  }
                </p>

              </div>

          </div>

          <hr/>

          {/* Clock and Today Info Section  */}
          <p className="subheading-font m-0 py-0"><span id="date">{moment().format('dddd MMMM Do, YYYY')}</span></p>
          <p className="subheading-font m-0 py-0"><Clock format={'h:mm:ss A'} ticking={true} /></p>
      
          <hr/>

          {/* Main Links Section */}
          {props.isAuth?
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.HOME}><p className="subheading-font"><i className="fas fa-home"></i>Home</p></Link>
          :
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.LANDING}><p className="subheading-font"><i className="fas fa-map-pin"></i>Landing</p></Link>
          }
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MISSION}><p className="subheading-font"><i className="fas fa-flag-usa"></i>Mission</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TRANSPARENCY_REPORTS}><p className="subheading-font"><i className="fas fa-paste"></i>Transparency</p></Link>

          <hr/>

          {/* Clothing Section */}
          <div className="dual-header">

            <p className="heading-font no-link">
              <b>Articles Clothing</b>
            </p>

            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.CHECKOUT}>
              <span className="ml-auto noselect" id="shopping-card">
                <i className="fas fa-shopping-basket mr-0"></i>
                <span id="menu-pill" className="badge badge-pill badge-dark">
                  {props.expensesTotal}
                </span>
              </span>
            </Link>

            {/* <span onClick={() => {setCartPreview(!cartPreview)}} to="cart">
              <span className="ml-auto noselect" id="shopping-card">
                <i className="fas fa-shopping-basket mr-0"></i>
                <span id="menu-pill" className="badge badge-pill badge-dark">
                  {props.expensesTotal}
                </span>
              </span>
            </span> */}

          </div>

          {cartPreview ? 

          <CartPreview
            cart_items={props.expenses}
            setMenuOpen={setMenuOpen}
          />

          // <div className="subheading-font text-center mx-4 border border-dark">
          //   <p className="d-inline-block">1</p><p className="d-inline-block">2</p><p className="d-inline-block">3</p>
          //   <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.CHECKOUT}><p className="btn btn-dark subheading-font mb-2">Checkout</p></Link>
          // </div>

          :

          null

          }

          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE}><p className="subheading-font"><i className="fas fa-shopping-cart"></i>Store</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE_SUBMISSIONS}><p className="subheading-font"><i className="fas fa-lightbulb"></i>Submissions</p></Link>
          
          <hr/> 

          {/* New Section */}
          <p className="heading-font no-link"><b>Articles News</b></p>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.NEWS}><p className="subheading-font"><i className="fas fa-newspaper"></i> Frontpage</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORIES}><p className="subheading-font"><i className="fas fa-bullhorn"></i>Stories</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ISSUES}><p className="subheading-font"><i className="fas fa-balance-scale"></i>Issues</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MYTHS}><p className="subheading-font"><i className="fas fa-ghost"></i>Myths</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.RESOURCES}>
            <p className="subheading-font">
              {/* TODO Convert to paid Font Awesome! */}
              <svg style={{height: '1rem', width: '25px', marginRight: '10px', justifyContent: 'center'}} aria-hidden="true" focusable="false" data-prefix="fas" data-icon="books" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="d-flex svg-inline--fa fa-books fa"><path fill="currentColor" d="M575.11 443.25L461.51 19.06C458.2 6.7 445.61-3.18 430.15.96L414.7 5.1c-6.18 1.66-11.53 6.4-16.06 14.24-14.03 6.94-52.3 17.21-68 18.22-7.84-4.53-14.85-5.96-21.03-4.3l-15.46 4.14c-2.42.65-4.2 1.95-6.15 3.08V32c0-17.67-14.33-32-32-32h-64c-17.67 0-32 14.33-32 32v64h128l101.66 396.94c3.31 12.36 15.9 22.24 31.36 18.1l15.45-4.14c6.18-1.66 11.53-6.4 16.06-14.24 13.91-6.88 52.18-17.2 68-18.22 7.84 4.53 14.85 5.96 21.03 4.3l15.46-4.14c15.45-4.14 21.41-18.99 18.09-31.35zm-134.4-7.06L348.64 92.37l61.82-16.56 92.07 343.82-61.82 16.56zM0 384h128V128H0v256zM96 0H32C14.33 0 0 14.33 0 32v64h128V32c0-17.67-14.33-32-32-32zM0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H0v64zm160-96h128V128H160v256zm0 96c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H160v64z" class=""></path></svg>
              {/* <i className="fas fa-ghost"></i> */}
              Resources
            </p>
          </Link>
          <hr/>

          {/* Party Section */}
          <div className="dual-header">
            <p className="heading-font no-link">
              <b>Articles Party</b>
            </p>
            {/* <div onClick={() => {setPartySectionOpen(!partySectionOpen)}} className={"section-collapse " + (partySectionOpen ? "" : "hide")}><i className="fas fa-chevron-circle-down"></i></div> */}
          </div>

          <div className={"tab-content " + (partySectionOpen ? "" : "")}>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PARTY}><p className="subheading-font"><i className="fas fa-users"></i>Info</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PROPOSALS}><p className="subheading-font"><i className="fas fa-scroll"></i>Proposals</p></Link>
            {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TOWN_HALL}><p className="subheading-font"><i className="fas fa-bell"></i>Town Hall</p></Link> */}
          </div>
          
          {/* Support Section */}
          <hr/>
          <p className="heading-font no-link"><b>Support</b></p>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SUPPORT}><p className="subheading-font"><i className="fas fa-hands-helping"></i>Hub</p></Link>
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.JOBS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Jobs</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PRESS}><p className="subheading-font"><i className="far fa-address-card"></i>Press</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TRANSLATIONS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Translations</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.LANDING}><p className="subheading-font"><i className="fas fa-map-pin"></i>Landing</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.OUTSET}><p className="subheading-font"><i className="fas fa-horse"></i>Outset</p></Link> */}

          {/* Donate Section */}
          <hr/>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.DONATE}><div className="btn btn-articles-light w-100 ml-4" style={{maxWidth: '90%'}}>Donate</div></Link>
          
          {!props.isAuth ? (
            null
          ) : (
            <div>
              <hr/>

              {/* Admin */}
              {props.user?.roles?.isAdmin === true ?
              <>
              <p className="heading-font no-link"><b>Admin &nbsp;</b><span className="badge badge-warning">Role</span></p>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}><p className="subheading-font"><i className="fas fa-toolbox"></i>Admin Portal</p></Link>
              {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE_MANAGE}><p className="subheading-font"><i className="fas fa-toolbox"></i>Clothing Manage</p></Link> */}
              {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MANAGE}><p className="subheading-font"><i className="fas fa-toolbox"></i>News Manage</p></Link> */}
              {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.DONATE}><p className="subheading-font"><i className="fas fa-toolbox"></i>Donation Manage</p></Link> */}
              <hr/>
              </>
              :
              null
              }

              {/* Playground */}
              {props.user?.roles?.isDev === true ?
              <>
                <p className="heading-font no-link"><b>Dev &nbsp;</b><span className="badge badge-warning">Role</span></p>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PLAYGROUND}><p className="subheading-font"><i className="fas fa-code"></i>Playground</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MESH}><p className="subheading-font"><i className="fas fa-chess-board"></i>Mesh</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MESSAGES}><p className="subheading-font"><i className="fas fa-envelope-square"></i>Messages</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.RESOURCES_PRESIDENTS}><p className="subheading-font"><i className="fas fa-envelope-square"></i>Presidents</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.OUTSET}><p className="subheading-font"><i className="fas fa-road"></i>Outset</p></Link>
                <div className="app-links">
                  <img className="app-badge" src="https://bibibop.com/data/sites/1/media/rewards/Download_badge-apple-white.png" alt=""/>
                  <img className="app-badge" src="https://www.prorehab-pc.com/wp-content/uploads/2017/12/google-play-button.svg_.hi_.png" alt=""/>
                </div>
              </>
              :
              null
              }
            </div>
          )}

          <hr/>

          <div className="landing-page-link d-none">
            Landing Page
          </div>

          <p className="subheading-font align-items-center d-flex justify-content-between pb-3" onClick={props.toggleColorMode}>

            <div>
              {/* <i className="fas fa-code" aria-hidden="true"></i> */}
              {props.site.colorModeDark ? <i className="far fa-moon"></i> : <i className="fas fa-sun"></i>}
              <span>Dark Mode<span class="badge badge-primary ml-2">Beta</span></span>
            </div>

            <label className="articles-switch mb-0" onClick={props.toggleColorMode}>
              <input type="checkbox" checked={props.site.colorModeDark}/>
              <span className="slider" onClick={props.toggleColorMode}></span>
            </label>

          </p>

          <p className="subheading-font align-items-center d-flex justify-content-between pb-3" onClick={props.toggleSideMenuFixed}>

            <div>
              {/* <div className={'columns-fill-in ' + (props.site.sideMenuFixed ? 'active' : '')}></div> */}
              {/* <i className="fas fa-columns"></i> */}
              {props.site.sideMenuFixed ? <i className="fas fa-columns"></i> : <i className="fas fa-columns"></i>}
              <span>Fixed Menu</span>
            </div>

            <label className="articles-switch mb-0" onClick={props.toggleSideMenuFixed}>
              <input type="checkbox" checked={props.site.sideMenuFixed}/>
              <span className="slider" onClick={props.toggleSideMenuFixed}></span>
            </label>

          </p>
          
          <div className='side-menu-bottom-spacer'></div>

        </section>

    </div>
  );
}

const CustomToggle = React.forwardRef(({ children, onClick }, ref) => (
  <a
    href=""
    ref={ref}
    className="btn btn-articles-light btn-sm d-flex align-items-center"
    onClick={(e) => {
      e.preventDefault();
      onClick(e);
    }}
  >
    {children}
  </a>
));

const mapStateToProps = (state) => {

  return {
    expenses: state.expenses,
    expensesTotal: (state.expenses).length,
    site: state.site,
    user: state.auth?.user_details,
    isAuth: state.auth.isAuthenticated
  };

};

const WithSocket = props => (
  <SocketContext.Consumer>
      { socket => <Menu {...props} socket={socket}/> }
  </SocketContext.Consumer>
)

export default connect(
  mapStateToProps, 
  { toggleSideMenuFixed, toggleColorMode, toggleSideMenuOpen } 
)(WithSocket);