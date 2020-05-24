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
      socketMessage: ''
    };

    this.handleChange = this.handleChange.bind(this);
    // this.pushSocket = this.pushSocket.bind(this);
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

    socket.on('adminMessage', function(msg){
      console.log(`Admin Message: ${msg}`);
    });
  }

  componentWillUnmount() {
    this.props.setLoaction('');
    socket.disconnect();
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  pushSocket() {
    // const self = this;
    socket.emit('adminMessage', this.state.socketMessage);
    this.setState({
      socketMessage: ''
    })
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

        <div className="mt-4">
          <input type="text" name="socketMessage" id="socketMessage" value={this.state.socketMessage} onChange={this.handleChange}/>
          <button onClick={() => this.pushSocket()} className="btn btn-articles-light">Send</button>
        </div>

      </div>
    );
  }
}

export default Submissions