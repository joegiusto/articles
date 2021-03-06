import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'

import { useSelector, useDispatch } from 'react-redux'

import axios from 'axios'

// Articles Imports
import ROUTES from 'components/constants/routes'
import StoreItemBeta from 'components/store/StoreItem';
// import { connectToDatabase } from 'util/mongodb'
import StoreItem from 'components/store/StoreItem'
import NewsCard from 'components/News/NewsCard';

import picTransparency from 'public/images/landing/mobile-transparency.png'
import picNews from 'public/images/landing/mobile-news.png'
import picStore from 'public/images/landing/mobile-store.png'
import picProposals from 'public/images/landing/mobile-proposals.png'

const useCounter = () => {
    const colorModeDark = useSelector((state) => state.colorModeDark)
    return { colorModeDark }
}

export default function Home(props) {
    const dispatch = useDispatch()

    const { colorModeDark } = useCounter()

    const [signUpEmail, setSignUpEmail] = useState('')

    const stories = useSelector((state) => state.stories.stories)
    const issues = useSelector((state) => state.issues.issues)
    const myths = useSelector((state) => state.myths.myths)

    const [timeProgress, setTimeProgress] = useState(0)

    const [counter, setCounter] = useState(0);

    const [activeHeroMock, setActiveHeroMock] = useState('Transparency')

    const [expandThinkAboutTiles, setExpandThinkAboutTiles] = useState(false)

    const [avenueTab, setAvenueTab] = useState(0)
    const [subAvenueTab, setSubAvenueTab] = useState('Reports')

    const [avenueScroll, setAvenueScroll] = useState(false)

    const [newsShowcase, setNewsShowcase] = useState('stories')
    const [newsShowcaseStories, setNewsShowcaseStories] = useState(0)
    const [newsShowcaseIssues, setNewsShowcaseIssues] = useState(0)
    const [newsShowcaseMyths, setNewsShowcaseMyths] = useState(0)
    const [products, setProducts] = useState([])
    const [newsTotals, setNewsTotals] = useState({
        stories: 0,
        issues: 0,
        myths: 0
    })

    const [proposalsTotals, setProposalsTotals] = useState({
        fundamental: 0,
        social: 0,
        financial: 0,
        education: 0
    })

    useEffect(() => {

        axios.get('/api/store/products')
        .then(function (response) {
            console.log(response.data.news);
            setProducts(response.data)
            // self.setState({
            //     products: response.data,
            //     loadingProducts: false
            // });
        })
        .catch(function (error) {
            console.log(error);
            // self.setState({ loadingProducts: true });
            // self.setState({ resultsLoadingError: error });
        });

    }, []);

    useEffect(() => {
        const interval = setInterval(() => {

            if ( counter == 3 ) {
                return setCounter(0);
            }

            return setCounter(counter + 1);

        }, 2500);
    
        return () => {
          clearInterval(interval);
        };
    });

    function startSalesAnimation() {
        console.log("Sales Animation Started!");

        // var i = 0;
        // var sales = [];
        // sales = document.getElementsByClassName('sale');

        // myLoop();

        // function myLoop() {

        // 	         //  create a loop function
        // 	setTimeout(function() {   
        // 		console.log(i);
        // 		sales[i].classList.add('active');   //  your code here
        // 		i++;

        // 		                 //  increment the counter
        // 		if (i < sales.length) {           //  if the counter < 10, call the loop function
        // 			myLoop();             //  ..  again which will trigger another 
        // 		}          
        // 		             //  ..  setTimeout()
        // 	}, 700)
        // }

    }

    return (
        <div className={`landing-page landing-new`}>

            <Head>
                {/* <title>Create Next App</title> */}
                {/* <link rel="icon" href="/favicon.ico" /> */}
            </Head>

            <main>

                {/* Welcome Block - October 2020 Remodel */}
                <div className="welcome-block">

                    <div className="circle">

                        <div className="orbit">
                            <div className="circle-sm one"></div>
                            <div className="circle-sm two"></div>
                            <div className="circle-sm three"></div>
                        </div>

                        {/* <div className="circle-sm two"></div>
                        <div className="circle-sm three"></div> */}

                        <div className="screen-mock">

                            {/* <div className="mock-nav"></div> */}

                            <div className={`mock transparency-mock ${counter == 0 && 'active'}`}>
                                <Image
                                    src={picTransparency}
                                    alt="Image of our Transparency page."
                                    layout="fill"
                                    objectFit="cover"
                                    priority="true"
                                    placeholder="blur"
                                />
                            </div>

                            <div className={`mock news-mock ${counter == 1 && 'active'}`}>
                                <Image
                                    src={picNews}
                                    alt="Image of our News page, home to Stories, Issues and Myths."
                                    layout="fill"
                                    objectFit="cover"
                                    priority="true"
                                    placeholder="blur"
                                />
                            </div>

                            <div className={`mock store-mock ${counter == 2 && 'active'}`}>
                                <Image
                                    src={picStore}
                                    alt="Image of our Store page."
                                    layout="fill"
                                    objectFit="cover"
                                    priority="true"
                                    placeholder="blur"
                                />
                            </div>

                            <div className={`mock proposal-mock ${counter == 3 && 'active'}`}>
                                <Image
                                    src={picProposals}
                                    alt="Image of our Proposal page."
                                    layout="fill"
                                    objectFit="cover"
                                    priority="true"
                                    placeholder="blur"
                                />
                            </div>

                        </div>

                    </div>

                    {/* <div className="video-background-container"> */}
                    {/* <div className="video-background-wrapper"> */}
                    {/* <iframe src="https://player.vimeo.com/video/529539150" width="640" height="360" frameborder="0" allow="autoplay; fullscreen; picture-in-picture" allowfullscreen></iframe> */}
                    {/* <iframe style={{ pointerEvents: 'none' }} src={`https://player.vimeo.com/video/529539150`} frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowFullScreen></iframe> */}
                    {/* </div> */}
                    {/* </div> */}

                    {/* <div className="image-background-container">
                        <Image
                            src="/images/landing/hero.jpg"
                            alt="Image of the White house in Washington DC"
                            layout="fill"
                            objectFit="cover"
                        />
                    </div> */}

                    <div className="background d-none">
                        <div className="bg"></div>
                        <div className="bg bg2"></div>
                        <div className="bg bg3"></div>
                    </div>

                    <div className="content">

                        <div className="details">

                            {/* <h1 className="title">Something To Stand For</h1> */}

                            <div className="small d-flex align-items-baseline">

                                <span>Welcome To</span>

                                <div className="brand">

                                    <div className="">
                                        <div className="main">Articles</div>
                                    </div>

                                </div>

                            </div>

                            <div className="text">
                                A political organization and platform, working to make America a better place for the people through avenues of transparency, clothing, news, and politics.
                            </div>

                            <div className="card p-2 d-flex flex-row flex-wrap align-items-center mt-4 d-flex">

                                <div className="form-group articles flex-shrink-0 flex-grow-1 mr-md-2 mb-0">
                                    <label htmlFor="searchFilter">Email Address</label>
                                    <input
                                        className="form-control with-label"
                                        onChange={e => setSignUpEmail(e.target.value)}
                                        name="signUpEmail"
                                        id="signUpEmail"
                                        type="text"
                                        autoComplete='off'
                                        placeholder=""
                                        value={signUpEmail}
                                    />
                                </div>

                                <button className="btn btn-articles-light btn-lg mt-2 mt-md-0 ml-auto">Sign Up <i className="fas fa-caret-right mr-0 ml-2"></i></button>

                            </div>

                            {/* <div className="looking-for-section">
                                <div className="header">Looking for one of the following pages?</div>

                                <div className="links">

                                    <Link href={ROUTES.TRANSPARENCY}>
                                        <button className="btn btn-articles-light btn-sm">
                                            <i className="fas fa-paste" aria-hidden="true"></i>Transparency
                                        </button>
                                    </Link>

                                    <Link href={ROUTES.STORE}>
                                        <button className="btn btn-articles-light btn-sm">
                                            <i className="fas fa-shopping-cart" aria-hidden="true"></i>Clothing
                                        </button>
                                    </Link>

                                    <Link href={ROUTES.NEWS}>
                                        <button className="btn btn-articles-light btn-sm">
                                            <i className="fas fa-newspaper" aria-hidden="true"></i>News
                                        </button>
                                    </Link>

                                    <Link href={ROUTES.PARTY}>
                                        <button className="btn btn-articles-light btn-sm">
                                            <i className="fas fa-scroll" aria-hidden="true"></i>Politics
                                        </button>
                                    </Link>

                                </div>
                            </div> */}

                        </div>
                        {/* 
                        <div className="image d-none">

                            <div className="controls d-flex justify-content-end">

                                <div onClick={() => { this.setState({ welcomeBlockPhoto: welcomeBlockPhoto - 1 }) }} className={"prev " + (welcomeBlockPhoto === 0 && 'freeze')}>
                                    <i className={"fas fa-2x fa-caret-square-left"}></i>
                                </div>

                                <div onClick={() => { this.setState({ welcomeBlockPhoto: welcomeBlockPhoto + 1 }) }} className={"prev " + (welcomeBlockPhoto === 3 && 'freeze')}>
                                    <i className={"fas fa-2x fa-caret-square-right"}></i>
                                </div>

                            </div>

                            {welcomeBlockPhotos[welcomeBlockPhoto]}

                        </div> */}

                    </div>

                </div>

                {/* <div className="spacer">
                    
                </div> */}

                {/* Think about it - October 2020 Remodel */}
                <div className="think-about-it">

                    <div className="content">

                        <div className="articles-heading text-center">Think about it</div>

                        <div className="tiles">

                            <div className="tile">
                                <span>School Shootings</span>
                                <div className="more">An average of one school shooting a week in 2019.</div>
                            </div>

                            <div className="tile">
                                <span>Botched Gun Laws</span>
                                <div className="more">Gun show loophole still available in some states</div>
                            </div>

                            <div className="tile">
                                <span>Corporate Tax Evasion</span>
                                <div className="more">Amazon paid $0 in Federal Tax in 2019</div>
                            </div>

                            <div className="tile">
                                <span>School Lunch Debt</span>
                                <div className="more">High Schools withholding diplomas over lunch debt</div>
                            </div>

                            <div className="tile">
                                <span>Underfunded NASA</span>
                                <div className="more">Annual budget of less then half of 1% in 2019</div>
                            </div>

                            <div className="tile">
                                <span>Military Spending</span><div className="more">WIP</div>
                            </div>

                            <div className="tile">
                                <span>Increasing Automation</span>
                                <div className="more">Taxi and tractor trailer drivers are just a fraction of the jobs we are saying goodbye to forever</div>
                            </div>

                            <div className="tile">
                                <span>Decaying Infrastructure</span>
                                <div className="more">The ASCE estimates the US needs to spend some $4.5 trillion by 2025 to fix the country's infrastructure.</div>
                            </div>

                            <div className="tile">
                                <span>Wealth Inequality</span>
                                <div className="more">The wealthiest 1 percent of American households own 40 percent of the country's wealth</div>
                            </div>

                            <div className="tile">
                                <span>Global Warming</span>
                                <div className="more">Since 1880 global temperature is up 2°F and 19 of the 20 warmest years on record have occurred since 2001</div>
                            </div>

                            <div className="tile">
                                <span>Two Party Partisanship</span>
                                <div className="more">WIP</div>
                            </div>

                            <div className="tile">
                                <span>Affordable Healthcare</span>
                                <div className="more">WIP</div>
                            </div>

                            <div className="tile">
                                <span>Climate Change</span>
                                <div className="more">WIP</div>
                            </div>

                            <div className="tile">
                                <span>Accessible Voting</span>
                                <div className="more">
                                    WIP</div>
                            </div>

                            <div className="tile">
                                <span>Two Party System</span>
                                <div className="more">WIP</div>
                            </div>

                            <div onClick={() => setExpandThinkAboutTiles(!expandThinkAboutTiles)} className="tile click">
                                The List Goes On...
                                <div className="more">
                                    It does, click again!
                                </div>
                            </div>

                            {expandThinkAboutTiles ?
                                <>
                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>

                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>

                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>
                                    <div className="tile">WIP</div>

                                    <div className="tile">
                                        And More!
                                        <div className="more">
                                            But that's all for now
                                        </div>
                                    </div>
                                </>
                                :
                                null
                            }
                        </div>

                        <div className="bottom-text text-center">Is our nations media outlets and leaders tackling any of the problems that plague this nation as well as we need them to?</div>

                    </div>

                </div>

                {/* How we help January 2020 */}
                <section className="tour-section-overhaul">

                    <div className="content">

                        <div className="container mx-0">

                            <div className="articles-heading text-center">
                                How we help
                            </div>

                            {/* <NewCustomPanel identifier={avenueTabDetails[avenueTab]} /> */}

                            {avenueTab == 0 &&
                                <div className="card mb-2">
                                    <div className="card-body">

                                        <div className="text-center">
                                            <h2 className="mb-1">Open Financial Details</h2>
                                            <p>With more Transparency at Articles we aim to eliminate corruption and provide insight into what we are doing.</p>
                                        </div>

                                        <div className="transparency-tab">
                                            <div className="row">

                                                <div className="col-lg-5">
                                                    <div className="tab-list d-flex flex-column">

                                                        <button onClick={() => setSubAvenueTab('Reports')} className={`btn btn-articles-light btn-lg mb-3 ${subAvenueTab == 'Reports' && 'active'}`}>
                                                            <i className="fad fa-clipboard-list"></i><span>Reports</span>
                                                            <div className="active-arrow"><i className="far fa-caret-square-right mr-0"></i></div>
                                                        </button>

                                                        <button onClick={() => setSubAvenueTab('Charts')} className={`btn btn-articles-light btn-lg mb-3 ${subAvenueTab == 'Charts' && 'active'}`}>
                                                            <i className="fad fa-chart-line"></i><span>Charts</span>
                                                            <div className="active-arrow"><i className="far fa-caret-square-right mr-0"></i></div>
                                                        </button>

                                                        {/* <button className="btn btn-articles-light btn-lg">
                                                            Charts
                                                        </button> */}

                                                        <button onClick={() => setSubAvenueTab('Employees')} className={`btn btn-articles-light btn-lg mb-3 ${subAvenueTab == 'Employees' && 'active'}`}>
                                                            <i className="fad fa-paste"></i><span>Employees</span>
                                                            <div className="active-arrow"><i className="far fa-caret-square-right mr-0"></i></div>
                                                        </button>

                                                        <button onClick={() => setSubAvenueTab('Flag')} className={`btn btn-articles-light btn-lg ${subAvenueTab == 'Flag' && 'active'}`}>
                                                            <i className="fad fa-paste"></i><span>Flag</span>
                                                            <div className="active-arrow"><i className="far fa-caret-square-right mr-0"></i></div>
                                                        </button>

                                                        {/* <button className="btn btn-articles-light btn-lg">
                                                            Flag
                                                        </button> */}

                                                    </div>
                                                </div>

                                                <div className="col-lg-7">

                                                    <div className="tab-content">

                                                        {subAvenueTab == 'Reports' &&
                                                            <table className="table articles-table table-sm table-hover table-bordered mb-0">
                                                                <thead><tr className="table-articles-head"><th scope="col">Date</th><th scope="col">Type</th><th scope="col">Order Summary</th><th className="text-right" scope="col">Total</th></tr></thead>
                                                                <tbody>
                                                                    <tr><td colSpan="1" className="border-right-0 ">May 8, 2021</td><td colSpan="1" className="border-right-0 ">Ad</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$1.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">March 13, 2021</td><td colSpan="1" className="border-right-0 ">Store Order</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$5.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">February 8, 2021</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">July 6, 2020</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">June 13, 2020</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">May 30, 2020</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$100.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">June 25, 2019</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">June 25, 2019</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">June 25, 2019</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr><td colSpan="1" className="border-right-0 ">June 25, 2019</td><td colSpan="1" className="border-right-0 ">Donation</td><td colSpan="1" className="border-right-0 "></td><td colSpan="1" className="border-right-0 ">$50.00</td></tr>
                                                                    <tr className="table-footer"><td colSpan="2" className="border-right-0 table-articles-head"></td><td colSpan="1" className="border-right-0 text-right table-articles-head">Total:</td><td colSpan="1" className="border-left-0 table-articles-head">$306.00</td></tr>
                                                                </tbody>
                                                            </table>
                                                        }

                                                        {subAvenueTab == 'Employees' && <img className="img-fluid" src="https://assets.coinbase.com/assets/coinbase-app.3b0bfd4cb6b7a7614c1e18472187f6b9.webp" alt="" />}

                                                    </div>

                                                </div>

                                            </div>
                                        </div>

                                    </div>
                                </div>
                            }

                            {avenueTab == 1 &&
                                <div className="card mb-2">
                                    <div className="card-body">

                                        <div className="text-center">
                                            <h2>A look into out store</h2>
                                            <p>We sell clothing and other merchandise to help fund the platform.</p>
                                        </div>

                                        <div className="transparency-tab">
                                            
                                            <div className="clothing-container">
                                                <StoreItem 
                                                    color="articles" 
                                                    viewOnly={true} 
                                                    product={products.find(element => element._id === "5eabc1e99b0beb3e04599717")}
                                                />
                                                <StoreItem 
                                                    color="articles" 
                                                    viewOnly={true} 
                                                    product={products.find(element => element._id === "5eb50fdde094562238f5b910")}
                                                />
                                                <StoreItem 
                                                    color="articles" 
                                                    viewOnly={true} 
                                                    product={products.find(element => element._id === "5f4b146d537b221bc419408c")}
                                                />
                                            </div>

                                        </div>

                                    </div>
                                </div>
                            }

                            <div className="controls noselect d-flex justify-content-center">

                                <div className="avenue-selector">
                                    <div onClick={() => this.jumpTo((avenueTab === 0 ? avenueTabDetails.length - 1 : avenueTab - 1))} className="avenue avenue-control prev"> {'<'} </div>

                                    <div className="center d-flex">

                                        {/* <span className="avenue-filler"></span> */}

                                        <div onClick={() => setAvenueTab(0)} className={"card avenue avenue-selection transparency ml-0 " + (avenueTab === 0 ? 'active' : '')}>
                                            <div className="beak"></div>
                                            <i className="fas fa-paste" aria-hidden="true"></i>
                                            Transparency
                                        </div>

                                        <div onClick={() => setAvenueTab(1)} className={"card avenue avenue-selection clothing " + (avenueTab === 1 ? 'active' : '')}>
                                            <div className="beak"></div>
                                            <i className="fas fa-shopping-cart" aria-hidden="true"></i>
                                            Clothing
                                        </div>

                                        <div onClick={() => setAvenueTab(2)} className={"card avenue avenue-selection news " + (avenueTab === 2 ? 'active' : '')}>
                                            <div className="beak"></div>
                                            <i className="fas fa-newspaper" aria-hidden="true"></i>
                                            News
                                        </div>

                                        <div onClick={() => setAvenueTab(3)} className={"card avenue avenue-selection politics " + (avenueTab === 3 ? 'active' : '')}>
                                            <div className="beak"></div>
                                            <i className="fas fa-scroll" aria-hidden="true"></i>
                                            Politics
                                        </div>

                                        {/* <span className="avenue-filler"></span> */}

                                    </div>

                                    <div onClick={() => this.jumpTo((avenueTab === avenueTabDetails.length - 1 ? 0 : avenueTab + 1))} className="avenue avenue-control next"> > </div>
                                </div>

                                {/* TODO - Once site is done, finish this and get it working for mobile, to much to do right now with just myself working on this :( ) */}
                                <div className="timer ">

                                    {/* <div className="time">{ 10 }</div> */}

                                    <div onClick={() => this.toggleAvenueScroll()} className="pause-play"><i className={"far mr-0 " + (avenueScroll === true ? 'fa-pause-circle' : 'fa-play-circle')}></i></div>

                                    <div className="progress">
                                        <div className="progress-bar progress-bar-striped progress-bar-animated" role="progressbar" aria-valuenow="75" aria-valuemin="0" aria-valuemax="100" style={{ width: timeProgress + "%" }}></div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </div>

                </section>

                {/* How we help - October 2020 Remodel */}
                <div className="how-we-help">

                    <div className="content">

                        <div className="articles-heading">
                            How we help
                        </div>

                        <div className="tiles">

                            {/* Transparency Tile */}
                            <div className="tile">
                                <div className="header">Transparency</div>

                                <div className="transparency-showcase">

                                    <div className="icon">
                                        <i className="fas fa-paste" aria-hidden="true"></i>
                                    </div>

                                    {/* <div className="fake-note">This data is for display purposes only, live data available on the <Link style={{ textDecoration: 'underline' }} to={ROUTES.TRANSPARENCY_REPORTS}>Reports Page</Link></div> */}

                                    <div className="fake-sales">

                                        {/* {startSalesAnimation()} */}

                                        <div className="sale active" style={{ 'animationDelay': '0s' }}>
                                            <div className="amount revenue">+$10</div>
                                            <div className="reason">Donation</div>
                                            <div className="person">Casey Newton</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '0.7s' }}>
                                            <div className="amount revenue">+$30</div>
                                            <div className="reason">Store Order</div>
                                            <div className="person">Frank Walker</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '1.4s' }}>
                                            <div className="amount expense">-$7.50</div>
                                            <div className="reason">Expense</div>
                                            <div className="person">Email Servers</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '2.1s' }}>
                                            <div className="amount revenue">+$1</div>
                                            <div className="reason">Membership</div>
                                            <div className="person">David Nix</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '2.8s' }}>
                                            <div className="amount revenue">+$5</div>
                                            <div className="reason">Membership</div>
                                            <div className="person">Athena A.A</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '3.5s' }}>
                                            <div className="amount expense">-$50</div>
                                            <div className="reason">Expense</div>
                                            <div className="person">Website Servers</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '4.2s' }}>
                                            <div className="amount expense">-$10</div>
                                            <div className="reason">Expense</div>
                                            <div className="person">Mileage Reimbursement</div>
                                        </div>

                                        <div className="sale active" style={{ 'animationDelay': '4.9s' }}>
                                            <div className="amount revenue">+$10</div>
                                            <div className="reason">Store Order</div>
                                            <div className="person">Joey Giusto</div>
                                        </div>

                                    </div>

                                </div>

                                <p className="text mt-auto">At Articles everything we do is as transparent as we can possible make it. View our bank balance and explore live Donations, Store Orders, Payroll, Taxes, Manufacturing Cost, you name it!</p>
                            </div>

                            {/* Clothing Tile */}
                            <div className="tile">
                                <div className="header">Clothing</div>

                                <div className="clothing-showcase">
                                    {/* <StoreItemBeta
                                        // setPopOutVisible={this.setPopOut}
                                        product={products.find(element => element._id === "5eabc1e99b0beb3e04599717")}
                                        color="articles"
                                        // userSavedProducts={props.user_details.saved_products}
                                        isSaved={props.user_details?.saved_products?.find(o => o.product_id === '5eabc1e99b0beb3e04599717')}
                                    />

                                    <StoreItemBeta
                                        // setPopOutVisible={this.setPopOut}
                                        product={products.find(element => element._id === "5eabc20a38584110a044f93e")}
                                        color="articles"
                                        // userSavedProducts={props.user_details.saved_products}
                                        isSaved={props.user_details?.saved_products?.find(o => o.product_id === '5eabc20a38584110a044f93e')}
                                    />

                                    <StoreItemBeta
                                        // setPopOutVisible={this.setPopOut}
                                        product={products.find(element => element._id === "5eb3aaaba316c3077c598cc4")}
                                        color="articles"
                                        // userSavedProducts={props.user_details.saved_products}
                                        isSaved={props.user_details?.saved_products?.find(o => o.product_id === '5eb3aaaba316c3077c598cc4')}
                                    /> */}
                                </div>

                                <p className="text mt-auto">We have our own clothing store! Sales of our politically motivated merch help fund the development of our movement. Explore our collections and even submit designs!</p>
                            </div>

                            {/* News Tile */}
                            <div className="tile">

                                <div className="header">News</div>

                                <div className="news-showcase">

                                    <div className="stats">

                                        <div onClick={() => this.setState({ newsShowcase: 'stories' })} className={"stat " + (newsShowcase === 'stories' ? 'active' : '')}>
                                            <div className="number">{newsTotals.stories}</div>
                                            <div className="type">Stories</div>
                                            <div className="active-dot"></div>
                                        </div>

                                        <div onClick={() => this.setState({ newsShowcase: 'issues' })} className={"stat " + (newsShowcase === 'issues' ? 'active' : '')}>
                                            <div className="number">{newsTotals.issues}</div>
                                            <div className="type">Issues</div>
                                            <div className="active-dot"></div>
                                        </div>

                                        <div onClick={() => this.setState({ newsShowcase: 'myths' })} className={"stat " + (newsShowcase === 'myths' ? 'active' : '')}>
                                            <div className="number">{newsTotals.myths}</div>
                                            <div className="type">Myths</div>
                                            <div className="active-dot"></div>
                                        </div>

                                    </div>

                                    <div className="news">

                                        {/* {newsShowcase === 'stories' ? stories.loading ? null : <NewsCard key={''} document={stories[newsShowcaseStories]} /> : null} */}
                                        {/* {newsShowcase === 'issues' ? issues.loading ? null : <NewsCard key={''} document={issues[newsShowcaseIssues]} /> : null} */}
                                        {/* {newsShowcase === 'myths' ? myths.loading ? null : <NewsCard key={''} document={myths[newsShowcaseMyths]} /> : null} */}

                                        <div className="controls">

                                            {
                                                newsShowcase === 'stories' ?
                                                    <>

                                                        <button onClick={() => setNewsShowcaseStories(newsShowcaseStories - 1)} disabled={newsShowcaseStories === 0 ? true : false} className={"prev"}>
                                                            <i className="far fa-hand-point-left"></i>
                                                        </button>

                                                        <button onClick={() => setNewsShowcaseStories(newsShowcaseStories + 1)} disabled={newsShowcaseStories === (stories.length - 1) ? true : false} className="next">
                                                            <i className="far fa-hand-point-right"></i>
                                                        </button>
                                                    </>
                                                    :
                                                    null
                                            }

                                            {
                                                newsShowcase === 'issues' ?
                                                    <>
                                                        <button onClick={() => setNewsShowcaseIssues(newsShowcaseIssues - 1)} disabled={newsShowcaseIssues === 0 ? true : false} className="prev"><i className="far fa-hand-point-left"></i></button>
                                                        <button onClick={() => setNewsShowcaseIssues(newsShowcaseIssues + 1)} disabled={newsShowcaseIssues === (issues.length - 1) ? true : false} className="next"><i className="far fa-hand-point-right"></i></button>
                                                    </>
                                                    :
                                                    null
                                            }

                                            {
                                                newsShowcase === 'myths' ?
                                                    <>
                                                        <button onClick={() => setNewsShowcaseMyths(newsShowcaseMyths - 1)} disabled={newsShowcaseMyths === 0 ? true : false} className="prev"><i className="far fa-hand-point-left"></i></button>
                                                        <button onClick={() => setNewsShowcaseMyths(newsShowcaseMyths + 1)} disabled={newsShowcaseMyths === (myths.length - 1) ? true : false} className="next"><i className="far fa-hand-point-right"></i></button>
                                                    </>
                                                    :
                                                    null
                                            }

                                        </div>


                                        {/* <NewsCard key={''} document={props?.stories?.stories[0]}/> */}
                                    </div>

                                </div>

                                {/* <small className="d-flex justify-content-center mt-3">With more being added everyday!</small> */}

                                <p className="text mt-3">Packed with features like the ability to subscribe to issues, we let our users pick the news they wish to see. Stay updated on the things that are most important to you!</p>

                            </div>

                            {/* Politics Tile */}
                            <div className="tile">
                                <div className="header">Politics</div>

                                <div className="politics-showcase">

                                    <div className="stats">

                                        <Link href={ROUTES.PROPOSALS}>
                                            <div className="stat">
                                                <div className="number">{proposalsTotals.fundamental}</div>
                                                <div className="type">Fundamental</div>
                                            </div>
                                        </Link>

                                        <Link href={ROUTES.PROPOSALS}>
                                            <div className="stat">
                                                <div className="number">{proposalsTotals.social}</div>
                                                <div className="type">Social</div>
                                            </div>
                                        </Link>

                                        <Link href={ROUTES.PROPOSALS}>
                                            <div className="stat">
                                                <div className="number">{proposalsTotals.education}</div>
                                                <div className="type">Education</div>
                                            </div>
                                        </Link>

                                        <Link href={ROUTES.PROPOSALS}>
                                            <div className="stat">
                                                <div className="number">{proposalsTotals.financial}</div>
                                                <div className="type">Financial</div>
                                            </div>
                                        </Link>

                                    </div>

                                    <div className="image">
                                        <img src="https://thumbs.gfycat.com/ThinMajorIridescentshark-max-14mb.gif" alt="" />
                                    </div>

                                </div>

                                <p className="text mt-3">We create Proposals as we encounter all the issues going on in the nation. Here are just some of the proposals we are advocating for and soon hope to campaign on.</p>
                            </div>

                        </div>

                    </div>

                </div>

                {/* Read about our mission - October 2020 Remodel */}
                <div className="our-mission">

                    <div className="content">

                        <div className="mission-snippet">

                            <div className="background-image-wrapper">

                                {/* <img src="https://www.talkgraphics.com/attachment.php?s=5b43aa6afd5966310212abbd189cd4b9&attachmentid=15581&stc=1&d=0" alt=""/> */}

                            </div>

                            <img className="" height="200px" width="200px" src="https://cdn.articles.media/email/logo.jpg" alt="" />

                            <div style={{ fontSize: '3rem' }} className="title mt-3 ">Read about our mission</div>
                            <div className="text">All the details about what we are doing and the direction we want to take this company.</div>

                            {/* <i className="fas fa-glasses"></i> */}

                            <Link href={ROUTES.MISSION}><div className="btn btn-articles-light">Mission</div></Link>

                        </div>

                    </div>

                </div>

                <div className="common-links">

                    <div className="content">

                        <div className="articles-heading">
                            Quick links
                        </div>

                        <div className="link-panels">

                            <Link href={ROUTES.SIGN_UP}>
                                <div className="link-panel">
                                    <div className="title">Sign Up</div>
                                    <div className="text">Create an account to unlock access to the entire site.</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                            <Link href={ROUTES.SIGN_IN}>
                                <div className="link-panel">
                                    <div className="title">Sign In</div>
                                    <div className="text">Existing members click here to access the site.</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                            <Link href={ROUTES.TRANSPARENCY}>
                                <div className="link-panel">
                                    <div className="title">Transparency</div>
                                    <div className="text">An inside look into our finances and more. We believe transparency is key to preventing corruption.</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                            <Link href={ROUTES.STORE}>
                                <div className="link-panel">
                                    <div className="title">Clothing</div>
                                    <div className="text">Shop our collection of clothing, as well as products made in collaboration with other brands.</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                            <Link href={ROUTES.NEWS}>
                                <div className="link-panel">
                                    <div className="title">News</div>
                                    <div className="text">Our take on the truth, source based facts, clear stated opinions.</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                            <Link href={ROUTES.PARTY}>
                                <div className="link-panel">
                                    <div className="title">Politics</div>
                                    <div className="text">Shop our collection of clothing, as well as products made in collaboration with other brands.</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                            <Link href={ROUTES.PRESS}>
                                <div className="link-panel">
                                    <div className="title">Press and Buisness</div>
                                    <div className="text">To reach out with questions or any other inquires</div>
                                    <div className="arrow">></div>
                                </div>
                            </Link>

                        </div>

                    </div>

                </div>

                {/* <h1 className="title">
                    Welcome to Articles Media
                </h1> */}

            </main>

            <style jsx>{`

                // main {
                //     // padding: 5rem 0;
                //     // flex: 1;
                //     // display: flex;
                //     // flex-direction: column;
                //     // justify-content: center;
                //     // align-items: center;
                // }

                // .title a {
                // color: #0070f3;
                // text-decoration: none;
                // }

                // .title a:hover,
                // .title a:focus,
                // .title a:active {
                // text-decoration: underline;
                // }

                // .title {
                // margin: 0;
                // line-height: 1.15;
                // font-size: 4rem;
                // }

                // .title,
                // .description {
                // text-align: center;
                // }

                // .subtitle {
                // font-size: 2rem;
                // }


                // .grid {
                // display: flex;
                // align-items: center;
                // justify-content: center;
                // flex-wrap: wrap;

                // max-width: 1000px;
                // margin-top: 3rem;
                // }

                // .card {
                // margin: 1rem;
                // flex-basis: 30%;
                // padding: 1.5rem;
                // text-align: left;
                // color: inherit;
                // text-decoration: none;
                // border: 1px solid #eaeaea;
                // border-radius: 10px;
                // transition: color 0.15s ease, border-color 0.15s ease;
                // }

                .card:hover,
                .card:focus,
                .card:active {
                color: black;
                border-color: black;
                }

                // .card h3 {
                // margin: 0 0 1rem 0;
                // font-size: 1.5rem;
                // }

                // .card p {
                // margin: 0;
                // font-size: 1.25rem;
                // line-height: 1.5;
                // }

                // .logo {
                // height: 1em;
                // }

                // @media (max-width: 600px) {
                // .grid {
                //     width: 100%;
                //     flex-direction: column;
                // }
                // }
            `}</style>

        </div>
    )
}

