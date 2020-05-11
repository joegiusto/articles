import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const MythsDisplay = (props) => (
  <div className="row">
    {props.myths.map((myth) => (
      <div className="col-12 col-md-4">

        <Link to={ROUTES.MYTHS + '/' + myth._id}>
          <div className="myth-card">
            <div>{myth.news_title}</div>
          </div>
        </Link>

      </div>
    ))}
  </div>
)

export default MythsDisplay