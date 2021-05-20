import React, { Component, useState } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { connect } from "react-redux";

import axios from 'axios'
import moment from 'moment'

import AdminLayout from 'components/layouts/admin.js';

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
    // this.props.setLocation(this.props.tabLocation);
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

	axios.post('/api/admin/aws/directories')
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
    // this.props.setLocation('');
  }

  getDirectoryPhotos(directory) {

    const self = this;
    console.log(`getDirectory called with ${directory}`)

    axios.post('/api/admin/aws/photos', {
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

            <Head>
                <title>Admin AWS - Articles</title>
            </Head>

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

                <div className="row">
                    
                    <div className="col-lg-4">

                        <div className="aws-photo-test">
                            <div className="upload-container">
                                <div className="upload-photo-wrap mr-1">
                                    <div className="upload-photo noselect">+</div>
                                    <input onChange={this.onChange} type="file" name="myfile" />
                                </div>
                            </div>
                        </div>

                        <div className="aws-photo-test mt-3 mb-3">
            
                            <h3 className="text-muted mt-2 w-100">Directories</h3>
            
                            <div className="directory-squares">
                                <div className="square" onClick={() => this.getDirectoryPhotos('')}>{'/'}</div>
                                {this.state.directories.map(directory => (
                                    <div className="square" onClick={() => this.getDirectoryPhotos(directory.Prefix)}>{directory.Prefix}</div>
                                ))}
                            </div>
            
                        </div> 

                    </div>

                    <div className="col-lg-8">
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

            </div>


        </div>
    );
  }
}

// export default Sockets

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

AWS.Layout = AdminLayout;

export default connect(
  mapStateToProps,
)(AWS);

function AdminHomePage() {
    const router = useRouter()
    const { param } = router.query
  
    return(
        <section className="submissions-page">

            <Head>
                <title>Admin - Articles</title>
            </Head> 

            <div className="container py-3">
                <h2>AWS Page</h2>
                <p>Admin stuff here.</p>
            </div>

        </section>
    )
}

// AdminHomePage.Layout = AdminLayout;
// export default AdminHomePage;