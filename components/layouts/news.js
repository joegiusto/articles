import React, { useState, useEffect } from 'react';

import Link from 'next/link'
import { useRouter } from 'next/router'

import GoogleMapReact from 'google-map-react';
import Chart from 'chart.js';
import { Swiper, SwiperSlide } from 'swiper/react';

import ROUTES from 'components/constants/routes';
import NewsHead from 'components/News/NewsHead';

function NewsLayout({ children }) {
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
    const [ activeTrendingSlide, setActiveTrendingSlide ] = useState(0)
    const [ mapViewVisible, setMapViewVisible ] = useState(false)
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

        return function cleanup () {
            document.body.style.overflow = 'auto';
        }
	}, []);

    useEffect(() => {
        
        if ( mapViewVisible ) {
            console.log("")
            document.body.style.overflow = 'hidden';
            // document.body.style.paddingRight = scrollBarWidth + 'px';
        } else {
            document.body.style.overflow = 'auto';
            // document.body.style.paddingRight = '0px';
        }

	}, [mapViewVisible]);

    return (

    <section className="news-page">

        <div className={`map-view-container ${mapViewVisible}`}>

            <div onClick={ () => setMapViewVisible(false) } className="close-button btn btn-articles-light btn-lg">
                <i className="fad fa-compress-arrows-alt fa-lg mr-0"></i>
            </div>

            <div className="map-wrapper">
                <FullscreenMap/>
            </div>

            <div className="list card rounded-0 py-3">
                {trending.map(item => 

                    <div key={item.title} className="card-body mx-3 p-3 mb-3">
                        <h5>{item.title}</h5>
                        <div>{item.text}</div>
                        <Link href={item.url}>
                            <a className="btn btn-articles-light">Read</a>
                        </Link>
                    </div>

                )}
            </div>

        </div>

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

                {/* <div className="expand-bar">
                    <span className="text">Expand Map</span><i className="far fa-expand-wide ml-2"></i> 
                </div> */}

                <div className="trending-slider">

                    <div onClick={() => setMapViewVisible(true)} className="btn btn-articles-light mt-3">
                        <i className="fad fa-expand-wide"></i> 
                        <span>Launch Map View</span>
                    </div>

                    <h3 className="mt-3">Trending</h3>

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
                            <SwiperSlide key={item.url}>
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
                
                </div>
            </div>

            <div className="menu">

                <div className="discover-links">

                    <h3 className="title">Discover</h3>

                    <div className="links">

                        <Link href={ROUTES.NEWS}>
                            <a>
                                <div className={"link frontpage " + (router.asPath === "/news" ? 'active' : null)}>
                                    <i className="fad fa-newspaper"></i>
                                    <div className="text">Frontpage</div>
                                </div>
                            </a>
                        </Link>

                        <Link href={ROUTES.STORIES}>
                            <a>
                                <div className={"link stories " + (router.asPath === "/news/stories" ? 'active' : null)}>
                                    <i className="fad fa-bullhorn"></i>
                                    <div className="text">Stories</div>
                                </div>
                            </a>
                        </Link>

                        <Link href={ROUTES.ISSUES}>
                            <a>
                                <div className={"link issues " + (router.asPath === "/news/issues" ? 'active' : null)}>
                                    <i className="fad fa-balance-scale"></i>
                                    <div className="text">Issues</div>
                                </div>
                            </a>
                        </Link>
                        
                        <Link href={ROUTES.MYTHS}>
                            <a>
                                <div className={"link myths " + (router.asPath === "/news/myths" ? 'active' : null)}>
                                    <i className="fad fa-ghost"></i>
                                    <div className="text">Myths</div>
                                </div>
                            </a>
                        </Link>

                        <Link href={ROUTES.NEWS_LOCAL}>
                            <a>
                                <div className={"link frontpage " + (router.asPath === "/news/local" ? 'active' : null)}>
                                    <i className="fad fa-street-view"></i>
                                    <div className="text">Local</div>
                                </div>
                            </a>
                        </Link>

                        <Link href={ROUTES.RESOURCES}>
                            <a>
                                <div className={"link frontpage " + (router.asPath === "/news/resources" ? 'active' : null)}>
                                    <i className="fad fa-books"></i>
                                    <div className="text">Resources</div>
                                </div>
                            </a>
                        </Link>

                        <Link href={ROUTES.NEWS_STOCKS}>
                            <a className="d-none">
                                <div className={"link frontpage " + (router.asPath === "/news/stocks" ? 'active' : null)}>
                                    <i className="fad fa-chart-area"></i>
                                    <div className="text">Stocks</div>
                                </div>
                            </a>
                        </Link>

                        <Link href={ROUTES.NEWS_CRYPTO}>
                            <a className="d-none">
                                <div className={"link crypto " + (router.asPath === "/news/crypto" ? 'active' : null)}>
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
            <NewsHead homeLayout={router.pathname == '/news' && true} />
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
                options={{ fullscreenControl: false }}
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

function FullscreenMap() {
    return (
        <GoogleMapReact
            bootstrapURLKeys={{ key: 'AIzaSyAKmyGIU1IJo_54kahuds7huxuoEyZF-68' }}
            center={{lat: 39.00, lng: -95.71}}
            defaultZoom={4}
            options={{ fullscreenControl: false }}
        />
    );
}
  
export default NewsLayout;