import React, { useEffect, useState } from 'react';

// import { withRouter } from 'react-router-dom';
// import { Link } from 'react-router-dom'

import Head from 'next/head'
import Link from 'next/link'
import { withRouter, useRouter } from 'next/router'

import { useSelector } from 'react-redux'

import axios from 'axios'
import moment from 'moment'

import { connect } from "react-redux";
import { Swiper, SwiperSlide } from 'swiper/react';

import ROUTES from 'components/constants/routes'
import NewsComments from 'components/News/NewsComments'

export default function NewsMyth(props) {
    const router = useRouter()
    const { myth_id } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    const [proposalNotFound, setProposalNotFound] = useState(false)

    const [myth, setMyth] = useState({
        news_tags: []
    })
    const [mythLoading, setMythLoading] = useState(false)

    const [proposals, setProposals] = useState( [] )
    const [proposalsIndex, setProposalsIndex] = useState( 0 )

    const [relatedContent, setRelatedContent] = useState( [] )
    const [active_related_content_tag, setActive_related_content_tag] = useState('')
    const [relatedContentLoading, setRelatedContentLoading] = useState(false)

    const [relatedContentIndex, setRelatedContentIndex] = useState(0)

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

    useEffect(() => {
        console.log(router)
        setMythLoading(true)
        loadDocument()
    }, []);

    useEffect(() => {
        if (!router.isReady) return;

        // codes using router.query
        loadDocument();

    }, [router]);

    function loadDocument() {
        axios
            .post(`/api/news/myths/${myth_id}`)
            .then(res => {
                console.log(res);
                setMyth(res.data)
                setMythLoading(false)
            })
            .catch(err => {
                console.log(err)
                setMythLoading(false)
                // setProposalNotFound(true)
            }
            );
    }

    if (mythLoading) {
        return 'Loading'
    }

    return (
        <section className="myths-page">

            <Head>
                <title>Myth - Articles</title>
            </Head>

            <div className="container">

                <div className="myth">

                    <div className="breadcrumbs">
                        <Link href={ROUTES.NEWS}>News</Link>
                        <i className="fas fa-arrow-alt-circle-right mr-0"></i>
                        <Link href={ROUTES.MYTHS}>Myths</Link>
                    </div>

                    <img src={myth.hero_url} alt="" className={"thin-img"} />

                    <div style={{ background: 'linear-gradient(45deg, #ffb7b7, #f9edcd 80%)' }} className={"mb-3 border border-dark p-2 " + (userReduxState?.roles?.isWriter ? 'd-inline-block' : 'd-none')}>
                        <Link href={`${ROUTES.ADMIN_NEWS}/${myth._id}?writerFromDocument=true`}><button className="btn btn-articles-light border border-dark" onClick={() => ''}>Edit Myth</button></Link>
                        <small className="d-block">You are seeing this because you are a writer</small>
                    </div>

                    <h3 className="title">{myth.news_title}</h3>

                    <div className="date">
                        <div>Published: {moment(myth.news_date).format("LLL")}</div>
                        <div>Last Updated: {moment(myth.last_update).format("LLL")}</div>
                    </div>

                    <div style={{ marginBottom: '0.5rem' }}>At this time our news content is still in development. We have many placeholders where content will be placed after it is done being written and researched.</div>

                    <div className="content-text mb-3" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: myth?.news_notes }}></div>

                    <NewsComments userReduxState={userReduxState} document={myth} news_id={myth._id} />

                </div>

                <div className="sidebar">
                    <button className="btn btn-articles-light w-100">Share</button>

                    <div className="related">

                        <h5 className="title">Related Content</h5>

                        <div className="tags">
                            {myth.news_tags?.length > 0 ?
                                myth.news_tags.map((tag) =>
                                    <div key={tag.tag_name} className="tag badge badge-dark">{tag.tag_name}</div>
                                )
                                :
                                <div className="badge badge-light">No Tags</div>
                            }
                        </div>

                        {relatedContentLoading ?
                            <div>Loading</div>
                            :
                            relatedContent.length === 0 ?
                                <div>No related content</div>

                                :

                                <Swiper
                                    className="proposals"
                                    {...swiper_settings}
                                    onSlideChange={(swiper) => this.setState({ relatedContentIndex: swiper.activeIndex })}
                                >

                                    <i className="fas fa-backward"></i>
                                    <i className="fas fa-forward"></i>

                                    {relatedContent.map((proposal) =>
                                        <SwiperSlide>
                                            <Link href={`${this.renderRoute(proposal.news_type)}/${proposal.url}`}>
                                                <div className="proposal">
                                                    <div className="background">
                                                        <img src={proposal.hero_url} alt="" />
                                                    </div>
                                                    <div className="title">{proposal.news_title}</div>
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )}

                                </Swiper>

                        }

                        {relatedContent.length === 0 ?
                            null :
                            <div className="count">{relatedContentIndex + 1}/{relatedContent.length}</div>
                        }

                    </div>

                    <div className="related">
                        <h5 className="title">Related Proposals</h5>

                        {proposals.length === 0 ?

                            <div>No related proposals</div>

                            :

                            <Swiper
                                className="proposals"
                                {...swiper_settings}
                                onSlideChange={(swiper) => this.setState({ proposalsIndex: swiper.activeIndex })}
                            >

                                <i className="fas fa-backward"></i>
                                <i className="fas fa-forward"></i>

                                {proposals.map((proposal) =>
                                    <SwiperSlide>
                                        <Link href={`${ROUTES.PROPOSALS}/${proposal._id}`}>
                                            <div className="proposal">
                                                {proposal.title}
                                            </div>
                                        </Link>
                                    </SwiperSlide>
                                )}

                            </Swiper>

                        }

                        {proposals.length === 0 ?
                            null :
                            <div className="count">{proposalsIndex + 1}/{proposals.length}</div>
                        }

                    </div>
                </div>

            </div>

            {/* <NewsConnected/> */}

        </section>
    )
}

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

        // console.log(this.props.router.query.myth_id)
        this.loadNewsByUrl(this.props.router.query.myth_id);
    }

    componentWillUnmount() {
        // clearTimeout(this.interval);
    }

    componentDidUpdate(prevProps) {
        //Typical usage, don't forget to compare the props
        if (this.props.router.query.myth_id !== prevProps.router.query.myth_id) {
            this.loadNewsByUrl(this.props.router.query.myth_id);
        }
    }

    change() {
        this.setState({ expandHero: false })
    }

    loadNewsByUrl(url) {
        const self = this;
        this.setState({ expandHero: true })

        axios.get(`/api/news/myths/${url}`, {

        })
        .then(function (response) {
            console.log(response);

            self.setState({
                ...response.data,
                loading: false
            }, () => (null
                // self.loadRelatedContent(self.state.news_tags[0])
            )
            );


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
        switch (type) {
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
        self.setState({ relatedContentLoading: true })

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
                            <Link href={ROUTES.NEWS}>News</Link>
                            <i className="fas fa-arrow-alt-circle-right mr-0"></i>
                            <Link href={ROUTES.MYTHS}>Myths</Link>
                        </div>

                        <img src={this.state.hero_url} alt="" className={"thin-img"} />

                        <div style={{ background: 'linear-gradient(45deg, #ffb7b7, #f9edcd 80%)' }} className={"mb-3 border border-dark p-2 " + (this.props.user?.roles?.isWriter ? 'd-inline-block' : 'd-none')}>
                            <Link href={`${ROUTES.ADMIN_NEWS}/${this.state._id}?writerFromDocument=true`}><button className="btn btn-articles-light border border-dark" onClick={() => ''}>Edit Myth</button></Link>
                            <small className="d-block">You are seeing this because you are a writer</small>
                        </div>

                        <h3 className="title">{this.state.news_title}</h3>

                        <div className="date">
                            <div>Published: {moment(this.state.news_date).format("LLL")}</div>
                            <div>Last Updated: {moment(this.state.last_update).format("LLL")}</div>
                        </div>

                        <div style={{ marginBottom: '0.5rem' }}>At this time our news content is still in development. We have many placeholders where content will be placed after it is done being written and researched.</div>

                        <div className="content-text" style={{ whiteSpace: 'pre-wrap' }} dangerouslySetInnerHTML={{ __html: this.state?.news_notes }}></div>

                        <NewsComments userReduxState={userReduxState} document={story} news_id={story._id} />

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
                                        onSlideChange={(swiper) => this.setState({ relatedContentIndex: swiper.activeIndex })}
                                    >

                                        <i className="fas fa-backward"></i>
                                        <i className="fas fa-forward"></i>

                                        {this.state.relatedContent.map((proposal) =>
                                            <SwiperSlide>
                                                <Link href={`${this.renderRoute(proposal.news_type)}/${proposal.url}`}>
                                                    <div className="proposal">
                                                        <div className="background">
                                                            <img src={proposal.hero_url} alt="" />
                                                        </div>
                                                        <div className="title">{proposal.news_title}</div>
                                                    </div>
                                                </Link>
                                            </SwiperSlide>
                                        )}

                                    </Swiper>

                            }

                            {this.state.relatedContent.length === 0 ?
                                null :
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
                                    onSlideChange={(swiper) => this.setState({ proposalsIndex: swiper.activeIndex })}
                                >

                                    <i className="fas fa-backward"></i>
                                    <i className="fas fa-forward"></i>

                                    {this.state.proposals.map((proposal) =>
                                        <SwiperSlide>
                                            <Link href={`${ROUTES.PROPOSALS}/${proposal._id}`}>
                                                <div className="proposal">
                                                    {proposal.title}
                                                </div>
                                            </Link>
                                        </SwiperSlide>
                                    )}

                                </Swiper>

                            }

                            {this.state.proposals.length === 0 ?
                                null :
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

const NewsConnected = ( connect(mapStateToProps)(withRouter(Myth)) ) 