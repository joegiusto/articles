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

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IssueDevelopmentCard from './IssueDevelopmentCard'
import StoriesDisplay from './StoriesDisplay'
import MythsDisplay from './MythsDisplay'

import Stories from './Stories/index';
import Issues from './Issues/index';
import Myths from './Myths/index';

import { GzyCard } from './Issues/index'

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

  return(
    <div className={"search-extras-head " + (props.homeLayout ? 'home' : '')}>

      <div className={"search-head " + (props.homeLayout ? 'home' : '')}>
  
        <img src={background} alt="" className="background"/>
  
        <h1 className="title">Search</h1>
  
        <div className="filter"></div>
  
        <input 
        id="search" 
        name="search" 
        value={props.searchText} 
        onChange={props.onChange} 
        type="text" 
        className="form-control"
        placeholder={props.userSubscriptions ? "Only works on 'All Issues' sort" : ""}
        />
  
        <div className="my-2">
          <Link to={ROUTES.STORIES}><button className={"search-button mr-1 " + (props.pathname === "/news/stories" ? 'active' : '')}>Stories</button></Link>
          <Link to={ROUTES.ISSUES}><button className={"search-button mr-1 " + (props.pathname === "/news/issues" ? 'active' : '')}>Issues</button></Link>
          <Link to={ROUTES.MYTHS}><button className={"search-button mr-1 " + (props.pathname === "/news/myths" ? 'active' : '')}>Myths</button></Link>
        </div>
  
        <div className="tags">
          <div className="type">Trending</div>
          <div className="badge badge-articles">Coronavirus</div>
          <div className="badge badge-articles">United Nations</div>
          <div className="badge badge-articles">2020 Elections</div>
          <div className="badge badge-articles">Global Warming</div>
          <div className="badge badge-articles">Flint Michigan</div>
        </div>
  
      </div>

      <div className="extras-head">

        <div onClick={() => props.toggleWeatherOverlay()} className="extras-panel weather">

          {/* <div className="info">Zip: </div> */}
          <div className="info">Zip: <span className="badge badge-light">{props.zip}</span></div>

          <div className="background">
            <img src="https://s7d2.scene7.com/is/image/TWCNews/partly_cloudy_jpg-4" alt=""/>
          </div>

          <div className="content text-center">
            <div><i className="fas fa-thermometer-empty"></i>80°F</div>
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

        <a href="https://www.youtube.com/channel/UCeftkiTtcniDx87GqoEmFAg" target="_blank" rel="noopener noreferrer" className="extras-panel youtube">
          <div className="info">Last Upload: <span className="badge badge-light">Never</span></div>
          <div className="background">
            <img src="https://turbologo.com/articles/wp-content/uploads/2019/10/youtube-logo-illustration-1280x720.jpg" alt=""/>
          </div>
        </a>

      </div>

    </div>
  )
}

