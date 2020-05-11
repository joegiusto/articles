import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const IssueDevelopmentCard = (props) => (
  <Link to={ROUTES.ISSUES + '/' + props.issue._id}>
    <div className="subscriped-story-card">
      <div className='subscribe-controls'>
        <i className="fas fa-bookmark"></i>
      </div>
      <div className='subscriped-story-card-title'>{props.issue.news_title}</div>
      <div className='subscriped-story-card-subtitle'>Mayor Gives Update</div>
      {/* <FlintCounter></FlintCounter> */}
    </div>
  </Link>
)

export default IssueDevelopmentCard