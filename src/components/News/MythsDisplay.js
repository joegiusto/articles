import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const MythsDisplay = (props) => (
  <div className="row">
    {props.myths.map((myth) => (
      <div className="col-12 col-md-3 mb-2">

        <Link to={ROUTES.MYTHS + '/' + myth._id}>
          <div className="myth-card">
            <img src={myth.hero_url} className="top-part"></img>
            <div className="myth-title">{myth.news_title}</div>
            <div className="anti-clickbait">It's Real!</div>
          </div>
        </Link>

      </div>
    ))}
  </div>
)

export default MythsDisplay