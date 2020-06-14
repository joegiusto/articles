import React from 'react';
// import { Link } from 'react-router-dom'
import axios from 'axios'
// import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      issues: []
    };

  }

  componentDidMount() {
    const self = this;
    this.setState({ loading: true });

    const stored = this.props.issues.issues?.find(x => x._id === this.props.match.params.id)

    if (stored !== undefined) {
      // Try to pull from local storage and if not there then do server call
      self.setState({
        ...stored,
        loading: false
      });
    } else {
      // Was not local, we make a server call!
      axios.post('/api/getNewsDocument', {
        news_id: this.props.match.params.id
      })
      .then(function (response) {
        console.log(response);

        self.setState({
          ...response.data.document,
          loading: false
        });

      })
      .catch(function (error) {
        console.log(error);

        self.setState({
          editLoading: false
        });
      });
    }

    // Set the date that the user was last lookign at this story
    if ( this.props.user._id ) {
      console.log("Is a user")

      console.log(this.props.user?.subscriptions)

      const lastDate = this.props.user?.subscriptions.find(x => x.news_id === this.props.match.params.id)

      console.log(lastDate)

      this.setState({
        lastRead: lastDate.lastRead
      })

      axios.post('/api/updateLastRead', {
        news_id: this.props.match.params.id,
        user: this.props.user._id
      })
      .then(function (response) {

        console.log(response);

      })
      .catch(function (error) {

        console.log(error);

      });

    } 

    // console.log(`Is not a user ${this.props.user._id}`)
    
  }

  render() {

    const {loading, news_notes, lastRead} = this.state;

    // news_notes.replace(/(\r\n|\n|\r)/gm, "")

    return (
      <div className="issues-page">
        {loading ?
        <div className="alert alert-danger">Loading Issue - {this.props.match.params.id}</div>
        :
        <div className="container single mt-5">
          <div className="link" onClick={() => this.props.history.goBack()}>{String.fromCharCode(11148)} Back to Home</div>
          <div className="card ">
            <h3 className="card-header">{this.state.news_title}</h3>
            <div className="card-body">

              {lastRead !== undefined ? <div>Last Opened: {lastRead}</div> : null}
              

              <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes?.replace('<break>', '<div className="alert alert-danger my-3">Testing Break</div>').replace(/(\r\n|\n|\r)/gm, "")}}>
                {/* { dangerouslySetInnerHTML={{__html: this.state?.news_notes?} } */}
                {/* {this.state?.news_notes?.replace('<break>', '<div className="alert alert-danger">Test</div>')} */}
              </div>

              {/* <div className="w-100" style={{background: this.state.data.photoExtra}}>
                <img src={this.state.data.photo} className="img-fluid" alt=""/>
              </div> */}
              {/* <small className="d-block">Photo Extra Info: {this.state.data.photoExtra}</small> */}
              {/* <button onClick={() => this.props.history.goBack()} className="btn btn-articles-light">Go Back</button> */}

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
  // { logoutUser, setUserDetails }
)(withRouter(Issue));