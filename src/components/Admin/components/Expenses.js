import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      expenses: [],
    };

  }

  componentDidMount() {
    this.props.setLoaction(this.props.tabLocation);
    const self = this;

    axios.get('/getExpenses')
    .then(function (response) {

      console.log(response);

      self.setState({ 
        expenses: response.data,
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        expenses: [],
      })
    });
  }

  componentWillUnmount() {
    this.props.setLoaction('');
  }

  render() {

    return (
      <div className="admin-expenses container-fluid">

        <div className="row">

          <div className="col-12 col-md-4">

            <div className="admin-side-by-side-form">

              <div className="form-group">
                <input className="form-control" type="text" value="" placeholder="Reason"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="number" placeholder="Amount"/>
              </div>

              <div className="match-details">
                <small>Created By</small>
                <div className="content">
                  <div className="match-button active mr-2">User</div>
                  <div className="match-button mr-2">Admin</div>
                  <select class="form-control" disabled id="exampleFormControlSelect1">
                    <option>Joey Giusto</option>
                  </select>
                </div>
              </div>

              <div className="form-group">
                <textarea className="form-control" type="text" rows="5" placeholder="Note"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="text" placeholder="File"/>
              </div>

              <div className="submit">
                <div className="btn btn-articles-light w-100">Submit</div>
              </div>

            </div>

          </div>

          <div className="col-12 col-md-8">

            <table class="table table-sm table-bordered bg-white mt-3">
              <thead className="thead-dark">
                <tr>
                  <th scope="col">Reason</th>
                  <th scope="col">Amount</th>
                  <th scope="col">Date</th>
                  <th scope="col">Note</th>
                  <th scope="col">File</th>
                </tr>
              </thead>
              <tbody>

                {this.state.expenses.map(expense => (

                  <tr>
                    <th scope="row">{expense.reason}</th>
                    <td>${expense.amount / 100}</td>
                    <td>{moment.unix(expense.date).format("LL")}</td>
                    <td>{expense.note}</td>
                    <td><a target="_blank" rel="noopener noreferrer" href={expense.file}><i class="far fa-file-pdf"></i></a></td>
                  </tr>
                  
                ))}

              </tbody>
            </table>

          </div>
        </div>

      </div>
    );
  }
}

export default Donations