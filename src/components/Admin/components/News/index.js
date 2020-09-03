import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment'
import axios from 'axios';

import * as ROUTES from '../../../../constants/routes';
import NewsAdd from './add';

class AdminPage extends Component {
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

      isEdit: false,
    };

    // this.getNewsByTag = this.getNewsByTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
    this.changeCatagory = this.changeCatagory.bind(this);
    this.changeIsEdit = this.changeIsEdit.bind(this);
  }

  componentDidMount() {
    this.props.setLoaction('news');
    let self = this;

    self.setState({ tagsLoading: true });
    self.setState({ searchLoading: true });
    self.setState({ resultsLoading: true });

    axios.get('/api/getNews')
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

    axios.get('/api/getNewsTags')
    .then(function (response) {

      // handle success
      // console.log(response.data.news);

      self.setState({
        tags: response.data.tags,
        tagsLoading: false
      });

    })
    .catch(function (error) {
      // handle error
      // console.log(error);

      self.setState({ tagsLoading: false });
      self.setState({ resultsLoadingError: error });
    })
  }

  componentWillUnmount() {
    this.props.setLoaction('');
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
      setTimeout( function() { 
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
    this.setState({[name]: event.target.value});
  }

  searchText() {
    let self = this;

    axios.post('/recordSearch', {
      text: this.state.searchText
    })
    .then(function (response) {
      console.log(response);

      self.setState(prevState => ({
        searchHistory: [{text: self.state.searchText}, ...prevState.searchHistory],
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
      searchedTag: ''
    })
  }

  changeSearchFilter(filter) {
    this.setState({
      searchFilter: filter
    })
  }

  changeIsEdit(value) {
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
      <div className={"catagory " + (props.catagory === props.changeCatagoryTo ? 'active' : '')} onClick={() => props.changeCatagory(props.changeCatagoryTo)}>{props.displayCatagoryAs}</div>
      )
    }

    return (
      <div className="admin-news">
        <div className="row">

          <div className="col col-12 col-md-7">
            <div className="news-manage-plate" style={{backgroundColor: 'rgba(255, 255, 255, 0)'}}>
              {/* <h1>News Management</h1> */}
  
              <div className="catagories">
                <NewsTypeSelector catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="All" displayCatagoryAs="All" />
                <NewsTypeSelector catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="story" displayCatagoryAs="Stories" />
                <NewsTypeSelector catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="issue" displayCatagoryAs="Issues" />
                <NewsTypeSelector catagory={this.state.catagory} changeCatagory={this.changeCatagory} changeCatagoryTo="myth" displayCatagoryAs="Myths" />
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
                    <div className="assist-header">Latest Searced Terms:</div>
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

              <div className="results-header">Results: {this.state.results.length}</div>
  
              <div className="results">
                
                {resultsLoading ? 
                (resultsLoadingError === '' ? <span className="badge badge-success">Loading...</span> : <div><div className="badge badge-danger">Error Loading Results</div><div><small>Most likely the content server is off.</small></div></div>)
                :
                ''
                }

                {results.sort(function(a,b){
                  return new Date(b.news_date) - new Date(a.news_date)
                }).map((result) => {
  
                  // const d = new Date(result.news_date);
  
                  return (
                  <div className="result" key={result.issue_id}>
  
                    <div className="dates">
                      <span>
                        {result.visible ? null : <span><i className="fas fa-low-vision"></i></span>}
  
                        <span className="date badge badge-dark border ml-2">{moment(result.news_date).format("LL")} </span>
                      </span>
                      <span className="date badge badge-warning border ml-2">{moment(result.last_update).format("LL")} </span>
                    </div>
                    
                    <Link onClick={() => this.setState({isEdit: true})} to={ROUTES.ADMIN_NEWS + '/' + result._id}><span className="title ml-2">{result.news_title} <small>({result.news_type})</small></span></Link>
  
                    <div className={"tags pl-3" + (catagory === "All" ? '' : '')}>
  
                      {result.news_tags?.length > 0 ?
                        result.news_tags?.map(tag => (
                          <div onClick={() => this.getNewsByTag(tag.tag_name)} className="badge badge-dark">{tag.tag_name}</div>
                        ))
                        :
                        <div className="badge badge-dark" style={{cursor: 'default'}}>None</div>
                      }
  
                    </div>
  
                  </div>
                  )
  
                })}
              </div>
  
            </div>
          </div>

          <div className="col col-12 col-md-5">
            <NewsAdd tags={this.state.tags} isEdit={this.state.isEdit} news_id={this.props.match.params.id} isExact={this.props.match.isExact} changeIsEdit={this.changeIsEdit}/>
          </div>

        </div>
      </div>
    );
  }
}

export default AdminPage