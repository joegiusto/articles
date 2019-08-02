import React, { useState } from 'react';

function FlintCounter() {
  // Declare a new state variable, which we'll call "count"
  const [display, setDisplay] = useState(true);

  return (
    <div className='counter pt-1 mt-4'>
      <span onClick={() => setDisplay(!display)}><i className="fas fa-arrow-circle-left mr-1"></i></span><span>{display === true ? '6,781 / 10,200 Pipes Replaced' : '734 Days Since Incident'}</span><span onClick={() => setDisplay(!display)}><i className="fas fa-arrow-circle-right ml-1"></i></span>
      {/* <div></div> */}
    </div>
  );
}

const Page = () => (
  <div className='container-fluid news-container pt-4'>

    {/* <h1>News Homepage</h1>
    <p>Here is where recent news articles will go.</p> */}

    <div className="row">
      <div className="col-9">
        <div className="focused-news-panel shadow">
          <div className="row pl-4">

            <div className='col-12'>
              <div className="dual-header">
                <div className="heading-font">Subscribed Developments</div>
                <div id='manage-subscriptions'>Manage Subscriptions</div>
              </div>

            </div>

            <div className="col">
              <div className="subscriped-story-card">
                <div className='subscribe-controls'>
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className='subscriped-story-card-title'>Flint Water Cleanup</div>
                <div className='subscriped-story-card-subtitle'>Mayor Gives Update</div>
                <FlintCounter></FlintCounter>
              </div>
            </div>

            <div className="col">
              <div className="subscriped-story-card">
                <div className='subscribe-controls'>
                  <i className="fas fa-bookmark"></i>
                </div>
                <div className='subscriped-story-card-title'>Gun Laws</div>
                <div className='subscriped-story-card-subtitle'>States Pass New Law</div>
                <div className='state-icons'>
                  <span className="state-icon"></span>
                  <span className="state-icon"></span>
                  <span className="state-icon"></span>
                </div>
              </div>
            </div>

            <div className="col">
              <div className="subscriped-story-card empty">
                <i className="far fa-bookmark"></i>
                <div>Subscribe To More Stories.</div>
              </div>
            </div>

            <div className="col">
              <div className="subscriped-story-card empty">
                <i className="far fa-bookmark"></i>
                <div>Subscribe To More Stories.</div>
              </div>
            </div>

            <div className="col">
              <div className="subscriped-story-card empty">
                <i className="far fa-bookmark"></i>
                <div>Subscribe To More Stories.</div>
              </div>
            </div>

            <hr className='w-100 mx-5 mt-4'/>

          </div>

          {/* <hr className='col-12'/> */}

          <div className="row mt-4 pl-4">

            <div className='col-12'>
              <div className="large-story-card">
                <div className="subscribe-controls">
                  <i className="far fa-bookmark"></i>
                </div>
                <h3 className='title pl-3'>The<br></br>Mueller<br></br>Report</h3>
              </div>
            </div>

            <div className='col-6 pt-4'>
              <div className="medium-story-card">
                <div className="subscribe-controls">
                  <i className="far fa-bookmark"></i>
                </div>
                <h3 className='title pl-3'>The<br></br>Mueller<br></br>Report</h3>
              </div>
            </div>

            <div className='col-6 pt-4'>
              <div className="medium-story-card">
                <div className="subscribe-controls">
                  <i className="far fa-bookmark"></i>
                </div>
                <h3 className='title pl-3'>The<br></br>Mueller<br></br>Report</h3>
              </div>
            </div>

          </div>
        </div>
      </div>

      <div className="col-3">
        <div className="side-news-panel shadow affix">
          <div className="row">
            <div className="col-12">
              <div className="the-recap">

              </div>
            </div>
          </div>
        </div>
      </div>

    </div>
  </div>
);

export default Page;