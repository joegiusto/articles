import React from 'react';
import { Link } from 'react-router-dom'
import * as ROUTES from '../../constants/routes'

const itemsToRender = [
  [ROUTES.FAQ, 'Frequently Asked Questions', <i class="far fa-question-circle"></i>],
  [ROUTES.PRESS, 'Press', <i class="fas fa-pen-alt"></i>],
  [ROUTES.ROADMAP, 'Roadmap', <i class="fas fa-map-signs"></i>],
  [ROUTES.UPDATES, 'Updates', <i class="far fa-plus-square"></i>],
  [ROUTES.PRIVACY, 'Privacy', <i class="fas fa-user-secret"></i>],
  [ROUTES.TRANSLATIONS, 'Translations', <i class="fas fa-language"></i>],
  [ROUTES.FORUM, 'Forum', <i class="far fa-comments"></i>]
]

const Page = (props) => (
  <div className="support-page">

    <div className="container">
      <h1>Support</h1>

      <div className="hub-items">
        {itemsToRender.map((item, i) => 
          <Link className="item" to={item[0]}>
            <div>
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