import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import * as ROUTES from '../../constants/routes';
import moment from 'moment';
import Clock from 'react-live-clock';
import Dropdown from 'react-bootstrap/Dropdown';

import SocketContext from '../../utils/socket_context/context'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome' 
// import Books from '../FontAwesome/duotone/books.svg' 

import { ReactComponent as IconHome } from '../FontAwesome/duotone/home.svg';
import { ReactComponent as IconFlagUsa } from '../FontAwesome/duotone/flag-usa.svg';
import { ReactComponent as IconFileChartLine } from '../FontAwesome/duotone/file-chart-line.svg';

import { ReactComponent as IconShoppingCart } from '../FontAwesome/duotone/shopping-cart.svg';
import { ReactComponent as IconLightbulb } from '../FontAwesome/duotone/lightbulb.svg';

import { ReactComponent as IconBooks } from '../FontAwesome/duotone/books.svg';
import { ReactComponent as IconNewspaper } from '../FontAwesome/duotone/newspaper.svg';
import { ReactComponent as IconGhost } from '../FontAwesome/duotone/ghost.svg';
import { ReactComponent as IconBalanceScale } from '../FontAwesome/duotone/balance-scale.svg';
import { ReactComponent as IconBullhorn } from '../FontAwesome/duotone/bullhorn.svg';

import { ReactComponent as IconHandsHelping } from '../FontAwesome/duotone/hands-helping.svg';
import { ReactComponent as IconScroll } from '../FontAwesome/duotone/scroll.svg';
import { ReactComponent as IconBell } from '../FontAwesome/duotone/bell.svg';

import { ReactComponent as IconSitemap } from '../FontAwesome/duotone/sitemap.svg';
import { ReactComponent as IconPaperPlane } from '../FontAwesome/duotone/paper-plane.svg';
import { ReactComponent as IconComment } from '../FontAwesome/duotone/comment.svg';

import { ReactComponent as IconToolbox } from '../FontAwesome/duotone/toolbox.svg';

