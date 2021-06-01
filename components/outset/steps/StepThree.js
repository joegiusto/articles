import React from 'react';
import moment from 'moment';

function Issue(props) {
  return (
    <div onClick={() => (props.toggleSubscriptions(props.issueObject._id))} className="issue-recommendation">
      <div className="title">{props.issueObject?.news_title}</div>

        <p className="description"> {props.issueObject?.news_tagline}</p>
        <div className="tags">{props.issueObject?.news_tags.map(tag => {return <span className="badge badge-articles mr-2 mb-1">{tag.tag_name}</span>})}</div>

        <div className={"subscribe" + (props.subscriptions.indexOf(props.issueObject._id) > -1 ? ' active' : '')}>
          <i className="fas fa-bookmark"></i>
        </div>

    </div>
  )
}

function StepThree(props) {
  // const [activeTab, setActiveTab] = useState(0);
  // const [viewedTabs, setViewedTabs] = useState({
  //   zero: true,
  //   one: false,
  //   two: false,
  //   three: false,
  //   four: false,
  //   five: false
  // });

  const issueGlobalWarming = props.allIssues.find(obj => {
    return obj._id === '5eccda6c8744436d380e5e03'
  })

  const issueMuellerReport = props.allIssues.find(obj => {
    return obj._id === '5e9c273efeb48937d0e54973'
  })

  const issueGreenNewDeal = props.allIssues.find(obj => {
    return obj._id === '5e9c2763feb48937d0e54974'
  })

  const issueFlintMichigan = props.allIssues.find(obj => {
    return obj._id === '5e9c2723feb48937d0e54972'
  })

  const issuePanamaPapers = props.allIssues.find(obj => {
    return obj._id === '5e9c26d3feb48937d0e54971'
  })

  function renderTab(activeTab) {
    switch(activeTab) {
      case 0: 
        return (
          <>
            <div className="pick-count">Pick at least three to continue <span className="badge badge-dark">{props.subscriptions.length || 0}/3</span></div>
            
            <h5 className="title">All Issues</h5>

            {props.allIssues?.length > 0 ? 

              props.allIssues.map((issue) => (
                <Issue 
                  key={issue._id}
                  allIssues={props.allIssues}
                  issueObject={issue}
                  subscriptions={props.subscriptions}
                  toggleSubscriptions={props.toggleSubscriptions}

                  // key={issue._id}
                  // {...props}
                  // id={issue._id}
                  // title={issue.news_title}
                  // description={issue.news_tagline}
                />
              ))

              :

              <div>Loading...</div>

              }
          </>
        )
      case 1: 
        return (
          <>
            <h5 className="title">Age Related Stories</h5>

            <div className="age-related">
              {
                (props.age === '' ? 
                  <span>No age was given so we can't recommend any stories for this tab, if you want to go back and add an age <span className="articles-inline-link" onClick={() => (props.changeStep(1) + props.highlightElement('age'))}>click here.</span> (No progress will be lost!)</span>
                :
                  (props.storySuggestionAge.length > 0 ? 
                    '' 
                    :
                    <div>
                      <div>
                        We can't find any stories that might be of interest to you based on your given age of <span className="badge badge-dark">{moment().diff(props.age, 'years')}</span>
                      </div>
                    </div>
                  )
                )
              }
            </div>

            {/* <h3>Stories relavent based on your age.</h3> */}
            
            <h5 className="title mt-5">Effects All ages</h5>

            {/* issueGlobalWarming is a const stored above which is the object that has the _id of 5eccda6c8744436d380e5e03 */}
            <Issue
              key={issueGlobalWarming._id}
              allIssues={props.allIssues}
              issueObject={issueGlobalWarming}
              subscriptions={props.subscriptions}
              toggleSubscriptions={props.toggleSubscriptions}
              // key={issueGlobalWarming._id}
              // {...props}
              // id={issueGlobalWarming._id}
              // title={issueGlobalWarming.news_title}
              // description={issueGlobalWarming.news_tagline}
            />

            {/* <Issue 
              {...props}
              id={'social-security'}
              title={"Soical Security"}
              description={"Report on the Investigation into Russian Interference in the 2016 Presidential Election."}
              tags={["General Updates"]}
            /> */}
          </>
        )
      case 2:
        return (
          <>
            <h5 className="title">Location Related Stories</h5>

            {/* <button onClick={() => (props.getStorySuggestionLocation( {city: props.city, state: props.state, zip: props.zip} ) )}>Test Mock Submit</button>
            <button onClick={() => (props.getStorySuggestionLocationOther( {city: props.city, state: props.state, zip: props.zip} ) )}>Test Mock Submit</button>
            <button onClick={() => ( props.test() )}>Test</button> */}

            {
              ((props.state === '' && props.city === '' && props.zip === '') ? 
                <span>No city, state, or zip was given so we can't recommend any stories for this tab, if you want to go back and add one then <span className="articles-inline-link" onClick={() => (props.changeStep(1) + props.highlightElement('location'))}>click here.</span> (No progress will be lost!)</span>
              :
              <>
                {(props.city === ''  ? '' : 
                  <>
                    <h5 className="title">Relavent to {props.city}</h5>
                    {(props.storySuggestionLocation.city.length > 0 ? 
                      '' 
                      :
                      <div>We can't find any stories that might be of interest to you based on your city. We are always adding more stories, we will let you know if we find anything.</div>
                    )}
                  </>
                )}

                {(props.state === ''  ? '' : 
                  <>
                    <h5 className="title">Relavent to {props.state}</h5>
                    {(props.storySuggestionLocation.state.length > 0 ? 
                      '' 
                      :
                      <div>We can't find any stories that might be of interest to you based on your state. We are always adding more stories, we will let you know if we find anything.</div>
                    )}
                  </>
                )}

                {(props.zip === ''  ? '' : 
                  <>
                    <h5 className="title">Relavent to {props.zip}</h5>
                    {(props.storySuggestionLocation.zip.length > 0 ? 
                      '' 
                      :
                      <div>We can't find any stories that might be of interest to you based on your zip. We are always adding more stories, we will let you know if we find anything.</div>
                    )}
                  </>
                )}

              </>
              )
            }
          </>
        )
      case 3:
        return (
          // <h3>Stories relavent based on popularity.</h3>
          <h5 className="title">Popular Amongst Users</h5>
        )
      case 4:
        return (
          <>
          {/* <h3>Stories we find relavent.</h3> */}
          <h5 className="title">Curated By Us</h5>

          <Issue
            key={issueMuellerReport._id} 
            allIssues={props.allIssues}
            issueObject={issueMuellerReport}
            subscriptions={props.subscriptions}
            toggleSubscriptions={props.toggleSubscriptions}
            // {...props}
            // id={'mueller-report'}
            // title={"Mueller Report"}
            // description={"Report on the Investigation into Russian Interference in the 2016 Presidential Election."}
            // tags={["Human Rights Violation", "Neglagence"]}
          />

          <Issue 
            key={issueGreenNewDeal._id}
            allIssues={props.allIssues}
            issueObject={issueGreenNewDeal} 
            subscriptions={props.subscriptions}
            toggleSubscriptions={props.toggleSubscriptions}
            // {...props}
            // id={'mueller-report'}
            // title={"Mueller Report"}
            // description={"Report on the Investigation into Russian Interference in the 2016 Presidential Election."}
            // tags={["Human Rights Violation", "Neglagence"]}
          />

          {/* <div onClick={() => (props.toggleSubscriptions('green-new-deal'))} className="issue-recommendation">
            <div className="title">Green New Deal</div>
              <p className="description">The Green New Deal is a proposed United States legislation that aims to address climate change and economic inequality.</p>
              <div className="tags">Human Rights Violation, Neglagence</div>
              <div className={"subscribe" + (props.subscriptions.indexOf("green-new-deal") > -1 ? ' active' : '')}>
                <i className="fas fa-bookmark"></i>
              </div>
          </div> */}
          </>
        )
      case 5:
        return (
          <>
            {/* <h3>Forgotten Issues that still need attention.</h3> */}
            <h5 className="title">Forgotten Issues</h5>
            
            <Issue 
              key={issueFlintMichigan._id}
              allIssues={props.allIssues}
              issueObject={issueFlintMichigan}
              subscriptions={props.subscriptions}
              toggleSubscriptions={props.toggleSubscriptions}
            />

            <Issue 
              key={issuePanamaPapers._id}
              allIssues={props.allIssues}
              issueObject={issuePanamaPapers}
              subscriptions={props.subscriptions}
              toggleSubscriptions={props.toggleSubscriptions}
            />

            {/* <div onClick={() => (props.toggleSubscriptions('flint-michigan-water'))} className="issue-recommendation">
              <div className="title">Flint Michigan</div>
              <p className="description">American city still strugling with clean drinking water.</p>
              <div className="tags">Human Rights Violation, Neglagence</div>
              <div className={"subscribe" + (props.subscriptions.indexOf("flint-michigan-water") > -1 ? ' active' : '')}>
                <i className="fas fa-bookmark"></i>
              </div>
            </div>

            <div className="issue-recommendation">
              
              <div onClick={() => (props.toggleSubscriptions('panama-papers'))} className="title">Panama Papers</div>
              <p className="description">Leaked documents exposing wealthy individuals and public officials using offshore bank accounts and shell corporations for illegal purposes. Fraud, tax evasion, and evading international sanctions are just some of the things still being ignored.</p>
              <div className="tags">Conflict Of Intrest, Coruption</div>
              <div className={"subscribe" + (props.subscriptions.indexOf("panama-papers") > -1 ? ' active' : '')}>
                <i className="fas fa-bookmark"></i>
              </div>
            </div> */}

          </>
        )
      default:
        return (
          <>
            {/* <h5 className="title">Age Related Stories</h5>

            {
              (props.age === '' ? 
                <span>No age was given so we can't recommend any stories for this tab, if you want to go back and add an age <span className="articles-inline-link" onClick={() => (props.changeStep(1) + props.highlightElement('age'))}>click here.</span> (No progress will be lost!)</span>
              :
                (props.storySuggestionAge.length > 0 ? 
                  '' 
                  :
                <div>We can't find any stories that might be of interest to you based on your age.</div>
                )
              )
            }
            
            <h5 className="title">Recommended to everyone</h5>
            <Issue 
              {...props}
              id={'social-security'}
              title={"Soical Security"}
              description={"Report on the Investigation into Russian Interference in the 2016 Presidential Election."}
              tags={["General Updates"]}
            /> */}
          </>
        )
    }
  }

  return (
    <div className="selection-container">
      
      {/* Lets get this site running before we get too ambitious! */}

      <div className="selection-toolbar">
        <div className="toolbar-items">

          <div onClick={() => props.setActiveTab(0, 'zero') + props.changeFocus('')} className={"toolbar-item" + (props.uiStuff.activeTab === 0 ? ' active' : '')}>
            <div className="view-track">
              {(props.uiStuff.viewedTabs.zero === true ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>)}
            </div>
            <i className="far fa-list-alt mr-0 tab-icon"></i>
          </div>

          <div onClick={() => props.setActiveTab(1, 'one') + props.changeFocus('stories-age')} className={"toolbar-item" + (props.uiStuff.activeTab === 1 ? ' active' : '')}>
            <div className="view-track">
              {(props.uiStuff.viewedTabs.one === true ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>)}
            </div>
            <i className="fas fa-baby"></i><i className="fas fa-child mr-0 tab-icon"></i>
          </div>

          <div onClick={() => props.setActiveTab(2, 'two') + props.changeFocus('stories-location')} className={"toolbar-item" + (props.uiStuff.activeTab === 2 ? ' active' : '')}>
            <span className="view-track">
              {(props.uiStuff.viewedTabs.two === true ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>)}
            </span>
            <i className="fas fa-search-location mr-0 tab-icon"></i>
          </div>

          <div onClick={() => props.setActiveTab(3, 'three') + props.changeFocus('stories-popular')} className={"toolbar-item" + (props.uiStuff.activeTab === 3 ? ' active' : '')}>
            <span className="view-track">
              {(props.uiStuff.viewedTabs.three === true ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>)}
            </span>
            <i className="fas fa-fire-alt mr-0 tab-icon"></i>
          </div>

          <div onClick={() => props.setActiveTab(4, 'four') + props.changeFocus('stories-relevant')} className={"toolbar-item" + (props.uiStuff.activeTab === 4 ? ' active' : '')}>
            <div className="view-track">
              {(props.uiStuff.viewedTabs.four === true ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>)}
            </div>
            <i className="fas fa-fist-raised mr-0 tab-icon"></i>
          </div>

          <div onClick={() => props.setActiveTab(5, 'five') + props.changeFocus('stories-forgotten')} className={"toolbar-item" + (props.uiStuff.activeTab === 5 ? ' active' : '')}>
            <div className="view-track">
              {(props.uiStuff.viewedTabs.five === true ? <i className="fas fa-check"></i> : <i className="fas fa-times"></i>)}
            </div>
            <i className="fas fa-backward tab-icon"></i>
          </div>

        </div>
      </div>

      <div className="selection-content">
        {renderTab(props.uiStuff.activeTab)}
      </div>

      {/* <div className="pick-count">Pick at least three to continue <span className="badge badge-dark">{props.subscriptions.length || 0}/3</span></div>

      {props.allIssues?.length > 0 ? 

      props.allIssues.map((issue) => (
        <Issue 
          key={issue._id}
          {...props}
          id={issue._id}
          title={issue.news_title}
          description={issue.news_tagline}
        />
      ))

      :

      <div>Loading...</div>
      
      } */}

    </div>
  );
}

export default StepThree;