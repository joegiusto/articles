import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { connect } from "react-redux"
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';

import axios from 'axios';

import StoreItemBeta from '../Items/Beta.js';
// import moment from 'moment';
// import OrderCard from './OrderCard';

class SavedPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
        products: [],
    }
  }

  componentDidMount() {

    const self = this;
    // this.setState({ loadingProducts: true });

    axios.get('/api/getProducts')
    .then(function (response) {
        console.log(response.data.news);
        self.setState({
            products: response.data,
            // loadingProducts: false
        });
    })
    .catch(function (error) {
        console.log(error);
        // self.setState({ loadingProducts: true });
        self.setState({ resultsLoadingError: error });
    });

}

  render(props) {

    return (
        <div className="store-saved-page">

            <Helmet>
                <title>Saved - Articles</title>
            </Helmet>

            <div className="container">

                <h2>Saved</h2>
                <p className="mb-3">Any products you save will be displayed here.</p>

                <div className="items pb-5">

                    {this.props.auth ? 

                    this.props.user_details?.saved_products?.map((item) => (
                        // <div>{item.product_id}</div>
                        <StoreItemBeta
                            setPopOutVisible={this.setPopOut}
                            product={this.state.products?.find(element => element._id === item.product_id)}
                            color="articles"
                            isSaved={this.props.user_details?.saved_products.find(o => o.product_id === item.product_id)}
                        />
                    ))

                    :

                    <div className="sign-in-required-global-tag">
                        <div>Please Sign In to see saved products</div>
                        <Link to={ROUTES.SIGN_IN + `?directTo=${ROUTES.STORE_SAVED}`}><button className="btn btn-articles-light mt-3">Sign In</button></Link>
                    </div>
                    }

                </div>

            </div>
        </div>
    )   
  }
}

const mapStateToProps = state => ({
  // auth: state.auth,
  auth: state.auth.isAuthenticated,
  user_details: state.auth.user_details,
  orders: state.auth.user_details.ordersFetched,
  errors: state.errors
});

export default connect(
  mapStateToProps,
)(SavedPage);