import React from 'react';
import Link from 'next/link'
import ROUTES from '../../components/constants/routes'

const itemsToRender = [
  [ROUTES.UPDATES, 'Updates', <svg aria-hidden="true" focusable="false" data-prefix="fas" data-icon="sparkles" role="img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" style={{fontSize: '1rem'}} className="svg-inline--fa fa fa-sparkles fa-fw mr-2"><path fill="currentColor" d="M324.42 103.15L384 128l24.84 59.58a8 8 0 0 0 14.32 0L448 128l59.58-24.85a8 8 0 0 0 0-14.31L448 64 423.16 4.42a8 8 0 0 0-14.32 0L384 64l-59.58 24.84a8 8 0 0 0 0 14.31zm183.16 305.69L448 384l-24.84-59.58a8 8 0 0 0-14.32 0L384 384l-59.58 24.84a8 8 0 0 0 0 14.32L384 448l24.84 59.58a8 8 0 0 0 14.32 0L448 448l59.58-24.84a8 8 0 0 0 0-14.32zM384 255.64a16.06 16.06 0 0 0-8.84-14.33l-112.57-56.39-56.28-112.77c-5.44-10.87-23.19-10.87-28.62 0l-56.28 112.77L8.84 241.31a16 16 0 0 0 0 28.67l112.57 56.39 56.28 112.77a16 16 0 0 0 28.62 0l56.28-112.77L375.16 270a16.07 16.07 0 0 0 8.84-14.36z" className=""></path></svg>],
  [ROUTES.FAQ, 'Frequently Asked Questions', <i className="far fa-question-circle"></i>],
  [ROUTES.ROADMAP, 'Roadmap', <i className="fas fa-map-signs"></i>],
  [ROUTES.PRESS, 'Press', <i className="fas fa-pen-alt"></i>],
  [ROUTES.PRIVACY, 'Privacy', <i className="fas fa-user-secret"></i>],
  [ROUTES.TRANSLATIONS, 'Translations', <i className="fas fa-language"></i>],
  [ROUTES.FORUM, 'Forum', <i className="far fa-comments"></i>],
  [ROUTES.FORUM, 'Jobs', <i className="fas fa-briefcase"></i>],
  [ROUTES.BETA, 'Beta Testing', <span className="badge badge-dark">!</span>],
]

const Page = (props) => (
  <div className="community-page">

    <div className="container">
      <h1>Community Hub</h1>
      {/* <p>Various pages that carry out different tasks for the site</p> */}

      <div className="hub-items">
        {itemsToRender.map((item, i) => 
          <Link href={item[0]}>
            <div className="item theme-card-background">
              <div>{item[2]}</div>
              <div>{item[1]}</div>
            </div>
          </Link>
        )}
      </div>

      {/* <ul>
        <Link to={ROUTES.TRANSLATIONS}><li>Translations</li></Link>
        <Link to={ROUTES.FAQ}><li>Frequently Asked Questions</li></Link>
        <Link to={ROUTES.UPDATES}><li>Updates</li></Link>
        <Link to={ROUTES.PRESS}><li>Press</li></Link>
        <Link to={ROUTES.ROADMAP}><li>Roadmap</li></Link>
        <Link to={ROUTES.PRIVACY}><li>Privacy</li></Link>
      </ul> */}

    </div>

  </div>
);

export default Page