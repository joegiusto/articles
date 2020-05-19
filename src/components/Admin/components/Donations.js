import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'

class Donations extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      donations: [],
      total: 0,

      current: {
        type: '',
        matched: false
      }
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

  handleCurrentChange(event) {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      ...this.state,
      current: {
        ...this.state.current,
        [name]: value
      }
    });
  }

  changeType(type) {
    this.setState({
      ...this.state,
      current: {
        ...this.state.current,
        type: type
      }
    });
  }

  render() {

    return (
      <div className="admin-donations container-fluid">

        <div className="row">

          <div className="col-12 col-md-4">

            <div className="admin-side-by-side-form donate-form">

              <div className="payment-type">

                <div onClick={() => this.changeType('cash')} className={"type " + (this.state.current.type === 'cash' ? 'active' : '')}>
                  <i class="fas fa-money-bill fa-3x"></i>
                </div>

                <div onClick={() => this.changeType('card')} className={"type " + (this.state.current.type === 'card' ? 'active' : '')}>
                  <i class="far fa-credit-card fa-3x"></i>
                </div>

              </div>

              <div className="form-group">
                <input className="form-control" type="text" value={moment().format("LL")} placeholder="Date"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="text" placeholder="Name"/>
              </div>

              <div className="form-group">
                <input className="form-control" type="number" placeholder="Amount"/>
              </div>

              <div className="match-details">
                <small>Matched?</small>
                <div className="content">
                  <div className="match-button active mr-2">No</div>
                  <div className="match-button mr-2">Yes</div>
                  <select class="form-control" disabled id="exampleFormControlSelect1">
                    <option>Joey Giusto</option>
                    <option>Investment Firm XYZ</option>
                  </select>
                </div>
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
                <textarea className="form-control" type="text" rows="5" placeholder="Message"/>
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

          </div>
        </div>

        

        {/* <div className="btn btn-articles-light">Add Submission</div> */}

      </div>
    );
  }
}

export default Donations