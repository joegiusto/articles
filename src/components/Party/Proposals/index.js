import React from 'react';

const proposals = [
  {
    title: 'Revise The Pledge Of Alligence'
  },
  {
    title: 'School Lunch Reform'
  },
  {
    title: 'Class Size Ratio Reduction'
  },
  {
    title: 'NASA Funding'
  },
  {
    title: 'Tidy Up Tax Loopholes'
  },
  {
    title: 'Federal Gun Laws'
  },
  {
    title: 'Mental Health Equality In Healthcare'
  }
]

const Page = (props) => (
  <div className="container">
    <h1>Proposals</h1>
    <p>A look into our solutions to some of the issues going on.</p>

    {proposals.map((proposal, i) => (
      <Proposal
        proposal={proposal}
      />
    ))}

  </div>
);

const Proposal = (props) => {
  const { proposal } = props

  return (
  <div className="propsal">
    <div className="title">{proposal.title}</div>
  </div>
  )
}  

export default Page