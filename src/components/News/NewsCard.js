import React, { Component, useState } from 'react';
import moment from 'moment';
import * as ROUTES from '../../constants/routes';
import { Link, Switch, Route } from 'react-router-dom';

class NewsCard extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  componentDidMount() {
    
  }

  renderRoute(type) {
    switch(type) {
      case 'story':
        return ROUTES.STORIES
        // break;
      case 'issue':
        return ROUTES.ISSUES
        // break;
      case 'myth':
        return ROUTES.MYTHS
        // break;
      default:
        // code block
    }
  }

  render() {
    return (
      <Link to={this.renderRoute(this.props.document.news_type) + '/' + this.props.document.url}>
        <div className="content">

          <div className="date">{moment(this.props.document.news_date).format("L")}</div>

          {
            this.props.document.news_type === 'issue'
            ?
            <div className={"subscribe-container"}>
              <div className={"subscribe " + (this.props.isSub ? 'subscribed' : '')}>
                {this.props.isSub ? 
                <>
                <i className="far fa-check-square"></i>
                <button onClick={(e) => {e.preventDefault()}} className="btn btn-sm btn-articles-light">Subscribed</button>
                </>
                :
                <>
                <i className="far fa-plus-square"></i>
                <button onClick={(e) => {e.preventDefault()}} className="btn btn-sm btn-articles-light">Subscribe</button>
                </>
                }
              </div>
            </div>
            :
            null
          }

          {
            this.props.hasUpdate 
            ? 
            <div className="update">
              <i className="fas fa-star"></i>
              <span>Update</span>
            </div>
            :
            null
          }
          
          <div className="title">{this.props.document.news_title}</div>
          <img src={this.props.document.hero_url} alt="" className="background"/>
          <div className="filter"></div>
          <div className="shadow"></div>
          <div className="bar"></div>
          {/* <div className="tags">
            {this.props.document?.news_tags.length > 0 ?
            this.props.document?.news_tags?.map((tag) => 
              <div>{tag.tag_name}</div>
            )
            :
            ''
            }
          </div> */}
          <div className="tagline">
            <div className="tags">
              {this.props.document?.news_tags.length > 0 ?
              this.props.document?.news_tags?.map((tag) => 
                <div className="tag badge badge-light">{tag.tag_name}</div>
              )
              :
              <div className="tag badge badge-light">No Tags</div>
              }
              </div>
            {this.props.document.news_tagline ? 
              this.props.document.news_tagline
              :
              'No Tagline'
            }
          </div>
        </div>
      </Link>
    )
  }
}

export default NewsCard;