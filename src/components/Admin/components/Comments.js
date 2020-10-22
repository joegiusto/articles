import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Comments extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      comments: [],
      commentCount: 0
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    this.setState({
      loading: true
    })

    axios.post('/api/adminComments', {
      
    })
    .then(function (response) {

      console.log(response)

      self.setState({ 
        comments: response.data,
        loading: false
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        loading: false
      })
    });

  }

  componentWillUnmount() {

  }

  deleteReport(id) {
    const self = this;

    axios.post('/api/deleteReport', {
      _id: id
    })
    .then(function (response) {

      console.log(response)

      self.setState({
        reports: self.state.reports.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  respondReport(id, response) {
    const self = this;

    console.log(id, response)

    axios.post('/api/respondReport', {
      _id: id,
      response: response
    })
    .then(function (response) {

      console.log(response)

      // self.setState({
      //   reports: self.state.reports.filter(function( obj ) {
      //     return obj._id !== id;
      //   })
      // });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="admin-page admin-comments">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
              <div>Total: {this.state.comments?.length}</div>
            </div>
          </div>

        </div>

        <div className="main-panel comments">

          <div className="filters mb-3 d-none">

          </div>

          <div>
            {this.state.comments.map((document) => (
              <Comment 
              document={document}
              />
            ))}
          </div>

        </div>

      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Comments);


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
      <div className="comments-container">
        <div><b>{document.news_title}</b></div>

        <div className="comments">

          {document?.comments?.length > 0 ? 

          document.comments?.map((comment) => (
            <div className="ml-2 pl-2 border-left border-dark alert alert-primary">
              <div>{comment._id}</div>
              <div>{comment.user_id}</div>
              <div>{comment.comment}</div>

              {comment.replies?.length > 0 ? 

              comment.replies.map((reply) => (
              <div className="mt-2 ml-2 pl-2 border-left border-dark alert alert-secondary">
                <div>{reply.user_id}</div>
                <div>{reply.comment}</div>
              </div>
              ))
              
              :

              null
              
              }

            </div>
          ))

          :

          <div className="alert alert-danger">No Comments</div>

        }

        </div>
      
      </div>
    );
  }
}