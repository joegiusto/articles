import React from 'react';
import axios from 'axios'
import { withRouter, Link } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment'

import { updateSubscriptionToIssue } from '../../../actions/siteActions'
import * as ROUTES from '../../../constants/routes'

class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      issues: [],
      news_tags: []
    };

  }

  componentDidMount() {
    const self = this;
    this.setState({ loading: true });

    const stored = this.props.issues.issues?.find(x => x.url === this.props.match.params.id)

    // Swap the comments to reactivate pulling from local cache
    // TODO - For this to work we would need to update the local cached issues 
    // if (stored !== undefined) {
    if (stored === "Won't be") {

      // Try to pull from local storage and if not there then do server call
      self.setState({
        ...stored,
        loading: false
      }, (() => {
        self.loadLastRead();
      }));

    } else {
      // Was not local, we make a server call!
      axios.post('/api/getNewsDocument', {
        news_url: this.props.match.params.id
      })
      .then(function (response) {
        console.log(response);

        self.setState({
          ...response.data.document,
          loading: false
        }, (() => {
          self.loadLastRead();
        }));

      })
      .catch(function (error) {
        console.log(error);

        self.setState({
          editLoading: false
        });
      });
    }

  }

  loadLastRead() {
    const self = this;

    // Set the date that the user was last lookign at this story
    if ( this.props.user._id ) {
      console.log("Is a user")

      console.log(this.props.user?.subscriptions)
      console.log(this.state._id)

      const lastDate = this.props.user?.subscriptions.find(x => x.news_id === this.state._id)

      // console.log(lastDate)

      this.setState({
        lastRead: lastDate?.lastRead
      })

      axios.post('/api/updateLastRead', {
        news_id: this.state._id,
        user: this.props.user._id
      })
      .then(function (response) {

        console.log(response);

        if (response.data !== "Was not subscribed to issues") {
          self.props.updateSubscriptionToIssue({
            news_id: self.state._id,
            // lastRead: moment('July 30 2020')
          })
        }

      })
      .catch(function (error) {

        console.log(error);

      });

      // if ( moment(this.state.lastRead).isBefore( moment(this.state.last_update) ) ) {
        
        // console.log("Needs updating client side")

      
      // }

    } 
  }

  render() {

    const {loading, news_notes, lastRead, hero_url} = this.state;

    // news_notes.replace(/(\r\n|\n|\r)/gm, "")

    return (
      <div className="issues-page">
        {loading ?
        <div className="alert alert-danger">Loading Issue - {this.props.match.params.id}</div>
        :
        <div className="single">

          <div className="header">

            <div className="container">

              <div className="info">
  
                <div className="issues-breadcrumb">
                  <Link to={ROUTES.NEWS}><span>News</span></Link>
                  <span className="px-1">/</span>
                  <Link to={ROUTES.ISSUES}><span>Issues</span></Link>
                </div>
  
                <h5 className="title">{this.state.news_title}</h5>
  
                <div className="details">
  
                  <Link to={ROUTES.EMPLOYEES + '/5e90cc96579a17440c5d7d52'}><img src="https://articles-website.s3.amazonaws.com/profile_photos/5e90cc96579a17440c5d7d52.jpg" alt=""/></Link>
  
                  <div className="author">
                    <div className="label">Author</div>
                    <Link to={ROUTES.EMPLOYEES + '/5e90cc96579a17440c5d7d52'}><div>Joey Giusto</div></Link>
                  </div>
  
                  <div className="published">
                    <div className="label">Published</div>
                    <div className="date">{moment(this.state.news_date).format("LL")}</div>
                  </div>
  
                  <div className="updated">
                    <div className="label">Updated</div>
                    <div className="date">{moment(this.state.last_update).format("LL")}</div>
                  </div>
                </div>

                <div className="subscribe">
                  
                </div>

                <div className="last-viewed-tag-wrap-container">

                  <div className="last-viewed">
                    <small className="pl-0 d-block">Last Viewed:</small>
                    <div className="date">
                      {lastRead !== undefined ? moment(lastRead).format("LLL") : 'Never' }
                    </div>
                  </div>
    
                  <div className="tags-wrap">
                    <small className="pl-0 d-block">Tags:</small>
                    <div className="tags">
                      {this.state.news_tags.length > 0 ? 
                        this.state.news_tags?.map((tag, i) => (
                          <span className={"badge badge-articles " + (i === 0 ? '' : 'ml-1')}>{tag.tag_name}</span>
                        ))
                      :
                        <div className="badge badge-light ml-1">None</div>
                      }
                    </div>
                  </div>

                </div>
  
              </div>
  
              <img className="hero" src={hero_url} alt=""/>

            </div>
            
          </div>

          <div className="divider">

          </div>

          <div className="container">
            <div className="content ">
  
              <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: news_notes}}></div>
  
              <div className="ads">

                <div className="ad-wrap">
                  <div className="ad">
                    <img src="https://media-cdn.tripadvisor.com/media/photo-s/0c/8b/a7/c7/photo0jpg.jpg" alt=""/>
                    <button className="btn btn-sm btn-why">Why<i class="far fa-question-circle mr-0 ml-0"></i></button>
                  </div>
                  <div className="details">
                    <div className="label">
                      <span>Advertisement</span>

                    </div>
                    <div className="text">Come check out the many activities Beacon has to offer and enjoy a drink at Bank Square Coffeehouse!</div>
                  </div>
                </div>

                <div className="ad-wrap">
                  <div className="ad microsoft">
                    <img src="https://res.cloudinary.com/css-tricks/image/fetch/w_250,q_auto,f_auto/https://cdn4.buysellads.net/uu/1/63492/1593196185-Microsoft-logo_rgb_c-wht-250x100.png" alt="Ad for Microsoft"/>
                    <button className="btn btn-sm btn-why">Why<i class="far fa-question-circle mr-0 ml-0"></i></button>
                  </div>
                  <div className="details">
                    <div className="label">
                      <span>Advertisement</span>

                    </div>
                    <div className="text">Build and develop apps with Azure. Free until you say otherwise.</div>
                  </div>
                </div>

              </div>
  
            </div>
          </div>

          {/* <div className="link badge badge-dark w-100 py-2 mb-3" onClick={() => this.props.history.goBack()}>{String.fromCharCode(11148)} Back to Issues</div> */}

          <div className="back-button" onClick={() => this.props.history.goBack()}>
            <i className="far fa-caret-square-left"></i>
            <i className="far fa-caret-square-left stacked"></i>
            <div className="text">Back to Issues</div>
          </div>

          <div className="card ">

            <div className="card-header">

              <h1>{this.state.news_title}</h1>

              {/* <small className="d-block">Issue Stats</small> */}
              {<div className="stat">Last Viewed: {lastRead !== undefined ? moment(lastRead).format("LLL") : 'Never' }</div> }
              <div className="stat">People Subscribed: 1</div>
              
              <div className="dates">
                <div className="badge badge-articles">First Published: {moment(this.state.news_date).format("LL")}</div>
                <div className="badge badge-dark ml-1">Last Updated: {moment(this.state.last_update).format("LLL")}</div>
              </div>
              
            </div>

            <div className="card-tags">
              <small className="pl-4">Tags:</small>
              {this.state.news_tags.length > 0 ? 
                this.state.news_tags?.map((tag) => (
                  <div className="badge badge-light ml-1">{tag.tag_name}</div>
                ))
              :
                <div className="badge badge-light ml-1">None</div>
              }
            </div>

            <div className="card-body">

              {/* <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: news_notes?.replace('<break>', '<div className="alert alert-danger my-3">Testing Break</div>').replace(/(\r\n|\n|\r)/gm, "")}}></div> */}
              <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: news_notes}}></div>

              <h5 className="mt-4">Related Proposals</h5>
              <div className="proposals">
                <div className="proposal"></div>
                <div className="proposal"></div>
                <div className="proposal"></div>
              </div>

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
  issues: state.issues,
  myths: state.myths,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateSubscriptionToIssue }
)(withRouter(Issue));