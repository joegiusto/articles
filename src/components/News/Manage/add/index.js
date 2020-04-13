import React, {Component} from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const initial_state = {
  news_type: "",
  news_title: "",
  news_notes: "",

  submitting_data: false,
  submitting_error: false,
  submitting_error_text: ''
}

class newsAdd extends Component {
  constructor(props) {
  super(props);

    this.state = {
      ...initial_state
    }

    this.handleChange = this.handleChange.bind(this);
    this.add = this.add.bind(this);
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  add() {
    console.log("Seen");
    const self = this;

    this.setState({
      submitting_data: true,
    });

    axios.post('/addNewsDocument', {
      data: self.state
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        ...initial_state
      });

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

  render() {

    return(
      <div className="news-manage-plate">
        <h1>News Management</h1>

        <div className="row">

          <div className="col-12 col-md-6">
            <div class="form-group">
              <label for="newsType">News Type:</label>
              <select class="form-control" name="news_type" id="news_type" value={this.state.news_type} onChange={this.handleChange}>
                <option value={this.state.value}>Choose One</option>
                <option value={'Story'}>Story</option>
                <option value={'Issue'}>Issue</option>
                <option value={'Myth'}>Myth</option>
              </select>
            </div>
          </div>

          <div className="col-12 col-md-6">
            <div class="form-group">
              <label for="news_title">{this.state.news_type === '' ? 'News' : this.state.news_type} Title:</label>
              <input 
                type="text" 
                className="form-control" 
                id="news_title"
                name="news_title" 
                aria-describedby=""
                value={this.state.news_title}
                onChange={this.handleChange}
                placeholder=""
              />
            </div>
          </div>

          <div className="col-12">
            <div class="form-group">
              <label for="news_notes">Purpose of Story / Notes</label>
              <textarea 
                className="form-control" 
                id="news_notes" 
                name="news_notes"
                value={this.state.news_notes}
                onChange={this.handleChange}
                rows="7">
            </textarea>
            </div>
          </div>

        </div>

        {this.state.submitting_data ? ' Sending...' : null}
        <div className="btn btn-articles-light w-100 mt-5" onClick={this.add}>Submit</div>

      </div>
    )
  }
}

export default newsAdd