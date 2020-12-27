import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from 'react-router-dom';
import * as ROUTES from '../../../constants/routes'; 

function Presidents(props) {
  // const [presidents, setPresidents] = useState([]);
  let president = props.president
  
  return (
    <div className="president-item">

      <div className="elections">

        { Array.isArray(president?.terms) ? 

          president?.terms.map((term) =>
          <div className="badge badge-light border border-dark">
            {moment(term.start_date).format("Y")}
          </div>  
          )

        :

          ''

        }
        
      </div>

      <img src={president.photo} alt=""/>

      <div className="info p-2">
        <div className="name">{`${president.first_name} ${president.last_name}`}</div>
        <div className="badge badge-light border border-dark">
          Unaffiliated
        </div>
      </div>

    </div>
  );
}

export default Presidents;