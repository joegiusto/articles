import React from 'react'
import { Link } from 'react-router-dom'

import * as ROUTES from '../../constants/routes'

const StoriesDisplay = (props) => (
  <div className="row">
    {props.stories.map((story, i) => (
      
      // i === 0 ?
      <div className={"col-12 " + ( i === 0 ? 'col-md-12' : 'col-md-6')}>

        <Link to={ROUTES.STORIES + '/' + story._id}>
          <div className={"story-card " + ( i === 0 ? 'story-card-large' : '')}>

            <div className="image">
              <img src={story.hero_url} alt=""/>
            </div>

            <div className="title">
              {story.news_title}
            </div>

          </div>
        </Link>

      </div>
      // :
      // <div className="col-12 col-md-6">

      //   <Link to={ROUTES.STORIES + '/' + story._id}>
      //     <div className="story-card">
      //       <div className="image">
      //         <img src={story.hero_url} alt=""/>
      //       </div>
      //       <div className="title">
      //         {story.news_title}
      //       </div>
      //     </div>
      //   </Link>

      // </div>

    ))}
  </div>
)

export default StoriesDisplay