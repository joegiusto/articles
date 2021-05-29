import React, { useEffect, useState } from 'react';

import Link from 'next/link'
import dynamic from 'next/dynamic'

import { useSession } from 'next-auth/client'

import { connect, useSelector, useDispatch } from 'react-redux'
import moment from 'moment';
import Dropdown from 'react-bootstrap/Dropdown';

// Articles absolute imports
import ROUTES from 'components/constants/routes'
import SocketContext from 'components/context/socket'
import { toggleSideMenuFixed, toggleColorMode, toggleSideMenuOpen } from 'redux/actions/siteActions';

const Clock = dynamic(
    () => import('react-live-clock'),
    { ssr: false }
)

function SideMenuBase(props) {
    const sideMenuOpen = useSelector((state) => state.site.sideMenuOpen)
    const colorModeDark = useSelector((state) => state.site.colorModeDark)
    const sideMenuFixed = useSelector((state) => state.site.sideMenuFixed)
    const userReduxState = useSelector((state) => state.auth.user_details)
    const cartItems = useSelector((state) => state.cart)

    const [connected, setConnected] = useState(false);
    
    const [ notificationProgress, setNotificationProgress ] = useState(  );
    const [ notificationVisible, setNotificationVisible ] = useState( false );
    const [ notification, setNotification ] = useState( {
        // message: 'Test notification, please ignore'
    } );

    const [pinOpen, setPinOpen] = useState(false);

    const [ session, loading ] = useSession()

    const dispatch = useDispatch()
    // const { sideMenuOpen, colorModeDark, cartItems, sideMenuFixed } = useCounter()

    useEffect(() => {

        props.socket.on('connect', () => {
            console.log("Connected to server!");
            setConnected(true);
            props.socket.emit('login', {userId: userReduxState._id})
        });

        // props.socket.on('notification', () => {
        //     console.log("Notification received");
        //     console.log(`Socket Message: ${msg}`);
        //     showNotification();
        // });

        props.socket.on('disconnect', () => {
            console.log("Disconnected from server!");
            setConnected(false);
        });

        props.socket.on('notification', function( data ) {
            setNotification( data );
            showNotification( data );
            console.log(`Socket Message: ${data}`);
        });

    })

    useEffect(() => {

        if (sideMenuOpen) {
            console.log(sideMenuOpen)
            document.body.classList.add("overflow-hidden")
        } else {
            console.log(sideMenuOpen)
            document.body.classList.remove("overflow-hidden")
        }

    }, [sideMenuOpen])

    function showNotification(data, seconds) {
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

        // Only hide notification if there is no override
        if ( !data.force_notification_interaction ) {
            setTimeout(() => { 
                setNotificationVisible(false)
                setTimeout(() => setNotification( {} ), 200 )
            }, 4000);
        }
    
        
    }

    function clearNotification() {
        setNotificationVisible(false)
        setTimeout(() => setNotification( {} ), 200 )
    }

    function renderNotificationType() {
        switch(notification?.type) {
            case 'basic':
                return (
                    <div className="notification-content">{notification?.message}</div>
                );
            case 'donation':
                return (
                    <div className="notification-content">

                        <Link href={ROUTES.TRANSPARENCY}>
                            <a><i className="fas fa-external-link-alt"></i></a>
                        </Link> 

                        <span>
                            <b>{notification?.user}</b>
                            {` from ` } 
                            <b>{notification?.state}</b>
                            {` has donated `}
                            <span className="badge badge-success ml-1">{notification?.amount}</span>
                        </span>

                    </div>
                );
            case 'expense':
                return (
                    <div className="notification-content">

                        <Link href={ROUTES.TRANSPARENCY}>
                            <a><i className="fas fa-external-link-alt"></i></a>
                        </Link> 

                        <span>
                            <b>Articles</b>
                            {` has made a ` } 
                            <b>{notification?.expense_type}</b>
                            {` expense for `}
                            <b>{notification?.reason}</b>
                            {` of `}
                            <span className="badge badge-danger ml-1">{notification?.amount}</span>
                        </span>

                    </div>
                );
            default:
                return (
                    <div className="notification-content">
                        <span className="badge badge-warning">{notification?.type}</span> - {notification?.message}
                    </div>
                );
        }
    }
    
    return ( <div className={'menu-wrap noselect' + (sideMenuFixed ? ' fixed' : '') + (props.site?.colorModeDark ? ' dark-mode' : '')}>

        <section onClick={ props.toggleSideMenuOpen } className={'side-menu-overlay' + (sideMenuOpen || pinOpen ? " show" : "")}></section>

        <section className="menu-spacer"></section>

        {/* <NotificationArea/> */}

        <section>
            <div className="nav-tab">
                {/* <button className={'hamburger hamburger--spin' + (props.site?.sideMenuFixed ? ' is-active' : sideMenuOpen ? " is-active" : "")} type="button" onClick={() => props.site?.sideMenuFixed ? (props.toggleSideMenuFixed(), dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}), props.toggleSideMenuOpen() ) : dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }> */}
                <button className={'hamburger hamburger--spin' + (sideMenuFixed ? ' is-active' : sideMenuOpen ? " is-active" : "")} type="button" onClick={() => ( sideMenuFixed ? (props.toggleSideMenuFixed(), props.toggleSideMenuOpen() ) : props.toggleSideMenuOpen() ) }>
                {/* <button className={'hamburger hamburger--spin' + (props.site?.sideMenuFixed ? ' is-active' : sideMenuOpen ? " is-active" : "")} type="button" onClick={ props.toggleSideMenuOpen }> */}
                    <span className="hamburger-box">
                    <span className="hamburger-inner"></span>
                    </span>
                </button> 
            </div> 
        </section>

        <section className={"side-menu-notch-top " + (sideMenuOpen ? "show" : "")}>
            <div className={"side-menu-notch-top-end " + (sideMenuOpen ? "show" : "")}></div>
        </section>

        <div className={"notification " + (notificationVisible && 'show')}>

            <div onClick={() => clearNotification()} className="close">
                <i className="far fa-times-circle mr-0"></i>
            </div>

            <div style={{width: notificationProgress + '%'}} className="progress"></div>

            { renderNotificationType() }

        </div>

        <section>
            <div className={'side-menu-notch-top-end-custom align-items-center ' + (sideMenuOpen ? 'show' : '')}>

                {
                props.isAuth ? 

                <>
                {!props.user?.outset ? 
                <Link href={ROUTES.OUTSET}>
                    <span className="menu-bar-link mr-3 badge badge-articles-light">
                        <i className="fas fa-file-signature"/>Please Complete Outset 
                    </span>
                </Link>
                :
                null}

                {!props.user?.isVerified ? 
                    <Link href={ROUTES.VERIFY_EMAIL}>
                        <span className="menu-bar-link mr-3">
                            <span className="badge badge-articles-light badge-danger">
                                <i className="fas fa-file-signature"/>Please Verify Email 
                            </span>
                        </span>
                    </Link>
                :
                null}
                </>

                :
                null
                }

                <Dropdown className="weather-badge mr-3">

                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                        <img src="https://icon-library.com/images/cloudy-icon/cloudy-icon-3.jpg" alt="Cloudy weather icon"/>
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
                            <img src="https://icon-library.com/images/cloudy-icon/cloudy-icon-3.jpg" alt="Cloudy weather icon"/>
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

                <Dropdown className="messages-badge mr-3">
                    
                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                        {/* <div className="notification-count">0</div> */}
                        <div className={"messages-count " + (connected ? 'bg-success' : 'bg-danger')}>0</div>

                        <div>{' '} <i className="fad fa-comments-alt mr-0"></i> {' '}</div>
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
                        <Link href={ROUTES.MESSAGES}>
                            <div style={{cursor: 'pointer'}} className="badge badge-success w-100">0 Messages</div>
                        </Link>
                        </div>

                        {/* <Dropdown.Item eventKey="4">Manage</Dropdown.Item> */}

                    </Dropdown.Menu>

                </Dropdown>

                <Dropdown  className="notification-badge mr-3">

                    <Dropdown.Toggle as={CustomToggle} id="dropdown-custom-1">
                        <div className="notification-count">0</div>
                        {/* <div className={"message-count " + (connected ? 'bg-success' : 'bg-danger')}>0</div> */}

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
                        <Link href={ROUTES.MESSAGES}>
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

        <section className={"side-menu " + (sideMenuOpen ? "show" : "")}>

            {/* Profile Photo and Account Section */}
            <div className="profile">

                <div className="profile-photo" >
                    {userReduxState?.photo_url === undefined ? 
                    null
                    :
                    <Link href={ROUTES.SETTINGS_ACCOUNT} >
                        <img alt="User profile image" className="" style={{borderRadius: '0px'}} width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${userReduxState?._id}.jpg` || ''}/>
                    </Link>
                    }
                    <i className={userReduxState?.photo_url ? '':'fas fa-question'}></i>
                </div> 

                <div className="profile-welcome">

                    <div id="nav-welcome" className="subheading-font m-0 pl-2 py-0">
                        <span>Hello,&nbsp;
                        {!session ? 
                            
                        <Link href={`${ROUTES.SIGN_IN}`}>
                            <a id='nav-sign-in' onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>Log In / Sign Up</a>
                        </Link>
                        : 
                        <Link href={ROUTES.SETTINGS_ACCOUNT}>
                            <a id='nav-sign-in' onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                                {/* {session.user.email} */}
                                {`${userReduxState?.first_name} ${userReduxState?.last_name}`}
                            </a>
                        </Link>
                        }
                        </span>
                    </div>

                    <div id="nav-member-message" className='subheading-font m-0 pl-2 py-0'>
                    {!session ? (
                        <span></span>
                    ) : (
                        // <span>Member Since{moment.unix(props.user?.sign_up_date).format("MMMM Y")}</span>
                        <div>
                        <div style={{fontSize: '0.8rem'}}>Member Since {moment(userReduxState?.sign_up_date).format("MMMM Y") || "Loading..."}</div>
                        {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.MESSAGES}><button className="btn btn-sm btn-articles-light">Chat</button></Link> */}
                        </div>
                    )
                    }
                    </div>

                </div>

            </div>

            <hr/>

            {/* Clock and Today Info Section  */}
            <div className="subheading-font m-0 py-0 pl-4"><span id="date">{moment().format('dddd MMMM Do, YYYY')}</span></div>
            <div className="subheading-font m-0 py-0 pl-4"><Clock format={'h:mm:ss A'} ticking={true} /></div>

            <hr/>

            {/* Main Links Section */}
            <div className="side-menu-section-links">

                {userReduxState?
                <Link href={ROUTES.HOME}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        <i className="icon fad fa-home"></i>
                        <span>Home</span>
                    </a>
                </Link>
                :
                <Link href={ROUTES.HOME}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconHome className="icon"/> */}
                        <i className="icon fad fa-home"></i>
                        <span>Landing</span>
                    </a>
                </Link>
                }

                <Link href={ROUTES.MISSION}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconFlagUsa className="icon"/> */}
                        <i className="icon fad fa-flag-usa"></i>
                        <span>Mission</span>
                    </a>
                </Link>

                <Link href={ROUTES.TRANSPARENCY}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconFileChartLine className="icon"/> */}
                        <i className="icon fad fa-file-chart-line"></i>
                        <span>Transparency</span>
                    </a>
                </Link>

            </div>

            {/* Clothing Section */}
            <div className={`side-menu-section-header header-clothing ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">Clothing</div>

                <Link href={ROUTES.CHECKOUT}>
                    <a id="shopping-cart-button" className="btn btn-articles-light btn-sm align-self-center">
                        <i className="fas fa-shopping-basket mr-0"></i>
                        <span id="shopping-cart-amount" className="badge badge-pill badge-dark">
                            {cartItems.length}
                        </span>
                    </a>
                </Link>

            </div>

            <div className="side-menu-section-links">

                <Link href={ROUTES.STORE}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconShoppingCart className="icon"/> */}
                        <i className="icon fad fa-shopping-cart fa-lg"></i>
                        <span>Store</span>
                    </a>
                </Link>

                <Link href={ROUTES.STORE_SUBMISSIONS}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconLightbulb className="icon"/> */}
                        <i className="icon fad fa-lightbulb fa-lg"></i>
                        <span>Submissions</span>
                    </a>
                </Link>

            </div>

            {/* News Section */}
            <div className={`side-menu-section-header header-news ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">News</div>

                {/* <span id="news-notification-count" className="badge badge-pill badge-dark">
                    3
                </span> */}

            </div>

            <div className="side-menu-section-links">

                <Link href={ROUTES.NEWS}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconNewspaper className="icon"/> */}
                        <i className="icon fad fa-newspaper fa-lg"></i>
                        <span>Frontpage</span>
                    </a>
                </Link>

                <Link href={ROUTES.STORIES}>
                    {/* <i className="fas fa-bullhorn"></i> */}
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconBullhorn className="icon"/> */}
                        <i className="icon fad fa-bullhorn fa-lg"></i>
                        <span>Stories</span>
                    </a>
                </Link>

                <Link href={ROUTES.ISSUES}>
                    {/* <i className="fas fa-balance-scale"></i> */}
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconBalanceScale className="icon"/> */}
                        <i className="icon fad fa-balance-scale fa-lg"></i>
                        <span>Issues</span>
                    </a>
                </Link>

                <Link href={ROUTES.MYTHS}>
                    {/* <i className="fas fa-newspaper"></i> */}
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconGhost className="icon"/> */}
                        <i className="icon fad fa-ghost fa-lg"></i>
                        <span>Myths</span>
                    </a>
                </Link>

                <Link href={ROUTES.RESOURCES}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconBooks className="icon"/> */}
                        <i className="icon fad fa-books fa-lg"></i>
                        <span>Resources</span>
                    </a>
                </Link>

            </div>    

            {/* Politics Section */}
            <div className={`side-menu-section-header header-politics ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">Politics</div>

            </div>

            <div className="side-menu-section-links">

                <Link href={ROUTES.PARTY}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconHandsHelping className="icon"/> */}
                        <i className="icon fad fa-hands-helping fa-lg"></i>
                        <span>Info</span>
                    </a>
                </Link>

                <Link href={ROUTES.PROPOSALS}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        <i className="icon fad fa-scroll fa-lg"></i>
                        <span>Proposals</span>
                    </a>
                </Link>

                <Link href={ROUTES.TOWN_HALL}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        <i className="icon fad fa-bell fa-lg"></i>
                        <span>Town Hall</span>
                    </a>
                </Link>

            </div>

            {/* Community Section */}
            <div className={`side-menu-section-header header-community ${props.site.animatedSideMenuSectionHeaders ? 'animated' : ''}`}>

                <div className="side-menu-section-header-title">Community</div>

            </div>

            <div className="side-menu-section-links">

                <Link href={ROUTES.COMMUNITY} className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.COMMUNITY}>
                    <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconSitemap className="icon"/> */}
                        <i className="icon fad fa-sitemap fa-lg"></i>
                        <span>Hub</span>
                    </a>
                </Link>

                <Link href={ROUTES.MESSAGES} className="link messages-link" onClick={() => {setMenuOpen(false)}} to={ROUTES.MESSAGES}>
                    <a className="link link-messages" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                        {/* <IconComment className="icon messages-icon"/> */}
                        {/* <i className="icon fad fa-comment fa-lg"></i> */}
                        <i className="icon fad fa-comments-alt fa-lg"></i>
                        <span>
                            Messages
                        </span>
                    </a>
                </Link>

            </div>

            
            {/* Admin */}
            {userReduxState?.roles?.isAdmin &&
                <>
                    {/* Admin Section */}
                    <div className="side-menu-section-header header-admin">

                        <div className="side-menu-section-header-title">Admin</div>

                        <span className="badge badge-warning"><i className="fas fa-star mr-0" aria-hidden="true"></i></span>

                    </div>

                    <div className="side-menu-section-links">

                        <Link href={ROUTES.ADMIN} className="link" onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}>
                            <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                                {/* <IconToolbox  className="icon"/> */}
                                <i className="icon fad fa-toolbox fa-lg"></i>
                                <span>Portal</span>
                            </a>
                        </Link>

                    </div>

                    {/* <Link onClick={() => {setMenuOpen(false)}} to={ROUTES.ADMIN}><p className="subheading-font"><i className="fas fa-toolbox"></i>Admin Portal</p></Link> */}

                </>
            }

            {userReduxState?.roles?.isAdmin && (
                <>

                    {/* Admin Section */}
                    <div className="side-menu-section-header header-developer">

                        <div className="side-menu-section-header-title">Developer</div>
                        <span className="badge badge-warning"><i className="fas fa-star mr-0" aria-hidden="true"></i></span>

                    </div>

                    <div className="side-menu-section-links">

                        <Link href={ROUTES.PLAYGROUND}>
                            <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                                <i className="icon fad fa-compass fa-lg"></i>
                                <span>Playground</span>
                            </a>
                        </Link>

                        <Link href={ROUTES.EPCOT}>
                            <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                                <i className="icon fad fa-tree-palm fa-lg"></i>
                                <span>Epcot</span>
                            </a>
                        </Link>

                        <Link href={ROUTES.OUTSET}>
                            <a className="link" onClick={ () => dispatch({type: 'TOGGLE_SIDE_MENU_OPEN'}) }>
                                <i className="icon fad fa-alarm-exclamation fa-lg"></i>
                                <span>Outset</span>
                            </a>
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
            )}

        <hr/>

        <div className="mx-4 subheading-font align-items-center d-flex justify-content-between pb-3 pt-2" onClick={ props.toggleColorMode  }>

            <div className="">
                {colorModeDark ? <i className="far fa-moon"></i> : <i className="fas fa-sun"></i>}
                <span>Dark Mode</span>
            </div>

            <label className="articles-switch mb-0">
                <input disabled type="checkbox" checked={colorModeDark}/>
                <span className="slider"></span>
            </label>

        </div>

        <div className="mx-4 subheading-font align-items-center d-flex justify-content-between pb-3" onClick={ props.toggleSideMenuFixed }>

            <div>
                {sideMenuFixed ? <i className="fas fa-columns"></i> : <i className="fas fa-columns"></i>}
                <span>Fixed Menu</span>
            </div>

            <label className="articles-switch mb-0" >
                <input disabled type="checkbox" checked={sideMenuFixed}/>
                <span className="slider" ></span>
            </label>

        </div>

        <div className='side-menu-bottom-spacer'></div>

        </section>

    </div> )
    
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

const SideMenu = props => (
    <SocketContext.Consumer>
        { socket => <SideMenuBase {...props} socket={socket}/> }
    </SocketContext.Consumer>
)

const mapStateToProps = (state) => {
    return {
        // expenses: state.expenses,
        // expensesTotal: (state.expenses).length,
        // site: state.site,
        // user: state.auth?.user_details,
        // isAuth: state.auth.isAuthenticated
    };  
};

export default connect(
    null, 
    { toggleSideMenuOpen, toggleSideMenuFixed , toggleColorMode } 
)(SideMenu);