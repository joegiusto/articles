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

class Story extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

  }

  componentDidMount() {
    this.setState({ loading: true });

    this.getNews();
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
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        editLoading: false
      });
    });
    
  }

  render() {

    return (
        <div className="stories-page">

            <div className="stories-page-new">

                <div className="card story-card rounded-0 py-5">

                    <div className="watermarks">
                        <div className="watermark news">News</div>
                        <div className="watermark stories">Stories</div>
                    </div>
                    
                    <h2 className="text-center">{this.state.news_title}</h2>
                    <h4 className="text-center text-muted mb-3">600 Billion!</h4>

                    <div className="dates d-flex justify-content-center mb-3">
                        <div className="date">Published: {moment(this.state.news_date).format("LLL")}</div>
                        <div className="mx-2"> - </div>
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

                </div>

                <div className="display-wrap">
                    <Ad 
                        ad_id='5fc1c7bb7915f34418d18b7b'
                    />
                    <Ad 
                        ad_id='5fc1cfa47915f34418d18b7d'
                    />
                    <Ad 
                        ad_id='5fc218b97915f34418d18b7e'
                    />
                </div>

            </div>

            {this.state.loading ?

            <div className="loading-page">
                <img src={loadingGif} alt="Loading Icon"/>
                <div className="alert alert-warning">Loading Story</div>
                <small>{this.props.match.params.id}</small>
            </div>

            :

            <div className="container story-container">

                <div style={{background: 'linear-gradient(45deg, #ffb7b7, #f9edcd 80%)'}} className={"mb-3 border border-dark p-2 " + (this.props.user?.roles?.isWriter ? 'd-inline-block' : 'd-none')}>
                <Link to={`${ROUTES.ADMIN_NEWS}/${this.state._id}?writerFromDocument=true`}><button className="btn btn-articles-light border border-dark" onClick={() => ''}>Edit Story</button></Link>
                <small className="d-block">You are seeing this because you are a writer</small>
                </div>

                <div className="top-bar">

                <div className="breadcrumbs">
                    <Link to={ROUTES.NEWS}>News</Link>
                    <i className="fas fa-arrow-alt-circle-right mr-0"></i>
                    <Link to={ROUTES.STORIES}>Stories</Link>
                </div>
                </div>

                <div className="content">

                <div className="main-panel">

                    <div className="dates">
                    <div className="date">Published: {moment(this.state.news_date).format("LLL")}</div>
                    <div className="date">Updated: {moment(this.state.last_update).format("LLL")}</div>
                    </div>

                    <div className="tags">
                    {this.state.news_tags?.length > 0 ?
                    this.state.news_tags?.map(tag => 
                        <div className="tag badge badge-dark">
                        {tag.tag_name}
                        </div>  
                    )
                    :
                    <div className="tag badge badge-light border border-dark">No Tags</div>
                    }
                    </div>

                    <div className="title">
                    {this.state.news_title}
                    </div>

                    <div className="head-img">
                    <img src={this.state.hero_url} alt=""/>
                    </div>

                    <div className="authors-container">
                    <div className="authors-title">Author{this.state.authors?.length > 1 ? 's' : ''}</div>
        
                    <div className="authors">
                        {this.state.authors?.length === 0 || this.state.authors?.length === undefined ?
        
                        <div>No Author</div>
        
                        :
        
                        this.state.authors?.map(author => 
                        <div className="author">
                        <Link to={ROUTES.EMPLOYEES + `/${author}`}><img src={`https://articles-website.s3.amazonaws.com/profile_photos/${author}.jpg`} alt=""/></Link>
                        <Link to={ROUTES.EMPLOYEES + `/${author}`}><div className="name">Joey Giusto</div></Link>
                        </div>
                        )
        
                        }
                    </div>
                    </div>

                    <div className="document-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes}}></div>

                </div>

                <div className="side-panel">
                    <Ad/>
                </div>

                </div>

            </div>

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