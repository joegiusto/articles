import React,  {Component } from 'react';
import { connect } from "react-redux";
import moment from 'moment'
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'
import { toggleUserSubscriptions, filterIssuesDateType } from '../../../actions/siteActions'

class IssuesClass extends Component {
  constructor(props) {
    super(props);

    this.state = {
      scrollPosition: 0,
    }
  }

  componentDidMount() {
    window.addEventListener('scroll', this.listenToScroll)
  }

  componentWillUnmount() {
    window.removeEventListener('scroll', this.listenToScroll)
  }

  listenToScroll = () => {
    const winScroll =
      document.body.scrollTop || document.documentElement.scrollTop
  
    const height =
      document.documentElement.scrollHeight -
      document.documentElement.clientHeight
  
    const scrolled = winScroll / height
  
    this.setState({
      scrollPosition: scrolled,
      theheight: winScroll
    })

  }

  render(props) {

    function filterByValue(array, string) {
      return array.filter(o =>
          Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
    }
  
    const fakeAll = (this.props.site?.dateType === 'post' ? 
    this.props.issues?.issues.sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
    :
    this.props.issues?.issues.sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
    )
  
    if (this.props.user_subscriptions !== undefined) {
    const fakeSubs = (this.props.site?.dateType === 'post' ? 
    this.props.user_subscriptions.sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
    :
    this.props.user_subscriptions.sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
    )
    }

    return (
      <section className="issues-section issues-page text-center">

        <div className="issues-head">
          <h1 className="title">Issues</h1>
          <p className="body">Overview of the most pressing issues and status updates on them.</p>

          <div className="filters noselect mt-3 mb-1">
            <span className="subscription-badges">
              <span className="bold">Type: </span>
              <div onClick={() => this.props.toggleUserSubscriptions()} className={"badge border " + (this.props.site?.userSubscriptions === true ? 'badge-dark ' : 'badge-light ') + (this.props.user_subscriptions?.length > 0 ? '' : 'd-none')}>Subscribed</div>
              <div onClick={() => this.props.toggleUserSubscriptions()} className={"ml-1 badge border " + (this.props.site?.userSubscriptions === false ? 'badge-dark' : 'badge-light')}>All</div>
            </span>

            <span className="subscription-badges ml-md-5">
              <span className="bold">Date: </span>
              <div onClick={() => this.props.filterIssuesDateType()} className={"badge border " + (this.props.site?.dateType === 'post' ? 'badge-dark ' : 'badge-light ')}>Posted</div>
              <div onClick={() => this.props.filterIssuesDateType()} className={"ml-1 badge border " + (this.props.site?.dateType === 'update' ? 'badge-dark' : 'badge-light')}>Updated</div>
            </span>

          </div>
        </div>

        <div className="row mb-4">

          {this.props.site.userSubscriptions ? 
          this.props.user_subscriptions ?
          (this.props.user_subscriptions.map((issue, i) => (
            <div className="col-md-4 mt-3">
            <GzyCard
            key={issue._id}
            issue={issue}
            podcast={false}
            podcastDay=""
            topText="Rising Cost"
            dateType={this.props.site?.dateType}
            // midText={issue?.news_title}
            bottomText="The Unspoken Issues"
            backgroundImage={issue.hero_url}
            />
            </div>
          )))
          : 
          <div>Issues Loading...</div>
          :
          this.props.searchText !== "" ? 

            filterByValue(this.props.issues?.issues, this.props.searchText).map((issue, i) => (
              <div className="col-md-4 mt-3">
              <GzyCard
              key={issue._id}
              issue={issue}
              podcast={true}
              podcastDay=""
              podcastLink=""
              topText="Rising Cost"
              dateType={this.props.site?.dateType}
              // midText={issue?.news_title}
              bottomText="The Unspoken Issues"
              backgroundImage={issue.hero_url}
              />
              </div>
            ))

          :

            this.props.issues?.issues ?
            (this.props.issues?.issues.map((issue, i) => (
              <div className="col-md-4 mt-3">
              <GzyCard
              key={issue._id}
              issue={issue}
              podcast={true}
              podcastDay=""
              podcastLink=""
              topText="Rising Cost"
              dateType={this.props.site?.dateType}
              // midText={issue?.news_title}
              bottomText="The Unspoken Issues"
              backgroundImage={issue.hero_url}
              />
              </div>
            )))
            : 
            <div>Issues Loading...</div>

          } 

          {/* {props.user_subscriptions ?
          (props.user_subscriptions.map((issue, i) => (
            <GzyCard
            issue={issue}
            podcast={true}
            podcastDay=""
            podcastLink=""
            topText="Rising Cost"
            // midText={issue?.news_title}
            bottomText="The Unspoken Issues"
            backgroundImage={issue.hero_url}
            />
          )))
          : 
          <div>Issues Loading...</div>} */}

          {/* {props.searchText !== "" ? 

            filterByValue(props.issues?.issues, props.searchText).map((issue, i) => (
              <GzyCard
              issue={issue}
              podcast={true}
              podcastDay=""
              podcastLink=""
              topText="Rising Cost"
              // midText={issue?.news_title}
              bottomText="The Unspoken Issues"
              backgroundImage={issue.hero_url}
              />
            ))
          :
          props.issues?.issues ?
          (props.issues?.issues.map((issue, i) => (
            <GzyCard
            issue={issue}
            podcast={true}
            podcastDay=""
            podcastLink=""
            topText="Rising Cost"
            // midText={issue?.news_title}
            bottomText="The Unspoken Issues"
            backgroundImage={issue.hero_url}
            />
          )))
          : 
          <div>Issues Loading...</div>
            
          } */}

          

          <div className="d-none">
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
          </div>

          {/* <GzyCard 
            topText="G-Eazy FT. Skizzy Mars & KYLE"
            midText="MONICA LEWINSKY"
            bottomText="PROD. BY TY FIFE & CHRISTOPH ANDERSON"
            backgroundImage="http://4.bp.blogspot.com/-Wjz6L4LYzGQ/T2TnAoHfbtI/AAAAAAAAgIo/x8zDn6SzBwI/s1600/north%2BSt%2BP.jpg"
          /> */}

          <div className="col-12 col-md-6 mt- d-none">
            <div className="issue-item shadow-sm">
              <div>Title:</div>
              <div>History:</div>
              <div>House Support:</div>
              <div>Senate Support:</div>
              <button className="btn btn-black">Contact Rep</button>
            </div>
          </div>

        </div>

      </section>
    )
  }

}

const Issues = (props) => {

  function filterByValue(array, string) {
    return array.filter(o =>
        Object.keys(o).some(k => String(o[k]).toLowerCase().includes(string.toLowerCase())));
  }

  const fakeAll = (props.site?.dateType === 'post' ? 
  props.issues?.issues.sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
  :
  props.issues?.issues.sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
  )

  if (props.user_subscriptions !== undefined) {
  const fakeSubs = (props.site?.dateType === 'post' ? 
  props.user_subscriptions.sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
  :
  props.user_subscriptions.sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
  )
  }

  // const sortedIssues = props.issues?.issues.sort((a, b) => new Date(b.news_date) - new Date(a.news_date))
  // const fake = props.issues?.issues.sort((a, b) => new Date(b.last_update) - new Date(a.last_update))
  // console.log(sortedIssues)

  return (
  <section className="issues-section issues-page text-center">

    <div className="issues-head">
      <h1 className="title">Issues</h1>
      <p className="body">Overview of the most pressing issues and status updates on them.</p>

      <div className="filters noselect mt-3 mb-1">
        <span className="subscription-badges">
          <span className="bold">Type: </span>
          <div onClick={() => props.toggleUserSubscriptions()} className={"badge border " + (props.site?.userSubscriptions === true ? 'badge-dark ' : 'badge-light ') + (props.user_subscriptions?.length > 0 ? '' : 'd-none')}>Subscribed</div>
          <div onClick={() => props.toggleUserSubscriptions()} className={"ml-1 badge border " + (props.site?.userSubscriptions === false ? 'badge-dark' : 'badge-light')}>All</div>
        </span>

        <span className="subscription-badges ml-md-5">
          <span className="bold">Date: </span>
          <div onClick={() => props.filterIssuesDateType()} className={"badge border " + (props.site?.dateType === 'post' ? 'badge-dark ' : 'badge-light ')}>Posted</div>
          <div onClick={() => props.filterIssuesDateType()} className={"ml-1 badge border " + (props.site?.dateType === 'update' ? 'badge-dark' : 'badge-light')}>Updated</div>
        </span>

      </div>
    </div>

    <div className="row mb-4">

      {props.site.userSubscriptions ? 
      props.user_subscriptions ?
      (props.user_subscriptions.map((issue, i) => (
        <GzyCard
        key={issue._id}
        issue={issue}
        podcast={false}
        podcastDay=""
        topText="Rising Cost"
        dateType={props.site?.dateType}
        // midText={issue?.news_title}
        bottomText="The Unspoken Issues"
        backgroundImage={issue.hero_url}
        />
      )))
      : 
      <div>Issues Loading...</div>
      :
      props.searchText !== "" ? 

        filterByValue(props.issues?.issues, props.searchText).map((issue, i) => (
          <GzyCard
          key={issue._id}
          issue={issue}
          podcast={true}
          podcastDay=""
          podcastLink=""
          topText="Rising Cost"
          dateType={props.site?.dateType}
          // midText={issue?.news_title}
          bottomText="The Unspoken Issues"
          backgroundImage={issue.hero_url}
          />
        ))

      :

        props.issues?.issues ?
        (props.issues?.issues.map((issue, i) => (
          <GzyCard
          key={issue._id}
          issue={issue}
          podcast={true}
          podcastDay=""
          podcastLink=""
          topText="Rising Cost"
          dateType={props.site?.dateType}
          // midText={issue?.news_title}
          bottomText="The Unspoken Issues"
          backgroundImage={issue.hero_url}
          />
        )))
        : 
        <div>Issues Loading...</div>

      } 

      {/* {props.user_subscriptions ?
      (props.user_subscriptions.map((issue, i) => (
        <GzyCard
        issue={issue}
        podcast={true}
        podcastDay=""
        podcastLink=""
        topText="Rising Cost"
        // midText={issue?.news_title}
        bottomText="The Unspoken Issues"
        backgroundImage={issue.hero_url}
        />
      )))
      : 
      <div>Issues Loading...</div>} */}

      {/* {props.searchText !== "" ? 

        filterByValue(props.issues?.issues, props.searchText).map((issue, i) => (
          <GzyCard
          issue={issue}
          podcast={true}
          podcastDay=""
          podcastLink=""
          topText="Rising Cost"
          // midText={issue?.news_title}
          bottomText="The Unspoken Issues"
          backgroundImage={issue.hero_url}
          />
        ))
      :
      props.issues?.issues ?
      (props.issues?.issues.map((issue, i) => (
        <GzyCard
        issue={issue}
        podcast={true}
        podcastDay=""
        podcastLink=""
        topText="Rising Cost"
        // midText={issue?.news_title}
        bottomText="The Unspoken Issues"
        backgroundImage={issue.hero_url}
        />
      )))
      : 
      <div>Issues Loading...</div>
        
      } */}

      

      <div className="d-none">
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
      </div>

      {/* <GzyCard 
        topText="G-Eazy FT. Skizzy Mars & KYLE"
        midText="MONICA LEWINSKY"
        bottomText="PROD. BY TY FIFE & CHRISTOPH ANDERSON"
        backgroundImage="http://4.bp.blogspot.com/-Wjz6L4LYzGQ/T2TnAoHfbtI/AAAAAAAAgIo/x8zDn6SzBwI/s1600/north%2BSt%2BP.jpg"
      /> */}

      <div className="col-12 col-md-6 mt- d-none">
        <div className="issue-item shadow-sm">
          <div>Title:</div>
          <div>History:</div>
          <div>House Support:</div>
          <div>Senate Support:</div>
          <button className="btn btn-black">Contact Rep</button>
        </div>
      </div>

    </div>

  </section>
  )

  
  };

function GzyCard (props) {

  const image = "url(" + props.backgroundImage + ")";
  const podcast = props.podcast
  const issue = props.issue

  return (
    <Link className="swiper-slide" to={`${ROUTES.ISSUES}/${props.issue?._id}`}>
      <div className="g-card">

        {(podcast ? 
          <div className="g-card-badge covered">
            <i className="fab fa-youtube"></i>Covered {props.podcastDay}
          </div>
        : '')}

        <div className="g-card-badge date" style={props.dateType !== 'post' ? {backgroundColor: 'red'} : {backgroundColor: '#f9edcd', color: 'black'} }>

          {props.dateType !== 'post' ? <i className="fas fa-calendar-alt"></i> : <i className="fas fa-redo-alt"></i> }
          
          {props.dateType !== 'post' ?
          moment(issue?.news_date).format("LL")
          :
          moment(issue?.last_update).format("LL")
          }
          <div className="sub" style={ props.dateType === 'post' ? {backgroundColor: 'red', color: 'white'} : {backgroundColor: '#f9edcd'} }>
            {/* <i class="fas fa-calendar-day"></i> */}
            {props.dateType === 'post' ?  <i className="fas fa-calendar-alt"></i> : <i className="fas fa-redo-alt"></i> }
            {/* {moment(issue?.last_update).format("LL")} */}
            {props.dateType === 'post' ?
              moment(issue?.news_date).format("LL")
              :
              moment(issue?.last_update).format("LL")
            }
          </div>
        </div>

        {
        issue?.last_update !== "" || issue?.last_update !== null || issue?.last_update !== undefined ?
        null
        :
        null
        // <div className="g-card-badge update">
        //   <i class="fas fa-calendar-day"></i>
        //   {moment(issue?.last_update).format("LL")}
        // </div>
        }

        <div style={{backgroundImage: image}} className="g-card-background"></div>
        <div className="g-card-text-card">
          <div className="top-text"></div>
          <div className="mid-text">{issue?.news_title}</div>
          <div className="bottom-text">{issue?.bottomText}</div>
        </div>
      </div>
    </Link>
  )
}

const mapStateToProps = state => ({
  issues: state.issues,
  site: state.site,
  user_subscriptions: state.auth.user_details.subscriptionsFetched
});

export { GzyCard }

export default connect(
  mapStateToProps,
  { toggleUserSubscriptions, filterIssuesDateType } 
)(IssuesClass);