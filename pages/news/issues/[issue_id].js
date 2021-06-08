import React, { Component, useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

import TextareaAutosize from 'react-textarea-autosize';

import StoryAd from 'components/Ads/StoryAd'
import ROUTES from 'components/constants/routes'

export default function NewsIssue(props) {
    const router = useRouter()
    const { issue_id } = router.query

    // console.log(router.query)

    const userReduxState = useSelector((state) => state.auth.user_details)

    const [issue, setIssue] = useState({
        news_tags: [],
        authors: [],
        comments: []
    })
    const [issueLoading, setIssueLoading] = useState(true)

    const [proposalNotFound, setProposalNotFound] = useState(false)
    const [proposals, setProposals] = useState([])

    const [commentSort, setCommentSort] = useState('new')
    const [commentView, setCommentView] = useState('normal')
    const [comment, setComment] = useState('')

    const [relatedContent, setRelatedContent] = useState([])
    const [active_related_content_tag, setActive_related_content_tag] = useState('')
    const [relatedContentLoading, setRelatedContentLoading] = useState(false)

    const [relatedContentIndex, setRelatedContentIndex] = useState(0)

    useEffect(() => {
        // setStoryLoading(true)
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        // codes using router.query
        loadDocument();

    }, [router.isReady]);

    function loadDocument() {
        axios
            .post(`/api/news/issues/${issue_id}`)
            .then(res => {
                console.log(res);
                setIssue(res.data)
                setIssueLoading(false)
            })
            .catch(err => {
                console.log(err)
                setIssueLoading(false)
                // setProposalNotFound(true)
            }
            );
    }

    if (issueLoading) {
        return 'Loading'
    }

    return (
        <section className="issues-page">

            <Head>
                <title>Issue - Articles</title>
            </Head>

            <div className="single">

                <div className="header">

                    <div className="container">

                        <div className="info">

                            <div className="issues-breadcrumb">
                                <Link href={ROUTES.NEWS}><a>News</a></Link>
                                <span className="px-1">/</span>
                                <Link href={ROUTES.ISSUES}><a>Issues</a></Link>
                            </div>

                            <h5 className="title">{issue.news_title}</h5>

                            <div className="details">

                                <div className="published">
                                    <div className="label">Published</div>
                                    <div className="date">{moment(issue.news_date).format("LL")}</div>
                                </div>

                                <div className="updated">
                                    <div className="label">Updated</div>
                                    <div className="date">{moment(issue.last_update).format("LL")}</div>
                                </div>
                            </div>

                            {
                                // this.props.user_subscriptions?.filter(sub => sub._id === issue._id).length > 0 ?
                                //     <div className="subscribe">
                                //         <button onClick={() => this.props.removeSubscription(issue._id)} style={{ opacity: '0.5' }} className="btn btn-articles-light">Subscribed</button>
                                //         <small className="d-block">{issue.subCount} others subscribed to this issue</small>
                                //     </div>
                                //     :
                                //     <div className="subscribe">
                                //         <button onClick={() => this.props.addSubscription(issue._id)} className="btn btn-articles-light">Subscribe</button>
                                //         <small className="d-block">Join {issue.subCount} others subscribed to this issue</small>
                                //     </div>
                            }

                            {/* <div className="subscribe">
                                <button className="btn btn-articles-light">Subscribe</button>
                                <small className="d-block">Join 0 others subscribed to this issue</small>
                            </div> */}

                            <div className="authors">

                                <div className="label">Author{issue.authors?.length > 1 ? 's' : ''}</div>

                                {issue.authors?.length === 0 ?

                                    <div>No Author</div>

                                    :

                                    issue.authors?.map(author =>
                                        <div className="author">
                                            <Link href={ROUTES.EMPLOYEES + `/${author}`}>
                                                <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${author}.jpg`} alt="" />
                                            </Link>
                                            <Link href={ROUTES.EMPLOYEES + `/${author}`}>
                                                <div className="name">Joey Giusto</div>
                                            </Link>
                                        </div>
                                    )

                                }

                                {/* <div className="author">
            <Link to={ROUTES.EMPLOYEES + '/5e90cc96579a17440c5d7d52'}><img src="https://articles-website.s3.amazonaws.com/profile_photos/5e90cc96579a17440c5d7d52.jpg" alt=""/></Link>
            <Link to={ROUTES.EMPLOYEES + '/5e90cc96579a17440c5d7d52'}><div className="name">Joey Giusto</div></Link>
          </div> */}

                            </div>

                            <div className="last-viewed-tag-wrap-container">

                                <div className="last-viewed">
                                    <small className="pl-0 d-block">Last Viewed:</small>
                                    <div className="date">
                                        {/* {lastRead !== undefined ? moment(lastRead).format("LLL") : 'Never'} */}
                                    </div>
                                </div>

                                <div className="tags-wrap">
                                    <small className="pl-0 d-block">Tags:</small>
                                    <div className="tags">
                                        {issue.news_tags?.length > 0 ?
                                            issue.news_tags?.map((tag, i) => (
                                                <span className={"badge badge-articles " + (i === 0 ? '' : 'ml-1')}>{tag.tag_name}</span>
                                            ))
                                            :
                                            <div className="badge badge-light ml-1">None</div>
                                        }
                                    </div>
                                </div>

                            </div>

                        </div>

                        <img className="hero" src={issue.hero_url} alt="" />

                    </div>

                </div>

                <div className="divider">

                </div>

                <div className="container">

                    <div className="content ">

                        <div style={{ background: 'linear-gradient(45deg, #ffb7b7, #f9edcd 80%)' }} className={"mb-3 border border-dark p-2 " + (userReduxState.roles?.isWriter ? 'd-inline-block' : 'd-none')}>

                            <Link href={`${ROUTES.ADMIN_NEWS}/${issue._id}`}>
                                <button className="btn btn-articles-light border border-dark" onClick={() => ''}>Edit Issue</button>
                            </Link>

                            <small className="d-block">You are seeing this because you are a writer</small>

                        </div>

                        <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: issue.news_notes }}></div>

                        <div className="ads">

                            <div className="ad-wrap">
                                <div className="ad">
                                    <img src="https://media-cdn.tripadvisor.com/media/photo-s/0c/8b/a7/c7/photo0jpg.jpg" alt="" />
                                    <button className="btn btn-sm btn-why">Why<i className="far fa-question-circle mr-0 ml-0"></i></button>
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
                                    <img src="https://res.cloudinary.com/css-tricks/image/fetch/w_250,q_auto,f_auto/https://cdn4.buysellads.net/uu/1/63492/1593196185-Microsoft-logo_rgb_c-wht-250x100.png" alt="Ad for Microsoft" />
                                    <button className="btn btn-sm btn-why">Why<i className="far fa-question-circle mr-0 ml-0"></i></button>
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

                    <div className="related-proposals card">

                        <div className="header d-flex justify-content-between">
                            {proposals?.length} Related Proposals
      </div>

                        <div className="p-2">
                            {proposals.map(proposal =>
                                <div>
                                    {proposal.title}
                                </div>
                            )}
                        </div>

                        <div className="card-body">
                            When there is a related political proposals that could fix an issue it will be listed here.

        <div className="supporters">

                                <div className="supporter">
                                    <span className="badge badge-primary">Democrats</span>
                                    <span>0/100</span>
                                </div>

                                <div className="supporter ml-2">
                                    <span className="badge badge-danger">Republicans</span>
                                    <span>0/100</span>
                                </div>

                                <div className="supporter ml-2">
                                    <span className="badge badge-articles px-3">Articles</span>
                                    <span>0/100</span>
                                </div>

                            </div>
                        </div>

                    </div>

                    <div className="comment-section card">

                        <div className="header d-flex justify-content-between">

                            <div className="types">
                                <div onClick={() => setCommentView('normal') } className={"type " + ( commentView === 'normal' ? 'active' : '')}>{issue.comments?.length} Comments</div>
                                <div onClick={() => setCommentView('new') } className={"type ml-2 " + ( commentView === 'new' ? 'active' : '')}>0 Real ID Comments</div>
                            </div>

                            {/* <SortPopper setCommentSort={this.onChange} commentSort={commentSort} /> */}

                        </div>

                        {commentView === 'normal' ?
                            <>
                                <div className="add-comment">

                                    <div className="profile-photo">
                                        {userReduxState._id === undefined ?
                                            null
                                            :
                                            <img alt="" className="" width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${userReduxState?._id}.jpg` || ''} />
                                        }
                                    </div>

                                    <div className="comment">
                                        {/* <input onClick={() => this.setState({newCommentExpanded: true})} type="text" name="comment" id="comment" onChange={this.onChange} value={this.state.comment} placeholder="Add a comment"/> */}
                                        {/* <textarea onClick={() => this.setState({newCommentExpanded: true})} type="text" name="comment" id="comment" onChange={this.onChange} value={this.state.comment} placeholder="Add a comment"/> */}
                                        <div className='tx-div-before'></div>
                                        <TextareaAutosize className="tx-div" onClick={() => this.setState({ newCommentExpanded: true })} placeholder="Add a comment" type="text" name="comment" id="comment" onChange={e => setComment(e)} value={comment} />
                                        <div className='tx-div-after'></div>
                                    </div>

                                </div>

                                {
                                    // this.state.newCommentExpanded === true ?
                                    //     <div className="comment-controls d-flex justify-content-between align-items-start">

                                    //         {
                                    //             this.state.commentSubmitError === '' ?
                                    //                 <div></div>
                                    //                 :
                                    //                 <div className="badge badge-danger">{this.state.commentSubmitError}</div>
                                    //         }

                                    //         <div className="d-flex">
                                    //             <div onClick={() => this.setState({ newCommentExpanded: false })} className="btn btn-danger">Cancel</div>
                                    //             <button onClick={() => this.submitComment()} disabled={this.state.commentSubmitError != "" && this.state.comment === '' ? true : false} className="btn btn-articles-light">Comment</button>
                                    //         </div>

                                    //     </div>
                                    //     :
                                    //     null
                                }

                                {issue.comments?.length < 1 ?
                                    <div className="no-comments">

                                        <div className="sad">
                                            <div className="l-eye"></div>
                                            <div className="r-eye"></div>
                                            <div className="mouth"></div>
                                        </div>

                                        <div className="message">There are no comments yet</div>

                                    </div>
                                    :
                                    null
                                }

                                <div className="comments">
                                    {issue.comments?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(comment =>
                                        <Comment comment={comment} user={userReduxState} />
                                    )}
                                </div>
                            </>
                            :
                            <div className="real-id-notice">

                                <div className="bots">

                                    <div className="bot bot-1">
                                        <i className="fas fa-robot"></i>
                                        {/* <i className="fas fa-crosshairs"></i> */}
                                    </div>

                                    <div className="bot bot-2">
                                        <i className="fas fa-robot"></i>
                                        {/* <i className="fas fa-crosshairs"></i> */}
                                    </div>

                                    <div className="network network-1">
                                        <i className="fas fa-project-diagram"></i>
                                        <i className="fas fa-crosshairs"></i>
                                    </div>

                                    <div className="network network-2">
                                        <i className="fas fa-project-diagram"></i>
                                        <i className="fas fa-crosshairs"></i>
                                    </div>

                                </div>

                                <h3>Sign up for Real ID</h3>

                                <div className="icons">
                                    <i className="far fa-id-card"></i>
                                    <i className="fas fa-passport"></i>
                                    <i className="far fa-id-badge"></i>
                                </div>

                                <p className="about">Help us fight bot accounts and explore real comments. Submit a photo of your state license or passport to gain access to a better comment thread. Free from spam, closely moderated, and interact with the writter of this article.</p>

                                <button className="btn btn-articles-light alt">
                                    Sign up
                                </button>
                            </div>
                        }

                    </div>

                    <div className="back-button d-flex" onClick={() => router.back}>
                        <i className="far fa-caret-square-left mr-1"></i>
                        <div className="text">Back</div>
                    </div>

                </div>

                {/* <div className="link badge badge-dark w-100 py-2 mb-3" onClick={() => this.props.history.goBack()}>{String.fromCharCode(11148)} Back to Issues</div> */}

                <div className="card d-none">

                    <div className="card-header">

                        <h1>{issue.news_title}</h1>

                        {/* <small className="d-block">Issue Stats</small> */}

                        {/* {<div className="stat">Last Viewed: {lastRead !== undefined ? moment(lastRead).format("LLL") : 'Never'}</div>} */}
                        <div className="stat">People Subscribed: 1</div>

                        <div className="dates">
                            <div className="badge badge-articles">First Published: {moment(issue.news_date).format("LL")}</div>
                            <div className="badge badge-dark ml-1">Last Updated: {moment(issue.last_update).format("LLL")}</div>
                        </div>

                    </div>

                    <div className="card-tags">
                        <small className="pl-4">Tags:</small>
                        {issue.news_tags?.length > 0 ?
                            issue.news_tags?.map((tag) => (
                                <div className="badge badge-light ml-1">{tag.tag_name}</div>
                            ))
                            :
                            <div className="badge badge-light ml-1">None</div>
                        }
                    </div>

                    <div className="card-body">

                        {/* <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: news_notes?.replace('<break>', '<div className="alert alert-danger my-3">Testing Break</div>').replace(/(\r\n|\n|\r)/gm, "")}}></div> */}
                        <div style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: issue.news_notes }}></div>

                        <h5 className="mt-4">Related Proposals</h5>
                        <div className="proposals">
                            <div className="proposal"></div>
                            <div className="proposal"></div>
                            <div className="proposal"></div>
                        </div>

                    </div>

                </div>

            </div>

        </section>
    )
}

