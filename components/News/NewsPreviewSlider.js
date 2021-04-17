import React, { Component, useState } from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';

import Link from 'next/link'

import moment from 'moment'

import DropdownButton from 'react-bootstrap/DropdownButton'
import Dropdown from 'react-bootstrap/Dropdown'

import ROUTES from '../constants/routes';

import NewsCard from '../News/NewsCard';

function NewsPreviewSlider(props) {
    return (
        <div className={`news-preview-container ${props.type}`}>
            
            <Swiper
                {...props.swiper_settings}
            >
        
                {/* See slots https://swiperjs.com/react/ */}
                <span slot="container-start">
        
                    <div className="frontpage-section-header">
        
                        <div className="d-flex align-items-center">
        
                            <h2 className="mb-0">Recent {props.type}</h2>
        
                            <Link href={ROUTES.STORIES} >
                                <a className="ml-3 text-muted badge badge-articles">View All <i class="fad fa-chevron-right mr-0"></i></a>
                            </Link>
        
                        </div>
        
                        <div className="d-flex controlss">
        
                            <div className="stories-filters d-flex align-items-center mr-3">
        
                                <DropdownButton variant="articles-light" id="dropdown-basic-button" title={ <span><i className="fas fa-filter"></i> Newest</span> }>
                                    <Dropdown.Item href="#/action-1">Newest</Dropdown.Item>
                                    <Dropdown.Item href="#/action-2">Oldest</Dropdown.Item>
                                </DropdownButton>
        
                            </div>
        
                            <button className="btn btn-articles-light px-4">
                                <i className="fas fa-backward mr-0"></i>
                            </button>
        
                            <button className="btn btn-articles-light px-4">
                                <i className="fas fa-forward mr-0"></i>
                            </button>
        
                        </div>
                        
                        
        
                    </div>
        
                
                </span>
        
                {props.documents.map( (document) => (
                    <SwiperSlide>
                        <NewsCard document={document}/>
                    </SwiperSlide>
                ))}

                <SwiperSlide>
                    <NewsCard viewMoreCard={true} type={props.type} document={{}}/>
                </SwiperSlide>
        
            </Swiper>
        
        </div>
    )
}

export default NewsPreviewSlider

