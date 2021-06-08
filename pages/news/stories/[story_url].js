import React, { Component, useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

import StoryAd from '../../../components/Ads/StoryAd'
import ROUTES from '../../../components/constants/routes'

function NewsStory() {
    const router = useRouter()
    const { story_url } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    const [storyLoading, setStoryLoading] = useState(false)
    const [proposalNotFound, setProposalNotFound] = useState(false)
    const [story, setStory] = useState({
        news_tags: []
    })

    const [ relatedContent, setRelatedContent ] = useState( [] )
    const [ active_related_content_tag, setActive_related_content_tag ] = useState( '' )
    const [ relatedContentLoading, setRelatedContentLoading ] = useState( false )

    const [ relatedContentIndex, setRelatedContentIndex ] = useState( 0 )

    useEffect(() => {
        setStoryLoading(true)
	}, []);

    useEffect(()=>{
        if (!router.isReady) return;
    
        // codes using router.query
        loadDocument();
    
    }, [router.isReady]);

    function loadDocument() {
        axios
        .post(`/api/news/stories/${story_url}`)
        .then(res => {
            console.log(res);
            setStory(res.data)
            setStoryLoading(false)
        })
        .catch(err => {
            console.log(err)
            setStoryLoading(false)
            // setProposalNotFound(true)
        }
        );
    }

    if (storyLoading) {
        return 'Loading'
    }
  
    return(
        <section className="story-page stories-page stories-page-new single">

            <Head>
                <title>Story - Articles</title>
            </Head>

            <div className="card story-card rounded-0">

                <div className="breadcrumb-header mb-3">

                    <div className="watermarks">
                        <Link href={`${ROUTES.NEWS}`}><a className="watermark news">News</a></Link>
                        <Link href={`${ROUTES.STORIES}`}><a className="watermark stories">Stories</a></Link>
                    </div>

                    <div style={{background: ''}} className={"edit-story-button " + (userReduxState?.roles?.isWriter ? 'd-inline-block' : 'd-none')}>

                        <Link href={`${ROUTES.ADMIN_NEWS}/${story._id}?writerFromDocument=true`}>
                            <a className="btn btn-articles-light btn-sm"><i className="fas fa-star mr-1" aria-hidden="true"></i>Edit Story</a>
                        </Link>

                    </div>

                </div>

                <h2 className="text-center">{story.news_title}</h2>
                <h4 className="text-center text-muted mb-3">600 Billion!</h4>

                <div className="dates d-flex flex-column flex-lg-row align-items-center justify-content-center mb-3">
                    <div className="date">Published: {moment(story.news_date).format("LLL")}</div>
                    <div className="mx-2 d-none d-lg-block"> - </div>
                    <div className="date">Updated: {moment(story.last_update).format("LLL")}</div>
                </div>

                <div className="icon-tiles d-flex justify-content-center mb-3">

                    {story.authors?.length === 0 || story.authors?.length === undefined ?

                        <div className="tile">No Author</div>
                        :
                        story.authors?.map(author => 
                            <div className="tile">
                                <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${author}`}><img className="mr-2" style={{width: '20px', height: '20px'}} src={`https://articles-website.s3.amazonaws.com/profile_photos/${author}.jpg`} alt=""/></Link>
                                <Link href={ROUTES.TRANSPARENCY_EMPLOYEES + `/${author}`}><div className="name">Joey Giusto</div></Link>
                            </div>
                        )

                    }

                    <div className="tile">
                        <i className="fad fa-comments"></i>
                        Comments
                    </div>

                </div>

                <img className="hero-image w-100 img-fluid" src={story.hero_url} alt=""/>

                <div className="container document-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: story?.news_notes}}></div>

                <div id="comments">
                    Comments
                </div>

            </div>

            <div className="display-wrap">

                <button className="share-button btn btn-articles-light w-100">Share</button>

                <StoryAd ad_id='5fc1c7bb7915f34418d18b7b'/>

                <div className="card related-tags-card">
                    <div className="title"><i className="fas fa-tags"></i>Related Tags</div>
                    <div className="related-wrap">
                        
                        <div className="tags">
                            {story.news_tags.length > 0 ?
                            story.news_tags.map((tag) => 
                            <div onClick={() => setActive_related_content_tag( tag.tag_name )} className={`tag badge ${active_related_content_tag === tag.tag_name ? 'badge-dark' : 'badge-light'}`}>{tag.tag_name}</div>
                            )
                            :
                            <div className="badge badge-light">No Tags</div>
                            }
                        </div>

                        {relatedContentLoading ? 
                        <div className="p-3 text-center">Loading</div>
                        :
                        relatedContent.length === 0 ?
                            <div>No related content</div>

                            :

                        <Swiper 
                            className="related-cards"
                            {...swiper_settings}
                            onSlideChange={(swiper) => this.setState({relatedContentIndex: swiper.activeIndex })}
                        >

                            <i className="fas fa-backward"></i>
                            <i className="fas fa-forward"></i>

                            {relatedContent.map( (proposal) => 
                                <SwiperSlide>
                                    <Link href={`${this.renderRoute(proposal.news_type)}/${proposal.url}`}>
                                    <div className="related-card">
                                        <div className="background">
                                        <img src={proposal.hero_url} alt=""/>
                                        </div>
                                        <div className="title">{proposal.news_title}</div>
                                    </div>
                                    </Link>
                                </SwiperSlide>
                            )}

                        </Swiper>

                        }

                        {relatedContent.length === 0 ?
                        null:
                        <div className="count">{relatedContentIndex + 1}/{relatedContent.length}</div>
                        }
                    
                    </div>
                </div>

                <StoryAd ad_id='5fc1cfa47915f34418d18b7d'/>

                {/* <Ad ad_id='5fc218b97915f34418d18b7e'/> */}

            </div>

        </section>
    )
}

export default NewsStory;