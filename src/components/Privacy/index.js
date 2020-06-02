import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes';

class PrivacyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(props) {

    return (
      <div className="privacy-details">

        <Helmet>
          <title>Privacy - Articles</title>
        </Helmet>

        <div className="container">

        </div>
      </div>
    )   
  }
}

// const mapStateToProps = state => ({
//   // auth: state.auth,
//   orders: state.auth.user_details.ordersFetched,
//   errors: state.errors
// });

// export default connect(
//   mapStateToProps,
// )(PrivacyPage);

export default PrivacyPage;