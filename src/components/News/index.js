import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Chart from 'chart.js';
import qs from 'qs'

// React Bootstrap Components
import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

// import Swiper from 'react-id-swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel } from 'swiper';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

// import playButtonLight from '../../assets/img/News/yt_logo_mono_light.png'
import playButtonDark from '../../assets/img/News/yt_logo_mono_dark.png'
import moment from 'moment';

// import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

// import IssueDevelopmentCard from './IssueDevelopmentCard'
// import StoriesDisplay from './StoriesDisplay'
// import MythsDisplay from './MythsDisplay'

// import { GzyCard } from './Issues/index'
import NewsCard from './NewsCard'

import { toggleUserSubscriptions, filterIssuesDateType } from '../../actions/siteActions'

import Search from './Search/index';
import Local from './Local';
import Stocks from './Stocks';
import Crypto from './Crypto';

import Stories from './Stories/index';
import Issues from './Issues/index';
import Myths from './Myths/index';

import statesImage from '../../assets/img/states.jpg'

import background from '../../assets/img/card-1.png'

import * as ROUTES from '../../constants/routes';
import { Link, Switch, Route } from 'react-router-dom';
import ResourcesPage from './Resources';

const AnyReactComponent = ({ text }) => (
  <div>
    
    <div style={{
      color: 'red', 
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.25rem',
      marginRight: '0rem',
      fontSize: '1.2rem',
      transform: 'translate(-50%, -50%)',
    }}>
      <i className="fas fa-map-marker-alt mr-0"></i>
    </div>

    <div style={{
      color: 'black',
      backgroundColor: 'white', 
      display: 'inline-flex',
      textAlign: 'center',
      alignItems: 'center',
      justifyContent: 'center',
      padding: '0.1rem 0rem',
      borderRadius: '5px',
      marginTop: '0px',
      width: '100px',
      marginRight: '0rem',
      fontSize: '0.6rem',
      transform: 'translate(-50%, -50%)',
    }}>{text}</div>

  </div>
);

class SimpleMap extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      active: 0,
      
      places: [
        {
          text: 'Tesla',
          lat: 37.090240, 
          lng: -95.712891 
        },
        {
          text: 'Protest',
          lat: 37.090240, 
          lng: -95.712891 
        }
      ]
    }
  }

  static defaultProps = {
    center: {lat: 37.09, lng: -95.71},
    zoom: 10,
    lat: 37.09, 
    lng: -95.71
    // bootstrapURLKeys: { key: '565403139080-i42ucf0miotmvqobitbsd35f92pek539.apps.googleusercontent.com' }
  };

  render() {
    return (
      <GoogleMapReact
      bootstrapURLKeys={{ key: 'AIzaSyAKmyGIU1IJo_54kahuds7huxuoEyZF-68' }}
      center={{lat: this.props.lat, lng: this.props.lng}}
      defaultZoom={this.props.zoom}
      options={{
        fullscreenControl: false,
        // zoomControl: false
      }}
    >
      <AnyReactComponent 
        lat={this.props.lat} 
        lng={this.props.lng} 
        text={this.props.text} 
      />

    </GoogleMapReact>
    );
  }
}

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade, Mousewheel]);

// const transactions = 

function FlintCounter() {
  // Declare a new state variable, which we'll call "count"
  const [display, setDisplay] = useState(true);

  return (
    <div className='counter pt-1 mt-4'>
      <span onClick={() => setDisplay(!display)}><i className="fas fa-arrow-circle-left mr-1"></i></span><span>{display === true ? '6,781 / 10,200 Pipes Replaced' : '734 Days Since Incident'}</span><span onClick={() => setDisplay(!display)}><i className="fas fa-arrow-circle-right ml-1"></i></span>
      {/* <div></div> */}
    </div>
  );
}

