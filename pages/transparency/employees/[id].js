import Head from 'next/head'
import { useRouter } from 'next/router'
import { useState, useEffect } from 'react'
import moment from 'moment';
import axios from 'axios'
// import { useSelector, useDispatch } from 'react-redux'
import Link from 'next/link'

import ROUTES from '../../../components/constants/routes'
import TransparencyLayout from '../../../components/layouts/transparency';

function TransparencyEmployeePage(props) {
    const router = useRouter()
    const { id } = router.query
    
    const [employee, setEmployee] = useState({})
    const [employeeLoading, setEmployeeLoading] = useState(false)
    const [filter, setFilter] = useState('get-to-know')

    const [ commits, setCommits ] = useState([])
    const [ commitsLoading, setCommitsLoading ] = useState(true)

    useEffect(() => {

        setEmployeeLoading(true)
		
		axios.post('/api/transparency/employees/employee', {
            employee: id
        })
        .then( (response) => {
            console.log(response)
            setEmployee(response.data)
            setEmployeeLoading(false)
        })
        .catch(function (error) {
            console.log(error);
            setEmployeeLoading(false)
        });

        axios.post('/api/github', {
            employee: id
        })
        .then( (response) => {

            console.log(response)
            setCommitsLoading(false)
            setCommits(response.data.commits)

        })
        .catch(function (error) {

            console.log(error);
            setCommitsLoading(false)

        });

	}, []);

    return (
        <div className="employee-page">
                
            <Head>
                <title>Employee - Articles</title>
            </Head>

            <div className="employee-header card">

                <div className="employee-header-left d-flex flex-column flex-grow-1">

                    <div className="top d-flex flex-row mb-2">
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

                        <div className='employee-name'><h3>{`${employee.first_name} ${employee.last_name}`}</h3></div>

                        <div className='employee-role'>Founder</div>

                        <div className='employee-social'>
                            <SharedSocials socials={employee.employee?.socials}/>
                        </div>
                        
                        </div>
                    </div>

                    <Link href={ROUTES.MESSAGES + `/?startMsg=${employee._id}`}>
                            <a>
                                <button className="btn btn-articles-light btn-lg w-100"><i className="fad fa-comments-alt"></i>Message</button>
                            </a>
                    </Link>

                </div>

                <div className='employee-header-right'>

                    <div className="bio">
                        <div className='employee-bio'>{employee.employee?.bio.replace('<age></age>', moment().diff(employee.birth_date, 'years') )}</div>
                    </div>

                    <div className="employee-header-traits-title">Location - <span className="badge badge-dark">{employee.address?.state}</span></div>
                    <p className="employee-header-traits-title">Role</p>
                    <p className="employee-header-traits-details">{employee.employee?.role.map((role) => <span className="badge badge-dark mr-1">{role}</span>) || 'NONE'}</p>
                    <p className="employee-header-traits-title">Joined</p>
                    <p className="employee-header-traits-details">{moment(employee.sign_up_date).format('LL') || 'ERROR'}</p>

                </div>

            </div>

            <div className="employee-details card">

                <div className="filters noselect">
                    <div onClick={() => setFilter('get-to-know')} className={"filter " + ( filter === 'get-to-know' ? 'active' : '' ) }>Get To Know</div>
                    <div onClick={() => setFilter('stubs')} className={"filter " + ( filter === 'stubs' ? 'active' : '' ) }>Pay Stubs</div>
                    <div onClick={() => setFilter('charts')} className={"filter " + ( filter === 'charts' ? 'active' : '' ) }>Data Charts</div>
                    <div onClick={() => setFilter('proposals')} className={"filter " + ( filter === 'proposals' ? 'active' : '' ) }>Proposals<span className="badge badge-dark ml-1">Politics</span></div>
                    <div onClick={() => setFilter('commits')} className={"filter " + ( filter === 'commits' ? 'active' : '' ) }>Commits<span className="badge badge-dark ml-1">Developer</span></div>
                    <div onClick={() => setFilter('news')} className={"filter " + ( filter === 'news' ? 'active' : '' ) }>News<span className="badge badge-dark ml-1">Writer</span></div>
                </div>

                <div className="details">

                    {filter === 'stubs' ? 

                    // <div className="payrole-stubs">
                    //     {employee.employee.payrole.stubs.map((stub) => {

                    //     let isFirstOfMonth = false;

                    //     return (
                    //         <div className="stub">

                    //         <div>
                    //             <div>Week of {moment(stub.date).format("LL")}</div>
                    //             <div className="bold">${(stub.amount / 100).toFixed(2)}</div>
                    //         </div>

                    //         <div className="btn btn-articles-light">
                    //             View
                    //         </div>

                    //         </div>
                    //     )
                    //     })}

                    //     <div className="total text-center mt-2">Total ${(this.state.employeeAgr[0]?.total / 100).toFixed(2)}</div>
                    // </div>
                    null

                    :
                    null
                    }

                    {filter === 'commits' ? 

                    <div className="employee-commits">
                        
                        {commitsLoading === true ?
                        <div className="loading">Loading</div>
                        :
                        <div className="commits">

                            <a target="_blank" rel="noopener noreferrer" href="https://github.com/joegiusto/articles/commits/">
                                <div className="powered-by d-flex align-items-center justify-content-center">
                                <i className="fab fa-github-square fa-3x"></i>
                                <span className="">Powered by Github</span>
                                </div>
                            </a>

                            {commits.map(commit => 
                                <a key={commit.sha} target="_blank" rel="noopener noreferrer" href={commit.html_url}>
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

                    {filter === 'news' ? 

                    <div className="employee-news">
                        
                        {/* {this.state.commitsLoading === true ?
                        <div className="loading">Loading</div>
                        : */}
                        <div className="news">

                            {/* <div className="btn-group mb-3">
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

                            <div>
                                <button onClick={ () => this.setState({ newsPage: this.state.newsPage - 1}, () => this.getWriterNews() ) } disabled={this.state.newsPage === 0 ? true : false} className={"btn btn-articles-light "}>{this.state.newsPage === 0 ? this.state.newsPage + 1 : this.state.newsPage }</button>
                                <button onClick={ () => { this.setState({ newsPage: this.state.newsPage + 1 }, () => this.getWriterNews() ) } } disabled={this.renderIsNextPageDisabled()} className="btn btn-articles-light">{this.state.newsPage + 2}</button>
                                
                                {this.renderPagePlace()}
                            </div> */}

                        </div>

                    </div>

                    :
                    null
                    }

                    {filter === 'get-to-know' ? 

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
                        <div className="get-to-know-content">G-Eazy, Russ, Olivia O'Brian, Blackbear, Skizzy Mars, Joyner Lucas, Bryce Vine, Kyle, Claire Laffut, Halsey, Hoodie Allen, Post Malone</div>

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

                        {/* <div className="get-to-know-block">
                        <div className="get-to-know-block__header">Favorite Foods: </div>
                        <div>Strawberries, Grapes</div>
                        </div> */}

                        {/* <div className="get-to-know-header">Stress Relief: </div> */}

                    </div>

                    :
                    null
                    }

                    {filter === 'charts' ? 

                    <div className="employee-charts">
                        Data Charts about this employee will appear here once this feature is implemented.
                    </div>

                    :
                    null
                    }

                </div>

            </div>

        </div>
    )
}

const SharedSocials= (props) => (
    <div>
        {props.socials?.instagram !== '' && props.socials?.instagram !== undefined ? <a href={props.socials?.instagram} target="_blank" rel="noopener noreferrer" ><i className="fab fa-instagram"></i></a> : ''}
        {props.socials?.facebook !== '' && props.socials?.facebook !== undefined ? <a href={props.socials?.facebook} target="_blank" rel="noopener noreferrer" ><i className="fab fa-facebook"></i></a> : ''}
        {props.socials?.github !== '' && props.socials?.github !== undefined ? <a href={props.socials?.github} target="_blank" rel="noopener noreferrer" ><i className="fab fa-github-square"></i></a> : ''}
    </div>
);

TransparencyEmployeePage.Layout = TransparencyLayout;
export default TransparencyEmployeePage;