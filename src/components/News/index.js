import React, { Component, useState } from 'react';
import { Helmet } from "react-helmet";
import { connect } from "react-redux";
import Swiper from 'react-id-swiper';
import 'swiper/swiper.scss'
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
  return(
    <div className={"search-head"}>

      <img src={background} alt="" className="background"/>

      <h1 className="title">Search</h1>

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

      <p className="body">Easily access content across all of our news content and publications.</p>

      <div className="tags">
        <div className="type">Trending</div>
        <div className="badge badge-articles">Coronavirus</div>
        <div className="badge badge-articles">United Nations</div>
        <div className="badge badge-articles">2020 Elections</div>
        <div className="badge badge-articles">Global Warming</div>
        <div className="badge badge-articles">Flint Michigan</div>
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
    freeMode: true,
    slidesPerView: 4,
    slidesPerGroup: 4,
    // containerClass: 'swiper-container-1'
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
      <div className="issue-development issues-page">
        
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

      {/* <div className="swiper-container">  */}

        {/* <div onClick={goPrev} className="swiper-button-prev">A</div>
        <div onClick={goNext} className="swiper-button-next">B</div> */}
        
        {/* <Swiper {...params}>   
          {props.issues?.issues.map((issue, i) => (
            <GzyCard
            issue={issue}
            podcast={true}
            podcastDay=""
            podcastLink=""
            topText="Rising Cost"
            dateType={props.site?.dateType}
            // midText={issue?.news_title}
            bottomText="The Unspoken Issues"
            backgroundImage={issue.hero_url}
            />
          ))}  
          
        </Swiper> */}

      {/* </div> */}

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

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      search: ''
    }
  }

  componentDidMount() {
    console.log("Mounted");
  }

  onChange = event => {
    console.log("Fired")
    this.setState({ [event.target.name]: event.target.value });
  };

  render() {
    const settings = {
      arrows: true,
      dots: true,
      infinite: true,
      speed: 500,
      slidesToShow: 4,
      slidesToScroll: 4
    };
    
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
                <div className="dot"></div>
                <div className="dot"></div>
                <div className="dot"></div>
              </div>
            </div>

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

            {/* <Link onClick={() => (window.scrollTo(0, 0))} to={ROUTES.NEWS}>
              <div className={"link " + (this.props.location.pathname === "/news/coronavirus" ? 'active' : null)}>
                <i class="fas fa-lungs-virus"></i>
                <div className="text">Black Lives Matter</div>
              </div>
            </Link> */}

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

            {this.props.location.pathname === "/news" ?
            <SearchHead userSubscriptions={this.props.site?.userSubscriptions} onChange={this.onChange} searchText={this.state.search} pathname={this.props.location.pathname}></SearchHead>
            :
            null
            }
            
  
            <div className="row mb-4 justify-content-between">
  
              {/* Left Side */}
              <div className="col-12 col-md-8 pr-md-0">

                <Switch>
                  {/* <Route exact path={ROUTES.NEWS} render={() => <h1>Front</h1>}/> */}
                  <Route exact path={ROUTES.NEWS} render={() => <JustFrontpage stories={this.props.stories} issues={this.props.issues} myths={this.props.myths}></JustFrontpage>}/>
                  <Route exact path={ROUTES.STORIES} render={() => <Stories searchText={this.state.search}></Stories>}/>
                  <Route exact path={ROUTES.ISSUES} render={() => <Issues searchText={this.state.search}></Issues> }/>
                  <Route exact path={ROUTES.MYTHS} render={() => <Myths searchText={this.state.search}></Myths> }/>
                </Switch>
  
              </div>
  
              {/* Right Side */}
              <div className="col-12 col-md-4 pl-md-0">
  
                <div className="side-panel">

                  {this.props.location.pathname === "/news" ?
                  null
                  :
                  <SearchHead userSubscriptions={this.props.site?.userSubscriptions} onChange={this.onChange} searchText={this.state.search} pathname={this.props.location.pathname}></SearchHead>
                  }
  
                  <div className="the-recap">
    
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
    
                  <div className="weather-panel">
          
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
  site: state.site
});

export default connect(
  mapStateToProps
)(Frontpage);