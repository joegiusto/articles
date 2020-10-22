import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import TextareaAutosize from 'react-textarea-autosize';
import moment from 'moment'

class Proposal extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      expanded: false,
      confirmDelete: false,

      newProposal: {
        _id: this.props.proposal._id,
        type: this.props.proposal.type || '',
        url: this.props.proposal.url || '',
        title: this.props.proposal.title || '',
        description: this.props.proposal.description || '',
        content: this.props.proposal.content || ''
      }
    };

  }

  componentDidMount() {

  }

  componentWillUnmount() {

  }

  handleNewProposalChange(event) {
    console.log(event)

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name)

    this.setState({
      newProposal: {
        ...this.state.newProposal,
        [name]: value
      }
    })
  }

  render() {

    return (
      <div className="proposal">

        <div className="_id">{this.props.proposal._id}</div>
        <div className="type">{this.props.proposal.type}</div>

        <div className="title">{this.props.proposal.title}</div>
        <div className="description">{this.props.proposal.description}</div>
        {/* <div className="content">{this.props.proposal.content}</div> */}

        {this.state.expanded ? 
        <div>

        <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'social'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'social' ? 'alt' : '')}>Social</button>
        <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'education'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'education' ? 'alt' : '')}>Education</button>
        <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'financial'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'financial' ? 'alt' : '')}>Financial</button>
        <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'fundamental'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'fundamental' ? 'alt' : '')}>Fundamental</button>

          <div className="form-group mt-3">
            <label for="address">Title</label>
            <input className="form-control with-label" onChange={ (e) => { this.handleNewProposalChange(e) } } name="title" id="title" type="text" value={this.state.newProposal.title}/>
          </div>

          <div className="form-group mt-3">
            <label for="address">URL</label>
            <input className="form-control with-label" onChange={ (e) => { this.handleNewProposalChange(e) } } name="url" id="url" type="text" value={this.state.newProposal.url}/>
          </div>

          <div className="form-group">
            <label for="address">Description</label>
            <input className="form-control with-label" onChange={ (e) => { this.handleNewProposalChange(e) } } name="description" id="description" type="text" value={this.state.newProposal.description}/>
          </div>

          <div className="form-group">
            <label for="address">Content</label>
            {/* <input className="form-control with-label" onChange={ (e) => { this.handleNewProposalChange(e) } } name="content" id="content" type="text" value={this.state.newProposal.content}/> */}
            <TextareaAutosize className="form-control with-label" name="content" id="content" type="text" value={this.state.newProposal.content} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
          </div>

          <div onClick={() => this.setState({confirmDelete: false, expanded: false})} className="btn btn-warning">Cancel</div>
          {
            this.state.confirmDelete ? 
            <div onClick={ () => this.props.deleteProposal(this.props.proposal._id) } className="btn btn-danger">Confirm</div>
            :
            <div onClick={ () => this.setState({confirmDelete: true}) } className="btn btn-articles-light">Delete</div>
          }
          
          <div onClick={() => this.props.upsertProposal(this.state.newProposal, (msg) => {
            console.log(msg)
            this.setState({expanded: false})
          })} className="btn btn-articles-light">Save</div>
          
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
      typeFilter: '',
      proposals: [],
      // add: true,

      newProposal: {
        type: '',
        title: '',
        url: '',
        description: '',
        content: ''
      }
    };

    this.deleteProposal = this.deleteProposal.bind(this);

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

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

  handleNewProposalChange(event) {
    console.log(event)

    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    console.log(name)

    this.setState({
      newProposal: {
        ...this.state.newProposal,
        [name]: value
      }
    })
  }
  
  deleteProposal(id) {
    const self = this;

    axios.post('/api/deleteProposal', {
      _id: id
    })
    .then(function (response) {
      console.log(response);

      self.setState({
        proposals: self.state.proposals.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  upsertProposal(obj, cb) {
    const self = this;

    axios.post('/api/upsertProposal', {
      proposal: obj
    })
    .then(function (response) {
      console.log(response);

      // self.setState({
      //   // Remove old one if it exists
      //   proposals: self.state.proposals.filter(function( oldObj ) {
      //     return oldObj._id !== obj._id;
      //   })
      // }, () => self.setState({
      //   // Insert new one
      //   proposals: [
      //     ...self.state.proposals,
      //     self.state.newProposal
      //   ]
      //   })
      // );

      cb('Hello there child');

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="admin-page admin-proposals mt-5">

        <div className="container">
          <h1>Proposals</h1>

          <div className="proposals-container">
            
            <div className="proposal-filters">
              <button onClick={() => this.setState({typeFilter: 'social'})} className={"btn btn-articles-light " + (this.state.typeFilter === 'social' ? 'alt' : '')}>
                Social
              </button>
  
              <button onClick={() => this.setState({typeFilter: 'education'})} className={"btn btn-articles-light " + (this.state.typeFilter === 'education' ? 'alt' : '')}>
                Education
              </button>
  
              <button onClick={() => this.setState({typeFilter: 'financial'})} className={"btn btn-articles-light " + (this.state.typeFilter === 'financial' ? 'alt' : '')}>
                Financial
              </button>
  
              <button onClick={() => this.setState({typeFilter: 'fundamental'})} className={"btn btn-articles-light " + (this.state.typeFilter === 'fundamental' ? 'alt' : '')}>
                Fundamental
              </button>

              <button onClick={() => this.setState({typeFilter: ''})} className={"btn btn-articles-light ml-3 " + (this.state.typeFilter === '' ? 'd-none' : '')}>
                Clear Filter
              </button>
            </div>

            {/* <div className="mt-3 d-none">
              <button onClick={() => this.setState({add: true})} className="btn btn-articles-light ">Add</button>
              <button onClick={() => this.setState({add: false})} className={"btn btn-articles-light " + (this.state.add ? '' : 'd-none')}>Cancel</button>
            </div> */}

            <div className={"add-form bg-white border border-dark mt-3 p-3 "}>

              <div className="proposal-type">

                <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'social'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'social' ? 'alt' : '')}>
                  Social
                </button>
    
                <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'education'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'education' ? 'alt' : '')}>
                  Eduacation
                </button>
    
                <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'financial'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'financial' ? 'alt' : '')}>
                  Financial
                </button>
    
                <button onClick={() => this.setState({newProposal: {...this.state.newProposal, type: 'fundamental'}})} className={"btn btn-articles-light " + (this.state.newProposal.type === 'fundamental' ? 'alt' : '')}>
                  Fundamental
                </button>
              </div>

              <div className="form-group mt-3">
                <label for="address">Title</label>
                <input className="form-control with-label" onChange={ (e) => { this.handleNewProposalChange(e) } } name="title" id="title" type="text" value={this.state.title}/>
              </div>

              <div className="form-group">
                <label for="address">URL</label>
                <input className="form-control with-label" onChange={(e) => {this.handleNewProposalChange(e)}} name="url" id="url" type="text" value={this.state.url}/>
              </div>

              <div className="form-group">
                <label for="address">Description</label>
                <input className="form-control with-label" onChange={(e) => {this.handleNewProposalChange(e)}} name="description" id="description" type="text" value={this.state.description}/>
              </div>

              <div className="form-group">
                <label for="address">Content</label>
                <TextareaAutosize className="form-control with-label" name="content" id="content" type="text" value={this.state.content} onChange={(e) => {this.handleNewProposalChange(e)}} cols="30" rows="3"/>
                {/* <input   name="content" id="content" type="text" value={this.state.content}/> */}
              </div>

              <button onClick={() => this.upsertProposal(this.state.newProposal)} disabled={(
                this.state.newProposal.type === '' 
                || 
                this.state.newProposal.title === '' 
                ||
                this.state.newProposal.url === '' 
                ||
                this.state.newProposal.description === '' 
                ||
                this.state.newProposal.content === '' 
                ? true : false)} className="btn btn-articles-light ">Submit</button>

            </div>

            <div className="proposals">
              {this.state.proposals.filter(  this.state.typeFilter === '' ? (obj) => obj : (obj) => obj.type === this.state.typeFilter ).map(proposal => 
                <Proposal 
                key={proposal._id}
                proposal={proposal}
                deleteProposal={this.deleteProposal}
                upsertProposal={this.upsertProposal}
                />
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