import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'

import axios from 'axios'

import { useRouter } from 'next/router'

import AdminLayout from 'components/layouts/admin.js';

AdminComments.Layout = AdminLayout;

export default function AdminComments() {
    const router = useRouter()
    const { param } = router.query

    const [comments, setComments] = useState([]);
    const [commentsLoading, setCommentsLoading] = useState(true);

    useEffect(() => {

        axios.get('/api/admin/comments')
            .then((response) => {
                console.log(response)
                setComments(response.data);
                setCommentsLoading(false)
            })
            .catch((error) => {
                console.log(error);
                setCommentsLoading(false)
            });

    }, []);

    return (
        <section className="admin-page comments-page">

            <Head>
                <title>Admin Comments - Articles</title>
            </Head>

            <div className="side-panel">

                <div className="card">
                    <div className="card-header">Stories</div>
                    <div className="card-body">
                        <div>Total: <b>{comments.filter(document => document.news_type == "story").length}</b></div>
                        <div>Reported: <b>0</b></div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">Issues</div>
                    <div className="card-body">
                        <div>Total: <b>{comments.filter(document => document.news_type == "issue").length}</b></div>
                        <div>Reported: <b>0</b></div>
                    </div>
                </div>

                <div className="card mt-3">
                    <div className="card-header">Myths</div>
                    <div className="card-body">
                        <div>Total: <b>{comments.filter(document => document.news_type == "myth").length}</b></div>
                        <div>Reported: <b>0</b></div>
                    </div>
                </div>

            </div>

            <div className="main-panel">

                <div className="container py-3">

                    {/* <div className="text-center">
                        <h1>Comments Page</h1>
                        <p>Admin stuff here.</p>
                    </div> */}

                    <div>
                        {comments
                        .sort( (a, b) => {

                            let la = (a.comments == undefined ? 0 : a.comments.length),
                            lb = (b.comments == undefined ? 0 : b.comments.length)

                            if (la < lb) {
                                return 1;
                            }
                            if (la > lb) {
                                return -1;
                            }
                            return 0;

                        } )
                        .map((comments) => (
                            <Comment
                                key={comments._id}
                                document={comments}
                            />
                        ))}
                    </div>

                </div>

            </div>

        </section>
    )
}

class Comment extends Component {
    constructor(props) {
        super(props);

        this.state = {
            expanded: false,
            response: ''
        };

        // this.handleChange = this.handleChange.bind(this);
    }

    componentDidMount() {
        const self = this;
    }

    render() {

        const document = this.props.document

        return (
            <div className="card mb-3">

                <div className="card-header"><h5 className="mb-0">{document.news_title}</h5></div>

                <div className="card-body comments">

                    {document?.comments?.length > 0 ?

                        document.comments?.map((comment) => (

                            <div key={comment._id} className="ml-2 pl-2 border-left border-dark alert alert-primary mb-0">
                                {/* <div>{comment._id}</div> */}
                                <div>{comment.user_id.first_name} {comment.user_id.last_name}</div>
                                <div>{comment.comment}</div>
                                <div className="my-2">
                                    <button className="btn btn-articles-light btn-sm">Mute User</button>
                                    <button className="btn btn-articles-light btn-sm">Ban User</button>
                                </div>

                                {comment.replies?.length > 0 ?

                                    comment.replies.map((reply) => (
                                        <div key={reply._id} className="mt-2 ml-2 pl-2 border-left border-dark alert alert-secondary mb-0">
                                            <div>{reply.user_id}</div>
                                            <div>{reply.comment}</div>
                                            <div className="my-2">
                                                <button className="btn btn-articles-light btn-sm">Mute User</button>
                                                <button className="btn btn-articles-light btn-sm">Ban User</button>
                                            </div>
                                        </div>
                                    ))

                                    :

                                    <div className="mt-2 ml-2 pl-2 border-left border-dark alert alert-secondary mb-0">
                                            <div className="mb-0">No sub comments</div>
                                    </div>

                                }

                            </div>
                            
                        ))

                        :

                        <div className="alert alert-danger mb-0">No Comments</div>

                    }

                </div>

            </div>
        );
    }
}