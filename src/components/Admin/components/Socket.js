import React, {Component} from 'react'
import axios from 'axios'
import socketIOClient from 'socket.io-client'
const ENDPOINT = "/";
let socket = undefined;

class Sockets extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      sockets: [],
      socketMessage: '',
      photos: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    // this.pushSocket = this.pushSocket.bind(this);
  }

  componentDidMount() {
    socket = socketIOClient(ENDPOINT);

    this.props.setLoaction(this.props.tabLocation);
    const self = this;
    
    socket.on('online', function(msg){
      self.setState({
        sockets: msg
      })
    });

    socket.on('adminMessage', function(msg){
      console.log(`Admin Message: ${msg}`);
    });

    axios.get('/api/photos')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        photos: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        photos: [],
      })
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

  pushTestDonation() {
    socket.emit('recieveDonation', {
      amount: 1000,
      date: Math.floor(new Date().getTime()/1000.0),
      note: 'Fake Donation',
      uid: Date.now(),
      name: 'Test',
      department: 'other',
      file: 'https://en.wikipedia.org/wiki/Rickrolling'
    });
  }

  pushTestExpense() {
    socket.emit('recieveExpense', null);
  }

  pushSocket() {
    // const self = this;
    socket.emit('adminMessage', this.state.socketMessage);
    this.setState({
      socketMessage: ''
    })
  }

  // handleFile(e) {

  //   let file = e.target.files[0];

  //   this.setState({
  //     file: file
  //   });
  // }

  // handleUpload(e) {

  //   let file = this.state.file
  //   let formdata= new FormData
  //   formdata.append('image', file)
  // }

  onChange(e) {
    console.log(e.target.files);
    const data = new FormData();

    this.setState({
      file: e.target.files[0]
    }, 
      () => {
        data.append('file', this.state.file);
        
        axios.post("/api/addPhoto", data, { // receive two parameter endpoint url ,form data 
        
        })
        .then(res => { // then print response status
          console.log(res.statusText)
          this.setState({
            photos: [...this.state.photos, this.state.file.name]
          })
        })
      }
    )

  }

  removePhoto(photo) {
    this.setState({
      photos: this.state.photos.filter(arrayPhoto => arrayPhoto !== photo)
    })
  }

  render() {

    return (
      <div className="admin-sockets mt-5">

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

        <button onClick={() => this.pushTestDonation()} className="btn btn-articles-light">Fake Donation</button>
        <button onClick={() => this.pushTestExpense()} className="btn btn-articles-light">Fake Expense</button>

        <div className="aws-photo-test">

          <div className="upload-photo-wrap mr-1">
            <div className="upload-photo noselect">+</div>
            <input onChange={this.onChange} type="file" name="myfile" />
          </div>

          {this.state.photos.map((photo, i) => (
            <span className="image-container">

              <div onClick={() => this.removePhoto(photo)} className="delete noselect">X</div>
              <a key={i} href={`https://articles-website.s3.amazonaws.com/${photo}`} target="_blank" rel="noopener noreferrer">
                <img key={i} height="150px" alt="" src={`https://articles-website.s3.amazonaws.com/${photo}`} />
              </a>

            </span>
          ))}

        </div>

      </div>
    );
  }
}

export default Sockets