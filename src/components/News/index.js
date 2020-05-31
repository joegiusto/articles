import React, { Component, useState } from 'react';
import { connect } from "react-redux";
// import playButtonLight from '../../assets/img/News/yt_logo_mono_light.png'
import playButtonDark from '../../assets/img/News/yt_logo_mono_dark.png'
import moment from 'moment';

import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import IssueDevelopmentCard from './IssueDevelopmentCard'
import StoriesDisplay from './StoriesDisplay'
import MythsDisplay from './MythsDisplay'

import statesImage from '../../assets/img/states.jpg'

import background from '../../assets/img/card-1.png'

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

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

class Frontpage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      // issues: []
    }
  }

  componentDidMount() {
    console.log("Mounted");
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
    
    return(
      <section className="frontpage-section">

        <div className="side-bar noselect">

          <div className="content">

            <img src={statesImage} className="head-image" alt=""/>

            <h5 className="title">Discover</h5>
  
            <div className="link active">
              <i class="fas fa-newspaper"></i>
              <div className="text">Frontpage</div>
            </div>
  
            <div className="link">
              <i class="fas fa-bullhorn"></i>
              <div className="text">Stories</div>
            </div>
  
            <div className="link">
              <i class="fas fa-balance-scale"></i>
              <div className="text">Issues</div>
            </div>
  
            <div className="link">
              <i class="fas fa-ghost"></i>
              <div className="text">Myths</div>
            </div>

          </div>

        </div>

        <div className="content">
          <div className='container-fluid'>

            <div className="top-bar">

              <div className="link active">
                <i class="fas fa-newspaper"></i>
                <div className="text">Frontpage</div>
              </div>

              <div className="link">
                <i class="fas fa-bullhorn"></i>
                <div className="text">Stories</div>
              </div>

              <div className="link">
                <i class="fas fa-balance-scale"></i>
                <div className="text">Issues</div>
              </div>

              <div className="link">
                <i class="fas fa-ghost"></i>
                <div className="text">Myths</div>
              </div>

            </div>

            <div className="frontpage-head">
              <img src={background} alt="" className="background"/>
              <h1 className="title">Search</h1>
              <input type="text" className="form-control"/>
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

            {/* <div className="search">
              <img src={background} alt="" className="background"/>
            </div> */}
  
            <div className="row mb-5 justify-content-between">
  
              {/* Left Side */}
              <div className="col-12 col-md-8 pr-md-0">
  
                <div className="issue-development">
  
                  <div className="d-flex justify-content-between">
                    <span className="title heading-font">Issue Developments</span>
                    {/* <span>Showing 4 out of {this.props.issues.issues.length}</span> */}
                  </div>
  
                  <div className="issue-development-cards">
                    {this.props.issues.issues.map((issue) => (
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
                  <StoriesDisplay stories={this.props.stories.stories}/>
                </div>
  
                <div className="myths">
                  <span className="title heading-font">Myths Collection</span>
                  <MythsDisplay myths={this.props.myths.myths}/>
                </div>
  
              </div>
  
              {/* Right Side */}
              <div className="col-12 col-md-4 pl-md-0">
  
                <div className="side-panel">
  
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
  myths: state.myths
});

export default connect(
  mapStateToProps
)(Frontpage);