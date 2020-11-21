import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';
import axios from 'axios'
import moment from 'moment'

import DropdownButton from 'react-bootstrap/DropdownButton';
import Dropdown from 'react-bootstrap/Dropdown';

class Updates extends Component {
  constructor(props) {
    super(props);

    this.state = {
      updates: []
    }
  }

  componentDidMount() {

    axios.get('/api/getUpdates', {
      // _id: this.props.user_id
    })
    .then( (response) => {
      // console.log(response.data);

      this.setState({
        updates: response.data,
      });

      // this.setState({ newsAllLoading: false });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render(props) {

    return (
      <div className="updates-page">

        <Helmet>
          <title>Updates - Articles</title>
        </Helmet>

        <div className="updates-card container d-flex flex-column align-items-center">

          <div className="card mt-1 mt-md-3">

            <div className="card-header d-flex justify-content-between align-items-center">

              {/* <div className="background">
                <div className="bg"></div>
                <div className="bg bg2"></div>
                <div className="bg bg3"></div>
              </div> */}

              <span>Site Updates</span>

              <DropdownButton id="update-sort" title="Sort: Newest" variant={'articles-light'}>
                <Dropdown.Item href="#/action-1">Oldest</Dropdown.Item>
                {/* <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
                <Dropdown.Item href="#/action-3">Something else</Dropdown.Item> */}
              </DropdownButton>

            </div>

            <div className="card-body">

              {
                this.state.updates.map( update => 

                  <Link to={`${ROUTES.UPDATES}/${update.url}`}> 
                    <div className="card update-card">

                      <div className="card-body">
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

                      <div className="card-footer update-footer"></div>

                    </div>
                  </Link>

                 )
              }

            </div>

            <div className="card-footer"></div>

          </div>

          {/* <Link to={ROUTES.STORE}><div className="btn btn-articles-light">Back To Store</div></Link> */}

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
)(Updates);