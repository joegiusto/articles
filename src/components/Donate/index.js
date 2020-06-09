import React, { Component } from 'react';
import { compose } from 'recompose';
import { withAuthorizationHide } from '../Session';
import { withFirebase } from '../Firebase';

import { connect } from "react-redux";

import * as ROLES from '../../constants/roles';
import moment from 'moment';
import {CardElement, ElementsConsumer} from '@stripe/react-stripe-js';

import ArticlesBackground from '../../assets/img/banner.jpg'
import power from '../../assets/img/Store/power.png'
  
const STRIPE_PUBLIC_KEY = 'pk_live_VE6HtyhcU3HCa6bin4uKgFgL00jeOY6SEW'; // TODO: PUT YOUR STRIPE PUBLISHABLE KEY HERE
const FIREBASE_FUNCTION = 'https://us-central1-articles-1776.cloudfunctions.net/charge/'; // TODO: PUT YOUR FIREBASE FUNCTIONS URL HERE

const stripe = window.Stripe(STRIPE_PUBLIC_KEY);
const elements = stripe.elements();

const charge_amount = 1000;
const charge_currency = 'usd';

const CARD_OPTIONS = {
  iconStyle: 'solid',
  style: {
    base: {
      iconColor: '#c4f0ff',
      color: '#fff',
      fontWeight: 500,
      fontFamily: 'Roboto, Open Sans, Segoe UI, sans-serif',
      fontSize: '16px',
      fontSmoothing: 'antialiased',
      ':-webkit-autofill': {color: '#fce883'},
      '::placeholder': {color: '#87bbfd'},
    },
    invalid: {
      iconColor: '#ffc7ee',
      color: '#ffc7ee',
    },
  },
};

const CardField = ({onChange}) => (
  <fieldset className="FormGroup">
    <div className="FormRow">
      <CardElement options={CARD_OPTIONS} onChange={onChange} />
    </div>
  </fieldset>
);

class NewDonateBase extends Component {
  constructor (props) {
    super(props);

    this.state = {
      
    };

  }

