import React, { useState, useEffect } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'

import axios from 'axios';
import moment from 'moment';

import Chart from 'chart.js';

import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import ROUTES from 'components/constants/routes'; 

 export default function CoronavirusResource(props) {
  const [presidents, setPresidents] = useState([]);

  const [filterFocus, setFilterFocus] = useState('USA');

  useEffect(() => {

    renderChartExcessDeaths();

    // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  function renderChartExcessDeaths() {
    // console.log("Render")

    var chartElement = document.getElementById('chartExcessDeaths');

    let renderedLabels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

    let deathData2020 = [ 1900, 1500, 1300, 1200, 900, 800, 700, 900, 1100, 1200, 1400, 1500];
    let deathData2019 = [ 1900 - 600, 1500- 550, 1300- 575, 1200- 450, 900- 350, 800- 400, 700- 250, 900- 600, 1100- 500, 1200- 550, 1400- 700, 1500- 500];
    let deathData2018 = [ 1900 - 700, 1500- 600, 1300- 550, 1200- 600, 900- 500, 800- 500, 700- 500, 900- 500, 1100- 500, 1200- 500, 1400- 600, 1500- 600];
    let deathData2017 = [ 1900 - 800, 1500- 550, 1300- 650, 1200- 600, 900- 500, 800- 500, 700- 500, 900- 500, 1100- 560, 1200- 560, 1400- 580, 1500- 500];
    let deathData2016 = [ 1900 - 750, 1500- 650, 1300- 550, 1200- 620, 900- 520, 800- 520, 700- 520, 900- 520, 1100- 520, 1200- 500, 1400- 650, 1500- 450];

    new Chart(chartElement, {
        type: 'line',
        data: {
          labels: renderedLabels,
          datasets: [
            {
              label: '2020 Deaths',
              data: deathData2020 ,
              backgroundColor: [
                'rgba(238, 67, 67, 0.2)'
              ],
              borderColor: [
                'rgba(238, 67, 67, 1)'
              ],
              pointBackgroundColor: 'rgba(238, 67, 67, 1)',
              pointBorderColor: 'rgba(238, 67, 67, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: '2019 Deaths',
              data: deathData2019 ,
              backgroundColor: [
                'rgba(238, 238, 67, 0.2)'
              ],
              borderColor: [
                'rgba(238, 238, 67, 1)'
              ],
              pointBackgroundColor: 'rgba(238, 238, 67, 1)',
              pointBorderColor: 'rgba(238, 238, 67, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: '2018 Deaths',
              data: deathData2018 ,
              backgroundColor: [
                'rgba(238, 238, 67, 0.2)'
              ],
              borderColor: [
                'rgba(238, 238, 67, 1)'
              ],
              pointBackgroundColor: 'rgba(238, 238, 67, 1)',
              pointBorderColor: 'rgba(238, 238, 67, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: '2017 Deaths',
              data: deathData2017,
              backgroundColor: [
                'rgba(238, 238, 67, 0.2)'
              ],
              borderColor: [
                'rgba(238, 238, 67, 1)'
              ],
              pointBackgroundColor: 'rgba(238, 238, 67, 1)',
              pointBorderColor: 'rgba(238, 238, 67, 1)',
              borderWidth: 1,
              lineTension: 0.1,
            },
            {
              label: '2016 Deaths',
              data: deathData2016,
              backgroundColor: [
                'rgba(238, 238, 67, 0.2)'
              ],
              borderColor: [
                'rgba(238, 238, 67, 1)'
              ],
              pointBackgroundColor: 'rgba(238, 238, 67, 1)',
              pointBorderColor: 'rgba(238, 238, 67, 1)',
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
                    stepSize: 500,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Deaths'
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
                    labelString: 'Month'
                  }
                }]
            }
        }
    });
  }
  
  return (
    <section className="presidents-page">

      <Head>
        <title>Coronavirus - Articles</title>
      </Head>

      <div className="page-header shadow-sm">

        <div className="container py-3">
  
          <h1 className="mt-3">Explore Coronavirus</h1>
          <p>Information on the virus</p>
  
        </div>

        <div className="filter-bar w-100">

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

      <div className="charts-container container mb-3 mb-lg-5 mt-3">

        <div className="alert alert-danger my-5">
          <b>None of this data is accurate or complete, this page is still in development!</b>
        </div>

        <div className="row">

          <div className="col-md-6">

            <div className="card">

              <div className="card-header p-3">
                <h5 className="">Excess Deaths</h5>
                <p className="mb-0">A popular saying is all deaths are being counted as coronavirus deaths, by looking at historical data we can see their are excess deaths affecting our nation.</p>
              </div>

              <div className="card-body p-0">
                <canvas style={{height: '300px'}} className="chart" id="chartExcessDeaths"></canvas>
              </div>

            </div>

          </div>

          <div className="col-md-6">
            <h5 className="p-2">New Cases</h5>
            {/* <p>Net worth of presidents before and after </p> */}
            <div className="card">
              <canvas className="chart" id="chartUsers"></canvas>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="p-2">Deaths</h5>
            {/* <p>Net worth of presidents before and after </p> */}
            <div className="card">
              <canvas className="chart" id="chartUsers"></canvas>
            </div>
          </div>

          <div className="col-md-6">
            <h5 className="p-2">Herd Immunity Prediction</h5>
            {/* <p>Net worth of presidents before and after </p> */}
            <div className="card">
              <canvas className="chart" id="chartUsers"></canvas>
            </div>
          </div>

        </div>
      </div>

      <hr/>

      <div className="container mb-3">

        <div>
          <h3>Sources</h3>
          <a className="d-block" href="">Example Link</a>
          <a className="d-block" href="">Example Link</a>
          <a className="d-block" href="">Example Link</a>
        </div>

        <button className="btn btn-articles-light mt-3">Download JSON</button>

      </div>

    </section>
  );
}