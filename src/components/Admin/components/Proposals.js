import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Proposal extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      expanded: false
    };

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div className="proposal">

        <div className="type">{this.props.proposal.type}</div>
        <div className="title">{this.props.proposal.title}</div>
        <div className="description">{this.props.proposal.description}</div>

        {
        this.state.expanded ? 
        <div>

          <div className="mb-3">
            <input type="text"/>
          </div>

          <div onClick={() => this.setState({expanded: false})} className="btn btn-danger">Cancel</div>
          <div onClick={() => console.log("Save")} className="btn btn-articles-light">Save</div>
        </div>
        :
        <div onClick={() => this.setState({expanded: true})} className="btn btn-articles-light">Edit</div>
        }

      </div> 
    );
  }
}

class Proposals extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      proposals: []
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLoaction(this.props.tabLocation);

    // this.setState({
    //   loading: true
    // })

    axios.get('/api/getProposals')
    .then(function (response) {
      console.log(response);

      self.setState({
        proposals: response.data
      })
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  componentWillUnmount() {

  }

  render() {

    return (
      <div className="admin-proposals mt-5">

        <div className="container">
          <h1>Proposals</h1>

          <div className="proposals-container">
            
            <div className="proposal-filters">
              <button className="btn btn-articles-light">
                Social
              </button>
  
              <button className="btn btn-articles-light">
                Eduacation
              </button>
  
              <button className="btn btn-articles-light">
                Financial
              </button>
  
              <button className="btn btn-articles-light">
                Fundemental
              </button>
            </div>

            <div className="proposals">
              {this.state.proposals.map(proposal => 
                <Proposal proposal={proposal}/>
                // <div className="proposal">
                //   <div>{proposal.type}</div>
                //   <div>{proposal.title}</div>
                //   <div>{proposal.description}</div>
                // </div> 
              )}
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
)(Proposals);