import { ReactComponent as IconAlarmExclamation } from '../FontAwesome/duotone/alarm-exclamation.svg';
import { ReactComponent as IconDraftingCompass } from '../FontAwesome/duotone/drafting-compass.svg';

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
            <div className="side-menu-section-links">

                {props.isAuth?
                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.HOME}>
                    <IconHome className="icon"/>
                    <span>Home</span>
                </Link>
                :
                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.HOME}>
                    <IconHome className="icon"/>
                    <span>Landing</span>
                </Link>
                }

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.MISSION}>
                    <IconFlagUsa className="icon"/>
                    <span>Mission</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.TRANSPARENCY}>
                    <IconFileChartLine className="icon"/>
                    <span>Transparency</span>
                </Link>

            </div>

            {/* Clothing Section */}
            <div className={`side-menu-section-header header-clothing ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">Clothing</div>

                <Link id="shopping-cart-button" className="btn btn-articles-light btn-sm align-self-center" onClick={() => {setMenuOpen(false)}} to={ROUTES.CHECKOUT}>
                    <i className="fas fa-shopping-basket mr-0"></i>
                    <span id="shopping-cart-amount" className="badge badge-pill badge-dark">
                        {props.expensesTotal}
                    </span>
                </Link>

            </div>

            <div className="side-menu-section-links">

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE}>
                    <IconShoppingCart className="icon"/>
                    <span>Store</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE_SUBMISSIONS}>
                    <IconLightbulb className="icon"/>
                    <span>Submissions</span>
                </Link>

            </div>

            {/* News Section */}
            <div className={`side-menu-section-header header-news ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">News</div>

                <span id="shopping-cart-amount" className="badge badge-pill badge-dark">
                    3
                </span>

            </div>

            <div className="side-menu-section-links">

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.NEWS}>
                    <IconNewspaper className="icon"/>
                    <span>Frontpage</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.STORIES}>
                    {/* <i className="fas fa-bullhorn"></i> */}
                    <IconBullhorn className="icon"/>
                    <span>Stories</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.ISSUES}>
                    {/* <i className="fas fa-balance-scale"></i> */}
                    <IconBalanceScale className="icon"/>
                    <span>Issues</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.MYTHS}>
                    {/* <i className="fas fa-newspaper"></i> */}
                    <IconGhost className="icon"/>
                    <span>Myths</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.RESOURCES}>
                    <IconBooks className="icon"/>
                    <span>Resources</span>
                </Link>

            </div>    

            {/* Politics Section */}
            <div className={`side-menu-section-header header-politics ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">Politics</div>

            </div>

            <div className="side-menu-section-links">

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.PARTY}>
                    <IconHandsHelping className="icon"/>
                    <span>Info</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.PROPOSALS}>
                    <IconScroll className="icon"/>
                    <span>Proposals</span>
                </Link>

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.TOWN_HALL}>
                    <IconBell className="icon"/>
                    <span>Town Hall</span>
                </Link>

            </div>

            {/* Community Section */}
            <div className={`side-menu-section-header header-community ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">Community</div>

            </div>

            <div className="side-menu-section-links">

                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.COMMUNITY}>
                    <IconSitemap className="icon"/>
                    <span>Hub</span>
                </Link>

                <Link className="link messages-link" onClick={() => {setMenuOpen(false)}} to={ROUTES.MESSAGES}>
                    <IconComment className="icon messages-icon"/>
                    <span>
                        Messages
                    </span>
                </Link>

            </div>
          
            {props.isAuth && (

                <>

                    {/* Admin */}
                    {props.user?.roles?.isAdmin &&
                        <>
                            {/* Admin Section */}
                            <div className="side-menu-section-header header-admin">

                                <div className="side-menu-section-header-title">Admin</div>

                                <span className="badge badge-warning"><i class="fas fa-star mr-0" aria-hidden="true"></i></span>

                            </div>

                            <div className="side-menu-section-links">

                                <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}>
                                    <IconToolbox  className="icon"/>
                                    <span>Portal</span>
                                </Link>

                            </div>

                            {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}><p className="subheading-font"><i className="fas fa-toolbox"></i>Admin Portal</p></Link> */}

                        </>
                    }

                    {/* Playground */}
                    {props.user?.roles?.isDev === true ?
                    <>
                        {/* Admin Section */}
                        <div className="side-menu-section-header header-developer">

                            <div className="side-menu-section-header-title">Developer</div>
                            <span className="badge badge-warning"><i class="fas fa-star mr-0" aria-hidden="true"></i></span>

                        </div>

                        <div className="side-menu-section-links">

                            <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.PLAYGROUND}>
                                <IconDraftingCompass className="icon"/>
                                <span>Playground</span>
                            </Link>

                            <Link className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.OUTSET}>
                                <IconAlarmExclamation className="icon"/>
                                <span>Outset</span>
                            </Link>

                        </div>

                        {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PLAYGROUND}><p className="subheading-font"><i className="fas fa-code"></i>Playground</p></Link> */}
                        {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.OUTSET}><p className="subheading-font"><i className="fas fa-road"></i>Outset</p></Link> */}

                        {/* One Day! */}
                        {/* <div className="app-links">
                            <img className="app-badge" src="https://bibibop.com/data/sites/1/media/rewards/Download_badge-apple-white.png" alt=""/>
                            <img className="app-badge" src="https://www.prorehab-pc.com/wp-content/uploads/2017/12/google-play-button.svg_.hi_.png" alt=""/>
                        </div> */}
                    </>
                    :
                    null
                    }
                </>
            
            )}

          <hr/>

          <p className="subheading-font align-items-center d-flex justify-content-between pb-3" onClick={props.toggleColorMode}>

            <div>
              {/* <i className="fas fa-code" aria-hidden="true"></i> */}
              {props.site.colorModeDark ? <i className="far fa-moon"></i> : <i className="fas fa-sun"></i>}
              <span>Dark Mode<span className="badge badge-primary ml-2">Beta</span></span>
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