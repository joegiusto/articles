import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Reports extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      reports: {
        unresponded: [],
        responded: []
      },
      filter: 'unresponded',
      filterFormula: (obj) => obj.responses?.length === 0 || obj.responses?.length === undefined
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    this.setState({
      loading: true
    })

    axios.get('/api/getExpenseReports', {
      
    })
    .then(function (response) {

      console.log(response)

      self.setState({ 
        reports: {
          unresponded: response.data.filter( (obj) => obj.responses?.length === 0 || obj.responses?.length === undefined ),
          responded: response.data.filter( (obj) => obj.responses?.length > 0 ),
        },
        loading: false
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        loading: false
      })
    });

  }

  componentWillUnmount() {

  }

  deleteReport(id) {
    const self = this;

    axios.post('/api/deleteReport', {
      _id: id
    })
    .then(function (response) {

      console.log(response)

      self.setState({
        reports: self.state.reports.filter(function( obj ) {
          return obj._id !== id;
        })
      });

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  respondReport(id, response) {
    const self = this;

    console.log(id, response)

    axios.post('/api/respondReport', {
      _id: id,
      response: response
    })
    .then(function (response) {

      console.log(response)

      // self.setState({
      //   reports: self.state.reports.filter(function( obj ) {
      //     return obj._id !== id;
      //   })
      // });

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  render() {

    return (
      <div className="admin-page admin-reports">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Status</div>
            <div className="card-body">
              <div>Total: {(this.state.reports.unresponded.length + this.state.reports.responded.length)}</div>
              <hr/>
              <div>Unresponded: {this.state.reports.unresponded.length}</div>
              <div>Responded: {this.state.reports.responded.length}</div>
            </div>
          </div>

        </div>

        <div className="reports">

          <div className="filters mb-3">
            <button onClick={() => this.setState({filter: 'unresponded'})} className={"btn btn-articles-light " + (this.state.filter === 'unresponded' ? 'alt' : '')}>Unresponded</button>
            <button onClick={() => this.setState({filter: 'responded'})} className={"btn btn-articles-light " + (this.state.filter === 'responded' ? 'alt' : '')}>Responded</button>
          </div>

          {/* Unresponded Reports */}
          {this.state.filter === 'unresponded' ?

          this.state.reports.unresponded.length > 0 ?

          this.state.reports.unresponded
          .map((report) => (
            <Report 
            report={report}
            respondReport={this.respondReport}
            deleteReport={this.deleteReport}
            />
          ))

          :

          <div className="alert alert-primary">No Reports to view, check back later!</div>

          :

          null

          }

          {/* Responded Reports */}
          {this.state.filter === 'responded' ?

          this.state.reports.responded.length > 0 ?

          this.state.reports.responded
          .map((report) => (
            <Report 
            report={report}
            respondReport={this.respondReport}
            deleteReport={this.deleteReport}
            />
          ))

          :

          <div className="alert alert-danger">There is always responded reports to view so this is very bad!</div>

          :

          null

          }

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
)(Reports);


class Report extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      expanded: false,
      response: ''
    };

    this.handleChange = this.handleChange.bind(this);
  }

  componentDidMount() {
    const self = this;

    // this.props.setLoaction(this.props.tabLocation);
    // this.setState({
    //   loading: true
    // })

  }

  componentWillUnmount() {

  }

  handleChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {

    const report = this.props.report

    return (
      <div className="report">

        <div>
          {/* {moment(report.date).format("LLL")} - {report.expense_id} - - <span className="badge badge-dark">{report.user_id}</span> */}
        </div>

        <div>
          <span className="badge badge-dark">{moment(report.date).format("LL")}</span> - <span className="badge badge-warning">{report.fetchedId}</span> - <span className="badge badge-info"><b>{report.first_name} <small>{report.user_id}</small></b></span>
        </div>

        <div>{report.reason}</div>

        <div className="responses">
          {/* {report.responses?.length} */}
          {report.responses?.map(response => 
            <div className="response">
              <div className="employee">{response.employee}</div>
              <div className="date">{moment(response.date).format("LLL")}</div>
              <div className="response-text">{response.response}</div>
            </div>  
          )}
        </div>

        <div className="actions d-flex">

          <button onClick={() => this.props.deleteReport(report._id)} className="delete badge badge-danger">
            <i className="fas fa-trash"></i>
            <span>Delete</span>
          </button>

          <button onClick={() => this.setState({expanded: true})} className="badge badge-success ml-2">
            <i className="fas fa-comment"></i>
            <span>Respond</span>
          </button>

        </div>

        <div className={"response " + (this.state.expanded ? '' : 'd-none')}>

          <div className="form-group">
            <label for="address">Response</label>
            <input className="form-control with-label" onChange={this.handleChange} name="response" id="response" type="text" value={this.state.response}/>
          </div>

          <button onClick={() => this.setState({expanded: false})} className="btn btn-articles-light">Cancel</button>
          <button onClick={() => this.props.respondReport(this.props.report._id, this.state.response)} className="btn btn-articles-light">Respond</button>

        </div>

      </div>
    );
  }
}