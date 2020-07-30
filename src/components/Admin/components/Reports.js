import React, {Component} from 'react'
import { connect } from "react-redux";
import axios from 'axios'
import moment from 'moment'

class Reports extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      loading: false,
      reports: [],
    };

  }

  componentDidMount() {
    const self = this;
    this.props.setLoaction(this.props.tabLocation);

    this.setState({
      loading: true
    })

    axios.get('/api/getExpenseReports', {
      
    })
    .then(function (response) {

      console.log(response)

      self.setState({ 
        reports: response.data,
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

  deleteExpenseReport(_id) {
    const self = this;

    axios.post('/api/deleteExpenseReport', {
      _id
    })
    .then(function (response) {

      console.log(response)

      self.setState({
        reports: self.state.reports.filter((report) => report._id !== _id)
      })

    })
    .catch(function (error) {
      console.log(error);

    });

  }

  render() {

    return (
      <div className="admin-reports mt-5">

        <div className="expenses">
          <h5>Expense Reports ({this.state.reports.length})</h5>
          {this.state.reports.map((report) => (
            <div className="expense">

              <div onClick={() => this.deleteExpenseReport(report._id)} className="delete">
                <i className="fas fa-trash"></i>
              </div>

              <div className="respond">
                <i className="fas fa-comment"></i>
              </div>

              <div>
                {report.date} - {report.expense_id} - {report.user_id}
              </div>

              <div>
                <span className="badge badge-dark">{moment(report.date).format("LL")}</span> - <span className="badge badge-warning">{report.fetchedId}</span> - <span className="badge badge-info"><b>{report.fetchedUser}</b></span>
              </div>

              <div>{report.reason}</div>
            </div>
          ))}
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