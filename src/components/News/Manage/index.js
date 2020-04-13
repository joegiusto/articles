import React, { Component } from 'react';
import { Switch, Route, Link } from 'react-router-dom';
import { compose } from 'recompose';

import { withFirebase } from '../../Firebase';
import { withAuthorization, withEmailVerification } from '../../Session';
import * as ROLES from '../../../constants/roles';
import * as ROUTES from '../../../constants/routes';

import axios from 'axios';

import NewsAdd from './add';

class AdminPage extends Component {
  constructor(props) {
  super(props);

    this.state = {
      catagory: 'All',
      
      searchAlert: false,
      searchFilter: 'Content',
      searchText: '',

      searchHistory: [],
      searchLoading: false,
      searchLoadingError: '',

      tags: [],
      searchedTag: '',
      tagsLoading: false,
      tagsLoadingError: '',

      resultsAll: [],
      results: [],
      resultsLoading: false,
      resultsLoadingError: '',

      stories: [],
      issues: [],
      myths: [],
    };

    // this.getNewsByTag = this.getNewsByTag.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    let self = this;
    self.setState({ tagsLoading: true });
    self.setState({ searchLoading: true });
    self.setState({ resultsLoading: true });

    axios.get('/issue-tags')
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({
        tags: response.data
      });

      self.setState({ tagsLoading: false });

    })
    .catch(function (error) {
      // handle error
      console.log(error);

      self.setState({ tagsLoading: true });
      self.setState({ tagsLoadingError: error });
    });

    axios.get('/search-history')
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({
        searchHistory: response.data
      });

      self.setState({ searchLoading: false });

    })
    .catch(function (error) {
      // handle error
      console.log(error);

      self.setState({ searchLoading: true });
      self.setState({ searchLoadingError: error });
    });

    axios.get('/getNews')
    .then(function (response) {

      // handle success
      console.log(response.data);

      self.setState({
        results: response.data,
        resultsAll: response.data
      });

      self.setState({ resultsLoading: false });

    })
    .catch(function (error) {
      // handle error
      console.log(error);

      self.setState({ resultsLoading: true });
      self.setState({ resultsLoadingError: error });
    });

  }

  componentWillUnmount() {
    // this.props.firebase.issues().off();
  }

  getNewsByTag(tag) {
    let self = this;
    let catagoryWas = this.state.catagory;

    console.log(tag);

    axios.post('/getNewsByTag', {
      tag: tag
    })
    .then(function (response) {

      console.log(response);

      self.setState({ 
        results: response.data,
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

    let catagoryNumber = 0;

    switch(catagory) {
      case 'Stories':
        catagoryNumber = 1;
        break;
      case 'Issues':
        catagoryNumber = 2;
        break;
      case 'Myths':
        catagoryNumber = 3;
        break;
      default:
        catagoryNumber = 0;
    }

    this.setState({
      catagory: catagory,
      searchFilter: 'Content',
      results: catagoryNumber !== 0 ? this.state.resultsAll.filter(result => result.catagory === catagoryNumber) : this.state.resultsAll,
      searchedTag: ''
    })
  }

  changeSearchFilter(filter) {
    this.setState({
      searchFilter: filter
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

    return (
      <div className="container">
      <div>

        <div className="news-manage-plate">
          <h1>News Management</h1>
          <div className="row justify-content-between">
            <div className="col-12 col-md-7">
              <p>Page for only Admins and Writers to manage news details. Here you can update and create content for Article's News Pages.</p>
            </div>
            <div className="col-12 col-md-4">
            <p>Looking for <Link to={ROUTES.SUBSCRIBE}>Your News Managemnet?</Link> </p>
            </div>
          </div>
          
          

          <div className="catagories">
            <div onClick={() => this.changeCatagory("All")} className={"catagory " + (catagory === "All" ? 'active' : '')}>All</div>
            <div onClick={() => this.changeCatagory("Stories")} className={"catagory " + (catagory === "Stories" ? 'active' : '')}>Stoires</div>
            <div onClick={() => this.changeCatagory("Issues")} className={"catagory " + (catagory === "Issues" ? 'active' : '')}>Issues</div>
            <div onClick={() => this.changeCatagory("Myths")} className={"catagory " + (catagory === "Myths" ? 'active' : '')}>Myths</div>
          </div>

          <div className="search-controls">
            <div className="controls">
              <span onClick={() => this.changeSearchFilter('Content')} className={"badge " + (searchFilter === "Content" ? 'badge-primary' : 'badge-secondary')}>Content</span>
              {/* <span onClick={() => this.changeSearchFilter(catagory)} className={"badge " + (searchFilter === catagory ? 'badge-primary' : 'badge-secondary')}>{catagory} Title</span> */}
              <span onClick={() => this.changeSearchFilter('Tags')} className={"badge " + (searchFilter === "Tags" ? 'badge-primary' : 'badge-secondary')}>Tags</span>
              
              <input className="" name="searchText" type="text" value={searchText} onChange={this.handleChange}/>
              <div onClick={() => this.searchText()} className="btn btn-articles-light">Go</div>

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

                  {/* <span className="badge badge-primary">Still working on this</span>
                  <span className="badge badge-primary">Still working on this</span>
                  <span className="badge badge-primary">Still working on this</span> */}

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
                <div className="assist-header">Popular Tags:</div>
                <div className="tags">
                  {tags.map((tag) =>
                    <span key={tag.description} onClick={() => this.getNewsByTag(tag.description)} className={"badge " + (tag.description === this.state.searchedTag ? 'badge-dark' : 'badge-light')}>{tag.description}</span>
                  )}
                </div>
              </div>
              )
              : 
              ''
              }

            </div>
          </div>

          <div className="results">
            <div className="results-header">Results:</div>
            {resultsLoading ? 
             (resultsLoadingError === '' ? <span className="badge badge-success">Loading...</span> : <div><div className="badge badge-danger">Error Loading Results</div><div><small>Most likely the content server is off.</small></div></div>)
            :
            ''
            }
            {results.map((result) => {
              const d = new Date(result.date);
              let splits = [];

              return (
              <div className="result" key={result.issue_id}>
                {/* <Link to={"/news/manage/" + result.issue_id}><button className="btn btn-articles-light"><i className="fas fa-edit mr-0"></i></button></Link> */}
                {/* <button className="btn btn-articles-light">Edit</button> */}
                <span className="date badge badge-dark border ml-2">{d.toLocaleString().split(',')[0]} </span>
                <Link to={"/news/manage/" + result.issue_id}><span className="title ml-2">{result.title}</span></Link>

                <div className={"tags " + (catagory === "All" ? '' : 'd-none')}>
                  {result.tags_names !== null ?

                    (
                      splits = result.tags_names.split(','),
                      splits.map((tag) => {
                        return <span onClick={() => this.getNewsByTag(tag)} className={"badge " + (tag === this.state.searchedTag ? 'badge-dark' : 'badge-light')}>{tag}</span>
                      })
                    )

                  :
                   'No Tags'
                  }
                </div>

              </div>
              )

              })}
          </div>

          <div className="add">
            {catagory === 'All' ? 
            null
            :
            <button className="btn btn-articles-light">Add {catagory}</button>
            }
          </div>

        </div>

        <NewsAdd/>

        <Switch>
          <Route exact path={ROUTES.MANAGE_DETAILS} component={UserItem} />
          {/* <Route exact path={ROUTES.MANAGE} component={IssuesList} /> */}
        </Switch>

      </div>
    </div>
    );
  }
}

class IssuesListBase extends Component {
  constructor(props) {
  super(props);

    this.state = {
      loadingStories: false,
      loadingIssues: false,
      loadingMyths: false,

      firebaseStories: [],
      firebaseIssues: [],
      firebaseMyths: [],

      id: "",
      title: "",
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  convert(fakeArray) {

    if (fakeArray !== undefined) {
      const str = [...fakeArray.split(",")];
      console.log(str.length);

      return (str);
      
    } else {
      return undefined;
    }

  }

  componentDidMount() {
    // this.onListenForNews();

    this.setState({ loadingStories: true });
    this.setState({ loadingIssues: true });
    this.setState({ loadingMyths: true });

    axios.get('/issue-tags')
    .then(function (response) {

      // handle success
      console.log(response);

      this.setState({
        firebaseIssues: response
      });

    })
    .catch(function (error) {
      // handle error
      console.log(error);
    });

    
    
  }

  componentWillUnmount() {
    this.props.firebase.issues().off();
  }

  handleInputChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  addIssue() {
    
    this.props.firebase.issue(this.state.id).set({

      title: this.state.title,
      interest: {
        states: "None",
        city: 'None'
      } 

    });

    this.setState({

      id: '', 
      title: '', 

    });
  }

  removeIssue(id) {
    this.props.firebase.issue(id).set({

    })
  }

  render() {
    const { firebaseIssues, firebaseStories, firebaseMyths, loading } = this.state;

    return (
      <div className="row justify-content-center">

        <div className="col-12 col-md-4 d-none">
          <div className="news-manage-card stories">
            <div className="header">
              <h4>Stories</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All Stories</span>
                  <span className="sort-selection">Search Stories</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseStories.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    {/* <strong>States:</strong>  */}
                    {/* {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) } */}
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.MANAGE}/stories/${user.uid}`}>
                      Edit
                    </Link>

                    {/* <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span> */}

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Story</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Story ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Story Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
        </div>
  
        <div className="col-12 col-md-4">
          <div className="news-manage-card issues">
            <div className="header">
              <h4>Issues</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All</span>
                  <span className="sort-selection">Search</span>
                  <span className="sort-selection">Tags</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseIssues.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    <strong>States:</strong> 
                    {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) }
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.MANAGE}/issues/${user.uid}`}>
                      Edit
                    </Link>

                    <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span>

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Issue</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Issue ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Issue Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
        </div>

        <div className="col-12 col-md-4 d-none">
          <div className="news-manage-card myths">
            <div className="header">
              <h4>Myths</h4>
  
              <div>
                <div className="search">Search</div>
                <input className="w-100 form-control" type="text"/>
              </div>

              <div className="sort-control mt-1">
                  <span>Showing:</span>
                
                  <span className="sort-selection active">All Myths</span>
                  <span className="sort-selection">Search Myths</span>
                
              </div>

            </div>
    
            {loading && <div>Loading ...</div>}
    
            <div className="issue-container">
              {firebaseMyths.map(user => (
                <div className="issue" key={user.uid}>

                  <div className="id">
                    <strong>ID:</strong> {user.uid}
                  </div>
    
                  <div className="title">
                    <strong> Title:</strong> {user.title}
                  </div>
    
                  <div>   
                    {/* {console.log(user.statesArray)} */}
                    {/* <strong>States:</strong>  */}
                    {/* {user.statesArray === undefined ? 'None' : user.statesArray.map(state => (<div className="badge badge-success ml-1">{state}</div>) ) } */}
                    {/* {user.statesArray.map(state => (
                      <div className="badge badge-success">{state}</div>
                    ))} */}       

                    {/* <span>
                      <strong> Cities:</strong>
                    </span> */}  
                  </div>
    
                  <div className="dual-header">

                    <Link to={`${ROUTES.MANAGE}/myths/${user.uid}`}>
                      Edit
                    </Link>

                    {/* <span onClick={() => (this.removeIssue(user.uid))} className="ml-3" style={{color: 'red', textDecoration: 'underline', cursor: 'pointer'}}>
                      Delete
                    </span> */}

                  </div>
    
                </div>
              ))}
            </div>
    
            <div className="footer">
              <h4>Add Myths</h4>
    
              <input 
                name='id' 
                type="text" 
                placeholder="Myth ID"
                value={this.state.id}
                onChange={this.handleInputChange}
                className="form-control"
              />
    
              <input 
                name='title'
                type="text" 
                placeholder="Myth Title"
                value={this.state.title}
                onChange={this.handleInputChange}
                className="form-control mt-1"
              />
    
              <button className="btn btn-articles-light mt-1 w-100" type="submit" onClick={() => (this.addIssue()) }>Add</button>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const UserItem = ({ match }) => (
  <div className="news-edit-plate">

    <Link to={ROUTES.MANAGE}>
      <div className="close-plate">
        X
      </div>
    </Link>

    <div className="container">
      <h2>Editing Issue ({match.params.id})</h2>

      <div className="row">

        <div className="col-12 col-md-6">
          <div className="form-group">
            <label for="exampleFormControlInput1">Title</label>
            <input type="text" className="form-control" id="exampleFormControlInput1" placeholder="SpaceX Lands on Mars!"/>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="form-group">
            <label for="exampleFormControlSelect1">News Category</label>
            <select className="form-control" id="exampleFormControlSelect1">
              <option>Stories</option>
              <option>Issues</option>
              <option>Myths</option>
            </select>
          </div>
        </div>
  
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label for="exampleFormControlSelect2">Tags</label>
            <select multiple className="form-control" id="exampleFormControlSelect2">
              <option>Tesla</option>
              <option>Elon Musk</option>
              <option>SpaceX</option>
              <option>United Nations</option>
              <option>Bernie Sanders</option>
            </select>
          </div>
        </div>
    
        <div className="col-12 col-md-6">
          <div className="form-group">
            <label for="exampleFormControlTextarea1">News Description</label>
            <textarea className="form-control" id="exampleFormControlTextarea1" rows="4"></textarea>
          </div>
        </div>

        <div className="col-12 col-md-6">
          <div className="btn btn-danger w-100">Delete</div>
        </div>

        <div className="col-12 col-md-6">
          <div className="btn btn-articles-light w-25 mx-auto">Update</div>
        </div>
    
      </div>
      
    </div>

  </div>
);

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

const IssuesList = withFirebase(IssuesListBase);

export default compose(
  // withEmailVerification,
  withAuthorization(condition),
)(AdminPage);