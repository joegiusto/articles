import React from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios'
// import { withFirebase } from '../../Firebase';
import { updateSubscriptionToIssue } from '../../../actions/siteActions'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";
import moment from 'moment'

class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      issues: [],
      news_tags: []
    };

  }

  componentDidMount() {
    const self = this;
    this.setState({ loading: true });

    const stored = this.props.issues.issues?.find(x => x.url === this.props.match.params.id)

    // Swap the comments to reactivate pulling from local cache
    // TODO - For this to work we would need to update the local cached issues 
    // if (stored !== undefined) {
    if (stored === "Won't be") {

      // Try to pull from local storage and if not there then do server call
      self.setState({
        ...stored,
        loading: false
      }, (() => {
        self.loadLastRead();
      }));

    } else {
      // Was not local, we make a server call!
      axios.post('/api/getNewsDocument', {
        news_url: this.props.match.params.id
      })
      .then(function (response) {
        console.log(response);

        self.setState({
          ...response.data.document,
          loading: false
        }, (() => {
          self.loadLastRead();
        }));

      })
      .catch(function (error) {
        console.log(error);

        self.setState({
          editLoading: false
        });
      });
    }

  }

  loadLastRead() {
    // Set the date that the user was last lookign at this story
    if ( this.props.user._id ) {
      console.log("Is a user")

      console.log(this.props.user?.subscriptions)
      console.log(this.state._id)

      const lastDate = this.props.user?.subscriptions.find(x => x.news_id === this.state._id)

      // console.log(lastDate)

      this.setState({
        lastRead: lastDate?.lastRead
      })

      axios.post('/api/updateLastRead', {
        news_id: this.state._id,
        user: this.props.user._id
      })
      .then(function (response) {

        console.log(response);

        if (response.data !== "Was not subscribed to issues") {
          this.props.updateSubscriptionToIssue({
            news_id: this.state._id,
            // lastRead: moment('July 30 2020')
          })
        }

      })
      .catch(function (error) {

        console.log(error);

      });

      // if ( moment(this.state.lastRead).isBefore( moment(this.state.last_update) ) ) {
        
        // console.log("Needs updating client side")

      
      // }

    } 
  }

  render() {

    const {loading, news_notes, lastRead} = this.state;

    // news_notes.replace(/(\r\n|\n|\r)/gm, "")

    return (
      <div className="issues-page">
        {loading ?
        <div className="alert alert-danger">Loading Issue - {this.props.match.params.id}</div>
        :
        <div className="container single">

          {/* <div className="link badge badge-dark w-100 py-2 mb-3" onClick={() => this.props.history.goBack()}>{String.fromCharCode(11148)} Back to Issues</div> */}

          <div className="back-button" onClick={() => this.props.history.goBack()}>
            <i class="far fa-caret-square-left"></i>
            <i class="far fa-caret-square-left stacked"></i>
            <div className="text">Back to Issues</div>
          </div>

          <div className="card ">

            <div className="card-header">

              <h1>{this.state.news_title}</h1>

              {/* <small className="d-block">Issue Stats</small> */}
              {<div className="stat">Last Viewed: {lastRead !== undefined ? moment(lastRead).format("LLL") : 'Never' }</div> }
              <div className="stat">People Subscribed: 1</div>
              
              <div className="dates">
                <div className="badge badge-articles">First Published: {moment(this.state.news_date).format("LL")}</div>
                <div className="badge badge-dark ml-1">Last Updated: {moment(this.state.last_update).format("LLL")}</div>
              </div>
              
            </div>

            <div className="card-tags">
              <small className="pl-4">Tags:</small>
              {this.state.news_tags.length > 0 ? 
                this.state.news_tags?.map((tag) => (
                  <div className="badge badge-light ml-1">{tag.tag_name}</div>
                ))
              :
                <div className="badge badge-light ml-1">None</div>
              }
            </div>

            <div className="card-body">

              {/* <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: news_notes?.replace('<break>', '<div className="alert alert-danger my-3">Testing Break</div>').replace(/(\r\n|\n|\r)/gm, "")}}></div> */}
              <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: news_notes}}></div>

              <h5 className="mt-4">Related Proposals</h5>
              <div className="proposals">
                <div className="proposal"></div>
                <div className="proposal"></div>
                <div className="proposal"></div>
              </div>

            </div>

          </div>

        </div>
        }
      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  stories: state.stories,
  issues: state.issues,
  myths: state.myths,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  { updateSubscriptionToIssue }
)(withRouter(Issue));