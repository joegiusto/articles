import React from 'react';
import { Link } from 'react-router-dom'
import axios from 'axios'
import moment from 'moment'
import * as ROUTES from '../../../constants/routes'
import { withRouter } from 'react-router-dom';
import { connect } from "react-redux";

class Myth extends React.Component {
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

    // self.interval = setTimeout(() => self.setState({expandHero: false}), 1000);
  }

  componentWillUnmount() {
    // clearTimeout(this.interval);
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

    // const {loading, news_notes} = this.state;

    return (
      <div className="myths-page">

        <div className="container">

          <div className="myth">

            <div className="breadcrumbs">
              <Link to={ROUTES.NEWS}>News</Link>
              <i className="fas fa-arrow-alt-circle-right mr-0"></i>
              <Link to={ROUTES.MYTHS}>Myths</Link>
            </div>
            
            <img src={this.state.hero_url} alt="" className={"thin-img"}/>

            <div className={"mb-3 border border-dark p-2 " + (this.props.user?.roles?.isWriter ? '' : 'd-none')}>
              <Link to={`${ROUTES.ADMIN_NEWS}/${this.state._id}`}><button className="btn btn-articles-light" onClick={() => ''}>Edit Myth</button></Link>
              <small className="d-block">You are seeing this because you are a writer</small>
            </div>

            <h3 className="title">{this.state.news_title}</h3>

            <div className="date">
              <div>Published: {moment(this.state.news_date).format("LLL")}</div>
              <div>Last Updated: {moment(this.state.last_update).format("LLL")}</div>
            </div>

            <div style={{marginBottom: '0.5rem'}}>At this time our news content is still in development. We have many placeholders where content will be placed after it is done being written and researched.</div>

            <div className="content-text" style={{whiteSpace: 'pre-wrap'}} dangerouslySetInnerHTML={{__html: this.state?.news_notes}}></div>

          </div>

          <div className="sidebar">
            <button className="btn btn-articles-light w-100">Share</button>

            <div className="related">
              <h5 className="title">Related Stories</h5>
              <div className="news-card"></div>
              <div className="count">1/5</div>
            </div>

            <div className="related">
              <h5 className="title">Related Issues</h5>
              <div className="news-card"></div>
              <div className="count">1/5</div>
            </div>

            <div className="related">
              <h5 className="title">Related Proposals</h5>
              <div className="news-card"></div>
              <div className="count">1/5</div>
            </div>
          </div>

        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  stories: state.stories,
  myths: state.myths,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(withRouter(Myth));