class Comment extends React.Component {
    constructor(props) {
      super(props);
  
      this.state = {
        reply: false,
        replies: false
      };
  
    }
  
    componentDidMount() {
      const self = this;
    }
  
    onChange = event => {
      this.setState({ [event.target.name]: event.target.value });
    };
  
    render() {
  
      const comment = this.props.comment
  
      return (
        <div className="comment">
      
          <div className="profile-photo">
            {comment.user_id === undefined ? 
              null
              :
              <img alt="" className="" width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${comment.user_id}.jpg` || ''}/>
            }
          </div>
  
          <div className="comment-content">
  
            <div>
              <span className="user">{comment.first_name + ' ' + comment.last_name?.charAt(0) || comment.user_id}</span>
              <span className="date">{moment(comment.date).format("LLL")}</span>
            </div>
  
            <div className="comment-text">{comment.comment}</div>
  
            <div className="comment-manage">
              <span onClick={() => this.setState({reply: true})}className="action">Reply</span>
              <span className={"action " + (this.props.user._id === comment.user_id ? '' : 'd-none')}>Edit</span>
              <span className={"action " + (this.props.user._id === comment.user_id ? '' : 'd-none')}>Delete</span>
            </div>
  
            <div className={"replies-container mt-2 " + (comment?.replies?.length > 0 ? '' : 'd-none')}>
              {this.state.replies ?
                <div className="replies ml-2 border-left border-dark">
                  {comment.replies.map(comment => (
                    <div className="reply ml-2" key={comment._id}>
                      <div>{moment(comment.date).format("LLL")}</div>
                      <div>{comment.user_id}</div>
                      <div>{comment.comment}</div>
                    </div>
                  ))}
                </div>
                :
                <button onClick={() => this.setState({replies: true})} className="btn btn-articles-light">View Replies ({comment?.replies?.length})</button>
                }
              
            </div>
  
            <div className={"add-comment " + (this.state.reply ? '' : 'd-none')}>
      
              <div className="profile-photo">
              {this.props.user._id === undefined ? 
                null
                :
                <img alt="" className="" width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props?.user?._id}.jpg` || ''}/>
              }
              </div>
  
              <div className={"comment "}>
                {/* <input onClick={() => this.setState({newCommentExpanded: true})} type="text" name="comment" id="comment" onChange={this.onChange} value={this.state.comment} placeholder="Add a comment"/> */}
                {/* <textarea onClick={() => this.setState({newCommentExpanded: true})} type="text" name="comment" id="comment" onChange={this.onChange} value={this.state.comment} placeholder="Add a comment"/> */}
                <div className='tx-div-before'></div>
                  <TextareaAutosize className="tx-div" onClick={() => this.setState({newCommentExpanded: true})}  placeholder="Add a comment"  type="text" name="comment" id="comment" onChange={this.onChange} value={this.state.comment}/>
                <div className='tx-div-after'></div> 
              </div>
  
            </div>
            
          </div>
          
        </div>
      )
    }
}

