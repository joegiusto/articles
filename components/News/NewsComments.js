import React, { Component, useEffect, useState } from 'react'

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

import TextareaAutosize from 'react-textarea-autosize';

import ROUTES from 'components/constants/routes'

export default function NewsComments(props) {

    const [comments, setComments] = useState([])
    const [commentsLoading, setCommentsLoading] = useState([])

    const [commentSort, setCommentSort] = useState('new')
    const [commentView, setCommentView] = useState('normal')

    const [comment, setComment] = useState('')

    useEffect(() => {
        console.log(props.document._id)
        loadDocument()
    }, []);

    function loadDocument() {
        axios
        .post(`/api/news/comments/${props.document._id}`)
        .then(res => {
            console.log(res);
            setComments(res.data.comments)
            setCommentsLoading(false)
        })
        .catch(err => {
            console.log(err)
            setCommentsLoading(false)
            // setProposalNotFound(true)
        }
        );
    }

    return (
        <div className="news-comment-section card">

            <div className="comments-header d-flex justify-content-between">

                <div className="types">
                    <div onClick={() => setCommentView('normal')} className={"type " + (commentView === 'normal' ? 'active' : '')}>{comments?.length || 0} Comments</div>
                    <div onClick={() => setCommentView('new')} className={"type ml-2 " + (commentView === 'new' ? 'active' : '')}>0 Real ID Comments</div>
                </div>

                {/* <SortPopper setCommentSort={this.onChange} commentSort={commentSort} /> */}

            </div>

            {commentView === 'normal' ?
                <>
                    <div className="add-comment">

                        <div className="profile-photo">
                            {props.userReduxState._id === undefined ?
                                null
                                :
                                <img alt="" className="" width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${props.userReduxState?._id}.jpg` || ''} />
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

                    {comments?.length < 1 ?
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
                        {comments?.sort((a, b) => new Date(b.date) - new Date(a.date)).map(comment =>
                            <Comment key={comment._id} comment={comment} user={props.userReduxState} />
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

                    <p className="about">Help us fight bot accounts and explore real comments by real people. Submit a photo of your state license or passport to gain access to a better comment thread. Free from spam, closely moderated, and interact with the writers of news articles.</p>

                    <Link href={ROUTES.BETA}>
                        <a className="btn btn-articles-light">
                            Sign up
                        </a>
                    </Link>

                </div>
            }

        </div>
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
              <img alt="" className="" width="100%" height="100%" src={`https://articles-website.s3.amazonaws.com/profile_photos/${comment.user_id._id}.jpg` || ''}/>
            }
          </div>
  
          <div className="comment-content">
  
            <div>
              <span className="user">{comment.user_id.first_name + ' ' + comment.user_id.last_name?.charAt(0) || comment.user_id.user_id}</span>
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