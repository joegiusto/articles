import React, {Component} from 'react';
// import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment'
import qs from 'qs'
import { withRouter } from 'next/router'

// import 'react-day-picker/lib/style.css';
// import DayPickerInput from 'react-day-picker/DayPickerInput';

// import {
//   formatDate,
//   parseDate,
// } from 'react-day-picker/moment';

// import 'moment/locale/it';

// import * as ROUTES from '../../../../constants/routes';
import ROUTES from 'components/constants/routes'
// import AdminLayout from 'components/layouts/admin.js';

const initial_state = {
  // Keep in mind any new states that are added here must be whitelisted on the server route for addNewsDocument and editNewsDocument
  _id: "",
  news_type: "",
  news_title: "",
  news_tagline: "",
  news_notes: "",
  news_date: new Date(),

  news_tags: [],
  proposals: [],
  authors: [],

  url: '',
  hero_url: "",
  last_update: new Date(),
  visible: true,

  author: '',

  tagSelectOpen: false,
  proposalSelectOpen: false,
  authorsSelectOpen: false,

  submitting_data: false,
  submitting_error: false,
  submitting_error_text: '',

  editLoading: false,
  isInitial: true,
}

class Add extends Component {
  constructor(props) {
  super(props);

    this.state = {
      ...initial_state,
      formatGuideOpen: false,
      writerFromDocument: false,
    }

    this.handleChange = this.handleChange.bind(this);
    this.pushNews = this.pushNews.bind(this);
    this.handleUpdateDayChange = this.handleUpdateDayChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
    this.tryUrlFromTitle = this.tryUrlFromTitle.bind(this);
  }

  componentDidMount() {

    if (this.props.news_id !== undefined) {
      console.log("Grab that shit!");

      // Now in loadNews
      // this.setState({
      //   editLoading: true
      // })

      // var qsParse = qs.parse(this.props.location.search, { ignoreQueryPrefix: true });
      // console.log(qsParse.writerFromDocument)

      this.loadNews(this.props.news_id);

    }

  }

    // getSnapshotBeforeUpdate(prevProps, prevState) {
    //     if (prevProps.news_id !== this.props.news_id && this.props.news_id !== undefined) {
    //     console.log("New ID has changed and we need to reload the box");
    //     this.loadNews(this.props.news_id);
    //     }
    // }

    componentDidUpdate(prevProps) {
        if (prevProps.news_id !== this.props.news_id && this.props.news_id !== undefined) {
            console.log("New ID has changed and we need to reload the box");
            this.loadNews(this.props.news_id);
        }
    }

  tryUrlFromTitle() {
    if (this.state.url === '') {
      this.setState({
        url: this.state.news_title.toLowerCase().replace(/ /g, '_')
      })
    }
  }

