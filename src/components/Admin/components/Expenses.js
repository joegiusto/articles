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
      <div className="mt-5">

        <div className="">
          <h5>Expenses</h5>
        </div>

        <table class="table table-bordered bg-white">
          <thead>
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

        {/* <div className="btn btn-articles-light">Add Submission</div> */}

      </div>
    );
  }
}

export default Donations