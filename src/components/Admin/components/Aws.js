import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class AWS extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      sockets: [],
      socketMessage: '',
      photos: [],
      fakeImageHash: 0,
      newProfilePhotoLoading: false,
      cacheBust: moment(),
	    directories: []
    };

    this.handleChange = this.handleChange.bind(this);
    this.onChange = this.onChange.bind(this);
  	this.getDirectoryPhotos = this.getDirectoryPhotos.bind(this);
    // this.onChangeProfile = this.onChangeProfile.bind(this);
    // this.pushSocket = this.pushSocket.bind(this);
  }

  componentDidMount() {
    this.props.setLocation(this.props.tabLocation);
    const self = this;

    // axios.get('/api/photos')
    // .then(function (response) {

    //   console.log(response);

    //   self.setState({ 
    //     photos: response.data,
    //   });

    // })
    // .catch(function (error) {
    //   console.log(error);

    //   self.setState({
    //     photos: [],
    //   })
    // });

	axios.post('/api/secure/aws/directories')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        directories: response.data.CommonPrefixes,
      });

    })
    .catch(function (error) {
      console.log(error);

    //   self.setState({
    //     directories: [],
    //   })

    });
  }

  componentWillUnmount() {
    this.props.setLocation('');
  }

  getDirectoryPhotos(directory) {

    const self = this;
    console.log(`getDirectory called with ${directory}`)

    axios.post('/api/secure/aws/getDirectoryPhotos', {
      prefix: directory
    })
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
        
        axios.post("/api/secure/aws/addPhoto", data, { // receive two parameter endpoint url ,form data 
        
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

    // this.setState({
    //   photos: this.state.photos.filter(arrayPhoto => arrayPhoto !== photo)
    // })

    const self = this;
    console.log(`photo-manage called with ${photo}`)

    axios.post('/api/secure/aws/removePhoto', {
      key: photo
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        photos: self.state.photos.filter(arrayPhoto => arrayPhoto !== photo)
      })

      // self.setState({ 
      //   photos: response.data,
      // });

    })
    .catch(function (error) {
      console.log(error);

      // self.setState({
      //   photos: [],
      // })

    });

  }

  render() {

    return (
      <div className="admin-page admin-aws">

        <div className="side-panel">

        	<div className="card">

            	<div className="card-header">Directories</div>

				<div className="card-body">

					{this.state.directories.map(directory => (
						<div className="directory-link" onClick={() => this.getDirectoryPhotos(directory.Prefix)}>{directory.Prefix}</div>
					))}

				</div>

          	</div>
        </div>

        <div className="main-panel">

			<div>{this.state.newProfilePhotoLoading ? 'Uploading' : ''}</div>

			<css className="aws-photo-test">
				<div className="upload-container">
					<div className="upload-photo-wrap mr-1">
						<div className="upload-photo noselect">+</div>
						<input onChange={this.onChange} type="file" name="myfile" />
					</div>
				</div>
			</css>

			<div className="aws-photo-test mt-3 text-center mb-3">

				<h3 className="text-muted my-3 w-100">Please select a directory!</h3>

				<div className="directory-squares container">
          <div className="square" onClick={() => this.getDirectoryPhotos('')}>{'/'}</div>
					{this.state.directories.map(directory => (
						<div className="square" onClick={() => this.getDirectoryPhotos(directory.Prefix)}>{directory.Prefix}</div>
					))}
				</div>

			</div>

			{this.state.photos.map((photo, i) => (

				<div className="aws-photo-test image-container">
					<div onClick={() => this.removePhoto(photo)} className="delete noselect">X</div>

					<a key={i} href={`https://articles-website.s3.amazonaws.com/${photo}`} target="_blank" rel="noopener noreferrer">
						<img key={i} height="150px" alt="" src={`https://articles-website.s3.amazonaws.com/${photo}`} />
					</a>
				</div>

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
)(AWS);