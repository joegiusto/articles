import React, {Component, useState} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Projects extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      projects: []
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    axios.post('/api/secure/getProjects', {

    })
    .then( (response) => {
      console.log(response)
      this.setState({projects: response.data})
    })
    .catch( (error) => {
      console.log(error);
		});
  }

  render() {

    return (
      <div className="admin-page admin-projects">

        <div className="main-panel">

          <h1 className="text-center mt-4">Active Projects ({this.state.projects.length - 1})</h1>

          <div className="projects justify-content-center">
            {this.state.projects.map((project) => 

              <div className="project">
                <h3>{project.public_title}</h3>
                <p>{project.public_description}</p>
                <ViewProject id={project._id}/>
              </div>

            )}
          </div>

          <h1 className="text-center mt-4">Archived Projects (0)</h1>

          <div className="archived-projects text-center">
            <h3>No archived projects to display</h3>
          </div>

        </div>

      </div>
    );
  }
}

function ViewProject(props) {
  const [show, setShow] = useState(false);
  const [project, setProject] = useState(null);
  const [projectKey, setProjectKey] = useState();
  const [error, setError] = useState(null);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleEnter = (e) => {
    
    if ( e.key === "Enter" && !e.shiftKey ) {
      e.preventDefault();

      // if (this.state.chatMessage !== '') {
      //   this.sendMessage();
      // }
      console.log("Submit");
      handleKeySubmit();
    }

  }

  const handleKeySubmit = () => {

    axios.post('/api/secure/getProject', {
      key: projectKey,
      id: props.id
    })
    .then( (response) => {
      console.log(response)

      setError(null)
      setProjectKey(null)
      
      setProject({
        ...response.data
      });
    })
    .catch( (error) => {
      console.log(error);

      setError(error.response.data)
    });
    
  }

  return (
    <>

      <Button variant="articles-light" onClick={handleShow}>
        {project ? <i className="fas fa-unlock"></i> : <i className="fas fa-lock"></i>}
        View
      </Button>

      <Modal centered className="admin-ads articles-modal" show={show} onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>View Project</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          {/* Form to get Project */}
          { !project && 
            <div className="form-group articles flex-grow-1">
              <label htmlFor="project_key">Project Key</label>
              <input className="form-control with-label" name="project_key" onKeyPress={handleEnter} id="project_key" type="text" style={{webkitTextSecurity: 'disc'}} value={projectKey} onChange={e => setProjectKey(e.target.value)}/>
            </div>
          }

          {/* Display Project */}
          { project && 
            <div>
              <div className="title">{project.title}</div>
              <div>{project.purpose}</div>

              <h5 className="mt-2">Links</h5>
              <div className="mt-2">
                {project.links.map((link) => 
                  <div>{link.title} - {link.link}</div>
                )}
              </div>

              <div className="mt-2">{project.encrypted_bytes}</div>

              {/* <button className="btn btn-articles-light">View Encryption</button> */}
            </div>
          }

          {/* Display Errors */}
          { error && <div className="mt-2 text-danger">{error}</div> }

        </Modal.Body>

        <Modal.Footer className="justify-content-between">

          <Button variant="link" onClick={handleClose}>
            Close
          </Button>

          { !project && 
            <Button variant="articles-light" onClick={handleKeySubmit}>
              Submit
            </Button>
          }

        </Modal.Footer>

      </Modal>
    </>
  );
}

const mapStateToProps = state => ({
  user_id: state.auth.user.id
});

// const WithSocket = props => (
//   <SocketContext.Consumer>
//       { socket => <Sockets {...props} socket={socket}/> }
//   </SocketContext.Consumer>
// )

export default connect(
  mapStateToProps,
)(Projects);