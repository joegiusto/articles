import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Sockets extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      sockets: [],
      socketMessage: '',
      photos: [],
      fakeImageHash: 0,
      newProfilePhotoLoading: false,
      cacheBust: moment()
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
    this.onChangeProfile = this.onChangeProfile.bind(this);
    // this.pushSocket = this.pushSocket.bind(this);
  }

  componentDidMount() {
    this.props.setLocation(this.props.tabLocation);
    const self = this;
    

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
    this.props.setLocation('');
  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

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

  onChangeProfile(e) {
    console.log(e.target.files);
    const data = new FormData();

    this.setState({
      file: e.target.files[0],
      newProfilePhotoLoading: true,
    }, 
      () => {
        data.append('file', this.state.file);
        data.append('user', this.props.user_id);
        
        axios.post("/api/addProfilePhoto", data, { // receive two parameter endpoint url ,form data 
        
        })
        .then(res => { // then print response status
          console.log(res.statusText)
          this.setState({
            newProfilePhotoLoading: false,
            // photos: [...this.state.photos, 'profile_photos/' + this.props.user_id + '.' + this.state.file.name.split('.')[1]],
            fakeImageHash: this.state.fakeImageHash + 1
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
      <div className="admin-aws mt-5">

        <div className="aws-profile-photo-test">

          <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${this.props.user_id}.jpg?h=${this.state.fakeImageHash}&b=${this.state.cacheBust}`} height="150" width="150" alt=""/>

          <div className="upload-photo-wrap mr-1">
            <div className="upload-photo noselect">+</div>
            <input onChange={this.onChangeProfile} accept=".jpg" type="file" name="myfile" />
          </div>
        </div>

        <div>{this.state.newProfilePhotoLoading ? 'Uploading' : ''}</div>

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

// export default Sockets

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

export default connect(
  mapStateToProps,
)(Sockets);