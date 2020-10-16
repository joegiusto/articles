import React from 'react';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import axios from 'axios';

import * as ROUTES from '../../../constants/routes'
import Component from 'react-live-clock/lib/Component';

class Proposals extends Component {
  constructor(props) {
    super(props)

    this.state = {
      filter: 'All',
      proposals: [],

      senateSeats: 100,
      ourSenateSeats: 0,

      houseSeats: 435,
      ourHouseSeats: 0,

      stateGovernorsips: 50,
      ourStateGovernorships: 0,

      territorialGovernorships: 6,
      ourTerritorialGovernorships: 0,
    }
  }

  componentDidMount() {
    const self = this;

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

  render(props) {

    const {...state} = this.state

    return (
      <section className="proposals-page">

        <Helmet>
          <title>Proposals - Articles</title>
        </Helmet>

        <div className="container">

          <h1>Proposals</h1>
          <p>A look into our solutions to some of the issues going on in the nation.</p>

          <div className="party-stats">

            <div className="party-stat">
              <div>Seats in the the Senate</div>
              <div>{`${state.ourSenateSeats} / ${state.senateSeats}`}</div>
              <div className="progress">
                <div className="progress-bar" style={{width: '2px', backgroundColor: '#ffc8c8'}}></div>
              </div>
            </div>

            <div className="party-stat">
              <div>Seats in the the House</div>
              <div>{`${state.ourHouseSeats} / ${state.houseSeats}`}</div>
              <div className="progress">
                <div className="progress-bar" style={{width: '2px', backgroundColor: '#ffc8c8'}}></div>
              </div>
            </div>

            <div className="party-stat">
              <div>State Governorships</div>
              <div>{`${state.ourStateGovernorships} / ${state.stateGovernorsips}`}</div>
              <div className="progress">
                <div className="progress-bar" style={{width: '2px', backgroundColor: '#ffc8c8'}}></div>
              </div>
            </div>

            <div className="party-stat">
              <div>Territorial Governorships</div>
              <div>{`${state.ourTerritorialGovernorships} / ${state.territorialGovernorships}`}</div>
              <div className="progress">
                <div className="progress-bar" style={{width: '2px', backgroundColor: '#ffc8c8'}}></div>
              </div>
            </div>

          </div>

          <div className="badges noselect">
            <div onClick={() => this.setState({filter: 'All'})} className={"badge " + (this.state.filter === "All" ? 'badge-dark' : 'badge-light')}>All</div>
            <div onClick={() => this.setState({filter: 'Fundamental'})} className={"badge " + (this.state.filter === "Fundamental" ? 'badge-dark' : 'badge-light')}>Fundamental</div>
            <div onClick={() => this.setState({filter: 'Social'})} className={"badge " + (this.state.filter === "Social" ? 'badge-dark' : 'badge-light')}>Social</div>
            <div onClick={() => this.setState({filter: 'Financial'})} className={"badge " + (this.state.filter === "Financial" ? 'badge-dark' : 'badge-light')}>Financial</div>
            <div onClick={() => this.setState({filter: 'Education'})} className={"badge " + (this.state.filter === "Education" ? 'badge-dark' : 'badge-light')}>Education</div>
          </div>

          {/* Fundamental */}
          <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Fundamental" ? '' : 'd-none')}>

            <div className="after-text noselect">
              Fundamental
            </div>

            {
              this.state.proposals.filter(proposal => proposal.type === 'fundamental').map(proposal => 
                <Proposal
                  proposal={proposal}
                />
              )
            }

          </div>

          {/* Social */}
          <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Social" ? '' : 'd-none')}>

            <div className="after-text noselect">
              Social
            </div>

            {
              this.state.proposals.filter(proposal => proposal.type === 'social').map(proposal => 
                <Proposal
                  proposal={proposal}
                />
              )
            }

          </div>

          {/* Financial */}
          <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Financial" ? '' : 'd-none')}>

            <div className="after-text noselect">
              Financial
            </div>

            {
              this.state.proposals.filter(proposal => proposal.type === 'financial').map(proposal => 
                <Proposal
                  proposal={proposal}
                />
              )
            }

          </div>

          {/* Education */}
          <div className={"proposals " + (this.state.filter === "All" || this.state.filter === "Education" ? '' : 'd-none')}>

            <div className="after-text noselect">
            Education
            </div>

            {
              this.state.proposals.filter(proposal => proposal.type === 'education').map(proposal => 
                <Proposal
                  proposal={proposal}
                />
              )
            }

          </div>

        </div>
      </section>
    )
  }
}

// const Page = (props) => (
  
// );

const Proposal = (props) => {
  const { proposal } = props

  return (
  <Link to={ROUTES.PROPOSALS + '/' + proposal.url}>
    <div className="proposal">
      <div className="title">{proposal.title}</div>
      <div className="the-short">
        <div className="label">Summary:</div>
        <div className="description">{proposal.description}</div>
      </div>
    </div>
  </Link>
  )
}  

export default Proposals