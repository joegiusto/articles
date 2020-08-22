import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";

// import Swiper from 'react-id-swiper';
import SwiperCore, { Navigation, Pagination, Scrollbar, A11y } from 'swiper';
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

import { toggleUserSubscriptions, filterIssuesDateType } from '../../actions/siteActions'

import Stories from './Stories/index';
import Issues from './Issues/index';
import Myths from './Myths/index';

import statesImage from '../../assets/img/states.jpg'

import background from '../../assets/img/card-1.png'

import * as ROUTES from '../../constants/routes';
import { Link, Switch, Route } from 'react-router-dom';

SwiperCore.use([Navigation, Pagination, Scrollbar, A11y]);

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
  
        <div className="tags">
          <div className="type">Trending</div>
          <div className="badge badge-articles">Coronavirus</div>
          <div className="badge badge-articles">United Nations</div>
          <div className="badge badge-articles">2020 Elections</div>
          <div className="badge badge-articles">Global Warming</div>
          <div className="badge badge-articles">Flint Michigan</div>
        </div>
  
      </div>

      <div className="extra-panels">

        <div onClick={() => props.toggleWeatherOverlay()} className="extra-panel weather">

          {/* <div className="info">Zip: </div> */}
          <div className="info">Zip: <span className="badge badge-light">{props.zip}</span></div>

          <div className="background">
            <img src="https://s7d2.scene7.com/is/image/TWCNews/partly_cloudy_jpg-4" alt=""/>
          </div>

          <div className="content text-center">
            <div><i className="fas fa-thermometer-empty"></i>0°F</div>
            <div>Partly Cloudy</div>
          </div>

          <div className="slideup">
            <div className="days">

              {days}

              {/* <div className="day">
                <div>{moment().add(0, 'day').format('ddd')} - {moment().add(0, 'day').format('DD')}</div>
                <div><i className="fas fa-cloud-sun"></i></div>
              </div>

              <div className="day">{moment().add(1, 'day').format('ddd')} - {moment().add(1, 'day').format('DD')}</div>
              <div className="day">{moment().add(2, 'day').format('ddd')} - {moment().add(2, 'day').format('DD')}</div>
              <div className="day">{moment().add(3, 'day').format('ddd')} - {moment().add(3, 'day').format('DD')}</div>
              <div className="day">{moment().add(4, 'day').format('ddd')} - {moment().add(4, 'day').format('DD')}</div>
              <div className="day">{moment().add(5, 'day').format('ddd')} - {moment().add(5, 'day').format('DD')}</div>
              <div className="day">{moment().add(6, 'day').format('ddd')} - {moment().add(6, 'day').format('DD')}</div> */}

            </div>
          </div>
          
          <div></div>

        </div>

        <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer" className="extra-panel youtube">

          <div className="info">Last Upload: <span className="badge badge-light">Never</span></div>

          <div className="background">
            <img src="https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-1280x720.jpg" alt=""/>
          </div>

          <div className="hover-notice">Open Tab For https://youtube.com</div>
        </a>

      </div>

      <div className="spacer"></div>

    </div>
  )
}

class NewsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    
  }

  renderRoute(type) {
    switch(type) {
      case 'story':
        return ROUTES.STORIES
        // break;
      case 'issue':
        return ROUTES.ISSUES
        // break;
      case 'myth':
        return ROUTES.MYTHS
        // break;
      default:
        // code block
    }
  }

  render() {
    return (
      <Link to={this.renderRoute(this.props.document.news_type) + '/' + this.props.document.url}>
        <div className="content">
          <div className="date">{moment(this.props.document.news_date).format("L")}</div>

          {this.props.hasUpdate ? 
          <div className="update">
            <i className="fas fa-star"></i>
            <span>Update</span>
          </div>
          :
          null
          }
          
          <div className="title">{this.props.document.news_title}</div>
          <img src={this.props.document.hero_url} alt="" className="background"/>
          <div className="filter"></div>
          <div className="shadow"></div>
          <div className="bar"></div>
          <div className="tagline">
            {this.props.document.news_tagline}
          </div>
        </div>
      </Link>
    )
  }
}

