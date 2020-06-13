import React, { Component } from 'react'
import { Helmet } from "react-helmet";
import axios from 'axios'

class Proposal extends Component {
  constructor(props) {
    super(props)

    this.state = {
      proposalLoading: false,
      proposal: {}
    }
  }

  componentDidMount() {
    const self = this;

    this.setState({
      proposalLoading: true
    })

    axios
    .post("/api/getProposal", {proposal_url: this.props.match.params.id})
    .then(res => {
      
      console.log(res);
      self.setState({
        proposal: res.data,
        proposalLoading: false
      })

    })
    .catch(err => {

      console.log(err)
      self.setState({
        proposalLoading: false
      })

    }
    );
  }

  render(props) {

    const { proposal, proposalLoading } = this.state;

    return (
      <section className="proposals-page single">

        <Helmet>
          <title>Proposals - Articles</title>
        </Helmet>

        <div className="container">

          <h5>Proposal:</h5>

          {
            proposalLoading ? 
            <div className="title-fake"></div>
            :
            <h1>{proposal.title}</h1>
          }

          {
            proposalLoading ? 
            <div className="description-fake"></div>
            :
            <p>{proposal.description}</p>
          }

          <hr/>

          <p className="mt-5">
            Content will show here
          </p>

        </div>
      </section>
    )
  }
}

export default Proposal;