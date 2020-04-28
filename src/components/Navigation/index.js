import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

// import { AuthUserContext } from '../Session';
import {ReactModal, customStyles, modalContent} from './Modals';
import * as ROUTES from '../../constants/routes';
import * as ROLES from '../../constants/roles';

// import { Manager, Reference, Popper } from 'react-popper';
import { usePopper } from 'react-popper';

import moment from 'moment';
import Clock from 'react-live-clock';

import gunIcon from '../../assets/img/icons/gun.svg'

// const Navigation = (props) => (
//   <AuthUserContext.Consumer>
//     {authUser =>
//       <Menu  expensesTotal={props.expenses.length} authUser={authUser}/>
//       // <Menu authUser={authUser}/>
//     }
//   </AuthUserContext.Consumer>
// );

function Menu(props) {
  const [menuOpen, setMenuOpen] = useState(false);
  const [cartPreview, setCartPreview] = useState(false);
  const [pinOpen, setPinOpen] = useState(false);
  const [partySectionOpen, setPartySectionOpen] = useState(false);
  
  const [shouldShowElement, setShouldShowElement] = useState(false);

  const [referenceElement, setReferenceElement] = React.useState(null);
  const [popperElement, setPopperElement] = React.useState(null);
  const [arrowElement, setArrowElement] = React.useState(null);
  
  const { styles, attributes } = usePopper(referenceElement, popperElement, {
    modifiers: [{ name: 'arrow', options: { element: arrowElement } }],
  });

  const documentWidth = document.documentElement.clientWidth;
  const windowWidth = window.innerWidth;
  const scrollBarWidth = windowWidth - documentWidth;

  // console.log(documentWidth, windowWidth, scrollBarWidth)

  if ( menuOpen === false ) {
    document.body.style.overflow = 'auto';
    document.body.style.paddingRight = '0px';
  } else {
    document.body.style.overflow = 'hidden';
    document.body.style.paddingRight = scrollBarWidth + 'px';
  }

  return (
    <div>
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

        <section>

            <div className={'side-menu-notch-top-end-custom ' + (menuOpen ? 'show' : '')}>

                {/* {console.log(props.isAuth)} */}

                {!props.isAuth ? 
                null
                :
                !props.user?.outset ? (
                  <Link className="menu-bar-link mr-3" to={ROUTES.OUTSET}>
                  <span className="badge badge-articles-light">
                    <i className="fas fa-file-signature"/>Please Complete Outset 
                  </span>
                  </Link>
                ) : (
                  <>
                    {/* A call to get menu bar notifications will go here so they will only show after we are sure outset is done */}
                    {/* <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles"><i className="fas fa-file-signature"/>Terms and Privacy<span className="badge badge-danger ml-2">!</span></span></h3> */}

                    {/* Not Complete */}
                    {/* <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles-light"><i className="fas fa-tint" style={{color: '#9494ff', fontSize: '1rem', marginLeft: '10px'}}></i>Flint Water Cleanup<span className="badge badge-danger ml-2">7</span></span></h3> */}
                    {/* <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles-light"><img className="gun-icon-img" src={gunIcon} alt=""/>Gun Laws<span className="badge badge-danger ml-1">4</span></span></h3> */}
                    {/* <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-articles-light">+ <span className="badge badge-danger">23</span></span></h3> */}
                  </>
                )
                }


                {/* <>

                  <div className="full h-100 d-flex" ref={setReferenceElement}>
                    <Link className="menu-bar-link mr-3" to={ROUTES.OUTSET} onMouseEnter={() => {setShouldShowElement(true)}} onMouseLeave={() => {setShouldShowElement(false)}}>
                      <span className="badge badge-articles-light">
                        <i className="fas fa-file-signature"/>Please Complete Outset 
                      </span>
                    </Link>
                  </div>

                  {shouldShowElement ? 
                  <div ref={setPopperElement} style={{width: '200px', backgroundColor: 'gray', padding: '0.5rem', color: 'white', ...styles.popper}} {...attributes.popper}>
                    To continue into the site we just need to ask you a few questions.
                  <div ref={setArrowElement} style={styles.arrow} />
                  </div>
                  :
                  null
                  }
            
                  
                </> */}

                {/* <Manager>
                  <Reference>
                    {({ ref }) => (
                      
                      // <button className="btn btn-primary" type="button" ref={ref} onMouseEnter={() => {setShouldShowElement(true)}} onMouseLeave={() => {setShouldShowElement(false)}}>
                      //   Reference element
                      // </button>

                      <Link className="menu-bar-link mr-3" to={ROUTES.OUTSET} ref={ref} onMouseEnter={() => {setShouldShowElement(true)}} onMouseLeave={() => {setShouldShowElement(false)}}>
                        <span className="badge badge-articles-light">
                          <i className="fas fa-file-signature"/>Please Complete Outset 
                        </span>
                      </Link>

                      // <div ref={ref} onMouseEnter={() => {setShouldShowElement(true)}} onMouseLeave={() => {setShouldShowElement(false)}}>
                      //   <input disabled onFocus={() => (props.changeFocus('email'))} type="text" className="form-control" id="validationTooltip03" placeholder={props.user.email}/>
                      //   <div className="valid-tooltip">
                      //     Looks good!
                      //   </div>
                      // </div>

                    )}
                  </Reference>
                  {shouldShowElement ? (
                    <Popper placement="bottom">
                    {({ ref, style, placement, arrowProps }) => (
                      <div className="popper-help-wrap1" ref={ref} style={style} data-placement={placement}>
                        <div className="popper-help1">
                          Completing the outset allows us to collect information about you if you allow us.
                        </div>
                        <div ref={arrowProps.ref} style={arrowProps.style} />
                      </div>
                    )}
                  </Popper>
                  ) : null}
                  
                </Manager> */}

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
                  <img alt="" className="" style={{borderRadius: '100px'}} width="100%" height="100%" src=""/>
                  <i className={!props.authUser ? 'fas fa-question':'fas fa-question'}></i>
              </div> 

              <div className="profile-welcome">

                <p id="nav-welcome" className="subheading-font m-0 py-0">
                  <span>Hello,&nbsp;
                  {!props.isAuth ? (
                  <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SIGN_IN} id='nav-sign-in'>Log In / Sign Up</Link>
                  ) : (
                  <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SUBSCRIBE} id='nav-sign-in'>{props?.user?.first_name} {props?.user?.last_name}</Link>
                  )}
                  </span>
                </p>

                <p id="nav-member-message" className='subheading-font m-0 py-0'>
                  {!props.isAuth ? (
                    <span></span>
                  ) : (
                    // <span>Member Since{moment.unix(props.user?.sign_up_date).format("MMMM Y")}</span>
                    <span>Member Since {moment.unix(props.user?.sign_up_date).format("MMMM Y") || "Loading..."}</span>
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
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.REPORTS}><p className="subheading-font"><i className="fas fa-paste"></i>Reports</p></Link>

          <hr/>

          {/* Clothing Section */}
          <div className="dual-header">
            <p className="heading-font no-link">
              <b>Articles Clothing</b>
            </p>
            <span onClick={() => {setCartPreview(!cartPreview)}} to="cart">
              <span className="ml-auto noselect" id="shopping-card">
                <i className="fas fa-shopping-basket mr-0"></i>
                <span id="menu-pill" className="badge badge-pill badge-dark">
                  {props.expensesTotal}
                </span>
              </span>
            </span>
          </div>

          {cartPreview ? 
          <div className="subheading-font text-center mx-4 border border-dark">
            <p className="d-inline-block">1</p><p className="d-inline-block">2</p><p className="d-inline-block">3</p>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.CHECKOUT}><p className="btn btn-dark subheading-font mb-2">Checkout</p></Link>
          </div>
          : 
          null
          }

          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE}><p className="subheading-font"><i className="fas fa-shopping-cart"></i>Store</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE_SUBMISSIONS}><p className="subheading-font"><i className="fas fa-lightbulb"></i>Submissions</p></Link>
          
          <hr/> 

          {/* New Section */}
          <p className="heading-font no-link"><b>Articles News</b></p>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.NEWS}><p className="subheading-font"><i className="fas fa-newspaper"></i>News</p></Link>
          <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ISSUES}><p className="subheading-font"><i className="fas fa-person-booth "></i>Issues</p></Link>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MYTHS}><p className="subheading-font"><i className="fas fa-ghost"></i>Myths</p></Link>
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TOWN_HALL}><p className="subheading-font"><i className="fas fa-bell"></i>Town Hall</p></Link> */}

          <hr/>

          {/* Party Section */}
          <div className="dual-header">
            <p className="heading-font no-link">
              <b>Articles Party</b>
            </p>
            {/* <div onClick={() => {setPartySectionOpen(!partySectionOpen)}} className={"section-collapse " + (partySectionOpen ? "" : "hide")}><i className="fas fa-chevron-circle-down"></i></div> */}
          </div>

          <div className={"tab-content " + (partySectionOpen ? "" : "")}>
            <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PARTY}><p className="subheading-font"><i className="fas fa-users"></i>Information</p></Link>
          </div>
          

          {/* Support Section */}
          {/* <hr/> */}
          {/* <p className="heading-font no-link"><b>Support</b></p> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.SUPPORT}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Help Us</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.JOBS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Jobs</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PRESS}><p className="subheading-font"><i className="fas fa-address-card"></i>Press</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.TRANSLATIONS}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Translations</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.LANDING}><p className="subheading-font"><i className="fas fa-map-pin"></i>Landing</p></Link> */}
          {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.OUTSET}><p className="subheading-font"><i className="fas fa-horse"></i>Outset</p></Link> */}
          
          {!props.isAuth ? (
            null
          ) : (
            <div>
              <hr/>

              {/* Admin */}
              {props.user?.roles?.isAdmin ?
              <>
              <p className="heading-font no-link"><b>Admin Only</b></p>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}><p className="subheading-font"><i className="fas fa-bible"></i>Admin</p></Link>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.REPORTS_MANAGE}><p className="subheading-font"><i className="fas fa-wallet"></i>Reports Manage</p></Link>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.STORE_MANAGE}><p className="subheading-font"><i className="fas fa-wallet"></i>Clothing Manage</p></Link>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MANAGE}><p className="subheading-font"><i className="fas fa-wallet"></i>News Manage</p></Link>
              <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.DONATE}><p className="subheading-font"><i className="fas fa-wallet"></i>Donation</p></Link>
              <hr/>
              </>
              :
              null
              }

              {/* Playground */}
              {props.user?.roles?.isDev ?
              <>
                <p className="heading-font no-link"><b>Dev Only</b></p>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.PLAYGROUND}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Playground</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MESH}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Mesh</p></Link>
                <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MAIL}><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Mesh</p></Link>
                <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-alternate_2x.png" height="45px" alt=""/>
                <img className="p-0" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" height="40px" alt=""/>
              </>
              :
              null
              }
            </div>
          )}
          


          <div className='side-menu-bottom-spacer'></div>

        </section>

    </div>
  );
}

const mapStateToProps = (state) => {
  // console.log(state.auth.user_details?.user?.first_name)
  return {
    expenses: state.expenses,
    expensesTotal: (state.expenses).length,
    site: state.site,
    user: state.auth?.user_details?.user,
    first_name: state.auth.user_details?.user?.first_name,
    isAuth: state.auth.isAuthenticated
  };
};

export default connect(mapStateToProps)(Menu);