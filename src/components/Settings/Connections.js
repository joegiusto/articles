import React, {Component} from 'react'
import { connect } from "react-redux";

class Connections extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      userReferrals: [],
      subscriptions: [],
    };

  }

  componentDidMount() {
    const self = this;

    this.props.setLocation(this.props.tabLocation);

  }

  render() {

    return (
      <div className="settings-connections mb-3">

        {/* Subscription */}

        <div className={"card settings-card mt-3"}>

            <div className="card-header">
              <h5>Connections</h5>
              <p>Connect your account with the following services to make signing in easier.</p>
            </div>

            <div className="card-body connections">

                <div className="connection">

                <div className="name">
                    <i className="fab fa-google ml-2"></i>
                    <span>Google</span>
                </div>

                <button type="button" class="btn btn-outline-secondary btn-sm">
                    <span>Not Connected</span>
                    <i class="far fa-plus-square mx-2"></i>
                </button>

              </div>

                <div className="connection">

                <div className="name">
                    <i className="fab fa-apple ml-2"></i>
                    <span>Apple</span>
                </div>

                <button type="button" class="btn btn-outline-secondary btn-sm">
                    <span>Not Connected</span>
                    <i class="far fa-plus-square mx-2"></i>
                </button>

              </div>

                <div className="connection">

                    <div className="name">
                        <i className="fab fa-linkedin ml-2"></i>
                        <span>LinkedIn</span>
                    </div>

                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        <span>Not Connected</span>
                        <i class="far fa-plus-square mx-2"></i>
                    </button>

                </div>

                <div className="connection">

                    <div className="name">
                        <i className="fab fa-twitter ml-2"></i>
                        <span>Twitter</span>
                    </div>

                    <button type="button" class="btn btn-outline-secondary btn-sm">
                        <span>Not Connected</span>
                        <i class="far fa-plus-square mx-2"></i>
                    </button>

                </div>

            </div>

          </div>
      </div>
    );
  }
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Connections);