const SortPopper = (props) => {
    const [referenceElement, setReferenceElement] = useState(null);
    const [popperElement, setPopperElement] = useState(null);
    const [popperVisible, setPopperVisible] = useState(false);
    const [arrowElement, setArrowElement] = useState(null);
    const { styles, attributes } = usePopper(referenceElement, popperElement, {
      modifiers: [{ name: 'arrow', options: { element: arrowElement }, }],
      placement: 'bottom',
    });
  
    return (
      <>
        <button onClick={() => setPopperVisible(!popperVisible)} type="button" ref={setReferenceElement}>
          <span className="">
            <i className="fas fa-sort"></i>
            <span>Sort By</span>
          </span>
        </button>
  
        <div className={"popper " + (popperVisible === true ? 'visible' : '')} ref={setPopperElement} style={styles.popper} {...attributes.popper}>
          <div onClick={() => props.setCommentSort({target: {name: 'commentSort', value: 'top'}})} className={"item " + (props.commentSort === 'top' ? 'active' : '')}><i className="fas fa-sort-amount-down-alt"></i>Top</div>
          <div onClick={() => props.setCommentSort({target: {name: 'commentSort', value: 'new'}})} className={"item " + (props.commentSort === 'new' ? 'active' : '')}><i className="fas fa-sort-amount-down-alt"></i>New</div>
          <div ref={setArrowElement} style={styles.arrow} />
        </div>
      </>
    );
};