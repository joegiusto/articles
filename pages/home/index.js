import { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link'
import { useSelector, useDispatch } from 'react-redux'

import ROUTES from '../../components/constants/routes'
import { connectToDatabase } from '../../util/mongodb'

export default function Home() {
    const [quotes, setQuotes] = useState([
        {
            quote: 'The ignorance of one voter in a democracy impairs the security of all.',
            author: 'John F. Kennedy'
        },
            {
            quote: 'America will never be destroyed from the outside. If we falter and lose our freedoms, it will be because we destroyed ourselves.',
            author: 'Abraham Lincoln'
        },
        {
            quote: 'Guard against the impostures of pretended patriotism.',
            author: 'George Washington'
        },
        {
            quote: 'Government, even in its best state, is but a necessary evil; in its worst state, an intolerable one.',
            author: 'Thomas Paine'
        },
        {
            quote: 'Don’t throw stones at your neighbors, if your own windows are glass.',
            author: 'Benjamin Franklin'
        },
        {
            quote: 'Our civil rights have no dependence on our religious opinions any more than our opinions in physics or geometry...',
            author: 'Thomas Jefferson'
        }
    ])
    const [ randomQuoteIndex, setRandomQuoteIndex ] = useState(0);

    function getRandomQuote() {
        setRandomQuoteIndex( Math.floor(Math.random() * ((quotes.length - 1) - 0 + 1)) + 0 )
    }

    return (
        <section className="home-page">
                
            <Head>
                <title>Home - Articles</title>
            </Head>

            <div className="home-head-container">

                <div className="container-fluid ">
                    <div className="home-head">

                        <div className="photo-section">

                        <div className="photo">
                            {/* <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props?.user?._id}.jpg` || ''} alt=""/> */}
                            <div className="blank"></div>
                        </div>

                        <div>
                            {/* <div className="name">{this.props.user?.first_name} {this.props.user?.last_name}</div> */}
                            <Link href={ROUTES.MESSAGES}>
                                <a className="d-none d-md-block"><button className="btn btn-articles-light mt-4">0 Messages</button></a>
                            </Link>
                        </div>

                        </div>

                        <div className="weather">

                        <div className="icon">
                            <img src="https://icon-library.com/images/cloudy-icon/cloudy-icon-3.jpg" alt=""/>
                        </div>

                        <div className="details">
                            <div className="temp">
                            50
                            <span className="deg">
                                °F
                            </span>
                            </div>
                        </div>

                        <div className="details-extra">
                            <div className="precipitation">
                            <img src="https://media.istockphoto.com/vectors/water-drop-symbol-vector-rain-drop-icon-vector-id1156487494?k=6&m=1156487494&s=170667a&w=0&h=RD9wBtK827d_3rdeOvSez9bboMBf4_E_0MIEtus9cUo=" alt="Precipitation Symbol"/>
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

                    </div>
                </div>

            </div>

            <div className="container-fluid">     

                <div className="tile-section">

                {/* {
                    this.props.user?.outset ?
                    null
                    :
                    <div className="tile w-100 outset-tile">
                    <Link to={ROUTES.OUTSET}>
                        
                        <div className="tile-content">

                        <div className="attention">Action Needed</div>

                        <div className="icons">
                            <div className="head-icon">
                            <i className="fas fa-road"></i>
                            </div>

                            <div className="sub-icons">
                            <i className="fas fa-hiking mr-0"></i>
                            </div>
                        </div>

                        <div className="title">Get started with Articles</div>
                        <div className="text">Please complete your outset to finish setting up your account</div>

                        </div>
                    </Link>
                    </div>
                } */}

                <div className="tile-grid">

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Frontpage</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.NEWS}>
                        <a className="tile-content">

                            {/* <div className="corner-notification">
                                <span className="badge badge-danger">5</span>
                            </div> */}

                            <div className="icons">

                                <div className="head-icon">
                                <i className="fas fa-newspaper"></i>
                                </div>
                                
                                <div className="sub-icons">
                                <i className="fas fa-bullhorn"></i>
                                <i className="fas fa-balance-scale mr-0 mr-md-2"></i>
                                <i className="fas fa-ghost mr-0 d-none d-md-inline-block"></i>
                                </div>

                            </div>

                            <div className="title">News</div>
                            <div className="text">Collection of all of our stories, issues and myths.</div>

                            <div className="tile-extra">
                                <div className="status-circle"></div>
                                {/* {this.props.user?.subscriptionsFetched?.length || 0} Updates */}
                                0 Updates
                            </div>

                        </a>
                    </Link>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Orders</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.STORE_ORDERS}>
                        <a className="tile-content">

                            <div className="icons">
                                <div className="head-icon">
                                <i className="fas fa-clipboard-list"></i>
                                </div>
                                <div className="sub-icons">
                                <i className="fas fa-shopping-cart"></i>
                                <i className="fas fa-tshirt mr-0"></i>
                                </div>
                            </div>

                            <div className="title">Orders</div>
                            <div className="text">View any orders you have placed through the store.</div>

                            <div className="tile-extra">
                                {/* {this.props.user?.ordersFetched?.length || 0} Current Order{this.props.user?.ordersFetched?.length === 1 ? '' : 's'} */}
                                0 Orders
                            </div>

                        </a>
                    </Link>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Reports</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.TRANSPARENCY}>
                        <a className="tile-content">

                            <div className="icons">
                                <div className="head-icon">
                                <i className="fas fa-receipt"></i>
                                </div>
                                <div className="sub-icons reports">
                                <i className="fas fa-money-check-alt mr-0 mr-md-2"></i>
                                <i className="fas fa-money-bill d-none d-md-inline-block mr-0"></i>
                                </div>
                            </div>

                            <div className="title">Reports</div>
                            <div className="text">Look into our financial records to see our revenues and expenses.</div>

                            <div className="tile-extra">
                                {/* ${(this.state.total / 100).toFixed(2)} Raised This Month */}
                                0 Raised This Month
                            </div>

                        </a>
                    </Link>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Submissions</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.STORE_SUBMISSIONS}>
                        <a className="tile-content">

                            <div className="icons">
                                <div className="head-icon">
                                <i className="fas fa-chalkboard"></i>
                                </div>
                                <div className="sub-icons">
                                <i className="fas fa-pencil-alt"></i>
                                <i className="fas fa-mouse-pointer mr-0 mr-md-2"></i>
                                <i className="fas fa-mouse d-none d-md-inline-block mr-0"></i>
                                </div>
                            </div>

                            <div className="title">
                                Submissions
                            </div>

                            <div className="text">
                                Vote on user designs and enter for a chance to win.
                            </div>

                            <div className="tile-extra">
                                5 Entries So Far
                            </div>

                        </a>
                    </Link>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Instagram</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <a href="https://www.instagram.com/articles.media/" target="_blank" rel="noopener noreferrer">
                        <div className="tile-content instagram">

                        <div className="photo">
                            <i className="icon fab fa-instagram mr-0" aria-hidden="true"></i>
                            <img src="https://www.nationalgeographic.com/content/dam/archaeologyandhistory/2020/02/washington-dc-statehood-explainer/washington-dc-aerial-2548942.adapt.1900.1.jpg" alt=""/>
                        </div>

                        {/* <div className="text">
                            May 20th 2020
                        </div> */}

                        <div className="tile-extra">
                            instagram.com
                        </div>

                        </div>
                    </a>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Ethics and Privacy</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.PRIVACY}>
                        <a className="tile-content">

                            <div className="icons">
                                <div className="head-icon">
                                <i className="fas fa-binoculars"></i>
                                </div>
                                <div className="sub-icons">
                                <i className="fas fa-search-location mr-0"></i>
                                </div>
                            </div>

                            <div className="title">Ethics and Privacy</div>
                            <div className="text">Whenever we make changes to any of our policies we will alert you.</div>

                            <div className="tile-extra">
                                <span className="badge badge-light">No Changes</span>
                            </div>

                        </a>
                    </Link>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Newsletter</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.UPDATES}>
                        <a className="tile-content">

                            <div className="icons">
                                <div className="head-icon">
                                <i className="fas fa-envelope-open-text"></i>
                                </div>
                                <div className="sub-icons">
                                <i className="fas fa-at mr-0"></i>
                                </div>
                            </div>

                            <div className="title">Newsletter</div>
                            <div className="text">Weekly emails about everything going on at Articles.</div>

                            <div className="radio-switch-toggle noselect d-none">
                                <input id="false" value="false" name="newsletter" type="radio" checked/>
                                <label htmlFor="false">No</label>

                                <input id="true" value="true" name="newsletter" type="radio"/>
                                <label htmlFor="true">Yes</label>
                            </div>

                            <div className="tile-extra">
                                {/* {this.state.newsletterCount} Subscribed */}
                            </div>

                        </a>
                    </Link>

                    </div>

                    <div className="tile">

                    {/* <div className="tile-header">
                        <div className="tile-title">Account</div>
                        <div className="tile-update"></div>
                    </div> */}

                    <Link href={ROUTES.SETTINGS_ACCOUNT}>
                        <a className="tile-content">

                            <div className="icons">
                                <div className="head-icon">
                                <i className="fas fa-toolbox"></i>
                                </div>
                                <div className="sub-icons">
                                <i className="fas fa-tools"></i>
                                <i className="fas fa-cog mr-0"></i>
                                </div>
                            </div>

                            <div className="title">Account</div>
                            <div className="text">Manage your account and data.</div>

                            <div className="tile-extra">
                                Last Updated: <span className="badge badge-light">June 2020</span>
                            </div>

                        </a>
                    </Link>

                    </div>

                </div>

                {/* {this.props.user?.roles?.isAdmin === true &&
                    <Link className="w-100 " to={ROUTES.HOME_OLD}>
                    <button className="btn btn-articles-light my-2 ml-2 mx-auto d-block">Old Home Page</button>
                    </Link>
                } */}

                </div>

                <div className="random-quote">
                <div className="title">Political Quotes</div>

                {quotes !== -1 &&
                <div className="quote-container">

                    <div className="quote">
                        "{quotes[randomQuoteIndex].quote}"
                    </div>

                    <div className="author">
                        {quotes[randomQuoteIndex].author}
                    </div>

                </div>
                }

                <div className="btn btn-articles-light btn-sm" onClick={() => getRandomQuote()}>
                    <i className="fas fa-redo "></i>Read Another
                </div>

                </div>

            </div>

        </section>

    )
}

export async function getServerSideProps(context) {
  const { client } = await connectToDatabase()

  const isConnected = await client.isConnected()

  return {
    props: { isConnected },
  }
}