  loadNews(news_id) {
    const self = this;
    console.log("loadNews caleld")

    // Clear old document, new document may not always have all the fields that the current one has so may cause overrides if it was not for this.
    self.setState({
      ...initial_state,
      editLoading: true
    });

    axios.post('/api/news', {
      news_id: news_id
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        ...response.data.document,
        editLoading: false,
      });

      self.props.changeIsEdit(true)

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        editLoading: false,
        editLoadingError: true
      });
    });

  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  changeIsEdit(value) {
    this.props.changeIsEdit(value);
    this.setState({
      ...initial_state
    });
  }

  addProposal(proposalObj) {

    if ( !contains(proposalObj, this.state.proposals) ) {
      this.setState({ 
        proposals: [...this.state.proposals, {
          _id: proposalObj._id,
          title: proposalObj.title
        } ] 
      })
    }

    function contains(obj, list) {
      return list.some(function(elem) {
           return elem._id === obj._id
      })
    }

  }

  addTag(tagObj) {

    if ( !contains(tagObj, this.state.news_tags) ) {
      this.setState({ 
        news_tags: [...this.state.news_tags, {...tagObj} ] 
      })
    }

    function contains(obj, list) {
      return list.some(function(elem) {
           return elem._id === obj._id
      })
    }

  }

  addAuthor(id) {

    if ( !contains(id, this.state.authors) ) {
      this.setState({ 
        authors: [...this.state.authors, id ] 
      })
    }

    function contains(passed_id, list) {
      return list.some(function(elem) {
           return elem === passed_id
      })
    }

  }

  removeProposal(tagObj) {

    if ( contains(tagObj, this.state.proposals) ) {
      this.setState({ 
        proposals:  this.state.proposals.filter(function( obj ) {
          return obj._id !== tagObj._id;
        }) 
      })
    }

    function contains(obj, list) {
      return list.some(function(elem) {
           return elem._id === obj._id
      })
    }

  }

  removeTag(tagObj) {

    if ( contains(tagObj, this.state.news_tags) ) {
      this.setState({ 
        news_tags:  this.state.news_tags.filter(function( obj ) {
          return obj._id !== tagObj._id;
        }) 
      })
    }

    function contains(obj, list) {
      return list.some(function(elem) {
           return elem._id === obj._id
      })
    }

  }

  removeAuthor(id) {

    if ( contains(id, this.state.authors) ) {
      this.setState({ 
        authors:  this.state.authors.filter(function( obj ) {
          return obj !== id;
        }) 
      })
    }

    function contains(passed_id, list) {
      return list.some(function(elem) {
           return elem === passed_id
      })
    }

  }

  handleDateChange(day) {
    this.setState({ 
      news_date: day,
      // date: moment(day, 'Y-M-D').unix() 
    });
  }

  handleUpdateDayChange(day) {
    this.setState({ 
      last_update: day,
      // date: moment(day, 'Y-M-D').unix() 
    });
  }

  renderRoute(type) {
    switch(type) {
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

  pushNews(options) {
    const self = this;

    this.setState({
      submitting_data: true,
    });

    if (this.props.news_id === undefined) {

      // If props.news_id is not set then we are dealing with a new document so we call /addNewsDocument
      axios.post('/api/addNewsDocument', {
        data: self.state
      })
      .then(function (response) {
        console.log(response);

        self.props.changeIsEdit(false)
  
        self.setState({
          ...initial_state
        });

        self.props.history.push(ROUTES.ADMIN_NEWS);
      })
      .catch(function (error) {
        console.log(error);
  
        self.setState({
          submitting_data: false,
          submitting_error: true,
          submitting_error_text: error
        });
      });

    } else {
      console.log("We need to update a existing document");

      // If props.news_id is not set then we are dealing with a new document so we call /addNewsDocument
      axios.post('/api/editNewsDocument', {
        data: self.state
      })
      .then(function (response) {
        console.log(response);

        self.props.changeIsEdit(false)

        const savedURL = self.state.url
        const savedType = self.state.news_type
  
        self.setState({
          ...initial_state
        });

        if (options.redirect === true) {
          console.log("HERE")
          self.props.history.push(`${self.renderRoute(savedType)}/${savedURL}`);
        } else {
          console.log("THERE")
          self.props.history.push(ROUTES.ADMIN_NEWS);
        }

      })
      .catch(function (error) {
        console.log(error);
  
        self.setState({
          submitting_data: false,
          submitting_error: true,
          submitting_error_text: error
        });
      });

    }

  }

  render(props) {

    return(
      <div className={"edit-panel bottom-add " + ( this.props.isEdit ? 'active' : '' ) }>

        <div className={"overlay " + (this.props.isEdit ? '' : 'activee')}>

          <div className="greetings">Hello {this.props.user.first_name},</div>

          <div className="updates">You have 0 new mentions</div>

          <button className="btn btn-articles-light" onClick={() => this.props.changeIsEdit(true)}>Add Content</button>

          <small className="mt-1">Version 3.0</small>
          {/* <small className="mt-3">Changelog</small> */}
        </div>

        <div className={"edit-status " + (this.props.isEdit || this.state.editLoading ? '' : 'd-none')}>

          <div className="details">
            {
              this.props.news_id === '' || this.props.news_id === undefined ? 
              '' 
              : 
              <div className="d-flex justify-content-between">
                <div className="badge badge-dark">{this.state.news_id}</div>
  
                {this.state.editLoading ? 
                <div className="badge badge-warning">Loading</div>
                :
                this.state.editLoadingError ? 
                <div className="badge badge-danger">Error</div>
                :
                <div className="badge badge-success">Success</div>
                }
              </div>
            }

            <div className="type badge badge-dark ml-1">{this.state.news_type}</div>

            <div className="title">{this.state.news_title}</div>
            
          </div>

          <div>
            <button className="btn btn-warning" onClick={() => this.changeIsEdit(false) + this.props.router.push(ROUTES.ADMIN_NEWS)}>Cancel</button>
            <button className="btn btn-danger">Delete</button>
            <button disabled={ this.state.submitting_data || this.state.news_type === '' || this.state.news_title === '' || this.state.hero_url === '' || this.state.url === '' || this.state._id === ''} className="btn btn-primary" onClick={() => this.pushNews({redirect: true})}>Save/View</button>
            <button disabled={ this.state.submitting_data || this.state.news_type === '' || this.state.news_title === '' || this.state.hero_url === '' || this.state.url === ''} className="btn btn-success" onClick={() => this.pushNews({redirect: false})}>Save</button>
          </div>

        </div>

        {/* <h1>Document Details</h1> */}
        
        {/* {
        this.props.news_id === undefined ? 
          null
          :
          <Link to={ROUTES.ADMIN_NEWS}><div className="clear" onClick={() => this.changeIsEdit(false)}>Cancel Edit</div></Link>
        } */}

        {/* {
        this.props.news_id === undefined && this.props.isEdit ? 
          <Link to={ROUTES.ADMIN_NEWS}><div className="clear" onClick={() => this.changeIsEdit(false)}>Cancel</div></Link>
          :
          null
        } */}

        <div className="row">

          {/* <div className="col-12">
            {this.state.editLoading ? 
            <div className="alert alert-danger">Loading Story</div>
            :
            null
            }
          </div> */}

          <div className="col-12">
            
          </div>
          
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="newsType">News Type:</label>
              <select className="form-control" name="news_type" disabled={this.state.editLoading ? 'disabled' : ''} id="news_type" value={this.state.news_type} onChange={this.handleChange}>
                <option value={''}>Choose One</option>
                <option value={'story'}>Story</option>
                <option value={'issue'}>Issue</option>
                <option value={'myth'}>Myth</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="news_title">Title:</label>
              <input 
                type="text" 
                className="form-control" 
                id="news_title"
                name="news_title" 
                aria-describedby=""
                value={this.state.news_title}
                onChange={this.handleChange}
                onBlur={this.tryUrlFromTitle}
                placeholder=""
                disabled={this.state.editLoading ? 'disabled' : ''}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="news_title">Hero URL:</label>
              <input 
                type="text" 
                className="form-control" 
                id="hero_url"
                name="hero_url" 
                aria-describedby=""
                value={this.state.hero_url}
                onChange={this.handleChange}
                placeholder=""
                disabled={this.state.editLoading ? 'disabled' : ''}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="news_title">Fancy URL:</label>
              <input 
                type="text" 
                className="form-control" 
                id="url"
                name="url" 
                aria-describedby=""
                value={this.state.url}
                onChange={this.handleChange}
                placeholder=""
                disabled={this.state.editLoading ? 'disabled' : ''}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">

            <div className="form-group tags-group">

                <label htmlFor="news_title">Tags:</label>

                <div className="preview form-control">

                  <div className="tags">
                    {this.state.news_tags.length > 0 ?
                    this.state.news_tags.map((tag) => (
                      <div key={tag.tag_name} onClick={() => this.removeTag(tag)} className="badge badge-dark d-inline-block mr-1">{tag.tag_name}</div>
                    ))
                    :
                    <div className="badge badge-danger d-inline-block">No Tags</div>
                    }
                    
                  </div>
                  
                  <div className="edit" onClick={() => {this.setState({tagSelectOpen: !this.state.tagSelectOpen})}}>
                    <i className="fas fa-file-signature"></i>
                  </div>

                  {this.state.tagSelectOpen ? 
                  <div className="select noselect">

                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="news_tag_search"
                        name="news_tag_search" 
                        aria-describedby=""
                        value={this.state.news_tag_search}
                        onChange={this.handleChange}
                        placeholder="Search Tags"
                      />
                    </div>

                    {/* Replace this with a map of the database tags */}
                    {this.props.tags !== [] ?
                    this.props.tags.map((tag) => (
                      <div onClick={() => this.addTag(tag)} className="badge badge-dark mr-1">{tag.tag_name}</div>
                    ))
                    :
                      <div className="badge badge-warning mr-1">Loading</div>
                    }                  
                  </div>
                  :
                  null
                  }
                  

                </div>

            </div>

          </div>

          <div className="col-12 col-md-6">

            <div className="form-group proposals-group">

                <label htmlFor="news_title">Proposals:</label>

                <div className="preview form-control">

                  <div className="tags">
                    {this.state.proposals.length > 0 ?
                    this.state.proposals.map((proposal) => (
                      <div onClick={() => this.removeProposal(proposal)} className="badge badge-dark d-inline-block mr-1">{proposal.title}</div>
                    ))
                    :
                    <div className="badge badge-danger d-inline-block">No Proposals</div>
                    }
                    
                  </div>
                  
                  <div className="edit" onClick={() => {this.setState({proposalSelectOpen: !this.state.proposalSelectOpen})}}>
                    <i className="fas fa-file-signature"></i>
                  </div>

                  {this.state.proposalSelectOpen ? 
                  <div className="select noselect">

                    <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="news_tag_search"
                        name="news_tag_search" 
                        aria-describedby=""
                        value={this.state.news_tag_search}
                        onChange={this.handleChange}
                        placeholder="Search Tags"
                      />
                    </div>

                    {/* Replace this with a map of the database tags */}
                    {this.props.proposals !== [] ?
                    this.props.proposals.map((proposal) => (
                      <div onClick={() => this.addProposal(proposal)} className="badge badge-dark mr-1">{proposal.title}</div>
                    ))
                    :
                      <div className="badge badge-warning mr-1">Loading</div>
                    }                  
                  </div>
                  :
                  null
                  }
                  

                </div>

            </div>

          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="news_date">News Date:</label>
              {/* <DayPickerInput 
                style={{display: 'block'}}
                onDayChange={this.handleDateChange}
                inputProps={{className: 'form-control'}}
                value={`${formatDate(new Date(this.state.news_date))}`}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  showWeekNumbers: true,
                  todayButton: 'Today',
                }}
              /> */}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="news_date">Last Update:</label>
              {/* <DayPickerInput 
                style={{display: 'block'}}
                onDayChange={this.handleUpdateDayChange}
                inputProps={{className: 'form-control'}}
                value={`${formatDate(new Date(this.state.last_update))}`}
                formatDate={formatDate}
                parseDate={parseDate}
                dayPickerProps={{
                  showWeekNumbers: true,
                  todayButton: 'Today',
                }}
              /> */}
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label htmlFor="visible">Visible:</label>
              <select className="form-control" name="visible" disabled={this.state.editLoading ? 'disabled' : ''} id="visible" value={this.state.visible} onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">

            <div className="form-group tags-group">

                <label htmlFor="news_title">Authors:</label>

                <div className="preview form-control">

                  <div className="author">
                    {this.state.authors.length > 0 ?
                    this.state.authors.map((author) => {
                      const fullAuthor = this.props.authors.find((propAuthor) => propAuthor._id === author)

                      return (
                        <div onClick={() => this.removeAuthor(author)} className="badge badge-dark d-inline-block mr-1">
                          {`${fullAuthor?.first_name} ${fullAuthor?.last_name }`|| author}
                          {/* {console.log(  )} */}
                        </div>
                      )
                    })
                    :
                    <div className="badge badge-danger d-inline-block">No Authors</div>
                    }
                    
                  </div>
                  
                  <div className="edit" onClick={() => {this.setState({authorsSelectOpen: !this.state.authorsSelectOpen})}}>
                    <i className="fas fa-file-signature"></i>
                  </div>

                  {this.state.authorsSelectOpen ? 
                  <div className="select noselect">

                    {/* <div className="form-group">
                      <input 
                        type="text" 
                        className="form-control" 
                        id="news_tag_search"
                        name="news_tag_search" 
                        aria-describedby=""
                        value={this.state.news_tag_search}
                        onChange={this.handleChange}
                        placeholder="Search Tags"
                      />
                    </div> */}

                    {/* Replace this with a map of the database tags */}
                    {this.props.authors !== [] ?
                    this.props.authors.map((author) => (
                      <div onClick={() => this.addAuthor(author._id)} className="badge badge-dark mr-1">{author.first_name} {author.last_name}</div>
                    ))
                    :
                      <div className="badge badge-warning mr-1">Loading</div>
                    }                  
                  </div>
                  :
                  null
                  }
                  

                </div>

            </div>

          </div>

          <div className="col-12 col-md-6 d-none">
            <div className="form-group">
              <label htmlFor="visible">Author:</label>
              <select className="form-control" name="author" id="author" value={this.state.author} onChange={this.handleChange}>
              <option value={undefined}>None</option>
              {this.props.authors.map(author => <option value={author._id}>{author.first_name} {author.last_name}</option>)}
              </select>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="news_tagline">Tagline</label>
              <textarea 
                className="form-control" 
                id="news_tagline" 
                name="news_tagline"
                value={this.state.news_tagline}
                onChange={this.handleChange}
                rows="3"
                disabled={this.state.editLoading ? 'disabled' : ''}>
            </textarea>
            </div>
          </div>

          <div className="col-12">
            <div className="form-group">
              <label htmlFor="news_notes">Content</label>

              <div className="content-controls">

                <button className="btn btn-articles-light control noselect" onClick={() => this.setState({formatGuideOpen: true})}>
                  <i className="far fa-question-circle mr-0"></i>
                </button>
                
                <button className="btn btn-articles-light control h1 noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${'<h1></h1>'}`})}>
                  {'<h1/>'}
                </button>

                <button className="btn btn-articles-light control h2 noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${'<h2></h2>'}`})}>
                  {'<h2/>'}
                </button>

                <button className="btn btn-articles-light control h3 noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${'<h3></h3>'}`})}>
                  {'<h3/>'}
                </button>

                <button className="btn btn-articles-light control h4 noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${'<h4></h4>'}`})}>
                  {'<h4/>'}
                </button>

                <button className="btn btn-articles-light control h5 noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${'<h5></h5>'}`})}>
                  {'<h5/>'}
                </button>

                <button className="btn btn-articles-light control noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${'<img src="" alt=""></img>'}`})}>
                  {'<img/>'}
                </button>

                <button className="btn btn-articles-light control noselect" onClick={() => this.setState({news_notes: `${this.state.news_notes}\n${`<a href='https://articles.media' target="_blank" rel="noopener noreferrer">Articles Media</a>`}`})}>
                  {'<a/>'}
                </button>

              </div>
              
              <TextareaAutosize
                className="form-control" 
                id="news_notes" 
                name="news_notes"
                value={this.state.news_notes}
                onChange={this.handleChange}
                // rows="7"
                disabled={this.state.editLoading ? 'disabled' : ''}>
              </TextareaAutosize>
            </div>
          </div>

        </div>

        {/* {this.state.submitting_data ? ' Sending...' : null} */}
        {/* <div className="submit btn btn-articles-light w-100 mt-5" onClick={this.pushNews}>Submit</div> */}

      </div>
    )
  }
}

export default withRouter(Add)