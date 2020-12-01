import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

import SocketContext from '../../../utils/socket_context/context'

class Messages extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      messages: {},
    };
  }

  componentDidMount() {
    this.props.setLocation(this.props.tabLocation);
    const self = this;
  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div className="admin-page admin-messages">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
              <div><b>Regular Chats: 0</b></div>
              <div>Total Messages: 0</div>
              <div>Text Messages: 0</div>
              <div>Media Messages: 0</div>
              <hr/>
              <div><b>Encrypted Chats: 0</b></div>
              <div>Messages: 0</div>
            </div>
          </div>

        </div>

        <div className="main-panel">
          Show each threads message count so if people are sending way to many messages we can freeze the chat.
        </div>

      </div>
    );
  }
}

// export default Sockets

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Messages);