import React, { Component, useState } from 'react';

import Link from 'next/link'
import { useRouter } from 'next/router'

import moment from 'moment'

import ROUTES from '../constants/routes';

function NewsHead(props) {
    const router = useRouter()

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
  
    const isHome = router.pathname === "/news"
  
    let activePage = {
  
    }
  
    switch(router.pathname) {
      case "/news":
        // code block
        break;
      case "/news/stories":
        activePage = {
          title: "Stories",
          desc: "Everyday news from around the country."
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
  
    return (
        <div className={"news-head-new " + (isHome ? 'home' : 'focus')}>

            <img src={searchBackgrounds[backgroundIndex]} alt=""/>

            <div className="background-gradient"></div>

            <div className="search-container">

                <h2 className="title">Search</h2>

                <div className="input-group w-100 justify-content-lg-center">

                <input type="text" id='search' name='search' value={props.search} onChange={props.onChange} className="form-control" placeholder="Try 'Edward Snowden'" aria-label="" aria-describedby="button-addon2"/>

                <div className="input-group-append">
                    <button onClick={() => props.history.push(`${ROUTES.NEWS_SEARCH}?search=${encodeURI(props.search)}`)} className="btn btn-articles-light" type="button" id="">
                    <i className="fas fa-search mr-0"></i>
                    </button>
                </div>

                </div>

                <div className="modal-items">

                <Link href={ROUTES.NEWS_LOCAL}>
                    <div className="item text-white">
                    <i className="icon fas fa-street-view mr-0" aria-hidden="true"></i>
                    <div>Local</div>
                    </div>
                </Link>

                {/* <div className="item text-white">
                    <i className="icon fas fa-temperature-low mr-0" aria-hidden="true"></i>
                    <div>Weather</div>
                </div> */}

                <Link href={ROUTES.NEWS_STOCKS}>
                    <div className="item text-white">
                    <i className="icon fas fa-chart-line mr-0" aria-hidden="true"></i>
                    <div>Stocks</div>
                    </div>
                </Link>

                <Link href={ROUTES.NEWS_CRYPTO}>
                    <div className="item text-white">
                    <i className="icon fab fa-bitcoin mr-0" aria-hidden="true"></i>
                    <div>Crypto</div>
                    </div>
                </Link>

                <Link href={ROUTES.RESOURCES}>
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
    )
}

export default NewsHead