import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Helmet } from "react-helmet";
import { Link, withRouter } from 'react-router-dom';
import Chart from 'chart.js';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import * as ROUTES from '../../../../constants/routes'; 
// import PresidentCard from './single'

function Presidents(props) {
  const [presidents, setPresidents] = useState([]);

  const [filterFocus, setFilterFocus] = useState('USA');

  useEffect(() => {

    // renderChartExcessDeaths();

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);
  
  return (
    <section className="presidents-page">

      <Helmet>
        <title>Politicians - Articles</title>
      </Helmet>

      <div className="page-header shadow-sm mb-5">

        <div className="container py-3 d-flex justify-content-between align-items-center">
  
            <div>
                <h1 className="mt-3">Explore Senate</h1>
                <p>Information on your representatives</p>
            </div>

            <button className="btn btn-articles-light mt-3">Download JSON</button>
  
        </div>

        <div className="filter-bar w-100 d-none">

          <div className="container d-flex flex-column flex-lg-row">

            <div className="d-flex flex-column flex-lg-row">

              <div className="filter-section">
                <div className="label">Focus:</div>
                <div>
                  <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'USA' ? 'active' : '') }>USA</button>
                  <button className={"btn btn-articles-light btn-sm " + (filterFocus === 'Global' ? 'active' : '') }>Global</button>
                </div>
              </div>

            </div>

          </div>

        </div>

      </div>

      <div className="container mb-3">

        <div className="row">

        </div>

      </div>

    </section>
  );
}

export default withRouter(Presidents);