function NewsHead(props) {
  const [backgroundIndex, setBackgroundIndex] = useState(0);


  const days = [];

  const searchBackgrounds = [
    'https://cdn.vox-cdn.com/thumbor/GxxQX7lKYjQp8CXU0GWtQcWGLDk=/0x0:2000x1333/1200x675/filters:focal(840x507:1160x827)/cdn.vox-cdn.com/uploads/chorus_image/image/66009531/190921_07_18_10_5DS27714__1_.0.jpg',
    'https://walkway.org/wp-content/uploads/2017/07/HV-Image.jpg',
    'https://cdn.theculturetrip.com/wp-content/uploads/2020/09/e3y4tn-e1599862024871.jpg'
  ]

  for (let i = 0;  i <= 6; i++ ) {
    days.push(
      <div className="day">
        <div>{moment().add(i, 'day').format('ddd')} - {moment().add(i, 'day').format('DD')}</div>
        <div><i className="fas fa-cloud-sun"></i></div>
      </div>
    )
  }

  const isHome = props.path === "/news"

  let activePage = {

  }

  switch(props.path) {
    case "/news":
      // code block
      break;
    case "/news/stories":
      activePage = {
        title: "Stories",
        desc: "Everday news from around the country."
      }
      // code block
      break;
    case "/news/issues":
      activePage = {
        title: "Issues",
        desc: "Overview of the most pressing issues and status updates on them."
      }
      // code block
      break;
    case "/news/myths":
      activePage = {
        title: "Myths",
        desc: "Explore common misconceptions and debunked myths."
      }
      // code block
      break;
    case "/news/extended":
      activePage = {
        title: "Coronavirus",
        desc: "One stop shop to understanding and protecting yourself and others from illness."
      }
    default:
      // code block
  }

  return(
    <>
      <div className={"news-head d-none " + (isHome ? 'home' : 'focus')}>

        <div className="spacer"></div>

        <div className={"active-page-panel d-none " + (isHome ? 'home' : 'focus')}>

          <h1 className="title">{activePage.title}</h1>
          <p className="body">{activePage.desc}</p>

          {activePage.title === "Issues" ? 
          <div className="filters noselect">
            <span className="subscription-badges">
              <span className="bold"><i className="fas fa-th"></i></span>
              <div onClick={() => props.toggleUserSubscriptions()} className={"badge border " + (props.userSubscriptions === true ? 'badge-dark ' : 'badge-light ')}>Subscribed</div>
              <div onClick={() => props.toggleUserSubscriptions()} className={"ml-1 badge border " + (props.userSubscriptions === false ? 'badge-dark' : 'badge-light')}>All</div>
            </span>

            <span className="subscription-badges">
              <span className="bold"><i className="fas fa-calendar"></i></span>
              <div onClick={() => props.filterIssuesDateType()} className={"badge border " + (props.dateType === 'post' ? 'badge-dark ' : 'badge-light ')}>Posted</div>
              <div onClick={() => props.filterIssuesDateType()} className={"ml-1 badge border " + (props.dateType === 'update' ? 'badge-dark' : 'badge-light')}>Updated</div>
            </span>
          </div>
          :
          null
          }
          
        </div>

        <div className={"search-panel " + (isHome ? 'home' : 'focus')}>
    
          <img src={background} alt="" className="background"/>

          <div onClick={() => props.toggleSearchSettingsOverlay()} className="settings">
            <i className="fas fa-toolbox mr-0"></i>
          </div>
    
          <h1 className="title">Search</h1>
    
          <div className="filter"></div>
    
          <div className="search">

            <input 
            id="search" 
            name="search" 
            value={props.searchText} 
            onChange={props.onChange} 
            type="text" 
            className="form-control"
            // placeholder={props.userSubscriptions ? "Only works on 'All Issues' sort" : ""}
            />

            <select name="" id="">
              <option value="all">All</option>
              <option value="stories">Stories</option>
              <option value="issues">Issues</option>
              <option value="myths">Myths</option>
            </select>

            <div className="btn btn-articles-light">
              <i className="fas fa-search mr-0"></i>
            </div>

          </div>
    
          <div className="tags-container">

            <div className="type">Trending</div>

            <div className="tags">
              <Link to={ROUTES.EXTENDED + '/coronavirus'}><div className="tag badge badge-danger"><i className="fas fa-map-pin mr-1"></i>Coronavirus</div></Link>
              <Link to={ROUTES.ISSUES + '/2020-election'}><div className="tag badge badge-articles">2020 Elections</div></Link>
              <Link to={ROUTES.ISSUES + '/global-warming'}><div className="tag badge badge-articles">Global Warming</div></Link>
              <Link to={ROUTES.ISSUES + '/gun-laws-and-control'}><div className="tag badge badge-articles">Gun Laws And Control</div></Link>
              {/* <Link to={ROUTES.ISSUES + '/flint-water-crisis'}><div className="tag badge badge-articles">Flint Water Crisis</div></Link> */}
            </div>
          </div>
    
        </div>

        <div className="extra-panels d-none">

          <div onClick={() => props.toggleWeatherOverlay()} className="extra-panel weather">

            {/* <div className="info">Zip: </div> */}
            <div className="info"><span className="badge badge-light">{props.zip}</span></div>

            <div className="background">
              {props.weatherData?.current?.is_day === 'yes' ?
              <img src="https://cdn.articles.media/weather/partly-cloudy.jpg" alt=""/>
              :
              <img src="https://www.cruise1st.co.uk/blog/wp-content/uploads/2017/12/Fotolia_96215836_S-702x336.jpg" alt=""/>
              }
            </div>

            <div className="content text-center">
              <div className="temp"><i className="fas fa-thermometer-empty"></i>{props.weatherData?.current?.temperature}°F</div>
              <div className="descriptions">{props.weatherData?.current?.weather_descriptions.map(item => <span>{item} </span>)}</div>
              <div className="time">{moment(props.weatherData?.location?.localtime).format("LLL")}</div>
            </div>

            <div className="slideup">
              <div className="days">

                {/* {days} */}

                <div className="py-1">See 7 day forecast</div>

                {/* <div className="badge badge-danger">Test</div> */}

              </div>
            </div>
            
            <div></div>

          </div>

          <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer" className="extra-panel youtube d-none">

            <div className="info">
              <span className="badge badge-light">Last Upload: <span className="badge badge-danger">Never</span></span>
            </div>

            <div className="background">
              <img style={{objectFit: 'cover'}} src="https://www.dailydot.com/wp-content/uploads/2019/08/listen_youtube_music_youtube_premium-800x400.jpg" alt=""/>
            </div>

            <div className="slideup">
              <div className="py-1">View Channel</div>
            </div>

            <div className="hover-notice d-none">View Channel</div>
          </a>

          <div onClick={() => props.toggleBankingOverlay()} className="extra-panel d-none banking">
            {props.plaidSetup ? 
            <>
            <div className="photo"><img src="https://lh3.googleusercontent.com/QruFI-jzHu0gsXrpWsC6gP_DxPs9TjdEzqrr7jhkgIEwPq-fc8-kEmzW79_XhmMxpA2N=s180" alt=""/></div>
            <div className="info">
              <div className="branch">HVFCU</div>
              <div className="amount">$400.00</div>
            </div>
            </>
            :
            <div className="plaid-setup">
              <i className="fas fa-money-check-alt"></i>
              <div>Bank Balance</div>
              <div className="btn btn-articles-light btn-sm">Setup</div>
            </div>
            }
            
          </div>

        </div>

        <div className="spacer"></div>

      </div>

      <div className={"news-head-new " + (isHome ? 'home' : 'focus')}>

        <img src={searchBackgrounds[backgroundIndex]} alt=""/>

        <div className="search-container">

          <h2 className="title">Search Confidently</h2>

          <div className="input-group w-100 justify-content-lg-center">

            <input type="text" id='search' name='search' value={props.search} onChange={props.onChange} className="form-control" placeholder="Try 'Edward Snowden'" aria-label="" aria-describedby="button-addon2"/>

            <div className="input-group-append">
              <button onClick={() => props.history.push(`${ROUTES.NEWS_SEARCH}?search=${encodeURI(props.search)}`)} className="btn btn-articles-light" type="button" id="">
                <i className="fas fa-search mr-0"></i>
              </button>
            </div>

          </div>

          <div className="modal-items">

            <Link to={ROUTES.NEWS_LOCAL}>
              <div className="item text-white">
                <i className="icon fas fa-street-view mr-0" aria-hidden="true"></i>
                <div>Local</div>
              </div>
            </Link>

            {/* <div className="item text-white">
              <i className="icon fas fa-temperature-low mr-0" aria-hidden="true"></i>
              <div>Weather</div>
            </div> */}

            <Link to={ROUTES.NEWS_STOCKS}>
              <div className="item text-white">
                <i className="icon fas fa-chart-line mr-0" aria-hidden="true"></i>
                <div>Stocks</div>
              </div>
            </Link>

            <Link to={ROUTES.NEWS_CRYPTO}>
              <div className="item text-white">
                <i className="icon fab fa-bitcoin mr-0" aria-hidden="true"></i>
                <div>Crypto</div>
              </div>
            </Link>

            <Link to={ROUTES.RESOURCES}>
              <div className="item text-white">
                <i className="icon fas fa-archive mr-0" aria-hidden="true"></i>
                <div>Resources</div>
              </div>
            </Link>

          </div>

          <div className="filter d-none">Filter<i className="fas fa-caret-down ml-1 mr-0"></i></div>

        </div>

        <div className="bottom">

          <div className="stocks d-none">
            <span className="detail badge badge-light border-dark">
              <i className="fas fa-chart-line mr-1"></i>DOW: $29,638.64
            </span>
  
            <span className="detail badge badge-light border-dark ml-1">
              <i className="fas fa-chart-line mr-1"></i>S&P 500: $3,621.63
            </span>
  
            <span className="detail badge badge-light border-dark ml-1">
              <i className="fas fa-chart-line mr-1"></i>NASDAQ: $12,198.12
            </span>
          </div>

          <div className="photo-credit">

            <a className="detail badge badge-light border-dark" href="" target="_blank">
              <span className="">
                <i className="far fa-image mr-1"></i>Credit: Link
              </span>
            </a>

            <span style={{cursor: 'pointer'}} className="detail badge badge-light border-dark">
              <i className="fas fa-tools mr-0"></i>
            </span>

            <span style={{cursor: 'pointer'}} onClick={() => setBackgroundIndex( (backgroundIndex === searchBackgrounds.length - 1 ? 0 : backgroundIndex + 1) )} className="detail badge badge-light border-dark">
              <i className="fas fa-redo-alt mr-0"></i>
            </span>
          </div>

        </div>

      </div>
    </>
  )
}

