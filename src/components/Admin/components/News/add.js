import React, {Component} from 'react';
import { withRouter, Link } from 'react-router-dom';
import axios from 'axios';
import moment from 'moment'

import 'react-day-picker/lib/style.css';
import DayPickerInput from 'react-day-picker/DayPickerInput';

import {
  formatDate,
  parseDate,
} from 'react-day-picker/moment';

// import 'moment/locale/it';

import * as ROUTES from '../../../../constants/routes';

const initial_state = {
  // Keep in mind any new states that are added here must be whitelisted on the server route for addNewsDocument and editNewsDocument
  news_type: "",
  news_title: "",
  news_tagline: "",
  news_notes: "",
  news_date: new Date(),
  news_tags: [],
  url: '',
  hero_url: "",
  last_update: new Date(),
  visible: true,

  tagSelectOpen: false,

  submitting_data: false,
  submitting_error: false,
  submitting_error_text: '',

  editLoading: false,
  isInitial: true,
}

class newsAdd extends Component {
  constructor(props) {
  super(props);

    this.state = {
      ...initial_state,
    }

    this.handleChange = this.handleChange.bind(this);
    this.pushNews = this.pushNews.bind(this);
    this.handleUpdateDayChange = this.handleUpdateDayChange.bind(this);
    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {

    if (this.props.news_id !== undefined) {
      console.log("Grab that shit!");

      // Now in loadNews
      // this.setState({
      //   editLoading: true
      // })

      this.loadNews(this.props.news_id);

    }

  }

  getSnapshotBeforeUpdate(prevProps, prevState) {
    if (prevProps.news_id !== this.props.news_id && this.props.news_id !== undefined) {
      console.log("New ID has changed and we need to reload the box");
      this.loadNews(this.props.news_id);
    }
  }

  loadNews(news_id) {
    const self = this;

    // Clear old document, new document may not always have all the fields that the current one has so may cause overrides if it was not for this.
    self.setState({
      ...initial_state,
      editLoading: true
    });

    axios.post('/api/getNewsDocument', {
      news_id: news_id
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        ...response.data.document,
        editLoading: false
      });

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

  handleDateChange(day) {
    this.setState({ 
      last_update: day,
      // date: moment(day, 'Y-M-D').unix() 
    });
  }

  handleUpdateDayChange(day) {
    this.setState({ 
      last_update: day,
      // date: moment(day, 'Y-M-D').unix() 
    });
  }

  pushNews() {
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

    }

  }

  render(props) {

    return(
      <div className="news-manage-plate bottom-add">
        {/* <h1>Document Details</h1> */}
        
        {
        this.props.news_id === undefined ? 
          null
          :
          <Link to={ROUTES.ADMIN_NEWS}><div className="clear" onClick={() => this.changeIsEdit(false)}>Cancel Edit</div></Link>
        }

        <div className="row">

          <div className="col-12">
            {this.state.editLoading ? 
            <div className="alert alert-danger">Loading Story</div>
            :
            null
            }
          </div>

          <div className="col-12">
            {
              this.state.news_id === '' ? 
              '' 
              : 
              <div className="d-flex justify-content-between">
                <div className="badge badge-dark mb-3">{this.state.news_id}</div>
  
                {this.state.editLoading ? 
                <div className="badge badge-warning mb-3">Loading</div>
                :
                this.state.editLoadingError ? 
                <div className="badge badge-danger mb-3">Error</div>
                :
                <div className="badge badge-success mb-3">Success</div>
                }
              </div>
            }
          </div>
          
          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="newsType">News Type:</label>
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
              <label for="news_title">{this.state.news_type === ''  ? 'News' : this.state.news_type} Title:</label>
              <input 
                type="text" 
                className="form-control" 
                id="news_title"
                name="news_title" 
                aria-describedby=""
                value={this.state.news_title}
                onChange={this.handleChange}
                placeholder=""
                disabled={this.state.editLoading ? 'disabled' : ''}
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="news_title">Hero URL:</label>
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
              <label for="news_title">Fancy URL:</label>
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

          {/* <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="news_date">{this.state.news_type === '' ? 'News' : this.state.news_type} Date:</label>
              <input 
                type="text" 
                className="form-control" 
                id="news_date"
                name="news_date" 
                aria-describedby=""
                value={this.state.news_date}
                onChange={this.handleChange}
                disabled
                placeholder=""
              />
            </div>
          </div> */}

          <div className="col-12 col-md-6">

            <div className="form-group tags-group">

                <label for="news_title">{this.state.news_type === '' ? 'News' : this.state.news_type} Tags:</label>
                <div className="preview form-control">

                  <div className="tags">
                    {this.state.news_tags.length > 0 ?
                    this.state.news_tags.map((tag) => (
                      <div onClick={() => this.removeTag(tag)} className="badge badge-dark d-inline-block mr-1">{tag.tag_name}</div>
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
                    {/* <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Elon Musk"} ] })} className="badge badge-dark mr-1">Elon Musk</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Tesla"} ] })} className="badge badge-dark mr-1">Tesla</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "SpaceX"} ] })} className="badge badge-dark mr-1">SpaceX</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "NASA"} ] })} className="badge badge-dark mr-1">NASA</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Monsanto"} ] })} className="badge badge-dark mr-1">Monsanto</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Bill Gates"} ] })} className="badge badge-dark mr-1">Bill Gates</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "United Nations"} ] })} className="badge badge-dark mr-1">United Nations</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Bernie Sanders"} ] })} className="badge badge-dark mr-1">Bernie Sanders</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Donald Trump"} ] })} className="badge badge-dark mr-1">Donald Trump</badge>
                    <badge onClick={() => this.setState({ news_tags: [...this.state.news_tags, {id: Math.floor(Math.random()*90000) + 10000, tag_name: "Edward Snowden"} ] })} className="badge badge-dark mr-1">Edward Snowden</badge> */}
                    
                  </div>
                  :
                  null
                  }
                  

                </div>

            </div>

          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="news_date">News Date:</label>
              <DayPickerInput 
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
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="news_date">Last Update:</label>
              <DayPickerInput 
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
              />
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="visible">Visible:</label>
              <select className="form-control" name="visible" disabled={this.state.editLoading ? 'disabled' : ''} id="visible" value={this.state.visible} onChange={this.handleChange}>
                <option value={true}>True</option>
                <option value={false}>False</option>
              </select>
            </div>
          </div>
          
          {/* <div className="col-12 col-md-6">
            <div className="form-group">
              <label for="news_date">Last Update:</label>
              <input 
                type="text" 
                className="form-control" 
                id="news_date"
                name="news_date" 
                aria-describedby=""
                value={this.state.last_update}
                onChange={this.handleChange}
                disabled
                placeholder=""
              />
            </div>
          </div> */}

          <div className="col-12">
            <div className="form-group">
              <label for="news_tagline">Tagline</label>
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
              <label for="news_notes">Purpose of Story / Notes</label>
              <textarea 
                className="form-control" 
                id="news_notes" 
                name="news_notes"
                value={this.state.news_notes}
                onChange={this.handleChange}
                rows="7"
                disabled={this.state.editLoading ? 'disabled' : ''}>
            </textarea>
            </div>
          </div>

        </div>

        {this.state.submitting_data ? ' Sending...' : null}
        <div className="btn btn-articles-light w-100 mt-5" onClick={this.pushNews}>Submit</div>

      </div>
    )
  }
}

export default withRouter(newsAdd)