function JustFrontpage(props) {

  const [swiper, updateSwiper] = useState(null);

  const settings = {
    arrows: true,
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 4,
    slidesToScroll: 4,
    responsive: [
      {
        breakpoint: 1024,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
          infinite: true,
          dots: true
        }
      },
      {
        breakpoint: 600,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 2,
          initialSlide: 2
        }
      },
      {
        breakpoint: 480,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1
        }
      }
    ]
  };

  const params = {
    pagination: {
      el: '.swiper-pagination',
      type: 'bullets',
      clickable: true
    },
    navigation: {
      nextEl: '.swiper-button-next',
      prevEl: '.swiper-button-prev'
    },
    spaceBetween: 5,
    // freeMode: true,
    slidesPerView: 1,
    slidesPerGroup: 1,
    containerClass: 'swiper-container',
  }

  const goNext = () => {
    if (swiper !== null) {
      swiper.slideNext();
    }
  };
  const goPrev = () => {
    if (swiper !== null) {
      swiper.slidePrev();
    }
  };

  if (swiper !== null) {
    swiper.on('slideChange', function () {
      console.log('slide changed');
    });
  }

  return (
    <>
      <div className="issue-development issues-page d-none">
        
        <div className="d-flex justify-content-between">
          <span className="title heading-font">Issue Developments</span>
          {/* <span>Showing 4 out of {this.props.issues.issues.length}</span> */}
        </div>

        {/* <Slider {...settings}>
        <div>
          <h3>1</h3>
        </div>
        <div>
          <h3>2</h3>
        </div>
        <div>
          <h3>3</h3>
        </div>
        <div>
          <h3>4</h3>
        </div>
        <div>
          <h3>5</h3>
        </div>
        <div>
          <h3>6</h3>
        </div>
      </Slider> */}

      {/* <div className="swiper-container"> 

        <div onClick={goPrev} className="swiper-button-prev">A</div>
        <div onClick={goNext} className="swiper-button-next">B</div>
        
        <Swiper {...params}>   
          {props.issues?.issues.map((issue, i) => (
            <GzyCard
            key={i}
            issue={issue}
            podcast={true}
            podcastDay=""
            podcastLink=""
            topText="Rising Cost"
            dateType={props.site?.dateType}
            bottomText="The Unspoken Issues"
            backgroundImage={issue.hero_url}
            />
          ))}  
          
        </Swiper>

      </div> */}

      <div className="noselect">
        <div className="new-button">My Subscriptions</div>
        <div className="new-button">View All</div>
      </div>
      

        <div className="issue-development-cards">
          {props.issues.issues.map((issue) => (
            <IssueDevelopmentCard issue={issue}/>
          ))}

          <IssueDevelopmentCard issue={{news_title: "Subscribe to More"}}/>
          <IssueDevelopmentCard issue={{news_title: "Manage Subscriptions"}}/>
        </div>

        {/* <Slider {...settings}>
          {this.props.issues.issues.map((issue) => (
            <IssueDevelopmentCard issue={issue}/>
          ))}
        </Slider> */}

        {/* <div className="manage-subscriptions small">Manage Issue Subscriptions</div> */}

      </div>

      <div className="stories">
        <span className="title heading-font">News Stories</span>
        <StoriesDisplay stories={props.stories.stories}/>
      </div>

      <div className="myths">
        <span className="title heading-font">Myths Collection</span>
        <MythsDisplay myths={props.myths.myths}/>
      </div>
    </>
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
                <i class="fas fa-backward"></i>
                <i class="fas fa-forward"></i>
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
                <i class="fas fa-backward"></i>
                <i class="fas fa-forward"></i>
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
                <i class="fas fa-backward"></i>
                <i class="fas fa-forward"></i>
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
      weatherOverlay: false
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
    const settings = {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };

    const swiper_settings = {
      spaceBetween: 10,
      slidesPerView: 'auto',
      slidesPerGroup: 1,
      navigation: true,
      scrollbar: { draggable: true },
      onSlideChange: () => console.log('slide change'),
      onSwiper: (swiper) => console.log(swiper)
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

                <div className="dot">
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

              <div className="trending-card">Tesla will build its next Gigafactory near Austin, Texas</div>

              <div className="dots">
                <div className="dot active"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
              
            </div>

            <div className="menu">

              <h5 className="title">Discover</h5>
  
              <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS}>
                <div className={"link " + (this.props.location.pathname === "/news" ? 'active' : null)}>
                  <i className="fas fa-newspaper"></i>
                  <div className="text">Frontpage</div>
                </div>
              </Link>

              <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.STORIES}>
                <div className={"link " + (this.props.location.pathname === "/news/stories" ? 'active' : null)}>
                  <i className="fas fa-bullhorn"></i>
                  <div className="text">Stories</div>
                </div>
              </Link>

              <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.ISSUES}>
                <div className={"link " + (this.props.location.pathname === "/news/issues" ? 'active' : null)}>
                  <i className="fas fa-balance-scale"></i>
                  <div className="text">Issues</div>
                </div>
              </Link>
              
              <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.MYTHS}>
                <div className={"link " + (this.props.location.pathname === "/news/myths" ? 'active' : null)}>
                  <i className="fas fa-ghost"></i>
                  <div className="text">Myths</div>
                </div>
              </Link>

              <h5 className="title mt-3">Feature</h5>

              <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS}>
                <div className={"link " + (this.props.location.pathname === "/news/coronavirus" ? 'active' : null)}>
                  <i className="fas fa-lungs-virus"></i>
                  <div className="text">Coronavirus</div>
                </div>
              </Link>

              <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS}>
              <div className={"link " + (this.props.location.pathname === "/news/coronavirus" ? 'active' : null)}>
                <i className="fas fa-fist-raised"></i>
                <div className="text">Black Lives Matter</div>
              </div>
            </Link>

            </div>

            

          </div>

        </div>

        <div onClick={() => this.setState({weatherOverlay: !this.state.weatherOverlay})} className={"weather-overlay " + (this.state.weatherOverlay ? 'show' : '')}>
          
          <div className="content">

            <div>Weather Overlay</div>

            <div className="close">
              <div className="btn btn-articles-light">
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

            {/* {this.props.location.pathname === "/news" ?
            <>
              <SearchHead/>
              <RecentSliders
              stories={this.props.stories}
              issues={this.props.issues}
              myths={this.props.myths}
              />
            </>
            :
            null
            } */}

            <div className="row mb-3 justify-content-between">
  
              {/* Left Side */}
              <div className="col-12 col-md-12 px-md-0">

                <Switch>
                  {/* <Route exact path={ROUTES.NEWS} render={() => <h1>Front</h1>}/> */}
                  {/* <Route exact path={ROUTES.NEWS} render={() => <JustFrontpage stories={this.props.stories} issues={this.props.issues} myths={this.props.myths}></JustFrontpage>}/> */}
                  <Route exact path={ROUTES.NEWS} render={() => 
                    <>
                      <SearchHead zip={this.props.user_details.address?.zip || 'None'} toggleWeatherOverlay={this.toggleWeatherOverlay} homeLayout={true}/>

                      <RecentSliders
                      stories={this.props.stories}
                      issues={this.props.issues}
                      myths={this.props.myths}
                      />

                      <div className="mt-3 mx-auto ongoing-counts d-none">

                        Serving 

                        <div className="counts">
                          <span>{this.props.stories.stories.length} Stories</span>
                          <span className="mx-2">-</span>
                          <span>{this.props.issues.issues.length} Issues</span>
                          <span className="mx-2">-</span>
                          <span>{this.props.myths.myths.length} Myths</span>
                        </div>

                        Thank you to everyone that supports.

                      </div>
                    </>
                  }/>
                  <Route exact path={ROUTES.STORIES} render={() => <Stories searchText={this.state.search}></Stories>}/>
                  <Route exact path={ROUTES.ISSUES} render={() => <Issues searchText={this.state.search}></Issues> }/>
                  <Route exact path={ROUTES.MYTHS} render={() => <Myths searchText={this.state.search}></Myths> }/>
                </Switch>
  
              </div>
  
              {/* Right Side */}
              <div className="col-12 col-md-12 pl-md-0 ">
  
                <div className="side-panel mx-auto">

                  {this.props.location.pathname === "/news" ?
                  null
                  :
                  <SearchHead userSubscriptions={this.props.site?.userSubscriptions} onChange={this.onChange} searchText={this.state.search} pathname={this.props.location.pathname}></SearchHead>
                  }
  
                  <div className="the-recap d-none">
    
                    <div className="the-recap-embed"></div>
                    <div className="the-recap-embed-overlay">
                      <div className="background"></div>
                      <img src={playButtonDark} alt=""/>
                      <span className="text">Coming Soon</span>
                    </div>
    
                    <div className="content">
                      {/* In this video */}
                    </div>
    
                  </div>
    
                  <div className="weather-panel d-none">
          
                    <div className="header"></div>
          
                    <div className="dual-header">
          
                      <div className="title">Weekly Weather <span className="highlight">Fishkill, NY</span></div>
          
                      <div className="toggle-switch mr-3">
                        <i className="fas active fa-home mr-0"></i>
                        <span className="divide">/</span>
                        <i className="fas fa-search-location mr-0"></i>
                      </div>
          
                    </div>
          
                    <div className="content mt-1">

                      <div className="container-fluid">
                        <div className="row justify-content-center">
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 0 ? 'active' : '')}>
                              <div className="day">Sun.</div>
                              <div className="date">{moment().add(-2, 'day').format('MM/DD')}</div>
                              <div className="icon">
                                <i className="fas fa-sun"></i>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 1 ? 'active' : '')}>
                              <div className="day">Mon.</div>
                              <div className="date">{moment().add(-1, 'day').format('MM/DD')}</div>
                              <div className="icon">
                                <i className="fas fa-cloud-sun"></i>
                              </div>
                            </div>
                          </div>
            
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 2 ? 'active' : '')}>
                              
                              <div className="day">Tues.</div>
            
                              <div className="date">{moment().add(0, 'day').format('MM/DD')}</div>
            
                              <div className="icon">
                                <i className="fas fa-cloud-sun"></i>
                              </div>
            
                            </div>
                          </div>
            
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 3 ? 'active' : '')}>
                              <div className="day">Wed.</div>
                              <div className="date">{moment().add(1, 'day').format('MM/DD')}</div>
                              <div className="icon">
                                <i className="fas fa-cloud-showers-heavy"></i>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 4 ? 'active' : '')}>
                              <div className="day">Thur.</div>
                              <div className="date">{moment().add(2, 'day').format('MM/DD')}</div>
                              <div className="icon">
                                <i className="fas fa-cloud-showers-heavy"></i>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 5 ? 'active' : '')}>
                              <div className="day">Fri.</div>
                              <div className="date">{moment().add(3, 'day').format('MM/DD')}</div>
                              <div className="icon">
                                <i className="fas fa-cloud-sun"></i>
                              </div>
                            </div>
                          </div>
                          <div className="col-auto">
                            <div className={'day-tile ' + (moment().format('d') === 6 ? 'active' : '')}>
                              <div className="day">Sat.</div>
                              <div className="date">{moment().add(4, 'day').format('MM/DD')}</div>
                              <div className="icon">
                                <i className="fas fa-sun"></i>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                    </div>
          
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

// const Page = () => (
  
// );

// export default Page;

const mapStateToProps = state => ({
  issues: state.issues,
  stories: state.stories,
  myths: state.myths,
  site: state.site,
  user_details: state.auth.user_details
});

export default connect(
  mapStateToProps
)(Frontpage);