import React, { useState, useEffect } from 'react';
import axios from 'axios';
import moment from 'moment';
import { Helmet } from "react-helmet";
import { Link } from 'react-router-dom';
import Chart from 'chart.js';

import * as ROUTES from '../../../constants/routes'; 
import PresidentCard from './single'

function Presidents(props) {
  const [presidents, setPresidents] = useState([]);

  useEffect(() => {

    renderChartPresidentsAge();
    
    axios.get('/api/getPresidents', {

    })
    .then( (response) => {
      console.log(response)
      
      setPresidents(response.data);
    })
    .catch( (error) => {
      console.log(error);
    });

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  function renderChartPresidentsAge() {
    // console.log("Render")

    var chartElement = document.getElementById('chartPresidentsAge');

    let amountOfDays = 45;
    let renderedLabels = [];

    let fakeMemberData = [ 50,55,50,60,64,67,58,55,61,64,37,54,57,60,59,47,70,74,76,60,50,55,50,60,64,67,58,55,61,64,37,54,57,60,59,47,70,74,76,60,47,70,74,76,60 ];

    var i;
    for (i = 0; i < amountOfDays; i++) {
      renderedLabels.push( i + 1 );
    }

    new Chart(chartElement, {
        type: 'line',
        data: {
          labels: renderedLabels,
          datasets: [
            {
              label: 'Age',
              data: fakeMemberData ,
              backgroundColor: [
                'rgba(63, 191, 127, 0.2)'
              ],
              borderColor: [
                'rgba(63, 191, 127, 1)'
              ],
              pointBackgroundColor: 'rgba(63, 191, 127, 1)',
              pointBorderColor: 'rgba(63, 191, 127, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            }
          ]
        },
        options: {
            responsive: true,
            maintainAspectRatio: false,
            tooltips: {
              mode: 'index',
              intersect: false,
            },
            hover: {
              mode: 'nearest',
              intersect: true
            },
            scales: {
                yAxes: [{
                  // display: false,
                  ticks: {
                    fontFamily: "brandon-grotesque",
                    beginAtZero: true,
                    min: 35,
                    max: 100,
                    stepSize: 1,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Average Age'
                  }
                }],
                xAxes: [{
                  // display: false,
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    fontFamily: "brandon-grotesque",
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'President Number'
                  }
                }]
            }
        }
    });
  }
  
  return (
    <section className="presidents-page">

      <Helmet>
        <title>Presidents - Articles</title>
      </Helmet>

      <div className="page-header shadow-sm">

        <div className="container py-3">
  
          <h1 className="mt-3">Explore Presidents</h1>
          <p>Information on all of the presidents</p>
  
        </div>

        <div className="filter-bar w-100">

          <div className="container d-flex flex-column flex-lg-row">

            <div className="d-flex flex-column flex-lg-row">

              <div className="filter-section">
                <div className="label">Gender:</div>
                <div>
                  <button className="btn btn-articles-light btn-sm">Male</button>
                  <button className="btn btn-articles-light btn-sm" disabled={true}>Female</button>
                </div>
              </div>
  
              <div className="filter-section ml-lg-4">
                <div className="label">Age:</div>
                <div className="buttons">
                  <button className="btn btn-articles-light btn-sm">35-45</button>
                  <button className="btn btn-articles-light btn-sm" disabled={true}>55-65</button>
                  <button className="btn btn-articles-light btn-sm" disabled={true}>65-75</button>
                  <button className="btn btn-articles-light btn-sm" disabled={true}>75-85</button>
                </div>
              </div>
  
              <div className="filter-section search ml-lg-4">
                <div className="label">Search:</div>
                <div className="form">
                  <input type="text"/>
                </div>
              </div>
  
              <div className="filter-section ml-lg-4">
                <div className="label">Party:</div>
                <div className="buttons">
                  <button className="btn btn-articles-light btn-sm dropdown-toggle">All</button>
                </div>
              </div>
  
              <div className="filter-section ml-lg-4">
                <div className="label">Order:</div>
                <div className="buttons">
                  <button className="btn btn-articles-light btn-sm">Oldest</button>
                  <button className="btn btn-articles-light btn-sm" disabled={true}>Newest</button>
                </div>
              </div>

            </div>

            <div className="filter-section ml-lg-auto">
              <div className="label">Rankings:</div>
              <div className="buttons">
                <button className="btn btn-articles-light btn-sm dropdown-toggle">None</button>
              </div>
            </div>

          </div>

        </div>

      </div>

      <div className="presidents-grid-container container">

        <div className="presidents-grid py-3">
          {presidents.map((president) => 

            <Link to={`${ROUTES.PRESIDENTS}/${president._id}`}>
              <PresidentCard president={president}/>
            </Link>

          )}
        </div>

      </div>

      <div className="charts-container container mb-3">
        <div className="row">

          <div className="col-md-6">
            <h5 className="p-2">Age in Office</h5>
            <div className="card">
              <canvas className="chart" id="chartPresidentsAge"></canvas>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="p-2">Adjusted Net Worth</h5>
            {/* <p>Net worth of presidents before and after </p> */}
            <div className="card">
              <canvas className="chart" id="chartUsers"></canvas>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="p-2">Adjusted Pay</h5>
            <div className="card">
              <canvas className="chart" id="chartUsers1"></canvas>
            </div>
          </div>

          <div className="col-md-6">
            <div className="d-flex justify-content-between">
              <h5 className="p-2">Pardons Granted</h5>
              <div className="text-muted"> <span className="badge badge-primary" style={{cursor: 'pointer'}}>Per Capita</span> / <span className="badge badge-light" style={{cursor: 'pointer'}}>Population</span></div>
            </div>
            <div className="card">
              <canvas className="chart" id="chartUsers1"></canvas>
            </div>
          </div>

        </div>
      </div>

      <div className="container mb-3">
        <button className="btn btn-articles-light">Download JSON</button>
      </div>

    </section>
  );
}

export default Presidents;