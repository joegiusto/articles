import React, {Component} from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
const ENDPOINT = "/";
let socket = ''

class Submissions extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      sockets: [],
    };

  }

  componentDidMount() {
    this.props.setLoaction(this.props.tabLocation);
    const self = this;
    socket = socketIOClient(ENDPOINT);

    socket.on('online', function(msg){
      self.setState({
        sockets: msg
      })
    });
  }

  componentWillUnmount() {
    this.props.setLoaction('');
    socket.disconnect();
  }

  render() {

    return (
      <div className="mt-5">

        <div className="stat">
          <h5>Socket Info</h5>
          <div>Connected Sokets: {this.state.sockets.length}</div>
        </div>

        <div className="stat mt-4">
          <h5>Limit Sockets (Only logged in users)</h5>
          <button className="btn btn-articles-light mr-1">Yes</button>
          <button className="btn btn-articles-light disabled">No</button>
        </div>

      </div>
    );
  }
}

export default Submissions