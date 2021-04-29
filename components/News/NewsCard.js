import React, { Component, useState } from 'react';

import Link from 'next/link'

import moment from 'moment';

import ROUTES from '../constants/routes';

import { connect } from 'react-redux';
import { removeSubscription, addSubscription } from "../../redux/actions/siteActions";
// import News from '.';

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

        if (this.props.viewMoreCard) {
            return(
                <div className="content viewMore">
                    <button className="btn btn-articles-light btn-lg mb-2">All {this.props.type}</button>
                    <div className="total">{this.props.newsDocumentCount[this.props.type.toLowerCase()]} Total {this.props.type}</div>
                </div>
            )
        }

        return (
            <Link href={this.renderRoute(this.props.document.news_type) + '/' + this.props.document.url}>
                <div className={"content " + (this.props.document.news_type) }>

                <div className="date">{moment(this.props.document.news_date).format("L")}</div>

                {
                    this.props.document.news_type === 'issue'
                    ?
                    <div className={"subscribe-container"}>
                        <div className={"subscribe " + (this.props.isSub ? 'subscribed' : '')}>
                            {this.props.isSub ? 
                            <>
                            <i className="far fa-check-square"></i>
                            <button onClick={(e) => e.preventDefault() + this.props.removeSubscription(this.props.document._id)} className="btn btn-sm btn-articles-light">Subscribed</button>
                            </>
                            :
                            <>
                            <i className="far fa-plus-square"></i>
                            <button onClick={(e) => e.preventDefault() + this.props.addSubscription(this.props.document)} className="btn btn-sm btn-articles-light">Subscribe</button>
                            </>
                            }
                        </div>
                    </div>
                    :
                    null
                }

                {
                    this.props.hasUpdate && this.props.document.news_type === 'issue'
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
                    <div className="news-card-tags">
                    {this.props.document?.news_tags?.length > 0 ?
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

// export default NewsCard;

const mapStateToProps = state => ({
    // auth: state.auth,
    // errors: state.errors,
    // site: state.site
});

export default connect(
    mapStateToProps,
    { removeSubscription, addSubscription }
)(NewsCard);