class RecentSliders extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {

  }

  render() {

    const swiper_settings = {
      spaceBetween: 10,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      // navigation: true,
      scrollbar: { draggable: true },
      navigation: {
        nextEl: '.fa-forward',
        prevEl: '.fa-backward',
      },

      onSlideChange: () => console.log('slide change'),
      onSwiper: (swiper) => console.log(swiper),
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
              <div className="header">
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
              <div className="header">
                <h5>Recent Issues</h5>

                <div className="controls">
                  <i className="fas fa-backward"></i>
                  <i className="fas fa-forward"></i>
                </div>
              </div>
            </span>

            {this.props.issues.issues.map((story) => (
              <SwiperSlide>
                <NewsCard document={story}/>
              </SwiperSlide>
            ))}
          </Swiper>
  
        </div>
  
        {/* Recent Myths */}
        <div className="news-preview-container myth">
  
          <Swiper
            {...swiper_settings}
          >

            {/* See slots https://swiperjs.com/react/ */}
            <span slot="container-start">
              <div className="header">
                <h5>Recent Myths</h5>

                <div className="controls">
                  <i className="fas fa-backward"></i>
                  <i className="fas fa-forward"></i>
                </div>
              </div>
            </span>

            {this.props.myths.myths.map((story) => (
              <SwiperSlide>
                <NewsCard document={story}/>
              </SwiperSlide>
            ))}
          </Swiper>
  
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
      weatherOverlay: false,

      trending: {
        items: ['5f1b2e1c5846204edc02a49a', '5e9c27cdfeb48937d0e54975', '5f173f4210bb9231f0eb7f02'],
        slide: 0
      },

      

      focusViewLoadingMore: false,
    }

    this.toggleWeatherOverlay = this.toggleWeatherOverlay.bind(this);
  }

  componentDidMount() {
    console.log("Mounted");
  }

  onChange = event => {
    console.log("Fired")
    this.setState({ [event.target.name]: event.target.value });
  };

  toggleWeatherOverlay(bool) {
    if (bool === true || bool === false) {
      this.setState({weatherOverlay: bool})
    } else {
      this.setState({weatherOverlay: !this.state.weatherOverlay})
    }
  }

  render() {

    const swiper_settings = {
      spaceBetween: 10,
      slidesPerView: 1,
      // slidesPerGroup: 1,
      // navigation: true,
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
                {...swiper_settings}
              >

                {/* See slots https://swiperjs.com/react/ */}
                <span slot="container-start">

                </span>

                <SwiperSlide>
                  <div className="trending-card">
                    Tesla will build its next Gigafactory near Austin, Texas
                    <div className="progress"></div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="trending-card">
                    Meet Cybertruck
                    <div className="progress"></div>
                  </div>
                </SwiperSlide>

                <SwiperSlide>
                  <div className="trending-card">
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

            <div className="menu">

              <h5 className="title">Discover</h5>
  
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

              <div className="grow"></div>

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

        <div onClick={() => this.setState({weatherOverlay: !this.state.weatherOverlay})} className={"weather-overlay " + (this.state.weatherOverlay ? 'show' : '')}>
          
          <div className="weather-content">

            <div className="bar">
              <h2>Weather</h2>
            </div>

            <div className="header">

              <div className="background">
                <img src="https://s7d2.scene7.com/is/image/TWCNews/partly_cloudy_jpg-4" alt=""/>
              </div>

              <div className="content text-center">

                <div>
                  <div>{moment().format("dddd")}</div>
                  <div>{moment().format("MMMM, DD")}</div>
                  <div>{moment().format("Y")}</div>
                </div>

                <div>
                  <div><i className="fas fa-thermometer-empty"></i>80°F</div>
                  <div>Partly Cloudy</div>
                  <div>
                    <span>H 80°F</span>
                    <span> / </span>
                    <span>L 80°F</span>
                  </div>
                </div>

                <div className="chart">

                </div>

              </div>

            </div>

            <div className="body">Weather is still being worked on and will not be available until September.</div>

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
              toggleUserSubscriptions={this.props.toggleUserSubscriptions}
              userSubscriptions={this.props.site?.userSubscriptions}
              filterIssuesDateType={this.props.filterIssuesDateType}
              dateType={this.props.site.dateType}
              homeLayout={true} 
              path={this.props.match.path}
              />

                <Switch>
                  {/* <Route exact path={ROUTES.NEWS} render={() => <h1>Front</h1>}/> */}
                  {/* <Route exact path={ROUTES.NEWS} render={() => <JustFrontpage stories={this.props.stories} issues={this.props.issues} myths={this.props.myths}></JustFrontpage>}/> */}
                  <Route exact path={ROUTES.NEWS} render={() => 
                    <>

                      <RecentSliders
                      stories={this.props.stories}
                      issues={this.props.issues}
                      myths={this.props.myths}
                      />

                    </>
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
  issues: state.issues,
  stories: state.stories,
  myths: state.myths,
  site: state.site,
  user_details: state.auth.user_details
});

export default connect(
  mapStateToProps,
  { toggleUserSubscriptions, filterIssuesDateType } 
)(Frontpage);

export { NewsCard };