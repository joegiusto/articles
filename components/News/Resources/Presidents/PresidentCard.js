import React, { useState, useEffect } from 'react';

import Link from 'next/link'

import axios from 'axios';
import moment from 'moment';

import ROUTES from 'components/constants/routes'; 

function Presidents(props) {
  // const [presidents, setPresidents] = useState([]);
  let president = props.president

  function removeDuplicates(data) {
    return data.filter( (value, index) => data.indexOf(value) === index );
  }

  let uniqueTerms = [];

  if (president?.terms) {
    let mappedTerms = president.terms.map(a => a?.party);
    uniqueTerms = removeDuplicates( mappedTerms );
  }
  
  return (
    <div className="president-item">

      <div className="elections">

        {Array.isArray(president?.terms) && 
          president?.terms.map((term) =>
          <div className="badge badge-light border border-dark">
            {moment(term.start_date).format("Y")}
          </div>  
          )
        }
        
      </div>

      <div className="number badge badge-light border border-dark">{props.i + 1}</div>

      <img src={president.photo} alt=""/>

      <div className="info p-2">
        <div className="name">{`${president.first_name} ${president.last_name}`}</div>

        <div className="d-flex flex-column">

          {Array.isArray(uniqueTerms) && 
  
            uniqueTerms.map((term) =>
              <div className={"party badge badge-light border border-dark " + term}>
                <div>
                  {term}
                </div>
              </div>
            )
  
          }

        </div>

      </div>

    </div>
  );
}

export default Presidents;