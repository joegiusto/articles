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
import PresidentCard from './single'

function Presidents(props) {
  const [presidents, setPresidents] = useState([]);

  const [filterSex, setFilterSex] = useState('');
  const [filterAge, setFilterAge] = useState('');
  const [filterOrder, setFilterOrder] = useState('Oldest');

  const [activePresidentID, setActivePresidentID] = useState('');
  const [activePresident, setActivePresident] = useState({});
  const [modalLoading, setModalLoading] = useState(false);

  const [show, setShow] = useState(false);

  const handleClose = () => {setShow(false); setActivePresidentID(''); setActivePresident({}); props.history.push(ROUTES.RESOURCES_PRESIDENTS);}
  const handleShow = () => setShow(true);
  const handlePresidentSelect = (id) => setActivePresidentID(id);

  function filterOrderRules (presidents) {
    if (filterOrder === 'Oldest') {
      return presidents
    } else {
      return presidents.reverse()
    }
  }

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

    if (props.match.params.id) {
      setModalLoading(true);
      setShow(true);

      axios.post('/api/getPresident', {
        president_id: props.match.params.id
      })
      .then( (response) => {
        console.log(response)
        setActivePresident(response.data)
        setModalLoading(false);
      })
      .catch( (error) => {
        console.log(error);
      });
    }

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, []);

  useEffect(() => {

    if ( activePresidentID !== '') {
      console.log("New president details");

      setModalLoading(true);

      axios.post('/api/getPresident', {
        president_id: activePresidentID
      })
      .then( (response) => {
        console.log(response)
        setActivePresident(response.data)
        setModalLoading(false);
      })
      .catch( (error) => {
        console.log(error);
      });
    }

  // empty dependency array means this effect will only run once (like componentDidMount in classes)
  }, [activePresidentID]);

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

      <Modal show={show} className="president-modal articles-modal" centered onHide={handleClose}>

        <Modal.Header closeButton>
          <Modal.Title>President Info</Modal.Title>
        </Modal.Header>

        <Modal.Body>

          <div className="d-flex flex-column flex-lg-row">

            <div className="president-photo mx-auto mx-lg-0 mb-3 mb-lg-0">
              {modalLoading ?
              <div className="loading-cover"></div>
              :
              <img className="" src={activePresident.photo} alt=""/>
              }
            </div>

            <div className="ml-lg-3 mb-3 mb-lg-0">

              <h3>
                {modalLoading ? <h3 className="text-loading-bar">Loading</h3> : <h3>{`${activePresident.first_name} ${activePresident.last_name}`}</h3>}
              </h3>

              {!modalLoading &&
              <>
              <div>Born: { moment(activePresident.birthday).format("LL") }</div>
              <div>

                <span className={ ' ' + (activePresident.died ? '' : 'd-none') }> Died: { moment(activePresident.died).format("LL")} </span>
                <span>(Age: { Math.abs(moment(activePresident.birthday).diff( moment(activePresident.died), 'years')) })</span>

              </div>
              </>
              }

            </div>

            <div className="location-photo mb-3 mb-lg-0 mx-auto mx-lg-0 ml-lg-auto">
              {modalLoading ?
              <div className="loading-cover"></div>
              :
              <div className="ml-auto">
                <img className="img-fluid" src="https://cdn.articles.media/presidents/george_washinton.jpg" alt=""/>
              </div>
              }
            </div>

          </div>

          <div className="mt-3">
            {modalLoading ?
              <>
              <div className="text-loading-bar w-100 text-white pl-2">Loading</div>
              <div className="text-loading-bar w-100">Loading</div>
              <div className="text-loading-bar w-100">Loading</div>
              </>
              :
              activePresident.description
            }
          </div>

          <div className="mt-3 mt-lg-5">
            <button disabled={modalLoading} className="btn btn-articles-light btn-sm active">Accomplishments</button>
            <button disabled={modalLoading} className="btn btn-articles-light btn-sm">Criticisms</button>
            <button disabled={modalLoading} className="btn btn-articles-light btn-sm">Pardons</button>
            <button disabled={modalLoading} className="btn btn-articles-light btn-sm">Gallery</button>
            <button disabled={modalLoading} className="btn btn-articles-light btn-sm">Vacations</button>
          </div>

          <div className={"mt-2 " + (modalLoading ? 'd-none' : '')}>
            <Accordion defaultActiveKey={1}>

              {activePresident.accomplishments?.map((accomplishment, i) =>

                <Card>
                  <Accordion.Toggle as={Card.Header} style={{cursor: 'pointer'}} eventKey={i + 1}>
                    {`${accomplishment.accomplishment}`}
                  </Accordion.Toggle>
                  <Accordion.Collapse eventKey={i + 1}>
                    <Card.Body>{accomplishment.description}</Card.Body>
                  </Accordion.Collapse>
                </Card>

              )}

            </Accordion>
          </div>

        </Modal.Body>
        
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
        
        </Modal.Footer>
      </Modal>

      <div className="page-header shadow-sm">

        <div className="container py-3">
  
          <h1 className="mt-3">Explore Presidents</h1>
          <p>Information on all of the presidents</p>
  
        </div>

        <div className="filter-bar w-100">

          <div className="container d-flex flex-column flex-lg-row">

            <div className="d-flex flex-column flex-lg-row">

              <div className="filter-section">
                <div className="label">Sex:</div>
                <div>
                  <button onClick={() => filterSex === 'Male' ? setFilterSex('') : setFilterSex('Male')} className={"btn btn-articles-light btn-sm " + (filterSex === 'Male' ? 'active' : '') }>Male</button>
                  <button onClick={() => filterSex === 'Female' ? setFilterSex('') : setFilterSex('Female')} className={"btn btn-articles-light btn-sm " + (filterSex === 'Female' ? 'active' : '') }>Female</button>
                </div>
              </div>
  
              <div className="filter-section ml-lg-4">
                <div className="label">Term Start Age:</div>
                <div className="buttons">
                  <button onClick={() => filterAge === '35-44' ? setFilterAge('') : setFilterAge('35-44')} className={"btn btn-articles-light btn-sm " + (filterAge === '35-44' ? 'active' : '')}>35-44</button>
                  <button onClick={() => filterAge === '45-54' ? setFilterAge('') : setFilterAge('45-54')} className={"btn btn-articles-light btn-sm " + (filterAge === '45-54' ? 'active' : '')}>45-54</button>
                  <button onClick={() => filterAge === '55-64' ? setFilterAge('') : setFilterAge('55-64')} className={"btn btn-articles-light btn-sm " + (filterAge === '55-64' ? 'active' : '')}>55-64</button>
                  <button onClick={() => filterAge === '65-74' ? setFilterAge('') : setFilterAge('65-74')} className={"btn btn-articles-light btn-sm " + (filterAge === '65-74' ? 'active' : '')}>65-74</button>
                  <button onClick={() => filterAge === '75-84' ? setFilterAge('') : setFilterAge('75-84')} className={"btn btn-articles-light btn-sm " + (filterAge === '75-84' ? 'active' : '')}>75-84</button>
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
                  <button onClick={() => setFilterOrder('Oldest') } className={"btn btn-articles-light btn-sm " + (filterOrder === 'Oldest' ? 'active' : '')}>Oldest</button>
                  <button onClick={() => setFilterOrder('Newest') } className={"btn btn-articles-light btn-sm " + (filterOrder === 'Newest' ? 'active' : '')}>Newest</button>
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

          {filterOrderRules(presidents).map((president, i) => 
            <Link onClick={ () => { setShow(true); setActivePresidentID(president._id); } } to={`${ROUTES.RESOURCES_PRESIDENTS}/${president._id}`}>
              <PresidentCard i={i} president={president}/>
            </Link>
          )}

        </div>

      </div>

      <hr/>

      <div className="charts-container container mb-3 mb-lg-5">
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

      <hr/>

      <div className="container mb-3">
        <button className="btn btn-articles-light">Download JSON</button>
      </div>

    </section>
  );
}

export default withRouter(Presidents);