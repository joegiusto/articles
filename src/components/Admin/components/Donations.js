import React, {Component} from 'react'
import axios from 'axios'

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      donations: [],
      total: 0
    };

  }

  componentDidMount() {
    this.props.setLoaction(this.props.tabLocation);
    const self = this;

    axios.get('/getDonations')
    .then(function (response) {

      let total = 0;

      for (var i=0; i < self.state.donations.length; i++) {
        total += self.state.donations[i].ammount
      }

      self.setState({ 
        donations: response.data,
        total: total
      });

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        donations: [],
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
          <h5>Donations</h5>
        </div>

        <table class="table table-bordered bg-white">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <th scope="col">Amount</th>
              <th scope="col">Message</th>
              <th scope="col">Created By</th>
              <th scope="col">Was Matched</th>
            </tr>
          </thead>
          <tbody>

            {this.state.donations.map(donation => (

              <tr>
                <th scope="row">{donation.name}</th>
                <td>${(donation.amount / 100).toFixed(2)}</td>
                <td>{donation.message}</td>
                <td>{donation.createdBy}</td>
                <td>{donation.wasMatched ? 'True' : 'False'}</td>
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