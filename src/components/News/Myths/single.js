import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import * as ROUTES from '../../../constants/routes'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

// import { withFirebase } from '../../Firebase';

class Issue extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      loading: false,
      expandHero: true,
    };

  }

  componentDidMount() {
    const self = this;
    this.setState({ loading: true });

    let storedMyths = this.props.myths.myths.find(x => x._id === this.props.match.params.id)

    // TODO - Invalidate this
    storedMyths = undefined

    if (storedMyths !== undefined) {
      // Try to pull from local storage and if not there then do server call
      self.setState({
        ...storedMyths,
        loading: false
      });
    } else {
      // Was not local, we make a server call!
      this.loadNewsByUrl(this.props.match.params.id);
    }

    self.interval = setTimeout(() => self.setState({expandHero: false}), 1000);
  }

  componentWillUnmount() {
    clearTimeout(this.interval);
  }

  change() {
    this.setState({expandHero: false})
  }

  loadNewsByUrl(url) {
    const self = this;
    this.setState({expandHero: true})

    axios.post('/api/getNewsDocument', {
      news_url: url
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        ...response.data.document,
        loading: false
      });

      self.interval = setTimeout(() => self.setState({expandHero: false}), 1000);

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        editLoading: false
      });
    });
  }

  render() {

    const {loading, news_notes} = this.state;

    // news_notes.replace(/(\r\n|\n|\r)/gm, "")

    return (
      <div className="myths-page">
        {loading ?
        <div className="alert alert-danger">Loading Issue - {this.props.match.params.id}</div>
        :
        <div className="container single mt-5">

          <div className="info-bar">

            <div className="breadcrumbs">

              <i onClick={() => this.props.history.goBack()} className="back-button fas fa-chevron-circle-left mr-3" aria-hidden="true"></i>

              <Link to={ROUTES.NEWS}>
                <span className="articles-breadcrumb mr-2">
                  <i className="fas fa-newspaper" aria-hidden="true"></i>
                  News 
                </span>
              </Link>

              <span className="icon"><i class="fas fa-angle-right"></i></span>

              <Link to={ROUTES.MYTHS}>
                <span className="articles-breadcrumb active">
                  <i className="fas fa-ghost" aria-hidden="true"></i>
                  Myths
                </span>
              </Link>

            </div>

            <div className="search">
              <input type="text" placeholder="Search"/>
              <i className="icon fas fa-ghost" aria-hidden="true"></i>
              <i className="button fas fa-chevron-circle-right" aria-hidden="true"></i>
            </div>

          </div>

          <div className="myth-container">

            <div className="sidebar">
              <h5>Other Myths</h5>
              <div className="other-myths">
                {this.props.myths.myths.map((myth) => (
                  
                  (
                    myth.url === this.state.url ? 
                    null
                    :
                    <Link onClick={() => (this.loadNewsByUrl(myth.url))} to={ROUTES.MYTHS + '/' + myth.url}>
                      <div className="myth">
                        <span>{myth.news_title}</span>
                        <div className="slide-down">
                          {moment(myth.news_date).format("LL")}
                        </div>
                      </div>
                    </Link>
                  )

                ))}
              </div>
            </div>

            <div className="content">
              <h3 className="title">{this.state.news_title}</h3>

              <div className="author-block">
                    <Link to={'/reports/employees/42'}>
                      <div className="photo">
                        <img src="https://bethanychurch.org.uk/wp-content/uploads/2018/09/profile-icon-png-black-6.png" alt=""/>
                      </div>
                    </Link>
                    <div className="info">
                      <div className="name">Joey Giusto</div>
                      <div className="date">{moment(this.state.news_date).format("LLL")}</div>
                    </div>
              </div>

              <div onClick={() => this.setState({expandHero: !this.state.expandHero})} className="hero">
                <img src={this.state.hero_url} alt="" className={"thin-img " + (this.state.expandHero ? 'expand' : '')}/>
                <div className="credit">Source</div>
              </div>

              

              <div className="content-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes?.replace('<break>', '<div className="alert alert-danger my-3">Testing Break</div>').replace(/(\r\n|\n|\r)/gm, "")}}></div>
            </div>

          </div>

          {/* <div className="link" onClick={() => this.props.history.goBack()}>{String.fromCharCode(11148)} Back to Home</div> */}

          <div className="card d-none">

            <h3 className="card-header">{this.state.news_title}</h3>

            <img src="https://media.nationalgeographic.org/assets/photos/cc2/bba/cc2bbae1-0699-45b9-b86e-a03a23b28077.jpg" alt="" className="thin-img"/>

            <div className="card-body">
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