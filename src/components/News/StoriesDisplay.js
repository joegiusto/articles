import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const StoriesDisplay = (props) => (
  <div className="row">
    {props.stories.map((story, i) => (
      
      i === 0 ? 
      <div className="col-12 col-md-12">

        <Link to={ROUTES.STORIES + '/' + story._id}>
          <div className="story-card story-card-large">
            {story.news_title}
          </div>
        </Link>

      </div>
      :
      <div className="col-12 col-md-6">

        <Link to={ROUTES.STORIES + '/' + story._id}>
          <div className="story-card">
            {story.news_title}
          </div>
        </Link>

      </div>

    ))}
  </div>
)

export default StoriesDisplay