class RecentSliders extends Component {
  constructor(props) {
    super(props);

    this.state = {
      issueSort: 'all',
      tags: []
    }
  }

  componentDidMount() {
    const self = this;

    axios.get('/api/getNewsTags')
    .then(function (response) {
      console.log(response);

      self.setState({
        tags: response.data.tags
      })
    })
    .catch(function (error) {
      console.log(error);
    }); 

  }

  render() {

    const swiper_settings = {
      spaceBetween: 10,
      slidesPerView: 'auto',
      // slidesPerGroup: 1,
      // navigation: true,
      scrollbar: { draggable: true },
      // mousewheel: true,
      // direction: "horizontal",
      navigation: {
        nextEl: '.fa-forward',
        prevEl: '.fa-backward',
      },

      // onSlideChange: () => console.log('slide change'),
      // onSwiper: (swiper) => console.log(swiper),
    }



    return (
      <div className="news-sliders">

        {/* Recent Stories */}
        <div className="news-preview-container story">
    
          <Swiper
            {...swiper_settings}
          >

            {/* See slots https://swiperjs.com/react/ */}
            <span slot="container-start">

              <div className="frontpage-section-header">
                <h5>Recent Stories</h5>

                <div className="controls ">
                  <i className="fas fa-backward"></i>
                  <i className="fas fa-forward"></i>
                </div>
              </div>

              <div className="stories-filters d-flex mb-3 align-items-center">

                <DropdownButton variant="articles-light" id="dropdown-basic-button" title={ <span><i className="fas fa-filter"></i> Newest</span> }>
                  <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                  <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                </DropdownButton>

                <Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.STORIES} className="ml-3 text-muted">View All</Link>


              </div>
              
            </span>

            {this.props.stories.stories.map((story) => (
              <SwiperSlide>
                <NewsCard document={story}/>
              </SwiperSlide>
            ))}
          </Swiper>
  
        </div>
  
        {/* Recent Issues */}
        <div className="news-preview-container issue">
  
          <Swiper
            {...swiper_settings} 
          >

            {/* See slots https://swiperjs.com/react/ */}
            <span slot="container-start">

              <div className="frontpage-section-header">
                <h5>Recent Issues</h5>

                <div className="controls">
                  <i className="fas fa-backward"></i>
                  <i className="fas fa-forward"></i>
                </div>
                
              </div>

              <div className="issue-filters d-flex mb-3 align-items-center">

                <div className="issue-subscription-control noselect">
                  <div onClick={() => this.props.toggleUserSubscriptions()} className={"control " + (!this.props.userSubscriptions  ? 'active' : '') }>All</div>
                  <div onClick={() => this.props.toggleUserSubscriptions()} className={"control " + (this.props.userSubscriptions  ? 'active' : '') }>Subscriptions</div>
                </div>
  
                <div className="issue-sort-control ml-3 noselect">
  
                  {/* <button className="btn btn-articles-light dropdown">
                    Newest
                  </button> */}

                  <DropdownButton variant="articles-light" id="dropdown-basic-button" title={ <span><i className="fas fa-filter"></i> Newest</span> }>
                    <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                    <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                    <Dropdown.Item href="#/action-3">Most Subscribed</Dropdown.Item>
                  </DropdownButton>
                  
                </div>

                <Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.ISSUES} className="ml-3 text-muted">View All</Link>

              </div>

              {/* <div className="issue-view-controls d-none">
                <div onClick={() => this.props.toggleUserSubscriptions()} className={"type-selection " + (!this.props.userSubscriptions  ? 'active' : '') }>All</div>
                <div onClick={() => this.props.toggleUserSubscriptions()} className={"type-selection " + (this.props.userSubscriptions  ? 'active' : '') }>Subscriptions</div>
              </div> */}

            </span>

            {this.props.userSubscriptions && !this.props.isAuth ? 
            <div className="sign-up-alert">

              <div className="title">Account Feature</div>

              <div className="text">To subscribe to issues and stay up to date about the news you care about create an account!</div>

              <button className="btn btn-articles-light mt-2">
                Sign Up
              </button>

              <small className="d-block mt-2">Already a member? <Link to={ROUTES.SIGN_IN}>Sign In</Link></small>

            </div>
            :
            null
            }

