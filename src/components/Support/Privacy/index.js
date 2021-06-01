import React, {Component} from 'react'
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom'
import * as ROUTES from '../../../constants/routes';

class PrivacyPage extends Component {
  constructor(props) {
    super(props);

    this.state = {

    }
  }

  render(props) {

    return (
      <div className="privacy-page">

        <Helmet>
          <title>Privacy - Articles</title>
        </Helmet>

        <div className="container d-flex flex-column justify-content-center">

          <img className="align-self-center mt-5" src="https://winaero.com/blog/wp-content/uploads/2019/09/Chrome-Incognito-Mode-Icon-256.png" height="200px" alt=""/>

          <div className="card-wrap mt-5">

            {/* <i className="watcher fas fa-5x fa-user-secret"></i> */}

            <div className="card">
              <div className="card-header">Our Ethics and Your Privacy</div>
              <div className="card-body px-2 px-md-5">
                <h1>Ethics</h1>
                <p>The inforamtion that you give to a website should belong to you. How that data is processed and used should be compleltly transparent to the user then.</p>
                <h1>Privacy</h1>
                <p>Text</p>
              </div>
              <div className="card-footer">Last Updated: <span className="badge badge-light" style={{fontSize: '1rem'}}>June 2020</span></div>
            </div>

          </div>

        </div>

      </div>
    )   
  }
}

export default PrivacyPage;