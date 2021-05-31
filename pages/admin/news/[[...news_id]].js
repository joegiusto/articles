import React, { Component, useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { withRouter, useRouter } from 'next/router'

import { connect, useSelector } from "react-redux";

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

import moment from 'moment'
import axios from 'axios';

// Articles Imports
import ROUTES from 'components/constants/routes'
import AdminLayout from 'components/layouts/admin.js';
import NewsAdd from 'components/admin/news/NewsAdd';

function AdminNews() {
    const router = useRouter()
    const { param } = router.query

    const userReduxState = useSelector((state) => state.auth.user_details)

    const [news, setNews] = useState([])

    const [activeDocument, setActiveDocument] = useState({})
    const [modalShow, setModalShow] = useState(false);

    const [tags, setTags] = useState([])
    const [newsLoading, setNewsLoading] = useState(true)
    const [newsLoadingError, setNewsLoadingError] = useState(false)

    const [newsTypeFilter, setNewsTypeFilter] = useState('all')

    // Can be 'Title' or 'Tags'
    const [subFilter, setSubFilter] = useState('Title')
    const [searchFilter, setSearchFilter] = useState('')
    const [tagFilter, setTagFilter] = useState('')

    useEffect(() => {

        setNewsLoading(true)

        axios.get('/api/news/')
        .then(function (response) {
            // console.log(response.data.news);
            setNews(response.data.news)
            setNewsLoading(false)
            // self.setState({
            //     results: response.data.news,
            //     resultsOriginal: response.data.news,
            //     resultsLoading: false
            // });
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
            setNewsLoading(false)
            // self.setState({ resultsLoading: true });
            // self.setState({ resultsLoadingError: error });
        });

        axios.get('/api/news/tags')
        .then(function (response) {

            // handle success
            // console.log(response.data.news);

            setTags(response.data.tags)

            //   self.setState({
            //     tags: response.data.tags,
            //     tagsLoading: false
            //   });

        })
        .catch(function (error) {
            // handle error
            // console.log(error);

            //   self.setState({ tagsLoading: false });
            //   self.setState({ resultsLoadingError: error });
        })

    }, []);

    useEffect(() => {

        if (router.query.news_id) {
            // console.log(router.query.news_id)
            editActiveDocument(router.query.news_id[0])
        }

    }, [router]);

    const handleClose = () => {
        router.push(ROUTES.ADMIN_NEWS)
        setModalShow(false);
        setActiveDocument({})
    }

    const editActiveDocument = (id) => {
		// console.log(`editActiveDocument called ${id}`);

        axios.post('/api/admin/news/', {
            news_id: id,
        })
        .then((response) => {
            setActiveDocument(response.data.document)
            setModalShow(true);
        })
        .catch(function (error) {
            console.log(error);
            setModalShow(false);
            setActiveDocument({})
        });
	}

    function setNewsShortcut() {

        axios.post('/api/admin/news/setAuthorShortcuts')
        .then(function (response) {
            // console.log(response.data.news);
            setNews(response.data.news)
            setNewsLoading(false)
            // self.setState({
            //     results: response.data.news,
            //     resultsOriginal: response.data.news,
            //     resultsLoading: false
            // });
        })
        .catch(function (error) {
            // handle error
            // console.log(error);
            setNewsLoading(false)
            // self.setState({ resultsLoading: true });
            // self.setState({ resultsLoadingError: error });
        });

    } 

    return (
        <div className={"admin-page admin-news"}>

            <Head>
                <title>Admin News - Articles</title>
            </Head>

            <Modal show={modalShow} className="user-modal articles-modal" centered onHide={handleClose}>

                <Modal.Header closeButton>
                    <Modal.Title>News Document Info</Modal.Title>
                </Modal.Header>

                <Modal.Body>

                    <div className="user-form">

                        <h3 className="text-center">{activeDocument?.news_title}</h3>
                        {/* <p className="text-center mb-1">{user._id}</p> */}

                    </div>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                        Close
                    </Button>
                </Modal.Footer>

            </Modal>

            <div className="side-panel">

                {/* Totals */}
                <div className="card mb-3">

                    <div className="card-header d-flex justify-content-between">
                        <span>News</span>
                        <span>{news.length} Documents</span>
                    </div>

                    <div className="card-body">
                        <div>Stories: {news.filter(document => document.news_type == 'story').length} | { ( (news.filter(document => document.news_type == 'story').length / news.length) * 100 ).toFixed(2)}%</div>
                        <div>Issues: {news.filter(document => document.news_type == 'issue').length} | { ( (news.filter(document => document.news_type == 'issue').length / news.length) * 100 ).toFixed(2)}%</div>
                        <div>Myths: {news.filter(document => document.news_type == 'myth').length} | { ( (news.filter(document => document.news_type == 'myth').length / news.length) * 100 ).toFixed(2)}%</div>
                    </div>

                </div>

                {/* Shortcuts */}
                <div className="card mb-3">

                    <div className="card-header d-flex justify-content-between">
                        <span>Author Shortcuts</span>
                    </div>

                    <div className="card-body shortcuts">

                        {userReduxState?.employee?.author_shortcuts.map(shortcut => (
                            <Link key={shortcut.news_id} href={`${ROUTES.ADMIN_NEWS}/${shortcut.news_id}`}>
                                <a>
                                    <div className="shortcut d-flex justify-content-center align-items-center mb-1">
                                        <button className="shortcut btn btn-articles-light btn-sm w-100">
                                            <span>${shortcut.news_id}</span>
                                        </button>
            
                                        <span className="badge badge-danger border clear-badge ml-1 mb-0">Delete</span>
                                    </div>
                                </a>
                            </Link>
                        ))}

                        <div className="shortcut d-flex justify-content-center align-items-center mb-1 mt-4">
                            <button className="shortcut btn btn-articles-light btn-sm">
                                <span><i className="far fa-plus-square"></i>Set Shortcut</span>
                            </button>

                            {/* <span className="badge badge-light border set-badge ml-1 mb-0">Set</span> */}
                        </div>
                        
                    </div>

                </div>

            </div>

            <div className="main-panel">

                <div className="d-flex flex-wrap justify-content-center align-items-center">

                    <div className="news-type-filters mb-3 mr-lg-3 flex-shrink-0">
                        <button onClick={ () => setNewsTypeFilter('all') } className={"btn btn-articles-light px-4 "  + (newsTypeFilter == 'all' && 'active') }>All</button>
                        <button onClick={ () => setNewsTypeFilter('story') } className={"btn btn-articles-light px-4 "  + (newsTypeFilter == 'story' && 'active') }>Stories</button>
                        <button onClick={ () => setNewsTypeFilter('issue') } className={"btn btn-articles-light px-4 "  + (newsTypeFilter == 'issue' && 'active') }>Issues</button>
                        <button onClick={ () => setNewsTypeFilter('myth') } className={"btn btn-articles-light px-4 "  + (newsTypeFilter == 'myth' && 'active') }>Myths</button>
                    </div>

                    <div className="d-flex align-items-start mb-3">
                        <button onClick={ () => setSubFilter('Title') } className={"btn btn-articles-light px-4 "  + (subFilter == 'Title' && 'active') }>Title</button>
                        <button onClick={ () => setSubFilter('Tags') } className={"btn btn-articles-light px-4 "  + (subFilter == 'Tags' && 'active') }>Tags</button>
                    </div>

                    {subFilter == 'Title' && 
                        <div className="form-group articles flex-shrink-0">
                            <label for="address">Search News</label>
                            <input 
                                className="form-control with-label py-0" 
                                onChange={ e => setSearchFilter(e.target.value) }
                                name="createdBy" 
                                id="createdBy" 
                                type="text"
                                placeholder="Edward Snowden"
                                value={searchFilter}
                            />
                        </div>
                    }

                    {subFilter == 'Tags' && 
                        <>
                            {/* <div className="form-group articles flex-shrink-0">
                                <label for="address">Search Tags</label>
                                <input 
                                    className="form-control with-label" 
                                    // onChange={ e => setSearchFilter(e.target) }
                                    name="createdBy" 
                                    id="createdBy" 
                                    type="text"
                                    placeholder="Democrats"
                                    value={searchFilter}
                                />
                            </div> */}



                            <div className="tag-container d-flex flex-wrap mb-3 p-1 align-content-start ml-2 pt-2">
                                {tags.map( tag => <div key={tag._id} className="badge badge-light border mb-1">{tag.tag_name}</div> )}
                            </div>
                        </>
                    }

                </div>

                {/* {router.query.news_id && (
                     <Link href={`${ROUTES.ADMIN_NEWS}`}>
                        <button className="btn btn-articles-light mb-3">Cancel Edit</button>
                    </Link>
                )} */}

                {newsLoading && 
                    <div className="text-center mb-3">
                        <h2><i className="fas fa-spinner fa-spin"></i>Loading...</h2>
                    </div>
                }

                <div className="results">
                    {news
                    .filter(document => {
    
                        if (newsTypeFilter == 'all') {
                            return document
                        } else {
                            return document.news_type == newsTypeFilter
                        }
    
                    })
                    .filter(document => {
    
                        if (subFilter == 'Title') {
                            return document.news_title.includes(searchFilter)
                        } else {
                            return document
                        }
    
                    }).length > 0 &&
    
                        news
                        .filter(document => {
    
                            if (newsTypeFilter == 'all') {
                                return document
                            } else {
                                return document.news_type == newsTypeFilter
                            }
    
                        })
                        .filter(document => {
    
                            if (subFilter == 'Title') {
                                return document.news_title.includes(searchFilter)
                            } else {
                                return document
                            }
    
                        })
                        .sort(function(a, b){

                            // Sort by abc or date
                            if(a.news_title < b.news_title) { return -1; }
                            if(a.news_title > b.news_title) { return 1; }
                            return 0;

                        })
                        .map(document => (
                            <Link key={document._id} href={`${ROUTES.ADMIN_NEWS}/${document._id}`}>

                                <a className="result card">

                                    <div className="card-header d-flex justify-content-between align-items-baseline px-2">
                                        <span style={{fontSize: '0.9rem'}}><b>{document.news_title}</b></span>
                                        <span className="badge badge-articles">{document.news_type}</span>
                                    </div>

                                    <div className="card-body d-flex px-0 py-0">
                                        <img src={document.hero_url} alt="" />
                                        <div className="px-3 py-2">{document.news_tagline}</div>
                                    </div>

                                </a>

                            </Link>
                        ))

                    }
                </div>

            </div>

        </div>
    )
}

class NewsAdmin extends Component {
    constructor(props) {
        super(props);

        this.state = {
            catagory: 'All',
            searchAlert: false,
            searchFilter: 'Tags',

            searchText: '',
            searchHistory: [],
            searchLoading: false,
            searchLoadingError: '',

            tags: [],
            proposals: [],

            searchedTag: '',
            tagsLoading: false,
            tagsLoadingError: '',

            resultsOriginal: [],
            results: [],
            resultsLoading: false,
            resultsLoadingError: '',

            stories: [],
            issues: [],
            myths: [],

            authors: [],

            isEdit: false,
        };

        // this.getNewsByTag = this.getNewsByTag.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.changeCatagory = this.changeCatagory.bind(this);
        this.changeIsEdit = this.changeIsEdit.bind(this);
    }

    componentDidMount() {
        // this.props.setLocation('news');
        let self = this;

        // self.setState({ tagsLoading: true });
        // self.setState({ searchLoading: true });
        self.setState({ resultsLoading: true });

        axios.get('/api/news/')
            .then(function (response) {
                console.log(response.data.news);

                self.setState({
                    results: response.data.news,
                    resultsOriginal: response.data.news,
                    resultsLoading: false
                });
            })
            .catch(function (error) {
                // handle error
                console.log(error);

                self.setState({ resultsLoading: true });
                self.setState({ resultsLoadingError: error });
            });

        // axios.get('/api/getNewsTags')
        // .then(function (response) {

        //   // handle success
        //   // console.log(response.data.news);

        //   self.setState({
        //     tags: response.data.tags,
        //     tagsLoading: false
        //   });

        // })
        // .catch(function (error) {
        //   // handle error
        //   // console.log(error);

        //   self.setState({ tagsLoading: false });
        //   self.setState({ resultsLoadingError: error });
        // })

        // axios.get('/api/getProposals')
        // .then(function (response) {

        //   self.setState({
        //     proposals: response.data,
        //     // tagsLoading: false
        //   });

        // })
        // .catch(function (error) {
        //   // handle error
        //   // console.log(error);
        //   // self.setState({ tagsLoading: false });
        //   // self.setState({ resultsLoadingError: error });
        // })

        // axios.get('/api/getWriters')
        // .then(function (response) {
        //   console.log(response);

        //   self.setState({
        //     authors: response.data,
        //   });
        // })
        // .catch(function (error) {
        //   // handle error
        //   console.log(error);

        //   // self.setState({ resultsLoading: true });
        //   // self.setState({ resultsLoadingError: error });
        // });

    }

    componentDidUpdate(prevProps) {
        const { pathname, query } = this.props.router
        // verify props have changed to avoid an infinite loop
        if (query.counter !== prevProps.router.query.counter) {
            // fetch data based on the new query
        }
    }

    componentWillUnmount() {
        // this.props.setLocation('');
    }

    getNewsByTag(tag) {
        let self = this;
        let catagoryWas = this.state.catagory;

        console.log(tag);

        axios.post('/api/getNewsByTag', {
            tag: tag
        })
            .then(function (response) {

                console.log(response.data.tags);

                self.setState({
                    results: response.data.tags,
                    catagory: 'All',
                    searchedTag: tag
                });

            })
            .catch(function (error) {
                console.log(error);
            });

        console.log(catagoryWas);

        if (catagoryWas === 'All') {

        } else {
            this.setState({
                searchAlert: true
            })
            setTimeout(function () {
                self.setState({
                    searchAlert: false
                })
            }, 3000);
        }
    }

    getNewsByContent(content) {
        let self = this;

        self.setState({ searchText: content });
    }

    handleChange(event) {
        const name = event.target.name;
        this.setState({ [name]: event.target.value });
    }

    searchText() {
        let self = this;

        axios.post('/recordSearch', {
            text: this.state.searchText
        })
            .then(function (response) {
                console.log(response);

                self.setState(prevState => ({
                    searchHistory: [{ text: self.state.searchText }, ...prevState.searchHistory],
                }))
            })
            .catch(function (error) {
                console.log(error);
            });
    }

    changeCatagory(catagory) {

        this.setState({
            catagory: catagory,
            // searchFilter: 'Content',
            results: catagory !== 'All' ? this.state.resultsOriginal.filter(result => result.news_type == catagory) : this.state.resultsOriginal,
            searchedTag: '',
            searchText: ''
        })
    }

    changeSearchFilter(filter) {
        this.setState({
            searchFilter: filter
        })
    }

    changeIsEdit(value) {
        console.log("change is edit called")

        this.setState({
            isEdit: value
        })
    }

    render() {
        const {
            tags,
            tagsLoading,
            tagsLoadingError,

            searchText,

            searchLoading,
            searchHistory,
            searchLoadingError,

            results,
            resultsLoading,
            resultsLoadingError,

            catagory,
            searchFilter
        } = this.state;

        function NewsTypeSelector(props) {
            return (
                <div className={"catagory " + (props.catagory === props.changeCatagoryTo && props.searchedTag === '' && props.searchText === '' ? 'active' : '')} onClick={() => props.changeCatagory(props.changeCatagoryTo)}>{props.displayCatagoryAs}</div>
            )
        }

        return (
            <div className={"admin-page admin-news " + (this.state.isEdit ? 'active' : '')}>

                <Head>
                    <title>Admin News - Articles</title>
                </Head>

                <div className="side-panel">

                    <div className="card mb-3">

                        <div className="card-header d-flex justify-content-between">
                            <span>News</span>
                            {/* <span>{outsetComplete}/{users.length} Users</span> */}
                        </div>

                        <div className="card-body">
                            <div>Stories: {outsetComplete} | {(Math.floor((outsetComplete / users.length) * 100))}%</div>
                            <div>Issues: 0 | 0%</div>
                            <div>Myths: 0 | 0%</div>
                        </div>

                    </div>

                </div>

                <div className="main-panel">
                    <div className={"news-manage-plate " + (this.state.isEdit ? 'active' : '')}>

                        <div className="catagories">
                            <NewsTypeSelector searchText={this.state.searchText} searchedTag={this.state.searchedTag} catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="All" displayCatagoryAs="All" />
                            <NewsTypeSelector searchText={this.state.searchText} searchedTag={this.state.searchedTag} catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="story" displayCatagoryAs="Stories" />
                            <NewsTypeSelector searchText={this.state.searchText} searchedTag={this.state.searchedTag} catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="issue" displayCatagoryAs="Issues" />
                            <NewsTypeSelector searchText={this.state.searchText} searchedTag={this.state.searchedTag} catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="myth" displayCatagoryAs="Myths" />
                        </div>

                        <div className="search-controls">
                            <div className="controls">
                                <span onClick={() => this.changeSearchFilter('Content')} className={"badge " + (searchFilter === "Content" ? 'badge-primary' : 'badge-secondary')}>Content</span>
                                {/* <span onClick={() => this.changeSearchFilter(catagory)} className={"badge " + (searchFilter === catagory ? 'badge-primary' : 'badge-secondary')}>{catagory} Title</span> */}
                                <span onClick={() => this.changeSearchFilter('Tags')} className={"badge " + (searchFilter === "Tags" ? 'badge-primary' : 'badge-secondary')}>Tags</span>

                                {/* TODO Add search function to sort by title */}
                                {/* <input className="" name="searchText" type="text" value={searchText} onChange={this.handleChange}/> */}
                                {/* <div onClick={() => this.searchText()} className="btn btn-articles-light">Go</div> */}

                            </div>

                            <div className={"search-alert " + (this.state.searchAlert === true ? 'active' : '')}>
                                <div className="search-alert-text">Tag searching can only be preformed on 'All' results currently.</div>
                            </div>

                            <div className="assist">

                                {searchFilter === "Content" ?
                                    (searchLoading ?
                                        (searchLoadingError === '' ? <span className="badge badge-success">Loading...</span> : <span className="badge badge-danger">Error Loading Search</span>)
                                        :
                                        <div className="tag-container">
                                            {/* <div className="assist-header">Latest Searched Terms:</div> */}

                                            <div className="form-group articles">
                                                <label for="searchText">Search:</label>
                                                <input
                                                    type="text"
                                                    className="form-control with-label"
                                                    id="searchText"
                                                    name="searchText"
                                                    aria-describedby=""
                                                    value={this.state.searchText}
                                                    onChange={this.handleChange}
                                                    placeholder=""
                                                />
                                            </div>

                                            <div className="tags">

                                                {searchHistory.map((search) =>
                                                    <span key={search.id} onClick={() => this.getNewsByContent(search.text)} className="badge badge-primary">{search.text}</span>
                                                )}

                                            </div>
                                        </div>
                                    )
                                    :
                                    ''
                                }

                                {searchFilter === "Tags" ?
                                    (tagsLoading ?
                                        (tagsLoadingError === '' ? <span className="badge badge-success">Loading...</span> : <span className="badge badge-danger">Error Loading Tags</span>)
                                        :
                                        <div className="tag-container">
                                            <div className="tags">
                                                {tags.map((tag) =>
                                                    <span key={tag.tag_name} onClick={() => this.getNewsByTag(tag.tag_name)} className={"badge " + (tag.tag_name === this.state.searchedTag ? 'badge-dark' : 'badge-light')}>{tag.tag_name}</span>
                                                )}
                                            </div>
                                        </div>
                                    )
                                    :
                                    ''
                                }

                            </div>
                        </div>

                        {/* <button onClick={() => this.setState({isEdit: true})} className="btn btn-articles-light mx-auto d-block">Add Content</button> */}

                        <div className="results-header">Results: {this.state.results.filter(result => result.news_title.includes(this.state.searchText)).length}</div>

                        <div className="results">

                            {this.state.results.filter(result => result.news_title.includes(this.state.searchText)).length === 0 && resultsLoading !== true ?
                                <div>
                                    <div>No Results</div>
                                    <button onClick={() =>
                                        this.setState({
                                            searchText: ''
                                        })
                                    } className="btn btn-articles-light">Reset Search</button>
                                </div>
                                :
                                ''
                            }

                            {resultsLoading ?
                                (resultsLoadingError === '' ? <span className="badge badge-success">Loading...</span> : <div><div className="badge badge-danger">Error Loading Results</div><div><small>Most likely the content server is off.</small></div></div>)
                                :
                                ''
                            }

                            {results
                                .filter(result => result.news_title.includes(this.state.searchText))
                                .sort(function (a, b) {
                                    return new Date(b.news_date) - new Date(a.news_date)
                                }).map((result) => {

                                    // const d = new Date(result.news_date);

                                    return (
                                        <div className="result" key={result._id}>

                                            <div className="dates">
                                                <span className="date badge badge-dark border ">{moment(result.news_date).format("LL")} </span>
                                                {result.visible ? null : <i className="visible fas fa-low-vision"></i>}
                                                {result.authors?.length === 0 || result.authors?.length === undefined ? <i className="author fas fa-user-edit"></i> : null}
                                                <span className="date badge badge-warning border ">{moment(result.last_update).format("LL")} </span>
                                            </div>

                                            {/* <div className="indicators">
                        {result.visible ? null : <i className="visible fas fa-low-vision"></i>}
                        {result.author === undefined || result.author === null || result.author === '' ? <i className="author fas fa-user-edit"></i> : null}
                        </div> */}

                                            <Link onClick={() => this.setState({ isEdit: true })} href={ROUTES.ADMIN_NEWS + '/' + result._id}>
                                                <a>
                                                    <span className="title">
                                                        {result.news_title}
                                                        <small>({result.news_type})</small>
                                                    </span>
                                                </a>
                                            </Link>

                                            <div className={"tags pl-2" + (catagory === "All" ? '' : '')}>

                                                {result.news_tags?.length > 0 ?
                                                    result.news_tags?.map(tag => (
                                                        <div key={tag.tag_name} onClick={() => this.getNewsByTag(tag.tag_name)} className="badge badge-dark">{tag.tag_name}</div>
                                                    ))
                                                    :
                                                    <div className="badge badge-dark" style={{ cursor: 'default' }}>None</div>
                                                }

                                            </div>

                                        </div>
                                    )

                                })}
                        </div>

                    </div>

                    {/* <div className={"editor-dim " + (this.state.isEdit ? 'active' : '')}></div> */}

                    <NewsAdd
                        authors={this.state.authors}
                        proposals={this.state.proposals}
                        tags={this.state.tags}
                        isEdit={this.state.isEdit}
                        news_id={this.props.router.query.news_id ? this.props.router.query.news_id[0] : null}
                        // isExact={this.props.router.pathname} 
                        isExact={false}
                        changeIsEdit={this.changeIsEdit}
                        user={this.props.user}
                    />
                </div>

            </div>
        );
    }
}

// export default AdminPage

const mapStateToProps = state => ({
    user: state.auth.user_details,
});

const NewsAdminWrapWrap = function Wrapper() {
    return (
        <NewsAdmin />
    )
}

NewsAdmin.Layout = AdminLayout;

// export default withRouter( connect(
//   mapStateToProps,
// )( NewsAdmin ) );

NewsAdminWrapWrap.Layout = AdminLayout;
AdminNews.Layout = AdminLayout;

// export default NewsAdminWrapWrap

export default connect(
    mapStateToProps,
)(AdminNews);