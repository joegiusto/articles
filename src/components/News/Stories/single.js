import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Ad from './Ad'
import { ReactComponent as IconComments } from '../../FontAwesome/duotone/comments.svg';

import loadingGif from '../../../assets/img/News/loading.gif'
import * as ROUTES from '../../../constants/routes'

import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

class Story extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      relatedContent: [],
      relatedContentLoading: false,
      news_tags: [],
      active_related_content_tag: '',
    };

  }

  componentDidMount() {
    this.setState({ loading: true });

    this.getNews();

    this.loadRelatedContent({tag_name: 'Elon Musk'});
  }

  loadRelatedContent(tag) {
    const self = this;
    console.log("Related content loading")
    self.setState({relatedContentLoading: true})

    axios.post('/api/getNewsByTag', {
      tag: tag?.tag_name
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        relatedContent: response.data.tags,
        relatedContentLoading: false,
        relatedContentIndex: 0
      })
    })
    .catch(function (error) {
      console.log(error.response);
    }); 
  }

  getNews() {
    const self = this;

    axios.post('/api/getNewsDocument', {
      news_url: this.props.match.params.id
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        ...response.data.document,
        loading: false
      }, () => {
          self.setState({
              active_related_content_tag: self.state.news_tags[0].tag_name
          })
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        editLoading: false
      });
    });
    
  }

    renderRoute(type) {
        switch(type) {
        case 'story':
            return (
            ROUTES.STORIES
            )
        case 'issue':
            return (
            ROUTES.ISSUES
            )
        case 'myth':
            return (
            ROUTES.MYTHS
            )
        default:
            return (
            "...uh oh"
            )
        }
    }

  render() {

    const swiper_settings = {
        spaceBetween: 10,
        slidesPerView: 1,
        // slidesPerGroup: 1,
        // navigation: true,
        scrollbar: { draggable: true },
        navigation: {
          nextEl: '.fa-forward',
          prevEl: '.fa-backward',
        }
    }

    return (
        <div className="stories-page">

            <div className="stories-page-new">

                <div className="card story-card rounded-0">

                    <div className="breadcrumb-header mb-3">

                        <div className="watermarks">
                            <div className="watermark news">News</div>
                            <div className="watermark stories">Stories</div>
                        </div>

                        <div style={{background: ''}} className={"edit-story-button " + (this.props.user?.roles?.isWriter ? 'd-inline-block' : 'd-none')}>

                            <Link 
                                to={`${ROUTES.ADMIN_NEWS}/${this.state._id}?writerFromDocument=true`}
                                // className="btn btn-articles-light"
                            >
                                <span className="badge badge-warning"><i className="fas fa-star mr-1" aria-hidden="true"></i>Edit Story</span>
                            </Link>

                            {/* <small className="d-block">You are seeing this because you are a writer</small> */}
                        </div>

                    </div>
                    
                    <h2 className="text-center">{this.state.news_title}</h2>
                    <h4 className="text-center text-muted mb-3">600 Billion!</h4>

                    <div className="dates d-flex flex-column flex-lg-row align-items-center justify-content-center mb-3">
                        <div className="date">Published: {moment(this.state.news_date).format("LLL")}</div>
                        <div className="mx-2 d-none d-lg-block"> - </div>
                        <div className="date">Updated: {moment(this.state.last_update).format("LLL")}</div>
                    </div>

                    <div className="icon-tiles d-flex justify-content-center mb-3">

                        {this.state.authors?.length === 0 || this.state.authors?.length === undefined ?

                            <div className="tile">No Author</div>
                            :
                            this.state.authors?.map(author => 
                                <div className="tile">
                                    <Link to={ROUTES.TRANSPARENCY_EMPLOYEES + `/${author}`}><img className="mr-2" style={{width: '20px', height: '20px'}} src={`https://articles-website.s3.amazonaws.com/profile_photos/${author}.jpg`} alt=""/></Link>
                                    <Link to={ROUTES.TRANSPARENCY_EMPLOYEES + `/${author}`}><div className="name">Joey Giusto</div></Link>
                                </div>
                            )

                        }

                        {/* <div className="tile">
                            <div className="bg-danger mr-2" style={{width: '20px', height: '20px'}}></div>
                            Joey Giusto
                        </div> */}

                        <div className="tile">
                            <IconComments className="icon"/>
                            Comments
                        </div>

                    </div>

                    <img className="hero-image w-100 img-fluid" src={this.state.hero_url} alt=""/>

                    <div className="container document-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes}}></div>

                    <div id="comments">
                        Comments
                    </div>

                </div>

                <div className="display-wrap">

                    <button className="share-button btn btn-articles-light w-100">Share</button>

                    <Ad ad_id='5fc1c7bb7915f34418d18b7b'/>

                    <div className="card related-tags-card">
                        <div className="title"><i className="fas fa-tags"></i>Related Tags</div>
                        <div className="related-wrap">

                            {/* <h5 className="title">Related Content</h5> */}
                            
                            <div className="tags">
                                {this.state.news_tags.length > 0 ?
                                this.state.news_tags.map((tag) => 
                                <div onClick={() => this.setState({active_related_content_tag: tag.tag_name})} className={`tag badge ${this.state.active_related_content_tag === tag.tag_name ? 'badge-dark' : 'badge-light'}`}>{tag.tag_name}</div>
                                )
                                :
                                <div className="badge badge-light">No Tags</div>
                                }
                            </div>

                            {this.state.relatedContentLoading ? 
                            <div className="p-3 text-center">Loading</div>
                            :
                            this.state.relatedContent.length === 0 ?
                                <div>No related content</div>
                
                                :
                
                            <Swiper 
                                className="related-cards"
                                {...swiper_settings}
                                onSlideChange={(swiper) => this.setState({relatedContentIndex: swiper.activeIndex })}
                            >
                
                                <i className="fas fa-backward"></i>
                                <i className="fas fa-forward"></i>
                
                                {this.state.relatedContent.map( (proposal) => 
                                    <SwiperSlide>
                                        <Link to={`${this.renderRoute(proposal.news_type)}/${proposal.url}`}>
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

                            {this.state.relatedContent.length === 0 ?
                            null:
                            <div className="count">{this.state.relatedContentIndex + 1}/{this.state.relatedContent.length}</div>
                            }
                        
                        </div>
                    </div>

                    <Ad ad_id='5fc1cfa47915f34418d18b7d'/>

                    {/* <Ad ad_id='5fc218b97915f34418d18b7e'/> */}

                </div>

            </div>

            {this.state.loading ?

            <div className="loading-page">
                <img src={loadingGif} alt="Loading Icon"/>
                <div className="alert alert-warning">Loading Story</div>
                <small>{this.props.match.params.id}</small>
            </div>

            :

            null
            // <div className="container story-container">

            //     <div style={{background: 'linear-gradient(45deg, #ffb7b7, #f9edcd 80%)'}} className={"mb-3 border border-dark p-2 " + (this.props.user?.roles?.isWriter ? 'd-inline-block' : 'd-none')}>
            //     <Link to={`${ROUTES.ADMIN_NEWS}/${this.state._id}?writerFromDocument=true`}><button className="btn btn-articles-light border border-dark" onClick={() => ''}>Edit Story</button></Link>
            //     <small className="d-block">You are seeing this because you are a writer</small>
            //     </div>

            //     <div className="top-bar">

            //     <div className="breadcrumbs">
            //         <Link to={ROUTES.NEWS}>News</Link>
            //         <i className="fas fa-arrow-alt-circle-right mr-0"></i>
            //         <Link to={ROUTES.STORIES}>Stories</Link>
            //     </div>
            //     </div>

            //     <div className="content">

            //     <div className="main-panel">

            //         <div className="dates">
            //         <div className="date">Published: {moment(this.state.news_date).format("LLL")}</div>
            //         <div className="date">Updated: {moment(this.state.last_update).format("LLL")}</div>
            //         </div>

            //         <div className="tags">
            //         {this.state.news_tags?.length > 0 ?
            //         this.state.news_tags?.map(tag => 
            //             <div className="tag badge badge-dark">
            //             {tag.tag_name}
            //             </div>  
            //         )
            //         :
            //         <div className="tag badge badge-light border border-dark">No Tags</div>
            //         }
            //         </div>

            //         <div className="title">
            //         {this.state.news_title}
            //         </div>

            //         <div className="head-img">
            //         <img src={this.state.hero_url} alt=""/>
            //         </div>

            //         <div className="authors-container">
            //         <div className="authors-title">Author{this.state.authors?.length > 1 ? 's' : ''}</div>
        
            //         <div className="authors">
            //             {this.state.authors?.length === 0 || this.state.authors?.length === undefined ?
        
            //             <div>No Author</div>
        
            //             :
        
            //             this.state.authors?.map(author => 
            //             <div className="author">
            //             <Link to={ROUTES.EMPLOYEES + `/${author}`}><img src={`https://articles-website.s3.amazonaws.com/profile_photos/${author}.jpg`} alt=""/></Link>
            //             <Link to={ROUTES.EMPLOYEES + `/${author}`}><div className="name">Joey Giusto</div></Link>
            //             </div>
            //             )
        
            //             }
            //         </div>
            //         </div>

            //         <div className="document-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes}}></div>

            //     </div>

            //     <div className="side-panel">
            //         <Ad/>
            //     </div>

            //     </div>

            // </div>

            }
        </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  stories: state.stories,
  myths: state.myths,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(withRouter(Story));