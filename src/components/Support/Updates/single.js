import React, {Component} from 'react'
import { connect } from 'react-redux'
import moment from 'moment'
import axios from 'axios'
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';

class Update extends Component {
  constructor(props) {
    super(props);

    this.state = {
      update: {}
    }
  }

  componentDidMount() {

    axios.get('/api/getUpdate', {
      params: {
       url: this.props.match.params.id
      }
    })
    .then( (response) => {
      // console.log(response.data);

      this.setState({
        update: response.data,
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(props) {

    const update = this.state.update;

    return (
      <div className="update-page">

        <div className="container">

          <div className="card update-card">
    
            <div className="card-body d-flex justify-content-between">
  
              <div className="details">
                <div className="date">{moment(update.date).format('LL')}</div>
      
                <div className="title">{update.title}</div>
      
                <div className="text">{update.previewText}</div>
      
                <div className="d-flex justify-content-between mt-3">
                  <div className="posted-by">
                    <b>Posted By:</b> {update.postedBy}
                  </div>
                  <div className="details">
                    <span className="mr-4"><b className=" mr-2">ABC</b>Text</span>
                    <span><i className="fas fa-video mr-2"></i>Video</span>
                  </div>
                </div>
              </div>
  
              <div className="video">
                <iframe title="video" width="560" height="315" src="https://www.youtube-nocookie.com/embed/UOzu1Cpa9Cc" frameborder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>
              </div>
    
            </div>
    
            <div className="card-footer update-footer"></div>
  
            <div className="card-body">
              <span>Welcome to the very first update post. Due to this being the very first post </span>
              
            </div>
    
          </div>

          <div className="w-100 d-flex justify-content-center mt-3">
            <Link to={ROUTES.UPDATES}><div className="btn btn-articles-light">Back to Updates</div></Link>
          </div>
          
        </div>

      </div>
    )
  }
}

const mapStateToProps = state => ({
  // auth: state.auth,
  // orders: state.auth.user_details.ordersFetched,
  // errors: state.errors
});

export default connect(
  mapStateToProps,
)(Update);