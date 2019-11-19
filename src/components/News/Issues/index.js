import React from 'react';

const Issues = () => (
  <div className='container issues-page text-center'>

    <div className="mt-3">
      <h1>Issues</h1>
      <p>Overview of the most pressing issues and status updates on them. </p>
      <p>Unlike normal stories </p>
      {/* <p>Monday - blank - Tuesday - blank - Wednesday - blank</p> */}
    </div>

    <div className="row mb-5">

      <GzyCard
        podcast={true}
        podcastDay="Monday"
        podcastLink=""
        
        topText="Rising Cost"
        midText="COLLEGE DEBT"
        bottomText="The Unspoken Issues"
        backgroundImage="https://www.hood.edu/sites/default/files/styles/width_720/public/content/home/hero-image/D8A_2404%20copy.jpg?itok=ZZUFQMvz"
      />

      <GzyCard
        podcast={true}
        podcastDay="Wednesday"
        topText="Politics and tesla"
        midText="DOOMED TO FAIL"
        bottomText="THE GOVERMENT AND TESLA"
        backgroundImage="https://mondrian.mashable.com/uploads%252Fcard%252Fimage%252F975189%252F92d8e786-429d-4abf-92d2-1a1fd52d75d6.png%252F950x534__filters%253Aquality%252880%2529.png?signature=KQxUEq6LbhXAcmb_-cc6Ede63lY=&source=https%3A%2F%2Fblueprint-api-production.s3.amazonaws.com"
      />

      <GzyCard
        podcast={true}
        podcastDay="Friday"
        topText="plain english"
        midText="THE PAY GAP"
        bottomText="whats really going on"
        backgroundImage="https://au.res.keymedia.com/files/image/Human%20Capital/glass%20ceiling.jpg"
      />

      <GzyCard 
        topText="a misdiagnosed problem"
        midText="GUN LAWS"
        bottomText="what we are doing wrong"
        backgroundImage="https://ikengachronicles.com/wp-content/uploads/2017/09/GUNS-26-2-17-890x395.jpg"
      />

      <GzyCard 
        topText="Breaking the silence"
        midText="Swiss Banks"
        bottomText="Why America is poor"
        backgroundImage="https://www.swissinfo.ch/image/8422586/3x2/640/426/abf96c3bf391199fae817dc21f66133a/qh/71938066-8422592.jpg"
      />

      <GzyCard 
        topText="G-Eazy FT. Skizzy Mars & KYLE"
        midText="MONICA LEWINSKY"
        bottomText="PROD. BY TY FIFE & CHRISTOPH ANDERSON"
        backgroundImage="http://4.bp.blogspot.com/-Wjz6L4LYzGQ/T2TnAoHfbtI/AAAAAAAAgIo/x8zDn6SzBwI/s1600/north%2BSt%2BP.jpg"
      />

      <div className="col-12 col-md-6 mt-5 d-none">
        <div className="issue-item shadow-sm">
          <div>Title:</div>
          <div>History:</div>
          <div>House Support:</div>
          <div>Senate Support:</div>
          <button className="btn btn-black">Contact Rep</button>
        </div>
      </div>

    </div>
  </div>
);

function GzyCard (props) {

  const image = "url(" + props.backgroundImage + ")";
  const podcast = props.podcast

  return (
    <div className="col-md-4 mt-3">
      <div className="g-card effect8">

        {(podcast ? 
          <div className="g-card-badge">
            <i class="fab fa-youtube"></i>Covered {props.podcastDay}
          </div>
        : '')}

        <div style={{backgroundImage: image}} className="g-card-background"></div>
        <div className="g-card-text-card">
          <div className="top-text">{props.topText}</div>
          <div className="mid-text">{props.midText}</div>
          <div className="bottom-text">{props.bottomText}</div>
        </div>
      </div>
    </div>
  )
}

export default Issues;