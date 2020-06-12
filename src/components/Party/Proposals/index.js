import React from 'react';
import { Link } from 'react-router-dom';

import * as ROUTES from '../../../constants/routes'

const proposals = {
  social: [
    {
      title: 'Revise The Pledge Of Alligence',
      url: 'revise-the-pledge-of-alligence',
      description: "Revert the pledge back to its creators vision"
    },
    {
      title: 'Legalize Marijuana',
      url: 'legalize-marijuana',
      description: "Revert the pledge back to its creators vision"
    },
    {
      title: 'Expand Psychedelic Studys',
      url: 'expand-psychedelic-studys',
      description: "Expand psychedelic studys and trials"
    },
    {
      title: 'Lower Charges For Psychedelic Possession',
      url: 'legalize-marijuana',
      description: "Study is still needed, jail is not"
    }
  ],
  eduacation: [
    {
      title: 'Class Size Reduction',
      url: 'class-size-reduction',
      description: 'Limit of 1-20 teacher/student for core subjects'
    },
    {
      title: 'Public School Lunch Reform',
      url: 'school-lunch-reform',
      description: 'Better lunch, for all'
    },
  ],
  financial: [
    {
      title: 'NASA Funding',
      url: 'nasa-funding',
      description: 'Set NASA budget to 2% (min) of Budget',
      cut: "Federal Budeget"
    },
    {
      title: 'Tidy Up Tax Loopholes',
      url: 'tax-loopholes',
      description: 'Provide patches to common abused loopholes'
    },
  ],
  fundemental: [
    {
      title: 'Mental Health Equality In Healthcare',
      url: 'mental-health-equality',
      description: 'Fair treatment of mental issues'
    },
    {
      title: 'Federal Gun Laws',
      url: 'federal-gun-laws',
      description: 'Standard to protect people and gun owners'
    },
    {
      title: 'Purto Rico Statehood',
      url: 'purto-rico-statehood',
      description: 'Allow Purto Rico to join the union'
    }
  ]
}

const Page = (props) => (
  <section className="proposals-page">
    <div className="container">
      <h1>Proposals</h1>
      <p>A look into our solutions to some of the issues going on.</p>
  
      {/* Social */}
      <div className="proposals">

        <div className="after-text noselect">
          Social
        </div>

        {proposals.social.map((proposal, i) => (
          <Proposal
            proposal={proposal}
          />
        ))}

      </div>

      {/* Financial */}
      <div className="proposals">

        <div className="after-text noselect">
          Financial
        </div>

        {proposals.financial.map((proposal, i) => (
          <Proposal
            proposal={proposal}
          />
        ))}

      </div>

      {/* Fundemental */}
      <div className="proposals">

        <div className="after-text noselect">
          Fundemental
        </div>

        {proposals.fundemental.map((proposal, i) => (
          <Proposal
            proposal={proposal}
          />
        ))}

      </div>

      {/* Eduacation */}
      <div className="proposals">

        <div className="after-text noselect">
          Eduacation
        </div>

        {proposals.eduacation.map((proposal, i) => (
          <Proposal
            proposal={proposal}
          />
        ))}

      </div>
  
    </div>
  </section>
);

const Proposal = (props) => {
  const { proposal } = props

  return (
  <Link to={ROUTES.PROPOSALS + '/' + proposal.url}>
    <div className="proposal">
      <div className="title">{proposal.title}</div>
      <div className="the-short">
        <div className="label">The Short:</div>
        <div className="description">{proposal.description}</div>
      </div>
    </div>
  </Link>
  )
}  

export default Page