            {
            this.props.userSubscriptions ? 

              this.props.user_subscriptions?.length === 0 ? 

              <div className="sign-up-alert mt-5">
                <div className="title">No Subscriptions</div>
                <div className="text">Sort by all issues and subscribe to ones that you find interesting.</div>
              </div>

              :

              this.props.user_subscriptions?.map((document, i) => (
                
                <SwiperSlide>
                  <NewsCard 
                    key={i} 
                    hasUpdate={ moment(document.last_update).isSameOrAfter(document.lastRead) } 
                    isSub={this.props.user_subscriptions?.filter(sub => sub._id === document._id).length > 0}
                    document={document}
                  />
                </SwiperSlide>

              ))

            :

            <>
              {this.props.issues.issues.map((document, i) => (
  
                <SwiperSlide>
                  <NewsCard 
                    key={i}
                    hasUpdate={ moment(document.last_update).isSameOrAfter(document.lastRead) } 
                    isSub={this.props.user_subscriptions?.filter(sub => sub._id === document._id).length > 0}
                    document={document}
                  />
                </SwiperSlide>
  
              ))}
  
              <SwiperSlide>

                <Link onClick={() => window.scrollTo(0, 0)} to={ROUTES.ISSUES}>
                  <div style={{height: '400px'}} className="bg-dark text-white d-flex flex-column justify-content-center align-items-center">
                    <h4>View All Issues</h4>
                    <p>100 total Issues</p>
                    <i class="fas fa-external-link-alt fa-3x mr-0"></i>
                  </div>
                </Link>

              </SwiperSlide>
              
            </>

            }

          </Swiper>
  
        </div>
  
        {/* Recent Myths */}
        <div className="news-preview-container myth">
  
          <Swiper
            {...swiper_settings}
          >

            {/* See slots https://swiperjs.com/react/ */}
            <span slot="container-start">
              <div className="frontpage-section-header">
                <h5>Recent Myths</h5>

                <div className="controls">
                  <i className="fas fa-backward"></i>
                  <i className="fas fa-forward"></i>
                </div>
              </div>
            </span>

            {this.props.myths.myths.map((story, i) => (
              <SwiperSlide>
                <NewsCard 
                key={story._id}
                document={story}
                // hasUpdate={ moment(document.last_update).isSameOrAfter(document.lastRead) } 
                // isSub={this.props.user_subscriptions?.filter(sub => sub._id === document._id).length > 0}
                />
              </SwiperSlide>
            ))}
          </Swiper>
  
        </div>

        <div className="news-preview-container tags mr-2">

          <div className="frontpage-section-header">
            <h5>Tags</h5>
          </div>

          <div className="tags mb-3">

            {this.state.tags.map(tag => 
              <div onClick={() => this.props.changeTagFocus(tag.tag_name)} className={"tag " + (this.props.tagSearch === tag.tag_name ? 'active' : '')}>
                <h3>{tag.tag_name}</h3>
                <div className="icon">
                  {tag.icon && <img src={tag.icon} alt={`Icon of ${tag.tag_name}`}/>}
                </div>
              </div>
            )}

          </div>

          <div className="tag-results">
            {this.props.tagSearch !== '' && this.props.tagSearchResults !== [] ? 
            <Swiper
            {...swiper_settings}
            >
              {
              this.props.tagSearchResults?.map(result => 
                <SwiperSlide>
                  <NewsCard 
                    key={result._id}
                    document={result}
                    hasUpdate={ moment(result.last_update).isSameOrAfter(result.lastRead) }
                    isSub={this.props.user_subscriptions?.filter(sub => sub._id === result._id).length > 0}
                  />
                </SwiperSlide>
              )
              }
            </Swiper>
            :
            null
            }
          </div>

        </div>