// function NewCustomPanel(props) {

//     const { title, description, avenueExpanded, avenueVisible, component } = props.identifier;

//     return (
//         <div className={"new-custom-panel " + (avenueVisible ? 'visible' : '')}>

//             <div className="one shadow-articles">

//                 <div className="content-title mt-0 mb-2" style={{ lineHeight: "45px" }}>{title}</div>

//                 <div style={{ lineHeight: '1.25' }} className="content-text">{description}</div>

//                 <div className="d-flex justify-content-center align-items-center align-self-stretch flex-grow-1">

//                     <div className="quick-links">

//                         <div className="report-link">
//                             <a className="btn btn-articles-light btn-lg w-100 report-quick-links active null" href="/transparency/reports">
//                                 <i className="fas fa-paste" aria-hidden="true"></i>
//                                 <span className="text">Reports</span>
//                             </a>
//                         </div>

//                         <div className="report-link">
//                             <a className="btn btn-articles-light btn-lg w-100 report-quick-links null" href="/transparency/charts">
//                                 <i className="fas fa-chart-line" aria-hidden="true"></i>
//                                 <span className="text">Charts</span>
//                             </a>
//                         </div>

//                         <div className="report-link">
//                             <a className="btn btn-articles-light btn-lg w-100 report-quick-links" href="/transparency/employees">
//                                 <i className="fas fa-paste" aria-hidden="true"></i>
//                                 <span className="text">Employees</span>
//                             </a>
//                         </div>

//                         <div className="report-link">
//                             <a className="btn btn-articles-light btn-lg w-100 report-quick-links null" href="/transparency/flag">
//                                 <i className="fas fa-flag" aria-hidden="true"></i>
//                                 <span className="text">Flag</span>
//                             </a>
//                         </div>

//                     </div>

//                 </div>

//             </div>

//             <div className="slide-out-sleeve-wrap">
//                 <div className={"slide-out-sleeve " + (avenueExpanded ? 'expand' : '')}>

//                     <div className={"displayed-component " + (avenueExpanded ? '' : '')}>
//                         {component}
//                     </div>

//                     <div className="end-cap shadow-articles">
//                         {/* Just CSS */}
//                     </div>

//                 </div>
//             </div>

//         </div>
//     )

// }

// export async function getServerSideProps(context) {
//     const { client } = await connectToDatabase()
//     const isConnected = await client.isConnected()

//     return {
//         props: { isConnected },
//     }
// }
