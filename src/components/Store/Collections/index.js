import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';

// import axios from 'axios';
// import moment from 'moment';
// import OrderCard from './OrderCard';

class CollectionsPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(props) {

    return (
        <div className="store-collections-page">

            <Helmet>
                <title>Collections - Articles</title>
            </Helmet>

            <div className="collections">
                <div>September 2020</div>
                <div className="collection shadow theme-card-background">
                    <h5>Founders Collection</h5>
                    <div>Our first release ever</div>
                    <div className="mt-2">Includes</div>
                    <div className="items">
                        <div className="item">Wolf Hoodie</div>
                        <div className="item">Sheep Hoodie</div>
                        <div className="item">Black Tee</div>
                        <div className="item">White Tee</div>
                        <div className="item">Logo Pin</div>
                        <div className="item">Scroll Pin</div>
                        <div className="item">Rain Jacket</div>
                    </div>
                </div>
            </div>

        </div>
    )   
  }
}

const mapStateToProps = state => ({
  auth: state.auth.isAuthenticated,
  user_details: state.auth.user_details,

  orders: state.auth.user_details.ordersFetched,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(CollectionsPage);