      </div>
    )
  }
}

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: '',

      tagSearch: '',
      tagSearchResults: [

      ],

      searchSettingsOverlay: false,

      weatherSearch: this.props.user_details?.address?.zip || '',

      weatherOverlay: false,
      weatherData: {},
      bankingOverlay: false,

      plaidSetup: false,
      transactions: [
        {
          date: moment().format("LL"),
          place: 'Dunkin',
          amount: 4.52
        },
        {
          date: moment().subtract(2, 'days').format("LL"),
          place: 'Steam',
          amount: 14.13
        },
        {
          date: moment().subtract(17, 'days').format("LL"),
          place: 'Walmart',
          amount: 30.72
        },
        {
          date: moment().subtract(25, 'days').format("LL"),
          place: 'Amazon',
          amount: 5.66
        },
        {
          date: moment().subtract(27, 'days').format("LL"),
          place: 'Banksquare',
          amount: 3.45
        },
        {
          date: moment().subtract(31, 'days').format("LL"),
          place: 'Red Line Diner',
          amount: 12.98
        }
      ],

      locations: [
        {
          // Tesla Factory Austin
          lat: 30.267153,
          lng: -97.743057,
          text: 'Austin, TX',
          url: ''
        },
        {
          // Meet Cybertruck
          lat: 33.921425,
          lng: -118.329995,
          text: 'Tesla Design Center',
          url: ''
        },
        {
          // Jeffery Epstein Arrested
          lat: 40.654098,
          lng: -74.013238,
          text: 'Metropolitan Correctional Center',
          url: ''
        },
      ],

      trending: {
        items: ['5f1b2e1c5846204edc02a49a', '5e9c27cdfeb48937d0e54975', '5f173f4210bb9231f0eb7f02'],
        slide: 0
      },

      focusViewLoadingMore: false,
    }

    this.toggleWeatherOverlay = this.toggleWeatherOverlay.bind(this);
    this.toggleBankingOverlay = this.toggleBankingOverlay.bind(this);
    this.toggleSearchSettingsOverlay = this.toggleSearchSettingsOverlay.bind(this);
    this.changeTagFocus = this.changeTagFocus.bind(this);
  }

  componentDidMount() {
    const self = this;
    console.log("Mounted");

    axios.get('/api/getWeather', {
      params: {
        zip: this.props.user_details?.address?.zip
      }
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        // commitsLoading: false,
        weatherData: response.data.weather
      })

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        // commitsLoading: false,
      })
    });

    this.renderCharts();

    var query = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
    if ( query.search ) {

      console.log("Has content")
      console.log(query)
      console.log(query.search)

      self.setState({
        search: decodeURI(query.search)
      })

    } else {
      console.log("Has no content")
    }
  }

  renderCharts() {
    var chartElement = document.getElementById('chart');

    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: [ '12am', '1am', '2am', '3am', '4am', '5am', '6am', '7am', '8am', '9am', '10am', '11am', '12pm' ],
            datasets: [{
                label: 'Temperature',
                data: [ '45', '44', '44', '43', '43', '44', '45', '51', '52', '55', '55', '55' ],
                backgroundColor: [
                  'rgba(0, 0, 0, 0.2)'
                ],
                borderColor: [
                  'rgba(63, 191, 127, 1)'
                ],
                pointBackgroundColor: 'rgba(63, 191, 127, 1)',
                pointBorderColor: 'rgba(63, 191, 127, 1)',
                borderWidth: 1,
                lineTension: 0.1,
            }]
        },
        options: {
            responsive: true,
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
                yAxes: [{
                  // display: false,
                  ticks: {
                    fontFamily: "brandon-grotesque",
                    beginAtZero: true,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Temp'
                  }
                }],
                xAxes: [{
                  // display: false,
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    fontFamily: "brandon-grotesque",
                  }
                }]
            }
        }
    });
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };
  
  changeTagFocus(tag) {
    const self = this;

    self.setState({
      tagSearch: tag
    }, () => {

      axios.post('/api/getNewsByTag', {
        tag: tag
      })
      .then(function (response) {
        console.log(response);

        self.setState({
          tagSearchResults: response.data.tags
        })
      })
      .catch(function (error) {
        console.log(error.response);
      }); 

    })
  }

  toggleWeatherOverlay(bool) {
    if (bool === true || bool === false) {
      this.setState({weatherOverlay: bool})
    } else {
      this.setState({weatherOverlay: !this.state.weatherOverlay})
    }
  }

  toggleBankingOverlay(bool) {
    if (bool === true || bool === false) {
      this.setState({bankingOverlay: bool})
    } else {
      this.setState({bankingOverlay: !this.state.bankingOverlay})
    }
  }

  toggleSearchSettingsOverlay(bool) {
    if (bool === true || bool === false) {
      this.setState({searchSettingsOverlay: bool})
    } else {
      this.setState({searchSettingsOverlay: !this.state.searchSettingsOverlay})
    }
  }

  render() {

    const swiper_settings = {
      spaceBetween: 10,
      slidesPerView: 1,
      // slidesPerGroup: 1,
      navigation: {
        nextEl: '.fa-forward',
        prevEl: '.fa-backward',
      },
      loop: true,
      pagination: true,

      onSlideChange: (swiper) => {
        console.log(`slide change ${swiper.realIndex}`)
        this.setState({trending: {...this.state.trending, slide: swiper.realIndex}})
      },
      onSwiper: (swiper) => console.log(swiper),
    }
    
    return(
      <section className="news-page">

        <Helmet>
          <title>News - Articles</title>
        </Helmet>

        <div className="side-bar noselect">

          <div className="content">

            <div className="trending-map-wrap">

              <div className="map">

                <div className="beta-warning">WIP</div>

                <div className="zoom-controls d-none">

                  <div className="zoom-in">
                    <i className="fas fa-plus mr-0"></i>
                  </div>

                  <div className="zoom-out">
                    <i className="fas fa-minus mr-0"></i>
                  </div>
                </div>

                <SimpleMap 
                  lat={this.state.locations[this.state.trending.slide].lat} 
                  lng={this.state.locations[this.state.trending.slide].lng}
                  text={this.state.locations[this.state.trending.slide].text}
                />

              </div>
  
              <div className="trending-slider">
  
                <div className="title">Trending</div>
  
                  <Swiper
                    {...swiper_settings}
                  >
  
                  {/* See slots https://swiperjs.com/react/ */}
                  <span slot="container-start">
                
                  </span>

                  <div className="controls">
                    <i className="swiper-button-prev fas fa-backward"></i>
                    <i className="swiper-button-next fas fa-forward"></i>
                  </div>
  
                  <SwiperSlide>
                    <Link to={`${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`}>
                      <div className="trending-card">
                        <div className="type story">Story</div>
                        <Link to={`${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`}>
                        <div className="view btn btn-articles-light btn-sm">Read</div>
                        </Link>
                        Tesla will build its next Gigafactory near Austin, Texas
                        <div className="progress"></div>
                      </div>
                    </Link>
                  </SwiperSlide>
  
                  <SwiperSlide>
                    <Link to={`${ROUTES.STORIES}/meet-cybertruck`}>
                      <div className="trending-card">
                        <div className="type story">Story</div>
                        <Link to={`${ROUTES.STORIES}/meet-cybertruck`}>
                        <div className="view btn btn-articles-light btn-sm">Read</div>
                        </Link>
                        Meet Cybertruck
                        <div className="progress"></div>
                      </div>
                    </Link>
                  </SwiperSlide>
  
                  <SwiperSlide>
                    <Link to={`${ROUTES.STORIES}/meet-cybertruck`}>
                      <div className="trending-card">
                        <div className="type story">Story</div>
                        <Link to={`${ROUTES.STORIES}/jeffery-epstein-arrested`}>
                          <div className="view btn btn-articles-light btn-sm">Read</div>
                        </Link>
                        Jeffery Epstein Arrested
                        <div className="progress"></div>
                      </div>
                      </Link>
                  </SwiperSlide>
  
                </Swiper>
  
                {/* <div className="trending-card">Tesla will build its next Gigafactory near Austin, Texas</div>
   
                <div className="dots">
                  <div className="dot active"></div>
                  <div className="dot"></div>
                  <div className="dot"></div>
                </div> */}
                
              </div>
            </div>

            <div className="menu">

              <div className="discover-links">
                <h5 className="title">Discover</h5>
    
                <div className="links">
                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS}>
                    <div className={"link frontpage " + (this.props.location.pathname === "/news" ? 'active' : null)}>
                      <i className="fas fa-newspaper"></i>
                      <div className="text">Frontpage</div>
                    </div>
                  </Link>
    
                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.STORIES}>
                    <div className={"link stories " + (this.props.location.pathname === "/news/stories" ? 'active' : null)}>
                      <i className="fas fa-bullhorn"></i>
                      <div className="text">Stories</div>
                    </div>
                  </Link>
    
                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.ISSUES}>
                    <div className={"link issues " + (this.props.location.pathname === "/news/issues" ? 'active' : null)}>
                      <i className="fas fa-balance-scale"></i>
                      <div className="text">Issues</div>
                    </div>
                  </Link>
                  
                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.MYTHS}>
                    <div className={"link myths " + (this.props.location.pathname === "/news/myths" ? 'active' : null)}>
                      <i className="fas fa-ghost"></i>
                      <div className="text">Myths</div>
                    </div>
                  </Link>

                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS_LOCAL}>
                    <div className={"link frontpage " + (this.props.location.pathname === "/news/local" ? 'active' : null)}>
                      <i class="fas fa-school"></i>
                      <div className="text">Local</div>
                    </div>
                  </Link>

                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.RESOURCES}>
                    <div className={"link frontpage " + (this.props.location.pathname === "/news/resources" ? 'active' : null)}>
                      {/* <i className="fas fa-ghost"></i> */}
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="books" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" class="svg-inline--fa fa-books fa-w-16 fa-fw mr-2"><path fill="currentColor" d="M575.11 443.25L461.51 19.06C458.2 6.7 445.61-3.18 430.15.96L414.7 5.1c-6.18 1.66-11.53 6.4-16.06 14.24-14.03 6.94-52.3 17.21-68 18.22-7.84-4.53-14.85-5.96-21.03-4.3l-15.46 4.14c-2.42.65-4.2 1.95-6.15 3.08V32c0-17.67-14.33-32-32-32h-64c-17.67 0-32 14.33-32 32v64h128l101.66 396.94c3.31 12.36 15.9 22.24 31.36 18.1l15.45-4.14c6.18-1.66 11.53-6.4 16.06-14.24 13.91-6.88 52.18-17.2 68-18.22 7.84 4.53 14.85 5.96 21.03 4.3l15.46-4.14c15.45-4.14 21.41-18.99 18.09-31.35zm-134.4-7.06L348.64 92.37l61.82-16.56 92.07 343.82-61.82 16.56zM0 384h128V128H0v256zM96 0H32C14.33 0 0 14.33 0 32v64h128V32c0-17.67-14.33-32-32-32zM0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H0v64zm160-96h128V128H160v256zm0 96c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H160v64z" class=""></path></svg>
                      <div className="text">Resources</div>
                    </div>
                  </Link>

                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS_STOCKS}>
                    <div className={"link frontpage " + (this.props.location.pathname === "/news/stocks" ? 'active' : null)}>
                      {/* <i className="fas fa-ghost"></i> */}
                      <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-area" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" class="svg-inline--fa fa-chart-area fa-w-16 fa-fw mr-2"><path fill="currentColor" d="M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 159.5L288 216l-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1L96 248v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z" class=""></path></svg>
                      <div className="text">Stocks</div>
                    </div>
                  </Link>

                  <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS_CRYPTO}>
                    <div className={"link crypto " + (this.props.location.pathname === "/news/crypto" ? 'active' : null)}>
                      {/* <i className="fas fa-ghost"></i> */}
                      <i class="fab fa-bitcoin"></i>
                      <div className="text">Crypto</div>
                    </div>
                  </Link>

                </div>

              </div>

              <div className="grow"></div>

              <div className="feature-links d-none">
                <h5 className="title mt-3">Feature</h5>
  
                <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.EXTENDED + '/coronavirus'}>
                  <div className={"link frontpage " + (this.props.location.pathname === "/news/extended/coronavirus" ? 'active' : null)}>
                    <i className="fas fa-lungs-virus"></i>
                    <div className="text">Coronavirus</div>
                  </div>
                </Link>
  
                {/* <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS}>
                  <div className={"link " + (this.props.location.pathname === "/news/coronavirus" ? 'active' : null)}>
                    <i className="fas fa-fist-raised"></i>
                    <div className="text">Black Lives Matter</div>
                  </div>
                </Link> */}
              </div>

            </div>

          </div>

        </div>

        <div className={"weather-overlay " + (this.state.weatherOverlay ? 'show' : '')}>

          <div onClick={() => this.setState({weatherOverlay: !this.state.weatherOverlay})} className="dim-background">

          </div>
          
          <div className="weather-content">

            <div className="bar">
              <h2>Weather</h2>
            </div>

            <div className="header">

              <div className="background">
                {this.state.weatherData?.current?.is_day === 'yes' ?
                <img src="https://cdn.articles.media/weather/partly-cloudy.jpg" alt=""/>
                :
                <img src="https://www.cruise1st.co.uk/blog/wp-content/uploads/2017/12/Fotolia_96215836_S-702x336.jpg" alt=""/>
                }
              </div>

              <div className="search-container">

                <input type="text" name='weatherSearch' id='weatherSearch' onChange={(e) => this.onChange(e)} value={this.state.weatherSearch}/>

                <div className="search-button">
                  <i className="fas fa-search"></i>
                </div>

                <div className="badge badge-articles d-flex">
                  <div>Prefilled</div><i className="fas fa-info-circle mr-0 ml-1"></i>
                </div>

              </div>

              <div className="content">

                <div>

                  <div className="time">
                    {moment(this.state.weatherData?.location?.localtime).format("LL")}
                  </div>
  
                  <div>
                    <div><i className="fas fa-thermometer-empty"></i>{this.state.weatherData?.current?.temperature}°F</div>
  
                    <div>{this.state.weatherData?.current?.weather_descriptions.map(item => <span>{item} </span>)}</div>
  
                    <div className="d-none">
                      <span>H 80°F</span>
                      <span> / </span>
                      <span>L 80°F</span>
                    </div>
  
                  </div>
                </div>

                <div className="chart">
                  {this.state.weatherData?.current?.weather_icons.map(item => <img className="weather-icon" alt="current weather icon" src={item}/>)}
                </div>

              </div>

            </div>

            <div className="extra-badges">
              <div className="badge badge-articles">Precipitation: {this.state.weatherData?.current?.precip}</div>
              <div className="badge badge-articles">Pressure: {this.state.weatherData?.current?.pressure}hPa</div>
              <div className="badge badge-articles">Wind: {this.state.weatherData?.current?.wind_dir}</div>
              <div className="badge badge-articles">Wind Speed: {this.state.weatherData?.current?.wind_speed}mph</div>
            </div>

            <div className="weather-info">

              <div className="weather-forecast">

                <div className="day first">

                  <div className="day-name">{moment().format("ddd")}</div>
                  <div className="deg">50°</div>
                  <div className="deg low">38°</div>

                </div>

                <div className="days">
                  <div className="day">
    
                    <div className="day-name">{moment().add('days', 1).format("ddd")}</div>
                    <div className="deg high">50°</div>
                    <div className="deg low">38°</div>
    
                  </div>
    
                  <div className="day">
    
                    <div className="day-name">{moment().add('days', 2).format("ddd")}</div>
                    <div className="deg">50°</div>
                    <div className="deg low">38°</div>

                  </div>
    
                  <div className="day">
    
                    <div className="day-name">{moment().add('days', 3).format("ddd")}</div>
                    <div className="deg">50°</div>
                    <div className="deg low">38°</div>

                  </div>
    
                  <div className="day">
    
                    <div className="day-name">{moment().add('days', 4).format("ddd")}</div>
                    <div className="deg">50°</div>
                    <div className="deg low">38°</div>

                  </div>
    
                  <div className="day">
    
                    <div className="day-name">{moment().add('days', 5).format("ddd")}</div>
                    <div className="deg">50°</div>
                    <div className="deg low">38°</div>

                  </div>
    
                  <div className="day">
    
                    <div className="day-name">{moment().add('days', 6).format("ddd")}</div>
                    <div className="deg">50°</div>
                    <div className="deg low">38°</div>

                  </div>
                </div>

              </div>

              <div className="chart">
                <div className="chart-select">
                  <span className="badge badge-danger">Temp</span>
                  <span className="badge badge-primary">Precip</span>
                  <span className="badge badge-success">Wind</span>
                </div>
                <canvas id="chart"></canvas>
              </div>

            </div>

            

            <div className="bottom-controls">
              <div className="btn btn-articles-light">
                <i className="fas fa-map-pin"></i>
                Pin to Header
              </div>
              <div className="btn btn-articles-light ml-2">
                <i className="far fa-window-close"></i>
                Close
              </div>
            </div>

          </div>

        </div>

        <div onClick={() => this.setState({bankingOverlay: !this.state.bankingOverlay})} className={"banking-overlay " + (this.state.bankingOverlay ? 'show' : '')}>

          {this.state.plaidSetup ? 
            <div className="banking-content">

              <div className="overview">

                <div className="overview-control prev">
                  <i className="fas fa-backward"></i>
                </div>

                <div className="details">
                  <div>HVFCU (Checking)</div>
                  <div><i className="fas fa-money-bill"></i>$400.00</div>
                </div>

                <div className="overview-control next">
                  <i className="fas fa-forward"></i>
                </div>

              </div>

              <div className="transaction-list">
                <div className="title">Recent Transactions</div>

                <table className="table table-striped table-sm">
                  <thead>
                    <tr>
                      <th scope="col">Date</th>
                      <th scope="col">Place</th>
                      <th scope="col">Amount</th>
                      {/* <th scope="col">Handle</th> */}
                    </tr>
                  </thead>
                  <tbody>
                    {this.state.transactions.map(transaction => 
                      <tr>
                        <th scope="row">{transaction.date}</th>
                        <td>{transaction.place}</td>
                        <td>${transaction.amount}</td>
                      </tr>  
                    )}
                  </tbody>
                </table>

              </div>

              <div className="bottom-controls">
                <div className="btn btn-articles-light">
                  <i className="fas fa-map-pin"></i>
                  Pin to Header
                </div>
                <div className="btn btn-articles-light ml-2">
                  <i className="far fa-window-close"></i>
                  Close
                </div>
              </div>

            </div>
            :
            <div className="banking-content">

              <img width="200px" src="https://upload.wikimedia.org/wikipedia/commons/thumb/c/c0/Plaid_logo.svg/1200px-Plaid_logo.svg.png" alt=""/>
              <div>Get easy access to your bank balance right in Articles</div>

              <div onClick={() => this.setState({plaidSetup: true})}>Dev Toggle</div>
            </div>
          }
          
          

        </div>

        <div onClick={() => this.setState({searchSettingsOverlay: !this.state.searchSettingsOverlay})} className={"search-settings-overlay " + (this.state.searchSettingsOverlay ? 'show' : '')}>

          <div className="content">

            <div className="animation">
              <div className="box box-1">

              </div>
              <div className="box box-2">

              </div>
              <div className="box box-3">

              </div>
              <div className="box box-4">

              </div>
            </div>

            <div className="note">Custimize your search bar with helpful widgets that keep you on top of all the busy things going on in life.</div>

            <div className="group">
              <div className="title">Availble Widgets</div>
              <div className="list">

                <div className="item">
                  <span className="name">Weather</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="switchToggle"
                      value={this.props.leftLabel}
                      onChange={this.toggleState}
                      checked={!this.state.toggle}
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="switchToggle"
                      value={this.props.rightLabel}
                      onChange={this.toggleState}
                      checked={this.state.toggle}
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

                <div className="item">
                  <span className="name">Youtube</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="switchToggle"
                      value={this.props.leftLabel}
                      onChange={this.toggleState}
                      checked={!this.state.toggle}
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="switchToggle"
                      value={this.props.rightLabel}
                      onChange={this.toggleState}
                      checked={this.state.toggle}
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

                <div className="item">
                  <span className="name">Bank Balance</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="switchToggle"
                      value={this.props.leftLabel}
                      onChange={this.toggleState}
                      checked={!this.state.toggle}
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="switchToggle"
                      value={this.props.rightLabel}
                      onChange={this.toggleState}
                      checked={this.state.toggle}
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

                <div className="item">
                  <span className="name">Messages</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="switchToggle"
                      value={this.props.leftLabel}
                      onChange={this.toggleState}
                      checked={!this.state.toggle}
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="switchToggle"
                      value={this.props.rightLabel}
                      onChange={this.toggleState}
                      checked={this.state.toggle}
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

                <div className="item">
                  <span className="name">Orders</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="switchToggle"
                      value={this.props.leftLabel}
                      onChange={this.toggleState}
                      checked={!this.state.toggle}
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="switchToggle"
                      value={this.props.rightLabel}
                      onChange={this.toggleState}
                      checked={this.state.toggle}
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>
              </div>
            </div>

            <div className="group">
              <div className="title">In Development</div>
              <div className="list">

                <div className="item">
                  <span className="name">Bank Balance</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="bankBalanceToggle"
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="bankBalanceToggle"
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

                <div className="item">
                  <span className="name">Amazon, Ebay Orders</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="bankBalanceToggle"
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="bankBalanceToggle"
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

                <div className="item">
                  <span className="name">Email</span>
                  <div className="switch-field">
                    <input
                      type="radio"
                      id="switch_left"
                      name="bankBalanceToggle"
                    />
                    <label htmlFor="switch_left">Active</label>

                    <input
                      type="radio"
                      id="switch_right"
                      name="bankBalanceToggle"
                    />
                    <label htmlFor="switch_right">Inactive</label>
                  </div>
                </div>

              </div>
            </div>

          </div>
          
        </div>

        <div className="main-content-container">

          <NewsHead 
            zip={this.props.user_details.address?.zip || 'None'} 
            toggleWeatherOverlay={this.toggleWeatherOverlay} 
            toggleBankingOverlay={this.toggleBankingOverlay}
            toggleSearchSettingsOverlay={this.toggleSearchSettingsOverlay}
            toggleUserSubscriptions={this.props.toggleUserSubscriptions}
            userSubscriptions={this.props.site?.userSubscriptions}
            filterIssuesDateType={this.props.filterIssuesDateType}
            history={this.props.history}
            dateType={this.props.site.dateType}
            homeLayout={true} 
            path={this.props.match.path}
            plaidSetup={this.state.plaidSetup}
            weatherData={this.state.weatherData}
            onChange={this.onChange}
            search={this.state.search}
          />

          <div className='container-fluid'>

            <div className="top-bar">

              <div className="link active">
                <i className="fas fa-newspaper"></i>
                <div className="text">Frontpage</div>
              </div>

              <div className="link">
                <i className="fas fa-bullhorn"></i>
                <div className="text">Stories</div>
              </div>

              <div className="link">
                <i className="fas fa-balance-scale"></i>
                <div className="text">Issues</div>
              </div>

              <div className="link">
                <i className="fas fa-ghost"></i>
                <div className="text">Myths</div>
              </div>

            </div>

            <div className="row mb-3 justify-content-between">
  
              {/* Left Side */}
              <div className="col-12 col-md-12 pr-md-0">

                <Switch>
                  {/* <Route exact path={ROUTES.NEWS} render={() => <h1>Front</h1>}/> */}
                  {/* <Route exact path={ROUTES.NEWS} render={() => <JustFrontpage stories={this.props.stories} issues={this.props.issues} myths={this.props.myths}></JustFrontpage>}/> */}
                  <Route exact path={ROUTES.NEWS} render={() => 
                    <RecentSliders
                    stories={this.props.stories}
                    issues={this.props.issues}
                    myths={this.props.myths}
                    userSubscriptions={this.props.site.userSubscriptions}
                    toggleUserSubscriptions={this.props.toggleUserSubscriptions}
                    user_subscriptions={this.props.user_subscriptions}
                    isAuth={this.props.isAuth}
                    changeTagFocus={this.changeTagFocus}
                    tagSearch={this.state.tagSearch}
                    tagSearchResults={this.state.tagSearchResults}/>
                  }/>
                  <Route exact path={ROUTES.NEWS_SEARCH} render={() => <Search searchText={this.state.search}></Search>}/>
                  <Route exact path={ROUTES.NEWS_LOCAL} render={() => <Local searchText={this.state.search}></Local>}/>
                  <Route exact path={ROUTES.RESOURCES} render={() => <ResourcesPage searchText={this.state.search}></ResourcesPage>}/>
                  <Route exact path={ROUTES.NEWS_STOCKS} render={() => <Stocks searchText={this.state.search}></Stocks>}/>
                  <Route exact path={ROUTES.NEWS_CRYPTO} render={() => <Crypto searchText={this.state.search}></Crypto>}/>
                  <Route exact path={ROUTES.STORIES} render={() => <Stories searchText={this.state.search}></Stories>}/>
                  <Route exact path={ROUTES.ISSUES} render={() => <Issues searchText={this.state.search}></Issues> }/>
                  <Route exact path={ROUTES.MYTHS} render={() => <Myths searchText={this.state.search}></Myths> }/>
                  <Route exact path={ROUTES.EXTEND} render={() => (
                    <div>

                      <h5>Important Links</h5>
                      <ul>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://news.google.com/covid19/map?hl=en-US&gl=US&ceid=US%3Aen&mid=%2Fm%2F09c7w0">Google Interactive Map and Stats</a></li>
                        <li><a target="_blank" rel="noopener noreferrer" href="https://www.cdc.gov/coronavirus/2019-ncov/index.html">Offical CDC Coronavirus Website</a></li>
                      </ul>

                      <h5>Misconceptions and Media Lies Debunked</h5>

                      <h5>Quick Images</h5>

                      <h5>Latest Predictions</h5>

                    </div>
                  )}/>
                </Switch>

                <div className="load-more-button my-5 d-none">
                  <div onClick={() => this.setState({focusViewLoadingMore: !this.state.focusViewLoadingMore})} className="btn btn-articles-light">

                    <i className={"fas fa-pulse fa-spinner " + (this.state.focusViewLoadingMore ? '' : 'd-none')}></i>
                    <i className={"fas fa-mouse-pointer " + (this.state.focusViewLoadingMore ? 'd-none' : '')}></i>

                    Load More
                  </div>
                </div>
  
              </div>
  
            </div>
  
          </div>

        </div>

      </section>
    )
  }
}

const mapStateToProps = state => ({
  isAuth: state.auth.isAuthenticated,
  issues: state.issues,
  stories: state.stories,
  myths: state.myths,
  site: state.site,
  user_details: state.auth.user_details,
  user_subscriptions: state.auth.user_details.subscriptionsFetched
});

export default connect(
  mapStateToProps,
  { toggleUserSubscriptions, filterIssuesDateType } 
)(Frontpage);

export { NewsCard };