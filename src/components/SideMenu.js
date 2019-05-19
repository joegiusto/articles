import React from "react";
import { Link } from "react-router-dom";
import moment from 'moment';
import Clock from 'react-live-clock';
import Modals from './Modals';
// import $ from "jquery";
// import '../js/slick.js';
// import '../js/slick-config.js';

const MenuRebuild = (props) => (
    <div>
        <Modals/>
        <section className={'side-menu-overlay' + (props.menuOpen || props.pinOpen ? " show" : "")} onClick={props.menuToggle}></section>

        <section className="menu-spacer"></section>

        <section>
            <div className="nav-tab">
                <button className={'hamburger hamburger--spin' + (props.menuOpen ? " is-active" : "")} type="button" onClick={props.menuToggle}>
                        <span className="hamburger-box">
                        <span className="hamburger-inner"></span>
                    </span>
                </button> 
            </div> 
        </section>

        <section>
            <div className="pin-tab d-lg-none">
                <button className={'pin' + (props.menuOpen ? " is-active" : "")} type="button" onClick={props.pinToggle}>
                    <i className="fas fa-thumbtack text-danger"></i>
                </button> 
            </div> 
        </section>

        <section className={"side-menu-notch-top " + (props.menuOpen ? "show" : "")}>
            <div className="side-menu-notch-top-end"></div>
        </section>

        <section className={"side-pin-notch-top d-lg-none " + (props.pinOpen ? "show" : "")}>
            <div className="side-pin-notch-top-end"></div>
        </section>

        <section>
            <div className={'side-menu-notch-top-end-custom ' + (props.menuOpen ? 'show' : '')}>
                <div className={'d-none d-lg-flex'}>
                    
                    <h3 data-toggle="modal" data-target="#muellerReports" className="top-headline mx-1 ml-5 d-inline"><span className="badge badge-black badge-shape-poly ">Mueller Report Highlights<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3>
                    <h3 data-toggle="modal" data-target="#sale" className="top-headline mx-1 d-inline"><span className="badge badge-black badge-shape-poly ">15% Sale<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3>
                    {/* <h3 data-toggle="modal" data-target="#cookie" className="top-headline top-headline-cookie d-inline"><span className="badge badge-danger badge-shape-poly ">Agree to Cookies?<span className="badge badge-success badge-sub-red ml-2"><i class="far fa-check-square mx-1"></i></span><span className="badge badge-warning badge-sub-red ml-1"><i class="far fa-times-circle mx-1"></i></span></span></h3> */}
                </div>
                <div className={'d-none d-lg-flex'}>
                    <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-light"><i className="fas fa-map-pin"></i>Flint Water Cleanup<span className="badge badge-danger ml-2">1</span></span></h3>
                    <h3 style ={{cursor: 'pointer'}} data-toggle="modal" data-target="#pin" className="top-headline mx-1 d-inline"><span className="badge badge-light"><i className="fas fa-map-pin"></i>Gun Laws<span className="badge badge-danger ml-2">4</span></span></h3>
                    {/* <h3 className="top-headline mx-1 d-inline"><span className="badge badge-light"><i className="fas fa-map-pin"></i>Pinned Stories<span className="badge badge-danger ml-2">7</span></span></h3> */}
                </div>
            </div>
        </section>

        <section className={"side-pin " + (props.pinOpen ? "show" : "")}>
            <h3 className="subheading-font ml-3 mt-2">Site News</h3>
            <h3 className="top-headline"><span className="badge badge-black badge-shape-poly shadow-sm ml-3">Mueller Report Highlights<span className="badge badge-danger badge-sub-red ml-2">!</span><div className="d-inline"></div></span></h3>
            <h3 className="top-headline"><span className="badge badge-black badge-shape-poly shadow-sm ml-3">15% Sale<span className="badge badge-danger badge-sub-red ml-2">!</span></span></h3>
            <hr/>
            <h3 className="subheading-font ml-3 mt-2">Your Pins</h3>
            <h3 className="top-headline w-100"><span className="badge badge-light mx-3 shadow-sm"><i className="fas fa-map-pin"></i>Flint Water Cleanup<span className="badge badge-danger ml-2">1</span></span></h3>
            <h3 className="top-headline w-100"><span className="badge badge-light mx-3 shadow-sm"><i className="fas fa-map-pin"></i>Gun Laws<span className="badge badge-danger ml-2">4</span></span></h3>
            <hr/>
        </section>

        <section className={"side-menu " + (props.menuOpen ? "show" : "")}>
            {/* Profile Section */}
            <div className="profile">
                <div className="profile-photo" >
                    <img alt="" className={props.currentUser.photoURL ? 'p-0 ':'d-none'} style={{borderRadius: '100px'}} width="100%" height="100%" src={props.currentUser.photoURL}/>
                    <i className={props.currentUser.photoURL ? 'fas fa-question d-none':'fas fa-question'}></i>
                </div> 
            
                <div className="profile-welcome">
                    <p id="nav-welcome" className="subheading-font m-0 py-0"><span id="">Hello, <Link id='nav-sign-in' to={props.currentUser.displayName ? '/profile' : '/login'}>{props.currentUser.displayName ? props.currentUser.displayName : 'Log In / Sign Up'}</Link></span></p>
                    <p id="nav-member-message" className={'subheading-font m-0 py-0' + (props.currentUser.displayName ? '' : ' d-none')}><span>Member Since 2019</span></p>
                </div>
            </div>

            <hr/>

            {/* Todays Info Section  */}
            <p className="subheading-font m-0 py-0"><span id="date">{moment().format('dddd MMMM Do, YYYY')}</span></p>
            <p className="subheading-font m-0 py-0"><Clock format={'h:mm:ss A'} ticking={true} /></p>
        
            <hr/>

            {/* Main Links Section */}
            <Link to="/"><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Home</p></Link>
            <Link to="/mission"><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Mission</p></Link>
            <Link to="/reports"><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Transparency Reports</p></Link>

            <hr/>

            {/* Clothing Section */}
            <p className="heading-font no-link d-flex justify-content-between"><b>Articles Clothing</b><Link to="cart"><span className="ml-auto" id="shopping-card"><i className="fas fa-shopping-basket mr-0"></i><span id="menu-pill" className="badge badge-pill badge-dark">{props.cartTotal}</span></span></Link></p>
            <Link to="store"><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Store</p></Link>
            <Link to="submissions"><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Design Submissions</p></Link>

            <hr/> 

            {/* New Section */}
            <p className="heading-font no-link"><b>Articles News</b></p>
            <Link to='news'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>News</p></Link>
            <Link to='town-hall'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Town Hall</p></Link>

            <hr/>

            {/* Party Section */}
            <p className="heading-font no-link"><b>Articles Party</b></p>
            <Link to='issues'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Issues</p></Link>
            <Link to='myths'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Myths</p></Link>

            <hr/>

            {/* Mesh Section */}
            <p className="heading-font no-link"><b>Mesh</b></p>
            <Link to='mesh'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>About</p></Link>
            <img src="https://developer.apple.com/app-store/marketing/guidelines/images/badge-example-alternate_2x.png" height="45px" alt=""/>
            <img className="p-0" src="https://play.google.com/intl/en_us/badges/images/generic/en_badge_web_generic.png" height="40px" alt=""/>

            <div className={ props.currentUser.displayName ? 'side-menu-footer' : 'side-menu-footer d-none'}>
                <hr/>
                <p className="heading-font no-link"><b>Account</b></p>
                <Link to='/settings'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Settings</p></Link>
                <Link id="nav-sign-out" to='/login'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Sign Out</p></Link>
            </div>

            <hr/>
            
            {/* Support Section */}
            <p className="heading-font no-link"><b>Support</b></p>
            <Link to='help'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Help Us</p></Link>
            <Link to='press'><p className="subheading-font"><i className="fas fa-spinner fa-pulse"></i>Press</p></Link>

            {props.uiMode === 'day' ? <a id="night-mode" onClick={props.uiNight} href="JavaScript:void(0);"><p className="subheading-font"><i id="night-mode-icon" className="fas fa-toggle-off"></i>Night Mode</p></a> : <a id="night-mode" onClick={props.uiDay} href="JavaScript:void(0);"><p className="subheading-font"><i id="night-mode-icon" className="fas fa-toggle-on"></i>Night Mode</p></a>}

            <div className='side-menu-bottom-spacer'></div>
        </section>

    </div>
);
 
export default MenuRebuild;