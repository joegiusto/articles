import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";

// import { employeeList } from "../../../sample_data/sampleData";
import * as ROUTES from "../../../../../constants/routes"

class EmployeePageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: {},
      employeeAgr: [],

      // Can be 'stubs' or 'charts' 
      filter: 'stubs',

      expandedPhoto: false,

      commits: [],
      commitsLoading: false,

      news: [],
      newsCount: {
        stories: 0,
        issues: 0,
        myths: 0
      },
      news_type: 'story',
      newsPage: 0
    }
  }

  componentDidMount() {
    const self = this;

    axios.get('/api/getEmployee', {
      params: {
        _id: this.props.match.params.id
      }
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        employee: response.data
      })

    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/getGithubCommits', {
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        commitsLoading: false,
        commits: response.data.commits
      })

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        commitsLoading: false,
      })
    });

    this.getWriterNews();

    this.getWriterNewsCount();

    axios.get('/api/getEmployeeAgr', {
      params: {
        _id: this.props.match.params.id
      }
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        employeeAgr: response.data
      })

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  renderIsNextPageDisabled() {
    if ( this.state.news_type === 'story' ) {
      return  ( ( this.state.newsPage + 1) * 10) > this.state.newsCount.stories ? true : false
    } else if ( this.state.news_type === 'issue' ) {
      return  ( ( this.state.newsPage + 1) * 10) > this.state.newsCount.issues ? true : false
    } else if ( this.state.news_type === 'myth' ) {
      return  ( ( this.state.newsPage + 1) * 10) > this.state.newsCount.myths ? true : false
    }
  }

  renderPagePlace() {
    if ( this.state.news_type === 'story' ) {
      return <span className="ml-2">Page: {this.state.newsPage + 1} / {Math.ceil(this.state.newsCount.stories / 10)}</span>
    } else if ( this.state.news_type === 'issue' ) {
      return <span className="ml-2">Page: {this.state.newsPage + 1} / {Math.ceil(this.state.newsCount.issues / 10)}</span>
    } else if ( this.state.news_type === 'myth' ) {
      return <span className="ml-2">Page: {this.state.newsPage + 1} / {Math.ceil(this.state.newsCount.myths / 10)}</span>
    }
  }

  getWriterNewsCount() {
    const self = this;

    axios.get('/api/getWriterNewsCount', {
      params: {
        user_id: '5e90cc96579a17440c5d7d52',
      }
    })
    .then(function (response) {

      // console.log(response);

      self.setState({
        newsCount: {
          stories: response.data.stories,
          issues: response.data.issues,
          myths: response.data.myths
        },
        // newsCount:,
      })

    })
    .catch(function (error) {
      console.log(error);
    });
  }

  getWriterNews() {
    const self = this;
    
    axios.get('/api/getWriterNews', {
      params: {
        user_id: '5e90cc96579a17440c5d7d52',
        news_type: this.state.news_type,
        skip: this.state.newsPage
      }
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        // commitsLoading: false,
        news: response.data,

      })

    })
    .catch(function (error) {
      console.log(error);

      self.setState({
        // commitsLoading: false,
      })
    });
  }

  renderRoute(type) {
    switch(type) {
      case 'story':
        return ROUTES.STORIES
        // break;
      case 'issue':
        return ROUTES.ISSUES
        // break;
      case 'myth':
        return ROUTES.MYTHS
        // break;
      default:
        // code block
    }
  }

  render(props) {

    let { employee } = this.state;

    return (

      Object.keys(employee).length > 0 && employee.constructor === Object ?
      <div className=''>

        <div className="employee-header mt-3">

         <div className="d-flex flex-column flex-grow-1">

            <div className="top d-flex flex-row">
              <div className="employee-header-image-and-socials">
    
                <div onClick={() => this.setState({expandedPhoto: true})} className="employee-image">
    
                  <div data-toggle="modal" data-target="#employeePhoto" className="employee-image-zoom">
    
                    <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${employee._id}.jpg`} alt=""/>
    
                    <div className="employee-image-zoom-icon">
                      <i className="fas fa-search-plus"></i>
                    </div>
    
                  </div>
    
                </div>
    
              </div>
    
              <div className="employee-header-info">
    
                <div className='employee-name'>{`${employee.first_name} ${employee.last_name}`}</div>
    
                <Link to={ROUTES.MESSAGES + '/?startMsg=5e90cc96579a17440c5d7d52'}><div className='employee-action-button btn'>+ MESSAGE</div></Link>
    
                <div className='employee-social'>
                  <SharedSocials socials={employee.employee.socials}/>
                </div>
                
              </div>
            </div>

            <div className="bio">
              <div className='employee-bio'>{employee.employee?.bio.replace('<age></age>', moment().diff(employee.birth_date, 'years') )}</div>
            </div>

         </div>


          <div className='employee-header-traits'>
            <p className="employee-header-traits-title">Location</p>
            <p className="employee-header-traits-details">{employee.address.state}</p>
            <p className="employee-header-traits-title">Role</p>
            <p className="employee-header-traits-details">{employee.employee?.role.map((role) => <span className="badge badge-dark mr-1">{role}</span>) || 'NONE'}</p>
            <p className="employee-header-traits-title">Joined</p>
            <p className="employee-header-traits-details">{moment(employee.sign_up_date).format('LL') || 'ERROR'}</p>
          </div>

        </div>

        <div className="employee-details">

          <div className="filters noselect">
            <div onClick={() => this.setState({filter: 'stubs'})} className={"filter " + ( this.state.filter === 'stubs' ? 'active' : '' ) }>Pay Stubs</div>
            <div onClick={() => this.setState({filter: 'charts'})} className={"filter " + ( this.state.filter === 'charts' ? 'active' : '' ) }>Data Charts</div>
            <div onClick={() => this.setState({filter: 'get-to-know'})} className={"filter " + ( this.state.filter === 'get-to-know' ? 'active' : '' ) }>Get To Know</div>
            <div onClick={() => this.setState({filter: 'proposals'})} className={"filter " + ( this.state.filter === 'proposals' ? 'active' : '' ) }>Proposals</div>
            <div onClick={() => this.setState({filter: 'commits'})} className={"filter " + ( this.state.filter === 'commits' ? 'active' : '' ) }>Commits<span className="badge badge-dark ml-1">Developer</span></div>
            <div onClick={() => this.setState({filter: 'news'})} className={"filter " + ( this.state.filter === 'news' ? 'active' : '' ) }>News<span className="badge badge-dark ml-1">Writer</span></div>
          </div>

          <div className="details">

            {this.state.filter === 'stubs' ? 

            <div className="payrole-stubs">
              {this.state.employee.employee.payrole.stubs.map((stub) => {

                let isFirstOfMonth = false;

                return (
                  <div className="stub">

                    <div>
                      <div>Week of {moment(stub.date).format("LL")}</div>
                      <div className="bold">${(stub.amount / 100).toFixed(2)}</div>
                    </div>

                    <div className="btn btn-articles-light">
                      View
                    </div>

                  </div>
                )
              })}

              <div className="total text-center mt-2">Total ${(this.state.employeeAgr[0]?.total / 100).toFixed(2)}</div>
            </div>

            :
            null
            }

            {this.state.filter === 'commits' ? 

            <div className="employee-commits">
              
              {this.state.commitsLoading === true ?
              <div className="loading">Loading</div>
              :
              <div className="commits">

                <a target="_blank" rel="noopener noreferrer" href="https://github.com/joegiusto/articles/commits/">
                  <div className="powered-by d-flex align-items-center justify-content-center">
                    <i className="fab fa-github-square fa-3x"></i>
                    <span className="">Powered by Github</span>
                  </div>
                </a>

                {this.state.commits.map(commit => 
                  <a target="_blank" rel="noopener noreferrer" href={commit.html_url}>
                    <div className="commit d-flex">
                      <div className="photo"><img src={commit.committer.avatar_url} alt=""/></div>
                      <div className="commit-details">
                        <div className="date">{moment(commit.commit.author.date).format("LL")}</div>
                        <div className="title">{commit.commit.message}</div>
                      </div>
                    </div>
                  </a>
                )}
              </div>
              }

            </div>

            :
            null
            }

            {this.state.filter === 'news' ? 

            <div className="employee-news">
              
              {/* {this.state.commitsLoading === true ?
              <div className="loading">Loading</div>
              : */}
              <div className="news">

                <div className="btn-group mb-3">
                  <div onClick={() => this.setState({news_type: 'story', skip: 0, newsPage: 0}, () => this.getWriterNews())} className={"btn btn-articles-light " + (this.state.news_type === 'story' ? 'alt' : '')}>Stories ({this.state.newsCount.stories})</div>
                  <div onClick={() => this.setState({news_type: 'issue', skip: 0, newsPage: 0}, () => this.getWriterNews())} className={"btn btn-articles-light " + (this.state.news_type === 'issue' ? 'alt' : '')}>Issues ({this.state.newsCount.issues})</div>
                  <div onClick={() => this.setState({news_type: 'myth', skip: 0, newsPage: 0}, () => this.getWriterNews())} className={"btn btn-articles-light " + (this.state.news_type === 'myth' ? 'alt' : '')}>Myths ({this.state.newsCount.myths})</div>
                </div>

                {this.state.news.sort( (a, b) => new Date(b.news_date) - new Date(a.news_date) ).map(document => 
                  <a target="_blank" rel="noopener noreferrer" href={`${this.renderRoute(document.news_type)}/${document.url}`}>
                    <div className={"document d-flex w-100 " + (document.news_type)}>
                      <div className="photo"><img src={document.hero_url} alt=""/></div>
                      <div className="document-details w-100">

                        <div className="dates w-100 d-flex justify-content-between">
                          <div className="date">{moment(document.news_date).format("LL")}</div>
                          <div className="date">{moment(document.last_update).format("LL")}</div>
                        </div>

                        <div className="title">{document.news_title}</div>
                        <div className="tagline">{document.news_tagline}</div>

                      </div>
                    </div>
                  </a>
                )}

                {/* {(this.state.newsCount.stories / 5).map( (item, i) => {
                  <div>{i}</div>
                })} */}

                <div>
                  <button onClick={ () => this.setState({ newsPage: this.state.newsPage - 1}, () => this.getWriterNews() ) } disabled={this.state.newsPage === 0 ? true : false} className={"btn btn-articles-light "}>{this.state.newsPage === 0 ? this.state.newsPage + 1 : this.state.newsPage }</button>
                  <button onClick={ () => { this.setState({ newsPage: this.state.newsPage + 1 }, () => this.getWriterNews() ) } } disabled={this.renderIsNextPageDisabled()} className="btn btn-articles-light">{this.state.newsPage + 2}</button>
                  
                  {this.renderPagePlace()}
                </div>

              </div>

            </div>

            :
            null
            }

            {this.state.filter === 'get-to-know' ? 

            <div className="employee-get-to-know">

              <div className="intro-snippet">When we talk politics (especially online) we forget there is a person behind those beliefs, a person with a life and an existence as complex, complicated, and intricate as yours. By sharing this info I hope we can find some sort of common ground and relate, and if not take a look into the world I call mine.</div>
              
              <div className="get-to-know-block">
                <div className="get-to-know-block__header">Favorite Movies:</div>

                <div className="get-to-know-content movies">

                  <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/Tomorrowland_(film)">
                    <img src="https://flicksandbricks.files.wordpress.com/2017/09/img_2421.jpg" alt=""/>
                    <span>Tommorowland (2015)</span>
                  </a>

                  <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/Inception">
                    <img src="https://images.csmonitor.com/csmarchives/2010/07/Film-Review-Inception.jpg?alias=standard_900x600" alt=""/>
                    <span>Inception (2010)</span>
                  </a>

                  <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/The_Matrix_(franchise)">
                    <img src="https://i.guim.co.uk/img/media/b251ae63d78acf9389a8fce146580483ecdd2253/57_6_1416_849/master/1416.jpg?width=1200&quality=85&auto=format&fit=max&s=89145656e8b5b713e7515eca0c207c4a" alt=""/>
                    <span>Matrix (1999)</span>
                  </a>

                  <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/Iron_Man_(2008_film)">
                    <img src="https://i.pinimg.com/originals/11/ed/bd/11edbd2b87a4926224f8c5dfa05526e2.jpg" alt=""/>
                    <span>Iron Man (MCU Series)</span>
                  </a>

                  <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/Tron:_Legacy">
                    <img src="http://blog.bigmoviezone.com/images/TronLegacy58_555pxBLOG.jpg" alt=""/>
                    <span>Tron (2010)</span>
                  </a>

                  <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/Pulp_Fiction">
                    <img src="https://static.standard.co.uk/s3fs-public/thumbnails/image/2015/09/14/14/umathurmanpulp1409a.jpg?w968" alt=""/>
                    <span>Pulp Fiction (1994)</span>
                  </a>

                  {/* <a className="movie" target="_blank" href="https://en.wikipedia.org/wiki/Pulp_Fiction">
                    <img src="https://i.pinimg.com/originals/a9/2b/f6/a92bf65db3db694dfc40af5a5da2c4d7.jpg" alt=""/>
                    <span>The Boy in the Striped Pajamas (2008)</span>
                  </a> */}

                  {/* <a target="_blank" href="https://en.wikipedia.org/wiki/Inception">Inception (2010)</a>
                  <a target="_blank" href="https://en.wikipedia.org/wiki/The_Matrix_(franchise)">Matrix (1999)</a>
                  <a target="_blank" href="https://en.wikipedia.org/wiki/Iron_Man_(2008_film)">Iron Man Series</a>
                  <a target="_blank" href="https://en.wikipedia.org/wiki/Tron:_Legacy">Tron (2010)</a> */}
                </div>

              </div>

              <div className="get-to-know-block">
                <div className="get-to-know-block__header">Favorite Music Artists:</div>

                <div className="get-to-know-subheader">Present</div>
                <div className="get-to-know-content">G-Eazy, Russ, Olivia O'Brian, Blackbear, Skizzy Mars, Joyner Lucas, Bryce Vine, Kyle, Claire Laffut, Halsey</div>

                <div className="get-to-know-subheader">~70's - 90's</div>
                <div className="get-to-know-content">Billy Joel, Queen, The Beatles, Aerosmith, Pink Floyd, Elton John, </div>

                <div className="get-to-know-subheader">~40's - 60's</div>
                <div className="get-to-know-content">Dion and the Belmonts, Frank Sinatra, Sam Cooke, Elvis Presley</div>
              </div>        

              <div className="get-to-know-block">
                <div className="get-to-know-block__header">Favorite Podcast / Creators:</div>
                <div className="get-to-know-block-content">
                  <div><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/PowerfulJRE">The Joe Rogan Experience</a></div>
                  <div><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/channel/UCGeBogGDZ9W3dsGx-mWQGJA">Impaulsive</a></div>
                  <div><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/GaryVaynerchuk">Garyvee</a></div>
                  <div><a target="_blank" rel="noopener noreferrer" href="https://www.youtube.com/user/caseyneistat">Casey Neistat</a></div>
                </div>
              </div>

              <div className="get-to-know-block">
                <div className="get-to-know-block__header">Hobbies:</div>
                <div><a target="_blank" rel="noopener noreferrer" href="https://www.rei.com/learn/expert-advice/hiking-for-beginners.html">Hiking</a></div>
                <div><a target="_blank" rel="noopener noreferrer" href="https://www.w3schools.com/html/">Coding</a></div>
                <div><a target="_blank" rel="noopener noreferrer" href="https://www.rei.com/learn/expert-advice/getting-started-kayaking.html">Kayaking</a></div>
                <div>Driving</div>
              </div>

              <div className="get-to-know-block">
                <div className="get-to-know-block__header">Role Models:</div>
                <div><a target="_blank" rel="noopener noreferrer" href="https://en.wikipedia.org/wiki/Walt_Disney">Walt Disney</a></div>
              </div>

              <div className="get-to-know-block">
                <div className="get-to-know-block__header">Favorite Foods: </div>
                <div>Strawberries, Grapes</div>
              </div>

              {/* <div className="get-to-know-header">Stress Relief: </div> */}

            </div>

            :
            null
            }

            {this.state.filter === 'charts' ? 

            <div className="employee-charts">
              Data Charts about this employee will appear here once this feature is implemented.
            </div>

            :
            null
            }

          </div>

        </div>

        

      </div>

      :

      <div className="mt-3">
        This employee could not be found, please visit the <Link to={ROUTES.EMPLOYEES}><span style={{textDecoration: 'underline'}}>directory</span></Link>
      </div>
    )
  }
}

const SharedSocials= (props) => (
  <div>
    {props.socials?.instagram !== '' && props.socials?.instagram !== undefined ? <a href={props.socials?.instagram} target="_blank" rel="noopener noreferrer" ><i className="fab fa-instagram"></i></a> : ''}
    {props.socials?.facebook !== '' && props.socials?.facebook !== undefined ? <a href={props.socials?.facebook} target="_blank" rel="noopener noreferrer" ><i className="fab fa-facebook"></i></a> : ''}
    {props.socials?.github !== '' && props.socials?.github !== undefined ? <a href={props.socials?.github} target="_blank" rel="noopener noreferrer" ><i className="fab fa-github-square"></i></a> : ''}
  </div>
);

export default EmployeePageDetails;