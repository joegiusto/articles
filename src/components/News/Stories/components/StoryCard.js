import React, { useState } from 'react';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../../constants/routes'

export default function MythCard(props) {
  const [expanded, toggleExpanded] = useState(false);

  const myth = props.myth

  return (
    <>
    <div className="col-12 col-md-6">
      <Link to={`${ROUTES.STORIES}/${myth._id}`}>
        <div className="myth-item">

          <div className="myth-item-banner btn-outline-danger">
            Hot
          </div>

          <div className="item-background"/>
          <div className="item-photo"/>
          <div className='myth-item-title'>{myth.news_title}</div>
          <div className='myth-item-date'>{moment(myth.news_date).format("LL")}</div>
          <div className='myth-item-desc'>{myth.news_tagline}</div>

        </div>
      </Link>
    </div>

    {props.length === props.index + 1 ?
      (props.index % 2 !== 1 ? 

        <div className="col-12 col-md-6">
          <Last/>
        </div>

        :

        <div className="col-12">
          <Last/>
        </div>

      )
      :
      null
    }
    </>
  )

}

function Last() {
  return (
    <div className="myth-item last">
      <div className='myth-item-title'>More to Come...</div>
      <div className='myth-item-desc'>New content being added every week! If you have any ideas or suggestions let us know!</div>
    </div>
  )
}