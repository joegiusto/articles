import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorizationHide } from '../Session';
import { withFirebase } from '../Firebase';
import * as ROLES from '../../constants/roles';

import moment from 'moment'

const DonatePage = (props) => (
  <div>
    <div className="mt-5 container-fluid container-custom">
      <div className="row justify-content-center">
        <div className="col-4">
          {/* <DonateForm history={props.history}/> */}
          <NotUnlessAdmin/>
        </div>
        <div className="col-8">
          <DonateActivity history={props.history}/>
        </div>
      </div>
    </div>
  </div>
);

class DonateActivityBase extends Component {
  constructor(props) {
    super(props);

    this.state = {
      text: '',
      loading: false,
      donations: [],
      limit: 5,
    };
  }

  componentDidMount() {
    this.onListenForDonations();
  }

  onListenForDonations() {
    this.setState({ loading: true });

    this.props.firebase
    .donations()
    .orderByChild('createdAt')
    // .limitToLast(this.state.limit)
    .on('value', snapshot => {
      const donationObject = snapshot.val();

      if (donationObject) {
        const donationList = Object.keys(donationObject).map(key => ({
          ...donationObject[key],
          uid: key,
        }
        ));
        this.setState({
          donations: donationList,
          loading: false,
        });
      } else {
        this.setState({ donations: null, loading: false });
      }
    });

  }

  onNextPage = () => {
    this.setState(
      state => ({ limit: state.limit + 5 }),
      this.onListenForDonations,
    );
  };

  componentWillUnmount() {
    this.props.firebase.donations().off();
  }

  render() {
    const { donations, loading } = this.state;

    return (

      <div>
        {loading && <div>Loading ...</div>}
        {donations ? (
        <div>
          <DonationData 
            donations={donations}
          />
          
          <StyledDonationList
            donations={donations}
          />

          {/* <DonationList 
            donations={donations}
          /> */}
        </div>
        ) : (
        <div>There are no donations yet ...</div>
        )}
      </div>

    )
  }
}

const StyledDonationList = ({donations}) => (
  <table className="table">
  <thead className="thead-dark">
    <tr>
      <th scope="col">DONATION ID</th>
      <th scope="col">DATE</th>
      <th scope="col">NAME</th>
      <th scope="col">AMOUNT</th>
      <th scope="col">NOTE</th>
    </tr>
  </thead>
  <tbody>
    {donations.map(donation => (
      <StyledDonationItem
        key={donation.uid}
        donation={donation}
      />
    ))}
  </tbody>
</table>
)

const StyledDonationItem = ({donation}) => (
  <tr>
    <th scope="row">{donation.uid}</th>
    <td>{moment(donation.createdAt).format('LLL') }</td>
    <td>{donation.name}</td>
    <td>${(donation.amount / 100).toFixed(2)}</td>
    <td>{donation.note === "match" ? (<div><span role="img" aria-label="emoji">⭐</span>Matched</div>) : (<div>{donation.note}</div>) }</td>
  </tr>
)

class DonationData extends Component {

  constructor(props) {
    super(props);

    this.state = { total: 0 };

  }

  componentDidMount() {
    // this.setState({ total: 30 });
  }

  componentWillUnmount() {
    // this.props.firebase.donations().off();
  }

  render() {
    const amountTotal = this.props.donations.map(donation => (donation.amount)).reduce((a, b) => a + b, 0) /100
    // const amountToday = this.props.donations.map(donation => (donation.amount)).reduce((a, b) => a + b, 0) /100

    return (
      <div>
        {/* <div>Today: ${amountToday}</div> */}
        <h1>Total: ${amountTotal}</h1>
      </div>
    )
  }

}

const DonationList  = ({ donations }) => (
  <ul className="DonationList">
    {donations.map(donation => (
      <DonationItem
        key={donation.uid}
        donation={donation}
        />
    ))}
  </ul>
);

const DonationItem  = ({ donation }) => (
  <li className="DonationItem">
      <div className="DonationItem_ID"><b>ID:</b> {donation.uid} </div>
      <div><b>Name:</b> {donation.name} </div>
      <div><b>Amount:</b> ${donation.amount / 100} </div>
      <div><b>Note:</b> {donation.note} </div>
      <div><b>Date:</b> {moment(donation.createdAt).format("MM/DD/YYYY")} </div>
  </li>
);


const INITIAL_STATE = {
  email: '',
  name: '',
  willMatch: false,
  amount: 100,
  note: '',
  type: '',
  success: false,
  error: null,
};

class DonateFormBase extends Component {
  constructor(props) {
    super(props);

    this.state = { ...INITIAL_STATE };

  }

  onSubmit = (event, authUser) => {

    switch(this.state.type) {
      case "Cash": 
        console.log("Cash donation successfull.")

        this.props.firebase.donations().push({
          name: this.state.name,
          wasMatched: this.state.willMatch,
          amount: this.state.amount,
          note: this.state.note,
          createdBy: '1kgzHcDlDJbBVppJlVXqpsgvhAa2',
          createdAt: this.props.firebase.serverValue.TIMESTAMP,
        })
    
        if (this.state.willMatch) {
          console.log('Was Matched')
          this.props.firebase.donations().push({
            name: 'Joey Giusto',
            wasMatched: this.state.willMatch,
            amount: this.state.amount,
            note: 'match',
            createdBy: '1kgzHcDlDJbBVppJlVXqpsgvhAa2',
            createdAt: this.props.firebase.serverValue.TIMESTAMP,
          })
        }
        break;
      case "Card": 
        // TODO 
        console.log("Card payments are not supported yet but the call to pass a object to Stripe will take place here.")
        break;
      default:
        console.log("UNSUPPORTED PAYMENT TYPE")
    } 

    // Was a succesful push
    this.setState({ success: true });

    // Clear success after 2 seconds for UX reasons
    setTimeout(() => {
      this.setState({ ...INITIAL_STATE });
    }, 2000);

    

    event.preventDefault();
    
  };

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  buttonAmount = (number) => {
    this.setState({ amount: number });
  };

