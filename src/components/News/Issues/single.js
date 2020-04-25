import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

const Test = props => (
  <h1>Test</h1>
)

class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
    };

  }

  componentDidMount() {
    const self = this;
    this.setState({ loading: true });

    const stored = this.props.auth.user_details.subscriptionsBulk.find(x => x._id === this.props.match.params.id)

    if (stored !== undefined) {
      // Try to pull from local storage and if not there then do server call
      self.setState({
        ...stored,
        loading: false
      });
    } else {
      // Was not local, we make a server call!
      axios.post('/getNewsDocument', {
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
  }

  render() {

    const {loading, news_notes} = this.state;

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
              <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes?.replace('<break>', '<div class="alert alert-danger my-3">Testing Break</div>').replace(/(\r\n|\n|\r)/gm, "")}}>
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

// const Issue = () => (
//   <div className='container issues-page text-center'>



//     <div className="mt-3">
//       <h1>Issues</h1>
//       <p>Overview of the most pressing issues and status updates on them. </p>
//       <p>Unlike normal stories </p>
//       {/* <p>Monday - blank - Tuesday - blank - Wednesday - blank</p> */}
//     </div>

//     <div className="row mb-5">

//     </div>

//   </div>
// );

// const Issue = withFirebase(IssueBase);

// export default withRouter(Issue);

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  stories: state.stories,
  myths: state.myths,
  errors: state.errors
});

export default connect(
  mapStateToProps,
  // { logoutUser, setUserDetails }
)(withRouter(Issue));