  componentWillUnmount() {
    console.log("Something has to happen here because of crash")
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {

  }
  
  render(props) {
    return (
      <div className="donate-page">

        <div className="donate-form">
          <div className="inner">

            {/* <img src={power} alt="" className="power"/> */}

            <div className="title">Name</div>
            <input className="form-control" type="text" value={`${this.props.user?.first_name} ${this.props.user?.last_name}` || ''}/>

            <div className="title">Amount:</div>
            <div className="amount-group">
              <input className="form-control" type="text" placeholder="$0.00"/>
              <button className="btn btn-articles-light">$1</button>
              <button className="btn btn-articles-light">$5</button>
              <button className="btn btn-articles-light">$10</button>
              <button className="btn btn-articles-light">$20</button>
              <button className="btn btn-articles-light">$50</button>
            </div>

            <div className="title">Card Info:</div>
            <input className="form-control" type="text"/>

            <img src={power} alt="" className="power mt-4"/>
            <div className="btn btn-articles-light alt d-block mx-auto mt-4">Donate</div>

          </div>
        </div>

        <div className="intro-section">

          <img src={ArticlesBackground} alt=""/>

          <div className="container">
            <div className="row">
              
              <div className="col-12 col-md-5">
                <div className="info">
                  <div className="blur"></div>
                  <div className="title">Thinking About Donating?</div>
                  <div className="text">fijewbfewuibfewuibwfe wbuefiubewf bewfiu bewiu bfewiubfewi8u ebwuifew buiewb uiew bfu iewbfeiwu b efwiub efwiube wfi</div>
                </div>
              </div>

            </div>
          </div>

        </div>

        <div className="other-ways-section">
          <div className="container">
            <div className="row">
              <div className="col-12 col-md-5">
                <div className="title">
                  Other Ways To Support
                </div>
                <div className="text">
                  Besides donating there are other ways to support us while recving something in return!
                </div>
                <ul className="mt-3">
                  <li>Buy Merchandise</li>
                  <li>Pay To Hide Ads</li>
                </ul>
              </div>
            </div>
          </div>
        </div>

      </div>
    );
  }
}

const NoError = (props) => (
  <h1>Test</h1>
)

const DonatePage = (props) => (
  <div>
    <NewDonate></NewDonate>
    <div className="mt-5 container-fluid container-custom">
      <div className="row justify-content-center">

        <div className="col-12 col-md-4">
          {/* <DonateForm history={props.history}/> */}
          <NotUnlessAdmin/>
        </div>

        <div className="col-12 col-md-4">
          <DonateActivity history={props.history}/>
        </div>

        <div className="col-12 col-md-4">
          <h1>Stripe Testing Here</h1>
          <App/>
        </div>

      </div>
    </div>
  </div>
);

function numberWithCommas(x) {
  return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

class App extends Component {
  constructor (props) {
    super(props);

    this.state = {
      amount: 1000,
      submit: false
    };

  }

  componentWillUnmount() {
    console.log("Something has to happen here because of crash")
  }

  onChange = event => {
    this.setState({ [event.target.name]: event.target.value });
  };

  componentDidMount() {
    
  }
  
  render() {
    return (
      <div style={{maxWidth: '500px', padding: '20px'}}>

        <div className="button-group">
          <button onClick={() => this.setState({amount: 100})} type="button" className={"btn btn-outline-primary " + (this.state.amount === 100 ? 'active' : '')}>$1</button>
          <button onClick={() => this.setState({amount: 500})} type="button" className={"btn btn-outline-primary " + (this.state.amount === 500 ? 'active' : '')}>$5</button>
          <button onClick={() => this.setState({amount: 1000})} type="button" className={"btn btn-outline-primary " + (this.state.amount === 1000 ? 'active' : '')}>$10</button>
          <button onClick={() => this.setState({amount: 2500})} type="button" className={"btn btn-outline-primary " + (this.state.amount === 2500 ? 'active' : '')}>$25</button>
          <button onClick={() => this.setState({amount: 5000})} type="button" className={"btn btn-outline-primary " + (this.state.amount === 5000 ? 'active' : '')}>$50</button>

          <input 
            name="amount"
            onChange={this.onChange}
            type="number"
            value={this.state.amount}
          />
        </div>


      <div id="payment-request-button">
      {/* <!-- Payment button gets injected here --> */}
      </div>


        <form className="dual-header-pay" id="form" action="/charge" method="post">
          <div className="form-row">
            <label for="card-element">
              Credit or debit card
            </label>
            <div className="w-100" id="card-element">
              {/* <!-- A Stripe Element will be inserted here. --> */}
            </div>

            {/* <!-- Used to display form errors. --> */}
            <div id="error" role="alert"></div>
          </div>

          <button className="pay" type="submit">Submit Payment</button>
        </form>
        <div className="text-muted text-left">You will be charged ${numberWithCommas((this.state.amount / 100).toFixed(2))}</div>

        <div id="processing" style={{display: 'none'}}>processing...</div>
        <div id="thanks" style={{display: 'none'}}>Thanks for your donation!</div>
    </div>
    );
  }
}

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
  <table className="table table-responsive">
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

// const DonationList  = ({ donations }) => (
//   <ul className="DonationList">
//     {donations.map(donation => (
//       <DonationItem
//         key={donation.uid}
//         donation={donation}
//         />
//     ))}
//   </ul>
// );

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

          <div className="form-group">
            <label for="exampleFormControlTextarea1">Note:</label>
            <textarea 
              className="form-control" 
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
  
          <div className="row mt-3">

            <div className="col-6">
              <button type="submit" onClick={() => this.setState({type: 'Cash'})} className="btn btn-dark w-100">
                <i className="far fa-money-bill-alt"></i>Cash Payment
              </button>
            </div>
    
            <div className="col-6">
              <button type="submit" onClick={() => this.setState({type: 'Card'})} className="btn btn-dark w-100">
                <i className="far fa-credit-card"></i>Card Payment
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

// const condition = authUser =>
// authUser && !!authUser.roles[ROLES.ADMIN];

const NotUnlessAdmin = compose(
  // withEmailVerification,
)(DonateForm);

const mapStateToProps = state => ({
  auth: state.auth,
  user: state.auth.user_details,
  errors: state.errors
});

const NewDonate = connect(
  mapStateToProps,
)(NewDonateBase);