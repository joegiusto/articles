import React, { useState } from 'react';

function StepThree(props) {
  const [activeTab, setActiveTab] = useState(1);
  const [viewedTabs, setViewedTabs] = useState({
    one: true,
    two: false,
    three: false,
    four: false,
    five: false
  });

  function renderTab(activeTab) {
    switch(activeTab) {
      case 2:
        return (
          <h3>Stories relavent based on your location.</h3>
        )
      case 3:
        return (
          <h3>Stories relavent based on popularity.</h3>
        )
      case 4:
        return (
          <>
          <h3>Stories we find relavent.</h3>

          <div className="issue-recommendation">
            <div className="title">Mueller Reports</div>
              <p className="description"> Report on the Investigation into Russian Interference in the 2016 Presidential Election.</p>
              <div className="tags">Human Rights Violation, Neglagence</div>
              <div className="subscribe">
                <i className="far fa-bookmark"></i>
              </div>
          </div>

          <div className="issue-recommendation">
            <div className="title">Green New Deal</div>
              <p className="description">The Green New Deal is a proposed United States legislation that aims to address climate change and economic inequality.</p>
              <div className="tags">Human Rights Violation, Neglagence</div>
              <div className="subscribe">
                <i className="far fa-bookmark"></i>
              </div>
          </div>
          </>
        )
      case 5:
        return (
          <>
            <h3>Issues that have lost interest that still need addressing.</h3>

            <div className="issue-recommendation">
              <div className="title">Flint Michigan</div>
              <p className="description">American city still strugling with clean drinking water.</p>
              <div className="tags">Human Rights Violation, Neglagence</div>
              <div className="subscribe">
                <i className="far fa-bookmark"></i>
              </div>
            </div>

            <div className="issue-recommendation">
              
              <div className="title">Panama Papers</div>
              <p className="description">Leaked documents exposing wealthy individuals and public officials using offshore bank accounts and shell corporations for illegal purposes. Fraud, tax evasion, and evading international sanctions are just some of the things still being ignored.</p>
              <div className="tags">Conflict Of Intrest, Coruption</div>
              <div className="subscribe">
                <i className="far fa-bookmark"></i>
              </div>
            </div>
          </>
        )
      default:
        return (
          <>
            <h3>Stories relavent based on your age.</h3>
            <p>We can't find any stories that might be of interest to you based on your age. Here are some other popular stories right now that you can subscibe to in the mean time.</p>
          </>
        )
    }
  }

  return (
    <div>
    
    <div className="dual-header">
      <h2>News Info</h2>
      <h5>Step 3/{props.totalSteps}</h5>
    </div>
    <hr/>

    <p>Click through the diffrent tabs to see stories you might like to subscribe too.</p>

    <div className="selectioon-container">

      <div className="selection-toolbar">
        <div className="toolbar-items">
          <div onClick={() => setActiveTab(1) + setViewedTabs({...viewedTabs, one: true})} className={"toolbar-item" + (activeTab === 1 ? ' active' : '')}>
            <div className="view-track">
              {(viewedTabs.one === true ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>)}
            </div>
            <i class="fas fa-child mr-0"></i>
          </div>
          <div onClick={() => setActiveTab(2) + setViewedTabs({...viewedTabs, two: true})} className={"toolbar-item" + (activeTab === 2 ? ' active' : '')}>
            <span className="view-track">
              {(viewedTabs.two === true ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>)}
            </span>
            <i class="fas fa-search-location mr-0"></i>
          </div>
          <div onClick={() => setActiveTab(3) + setViewedTabs({...viewedTabs, three: true})} className={"toolbar-item" + (activeTab === 3 ? ' active' : '')}>
            <span className="view-track">
              {(viewedTabs.three === true ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>)}
            </span>
            <i class="fas fa-fire-alt mr-0"></i>
          </div>
          <div onClick={() => setActiveTab(4) + setViewedTabs({...viewedTabs, four: true})} className={"toolbar-item" + (activeTab === 4 ? ' active' : '')}>
            <div className="view-track">
              {(viewedTabs.four === true ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>)}
            </div>
            <i class="fas fa-fist-raised mr-0"></i>
          </div>
          <div onClick={() => setActiveTab(5) + setViewedTabs({...viewedTabs, five: true})} className={"toolbar-item" + (activeTab === 5 ? ' active' : '')}>
            <div className="view-track">
              {(viewedTabs.five === true ? <i class="fas fa-check"></i> : <i class="fas fa-times"></i>)}
            </div>
            <i class="fas fa-backward"></i>
          </div>
        </div>
      </div>

      <div className="selection-content">
        {renderTab(activeTab)}
      </div>

    </div>

  </div>
  );
}

export default StepThree;