  onChangeCheckbox = event => {
    this.setState({ [event.target.name]: event.target.checked });
  };

  render() {
    const { email, name, error } = this.state;

    return (
      <div>
        <h1>Donation</h1>

        <form autoComplete="off" onSubmit={this.onSubmit}>

          <table className="table">
            <thead className="thead-dark">

              <th className="dual-header">
                Form

                <label for="default" className="btn btn-light btn-donation-match mb-0">
                  Match Donation
                  <input 
                    type="checkbox" 
                    id="default" 
                    className="badgebox"
                    name="willMatch"
                    checked={this.willMatch}
                    onChange={this.onChangeCheckbox}
                  />
                  <span className="badge"></span>
                </label>

              </th>

            </thead>
          </table>
  
          {this.state.success ? (
          <div className={this.state.type === "Cash" ? ("alert alert-success") : ("alert alert-danger") }>{this.state.type === "Cash" ? (<span>{this.state.type} donation successfull.</span>) : (<span>{this.state.type} donation not supported yet.</span>)} </div>
          ) : (
          <span></span>
          )}

          <div className="input-group input-group-lg mb-3">
            <input 
              name="name"
              value={this.state.name}
              onChange={this.onChange}
              type="text" 
              className="form-control" 
              placeholder="Donor" 
              aria-label="Sizing example input" 
              aria-describedby="inputGroup-sizing-lg"
            />
          </div>

          <div className="input-group mb-3">

            <div className="input-group-prepend">
              <span className="input-group-text">$</span>
            </div>

            <input
              name='amount'
              value={(this.state.amount / 100).toFixed(2)}
              onChange={this.onChange}
              type="number" 
              placeholder="Amount"
              className="form-control" 
              aria-label="Amount (to the nearest dollar)"
            />

            <button type="button" onClick={() => this.buttonAmount(100)} className="btn btn-light btn-match-input">$1</button>
            <button type="button" onClick={() => this.buttonAmount(500)} className="btn btn-light btn-match-input">$5</button>
            <button type="button" onClick={() => this.buttonAmount(1000)} className="btn btn-light btn-match-input">$10</button>
            <button type="button" onClick={() => this.buttonAmount(2000)} className="btn btn-light btn-match-input">$20</button>
            <button type="button" onClick={() => this.buttonAmount(5000)} className="btn btn-light btn-match-input">$50</button>
          </div>

          <div class="form-group">
            <label for="exampleFormControlTextarea1">Note:</label>
            <textarea 
              class="form-control" 
              id="exampleFormControlTextarea1" 
              rows="3"
              name="note"
              value={this.state.note}
              onChange={this.onChange}
            />
          </div>
  
          <div className="mt-5 pt-5">
            <h5>Optional</h5>
          </div>

          <div className="input-group mb-3">
            <div className="input-group-prepend">
              <span className="input-group-text" id="inputGroup-sizing-default">Email</span>
            </div>
            <input type="text" className="form-control" aria-label="Default" aria-describedby="inputGroup-sizing-default"/>
          </div>

          <div className="row">

            <div className="col-8">
              <div className="row">
                <div className="col-7">
                  <input type="text" className="form-control" placeholder="Town"/>
                </div>
                <div className="col-1">
                  <span className="form-control border-0 px-0">&amp;</span>
                </div>
                <div className="col-4">
                  <input type="text" className="form-control" placeholder="State"/>
                </div>
              </div>
            </div>

            <div className="col-1">
              <span className="form-control border-0 px-0">Or</span>
            </div>

            <div className="col-3">
              <input type="text" className="form-control" placeholder="Zip"/>
            </div>

          </div>
  
          {/* <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Email Address"
          />
          <br/>
  
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="State"
          />
          <br/>
  
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="Town"
          />
          <br/>
  
          <input
            name="email"
            value={this.state.email}
            onChange={this.onChange}
            type="text"
            placeholder="User Id"
          />
          <br/> */}
  
          <div className="row mt-3">

            <div className="col-6">
              <button type="submit" onClick={() => this.setState({type: 'Cash'})} className="btn btn-dark w-100">
                <i class="far fa-money-bill-alt"></i>Cash Payment
              </button>
            </div>
    
            <div className="col-6">
              <button type="submit" onClick={() => this.setState({type: 'Card'})} className="btn btn-dark w-100">
                <i class="far fa-credit-card"></i>Card Payment
              </button>
            </div>

          </div>
  
          {error && <p>{error.message}</p>}
        </form>
      </div>
    );
  }
}

const DonateForm = withFirebase(DonateFormBase);
const DonateActivity = withFirebase(DonateActivityBase);

export default DonatePage

const condition = authUser =>
authUser && !!authUser.roles[ROLES.ADMIN];

const NotUnlessAdmin = compose(
  // withEmailVerification,
  withAuthorizationHide(condition),
)(DonateForm);