import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
// import { withFirebase } from '../../Firebase';
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

import Ad from './Ad'

import * as ROUTES from '../../../constants/routes'

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

    // Returns undefined if the id of news is not in local storage
    let storedStories = this.props.stories.stories.find(x => x._id === this.props.match.params.id)
    storedStories = undefined

    if (storedStories !== undefined ) {
      // Try to pull from local storage and if not there then do server call
      self.setState({
        ...storedStories,
        loading: false
      });
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

    const { loading } = this.state;

    return (
      <div className="stories-page">
        {loading ?
        <div className="alert alert-danger">Loading Issue - {this.props.match.params.id}</div>
        :
        <div className="container-fluid single">

          <div className="content-wrapper">

            <div className="news-one-head">

              <div className="back-button-container">
                <i className="back-button fas fa-chevron-circle-left mr-0" aria-hidden="true"></i>
                <div className="back-button-dropdown">
                  <div className="subheading">Recent</div>
                  <div onClick={() => this.props.history.goBack()} className="link"><i className="fas fa-chevron-circle-left" aria-hidden="true"></i>Previous Page</div>
                  <div className="subheading">Associated</div>
                  <Link to={ROUTES.STORIES}><i className="fas fa-bullhorn" aria-hidden="true"></i>Stories</Link>
                  <Link to={ROUTES.NEWS}><i className="fas fa-newspaper" aria-hidden="true"></i>News</Link>
                </div>
              </div>
              
              {/* <span className="back-link" onClick={() => this.props.history.goBack()}>{String.fromCharCode(11148)}</span> */}

              <span className="date-badge">
                <div className="date-badge-inner">
                  <span className="front">{moment(this.state?.news_date).format("LL")}</span>
                  <span className="back">Updated {moment(this.state?.last_update).format("LL")}</span>
                </div>
              </span>

              <span className="author-link"> Written By:<span className="person">Joey Giusto</span> </span>

            </div>

            <div className="hero">
              <img src={this.state?.hero_url} alt="" className="image"/>
              <div className="title">{this.state.news_title}</div>
            </div>

            <div className="content">
              {/* All */}
              {/* <p>{this.state?.news_notes}</p> */}

              {/* Formatted */}
              {/* <span dangerouslySetInnerHTML={{__html: this.state?.news_notes?.replace(/(\r\n|\n|\r)/gm, "")}}></span> */}

              {/* Formated Line Space */}
              <div dangerouslySetInnerHTML={{ __html: decodeURIComponent(this.state?.news_notes).replace(/\+/g, " ").replace(/\r/g, "<br/>") }}></div>
              
            </div>
            
          </div>

          <Ad/>

          <div className="card d-none">
            <h3 className="card-header">{this.state.news_title}</h3>
            <div className="card-body">
              <div style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes?.replace(/(\r\n|\n|\r)/gm, "")}}>
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