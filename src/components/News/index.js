import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import axios from 'axios';
import GoogleMapReact from 'google-map-react';
import Chart from 'chart.js';

// import Swiper from 'react-id-swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y, EffectFade } from 'swiper';
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

import Stories from './Stories/index';
import Issues from './Issues/index';
import Myths from './Myths/index';

import statesImage from '../../assets/img/states.jpg'

import background from '../../assets/img/card-1.png'

import * as ROUTES from '../../constants/routes';
import { Link, Switch, Route } from 'react-router-dom';

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

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y, EffectFade]);

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

function SearchHead(props) {

  const days = [];

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
    <div className={"news-head " + (isHome ? 'home' : 'focus')}>

      <div className="frontpage-section-header d-none">
        <h5>Widgets</h5>

        <div className="controls d-none ">
          <i className="fas fa-backward"></i>
          <i className="fas fa-forward"></i>
        </div>
      </div>

      <div className="spacer"></div>

      <div className={"active-page-panel " + (isHome ? 'home' : 'focus')}>

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
  
        {/* <div className="my-2 d-flex justify-content-between">

          <div>
            <Link to={ROUTES.NEWS}><button className={"search-button mr-1 " + (props.path === "/news" ? 'active' : '')}>All</button></Link>
            <Link to={ROUTES.STORIES}><button className={"search-button mr-1 " + (props.path === "/news/stories" ? 'active' : '')}>Stories</button></Link>
            <Link to={ROUTES.ISSUES}><button className={"search-button mr-1 " + (props.path === "/news/issues" ? 'active' : '')}>Issues</button></Link>
            <Link to={ROUTES.MYTHS}><button className={"search-button mr-1 " + (props.path === "/news/myths" ? 'active' : '')}>Myths</button></Link>
          </div>

        </div> */}
  
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

      <div className="extra-panels">

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

        <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer" className="extra-panel youtube">

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

              <div className="issue-view-controls">
                <div onClick={() => this.props.toggleUserSubscriptions()} className={"type-selection " + (!this.props.userSubscriptions  ? 'active' : '') }>All</div>
                <div onClick={() => this.props.toggleUserSubscriptions()} className={"type-selection " + (this.props.userSubscriptions  ? 'active' : '') }>Subscriptions</div>
              </div>

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

            (this.props.issues.issues.map((document, i) => (
              <SwiperSlide>
                <NewsCard 
                  key={i}
                  hasUpdate={ moment(document.last_update).isSameOrAfter(document.lastRead) } 
                  isSub={this.props.user_subscriptions?.filter(sub => sub._id === document._id).length > 0}
                  document={document}
                />
              </SwiperSlide>
            )))
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

        <div className="news-preview-container tags">

          <div className="frontpage-section-header">
            <h5>Tags</h5>
          </div>

          <div className="tags">

            {this.state.tags.map(tag => 
              <div onClick={() => this.props.changeTagFocus(tag.tag_name)} className={"tag " + (this.props.tagSearch === tag.tag_name ? 'active' : '')}>
                <h3>{tag.tag_name}</h3>
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
      <section className="frontpage-section">

      <Helmet>
        <title>News - Articles</title>
      </Helmet>

        <div className="side-bar noselect">

          <div className="content">

            <div className="trending-map-wrap">

              <div className="map">

                <div className="beta-warning">WIP</div>

                <div className="zoom-controls">

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

              <div className="states-heatmap">
                <img src={statesImage} className="head-image" alt=""/>
                <div className="live-dots">
  
                  <div className={"dot dot-" + this.state.trending.slide}>
                    <div className="expanded">
                      
                      <div className="location">Austin, TX</div>
                      <div className="date">{moment().format("MM/DD")}</div>
  
                      <div className="news">Tesla will build its next Gigafactory near Austin, Texas</div>
                      
                      <div className="btn btn-articles-light">View</div>
                    </div>
                  </div>
  
                </div>
              </div>
  
              <div className="trending">
  
                <div className="title">Trending</div>
  
                <Swiper
                  // effect="fade"
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
                    <div className="trending-card">
                      <div className="type story">Story</div>
                      <Link to={`${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`}>
                      <div className="view btn btn-articles-light btn-sm">View</div>
                      </Link>
                      Tesla will build its next Gigafactory near Austin, Texas
                      <div className="progress"></div>
                    </div>
                  </SwiperSlide>
  
                  <SwiperSlide>
                    <div className="trending-card">
                      <div className="type story">Story</div>
                      <Link to={`${ROUTES.STORIES}/meet-cybertruck`}>
                      <div className="view btn btn-articles-light btn-sm">View</div>
                      </Link>
                      Meet Cybertruck
                      <div className="progress"></div>
                    </div>
                  </SwiperSlide>
  
                  <SwiperSlide>
                      <div className="trending-card">
                        <div className="type story">Story</div>
                        <Link to={`${ROUTES.STORIES}/jeffery-epstein-arrested`}>
                          <div className="view btn btn-articles-light btn-sm">View</div>
                        </Link>
                        Jeffery Epstein Arrested
                        <div className="progress"></div>
                      </div>
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
                </div>
              </div>

              <div className="grow"></div>

              <div className="feature-links">
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

        <div className="content">
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
              <div className="col-12 col-md-12">

              <SearchHead 
              zip={this.props.user_details.address?.zip || 'None'} 
              toggleWeatherOverlay={this.toggleWeatherOverlay} 
              toggleBankingOverlay={this.toggleBankingOverlay}
              toggleSearchSettingsOverlay={this.toggleSearchSettingsOverlay}
              toggleUserSubscriptions={this.props.toggleUserSubscriptions}
              userSubscriptions={this.props.site?.userSubscriptions}
              filterIssuesDateType={this.props.filterIssuesDateType}
              dateType={this.props.site.dateType}
              homeLayout={true} 
              path={this.props.match.path}
              plaidSetup={this.state.plaidSetup}
              weatherData={this.state.weatherData}
              />

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