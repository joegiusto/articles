import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/swiper.scss'
import 'swiper/components/navigation/navigation.scss';
import 'swiper/components/pagination/pagination.scss';
import 'swiper/components/scrollbar/scrollbar.scss';

import * as ROUTES from '../../../constants/routes'

class Myth extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      news_tags: [],
      expandHero: true,
      
      proposals: [],
      proposalsIndex: 0,

      relatedContent: [],
      relatedContentLoading: false,
      relatedContentIndex: 0
    };

  }

  componentDidMount() {
    const self = this;
    this.setState({ loading: true });

    this.loadNewsByUrl(this.props.match.params.id);
  }

  componentWillUnmount() {
    // clearTimeout(this.interval);
  }

  change() {
    this.setState({expandHero: false})
  }

  loadNewsByUrl(url) {
    const self = this;
    this.setState({expandHero: true})

    axios.post('/api/getNewsDocument', {
      news_url: url
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        ...response.data.document,
        loading: false
      }, () => (
        self.loadRelatedContent(self.state.news_tags[0])
      ));
      

      // self.interval = setTimeout(() => self.setState({expandHero: false}), 1000);

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
        relatedContentLoading: false
      })
    })
    .catch(function (error) {
      console.log(error.response);
    }); 
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
      <div className="myths-page">

        <div className="container">

          <div className="myth">

            <div className="breadcrumbs">
              <Link to={ROUTES.NEWS}>News</Link>
              <i className="fas fa-arrow-alt-circle-right mr-0"></i>
              <Link to={ROUTES.MYTHS}>Myths</Link>
            </div>
            
            <img src={this.state.hero_url} alt="" className={"thin-img"}/>

            <div className={"mb-3 border border-dark p-2 " + (this.props.user?.roles?.isWriter ? '' : 'd-none')}>
              <Link to={`${ROUTES.ADMIN_NEWS}/${this.state._id}?writerFromDocument=true`}><button className="btn btn-articles-light" onClick={() => ''}>Edit Myth</button></Link>
              <small className="d-block">You are seeing this because you are a writer</small>
            </div>

            <h3 className="title">{this.state.news_title}</h3>

            <div className="date">
              <div>Published: {moment(this.state.news_date).format("LLL")}</div>
              <div>Last Updated: {moment(this.state.last_update).format("LLL")}</div>
            </div>

            <div style={{marginBottom: '0.5rem'}}>At this time our news content is still in development. We have many placeholders where content will be placed after it is done being written and researched.</div>

            <div className="content-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes}}></div>

          </div>

          <div className="sidebar">
            <button className="btn btn-articles-light w-100">Share</button>

            <div className="related">
              <h5 className="title">Related Content</h5>
              <div className="tags">
                {this.state.news_tags.length > 0 ?
                this.state.news_tags.map((tag) => 
                  <div className="tag badge badge-dark">{tag.tag_name}</div>
                )
                :
                <div className="badge badge-light">No Tags</div>
                }
              </div>

              {this.state.relatedContentLoading ? 
              <div>Loading</div>
              :
              this.state.relatedContent.length === 0 ?
                <div>No related content</div>
 
                :
 
               <Swiper 
                 className="proposals"
                 {...swiper_settings}
                 onSlideChange={(swiper) => this.setState({relatedContentIndex: swiper.activeIndex })}
               >
 
                 <i className="fas fa-backward"></i>
                 <i className="fas fa-forward"></i>
 
                 {this.state.relatedContent.map( (proposal) => 
                   <SwiperSlide>
                     <Link to={`${this.renderRoute(proposal.news_type)}/${proposal.url}`}>
                       <div className="proposal">
                         {proposal.news_title}
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

            <div className="related">
              <h5 className="title">Related Proposals</h5>

              {this.state.proposals.length === 0 ?

                <div>No related proposals</div>

              :

              <Swiper 
              className="proposals"
              {...swiper_settings}
              onSlideChange={(swiper) => this.setState({proposalsIndex: swiper.activeIndex })}
              >

                <i className="fas fa-backward"></i>
                <i className="fas fa-forward"></i>

                {this.state.proposals.map( (proposal) => 
                  <SwiperSlide>
                    <Link to={`${ROUTES.PROPOSALS}/${proposal._id}`}>
                      <div className="proposal">
                        {proposal.title}
                      </div>
                    </Link>
                  </SwiperSlide>
                )}

              </Swiper>

                }

              {this.state.proposals.length === 0 ?
              null:
              <div className="count">{this.state.proposalsIndex + 1}/{this.state.proposals.length}</div>
              }

            </div>
          </div>

        </div>

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
)(withRouter(Myth));