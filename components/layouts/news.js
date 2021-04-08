import React, { useState, useEffect } from 'react';
import Link from 'next/link'
import { useRouter } from 'next/router'
import GoogleMapReact from 'google-map-react';
import Chart from 'chart.js';
import { Swiper, SwiperSlide } from 'swiper/react';

import ROUTES from '../../components/constants/routes';

function StoreLayout({ children }) {
// const StoreLayout = ({ children }) => (
    const router = useRouter()
    const [trending, setTrending] = useState([
        {
            // Tesla Factory Austin
            lat: 30.267153,
            lng: -97.743057,
            title: 'Tesla will build its next Gigafactory near Austin, Texas',
            text: 'Austin, TX',
            url: `${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`
        },
        {
            // Meet Cybertruck
            lat: 33.921425,
            lng: -118.329995,
            title: 'Meet Cybertruck',
            text: 'Tesla Design Center',
            url: `${ROUTES.STORIES}/meet-cybertruck`
        },
        {
            // Jeffery Epstein Arrested
            lat: 40.654098,
            lng: -74.013238,
            title: 'Jeffery Epstein Arrested',
            text: 'Metropolitan Correctional Center',
            url: ''
        },
    ])
    const [activeTrendingSlide, setActiveTrendingSlide] = useState(0)
    const { param } = router.query

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
            //   this.setState({trending: {...this.state.trending, slide: swiper.realIndex}})
            setActiveTrendingSlide(swiper.realIndex)
        },
        onSwiper: (swiper) => console.log(swiper),
    }

    useEffect(() => {
        console.log("News layout")
	}, []);

    return (

    <section className="news-page">

        <div className="side-bar card noselect">

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
                        lat={trending[activeTrendingSlide]?.lat} 
                        lng={trending[activeTrendingSlide]?.lng}
                        text={trending[activeTrendingSlide]?.text}
                    />

                </div>

                <div className="expand-bar">
                    <span className="text">Expand Map</span><i class="far fa-expand-wide ml-2"></i> 
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

                    {trending.map( item =>
                        <SwiperSlide>
                            <Link href={item.url}>
                                <div className="trending-card">
                                <div className="type story">Story</div>
                                {/* <Link to={`${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`}> */}
                                <div className="view btn btn-articles-light btn-sm">Read</div>
                                {/* </Link> */}
                                {item.title}
                                <div className="progress"></div>
                                </div>
                            </Link>
                        </SwiperSlide>
                    )}

                    <SwiperSlide>
                        <Link href={`${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`}>
                            <div className="trending-card">
                            <div className="type story">Story</div>
                            {/* <Link to={`${ROUTES.STORIES}/tesla-new-gigafactory-austin-texas`}> */}
                            <div className="view btn btn-articles-light btn-sm">Read</div>
                            {/* </Link> */}
                            Tesla will build its next Gigafactory near Austin, Texas
                            <div className="progress"></div>
                            </div>
                        </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                    <Link href={`${ROUTES.STORIES}/meet-cybertruck`}>
                        <div className="trending-card">
                        <div className="type story">Story</div>
                        {/* <Link to={`${ROUTES.STORIES}/meet-cybertruck`}> */}
                        <div className="view btn btn-articles-light btn-sm">Read</div>
                        {/* </Link> */}
                        Meet Cybertruck
                        <div className="progress"></div>
                        </div>
                    </Link>
                    </SwiperSlide>

                    <SwiperSlide>
                    <Link href={`${ROUTES.STORIES}/meet-cybertruck`}>
                        <div className="trending-card">
                        <div className="type story">Story</div>
                        {/* <Link to={`${ROUTES.STORIES}/jeffery-epstein-arrested`}> */}
                        <div className="view btn btn-articles-light btn-sm">Read</div>
                        {/* </Link> */}
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

                    <Link href={ROUTES.NEWS}>
                        <a>
                            <div className={"link frontpage " + (router.asPath === "/news" ? 'active' : null)}>
                                <i className="fas fa-newspaper"></i>
                                <div className="text">Frontpage</div>
                            </div>
                        </a>
                    </Link>

                    <Link href={ROUTES.STORIES}>
                        <a>
                            <div className={"link stories " + (router.asPath === "/news/stories" ? 'active' : null)}>
                                <i className="fas fa-bullhorn"></i>
                                <div className="text">Stories</div>
                            </div>
                        </a>
                    </Link>

                    <Link href={ROUTES.ISSUES}>
                        <a>
                            <div className={"link issues " + (router.asPath === "/news/issues" ? 'active' : null)}>
                                <i className="fas fa-balance-scale"></i>
                                <div className="text">Issues</div>
                            </div>
                        </a>
                    </Link>
                    
                    <Link href={ROUTES.MYTHS}>
                        <a>
                            <div className={"link myths " + (router.asPath === "/news/myths" ? 'active' : null)}>
                                <i className="fas fa-ghost"></i>
                                <div className="text">Myths</div>
                            </div>
                        </a>
                    </Link>

                    <Link href={ROUTES.NEWS_LOCAL}>
                        <a>
                            <div className={"link frontpage " + (router.asPath === "/news/local" ? 'active' : null)}>
                                <i className="fas fa-school"></i>
                                <div className="text">Local</div>
                            </div>
                        </a>
                    </Link>

                    <Link href={ROUTES.RESOURCES}>
                        <a>
                            <div className={"link frontpage " + (router.asPath === "/news/resources" ? 'active' : null)}>
                                {/* <i className="fas fa-ghost"></i> */}
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="books" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 576 512" className="svg-inline--fa fa-books fa-w-16 fa-fw mr-2"><path fill="currentColor" d="M575.11 443.25L461.51 19.06C458.2 6.7 445.61-3.18 430.15.96L414.7 5.1c-6.18 1.66-11.53 6.4-16.06 14.24-14.03 6.94-52.3 17.21-68 18.22-7.84-4.53-14.85-5.96-21.03-4.3l-15.46 4.14c-2.42.65-4.2 1.95-6.15 3.08V32c0-17.67-14.33-32-32-32h-64c-17.67 0-32 14.33-32 32v64h128l101.66 396.94c3.31 12.36 15.9 22.24 31.36 18.1l15.45-4.14c6.18-1.66 11.53-6.4 16.06-14.24 13.91-6.88 52.18-17.2 68-18.22 7.84 4.53 14.85 5.96 21.03 4.3l15.46-4.14c15.45-4.14 21.41-18.99 18.09-31.35zm-134.4-7.06L348.64 92.37l61.82-16.56 92.07 343.82-61.82 16.56zM0 384h128V128H0v256zM96 0H32C14.33 0 0 14.33 0 32v64h128V32c0-17.67-14.33-32-32-32zM0 480c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H0v64zm160-96h128V128H160v256zm0 96c0 17.67 14.33 32 32 32h64c17.67 0 32-14.33 32-32v-64H160v64z" className=""></path></svg>
                                <div className="text">Resources</div>
                            </div>
                        </a>
                    </Link>

                    <Link href={ROUTES.NEWS_STOCKS}>
                        <a>
                            <div className={"link frontpage " + (router.asPath === "/news/stocks" ? 'active' : null)}>
                                {/* <i className="fas fa-ghost"></i> */}
                                <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="chart-area" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" className="svg-inline--fa fa-chart-area fa-w-16 fa-fw mr-2"><path fill="currentColor" d="M500 384c6.6 0 12 5.4 12 12v40c0 6.6-5.4 12-12 12H12c-6.6 0-12-5.4-12-12V76c0-6.6 5.4-12 12-12h40c6.6 0 12 5.4 12 12v308h436zM372.7 159.5L288 216l-85.3-113.7c-5.1-6.8-15.5-6.3-19.9 1L96 248v104h384l-89.9-187.8c-3.2-6.5-11.4-8.7-17.4-4.7z" className=""></path></svg>
                                <div className="text">Stocks</div>
                            </div>
                        </a>
                    </Link>

                    <Link href={ROUTES.NEWS_CRYPTO}>
                        <a>
                            <div className={"link crypto " + (router.asPath === "/news/crypto" ? 'active' : null)}>
                                {/* <i className="fas fa-ghost"></i> */}
                                <i className="fab fa-bitcoin"></i>
                                <div className="text">Crypto</div>
                            </div>
                        </a>
                    </Link>

                </div>

                </div>

                <div className="grow"></div>

                <div className="feature-links d-none">
                <h5 className="title mt-3">Feature</h5>

                <Link href={`${ROUTES.EXTENDED}'/coronavirus'`}>
                    <a>
                        <div className={"link frontpage " + (router.asPath === "/news/extended/coronavirus" ? 'active' : null)}>
                            <i className="fas fa-lungs-virus"></i>
                            <div className="text">Coronavirus</div>
                        </div>
                    </a>
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

        <div className="main-content-container">
            {children}
        </div>

        {/* <h2 className="bg-primary text-center">News Nav</h2> */}

        {/* <div className="page">{children}</div> */}

    </section>

    )

};

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
  
export default StoreLayout;