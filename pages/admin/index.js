import React, { Component, useEffect, useState, useRef } from 'react';

import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import dynamic from 'next/dynamic'

import axios from 'axios'
import moment from 'moment'

// import Chartjs from 'chart.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

import { Bar } from 'react-chartjs-2';

// import Chart from '../../components/admin/Chart';
import AdminLayout from '../../components/layouts/admin.js';

// const Chart = dynamic(
//     () => import('../../components/admin/Chart'),
//     { ssr: false }
// )

function AdminHomePage() {
    const router = useRouter()
    const { param } = router.query

    const chartContainer = useRef(null);
    const [chartInstance, setChartInstance] = useState(null);

    const [configLoading, setConfigLoading] = useState(false)
    const [config, setConfig] = useState({
        stripe: {
            mode: 'Test'
        },
        banner: {
            enabled: false,
            text: ''
        },
        store: {
            enabled: Boolean
        },
        submissions: {
            enabled: Boolean
        },
        signup: {
            enabled: Boolean,
            limitIP: false
        },
        donations: {
            enabled: Boolean,
        }
    });

    useEffect(() => {
        // renderChartUsers()
        // renderChartSales()
    }, []);

    let amountOfDays = 30;
    let renderedLabels = [];
    let renderedData = [ 1, 0, 2, 0, 0, 0, 0, 0, 0, 0, 2, 0, 0, 0, 1, 1, 1 , 1 , 1, 1, 1, 0, 0, 0, 0, 5, 2, 4, 6, 7 ];
    var i;

    for (i = 0; i < amountOfDays; i++) {
        renderedLabels.push( moment().subtract( (amountOfDays - 1) - i, 'days' ).format("MM/DD") );
    }

    const chartConfig = {
        type: 'bar',
        data: {
            labels: renderedLabels,
            datasets: [{
                label: '',
                data: renderedData ,
                backgroundColor: [
                    'rgba(0, 0, 0, 0.2)'
                ],
                borderColor: [
                    'rgba(63, 191, 127, 1)'
                ],
                pointBackgroundColor: 'rgba(63, 191, 127, 1)',
                pointBorderColor: 'rgba(63, 191, 127, 1)',
                borderWidth: 1,
                lineTension: 0.1,
            }]
        },
        options: {
            // responsive: true,
            maintainAspectRatio: false,
            tooltips: {
                mode: 'index',
                intersect: false,
                callbacks: {
                label: function(tooltipItems, data) { 
                    return '$' + tooltipItems.yLabel.toFixed(2) ;
                }
                }
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
                    min: 0,
                    // max: 100,
                    stepSize: 20,

                    callback: function(value, index, values) {

                        if (value % 1 === 0) {

                        if(parseInt(value) >= 1000){
                            return '$' + value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ",");
                        } else {
                            return '$' + value;
                        }

                        }
                        
                    }
                    },
                }],
                xAxes: [{
                    // display: false,
                    gridLines: {
                    display: false
                    },
                    ticks: {
                    fontFamily: "brandon-grotesque",
                    // callback: function(value, index, values) {
                    //   return '$' + value;
                    // }
                    }
                }]
            },
            legend: { 
                display: false
            }
        }
    };

    function setConfigServer(config) {
        const self = this;
    
        console.log(`setConfig was called with the following`)
        console.log(config)
    
        // axios.post('/api/secure/config/setConfig', {
        //     config
        // })
        // .then((response) => {
        //     console.log(response)
        // })
        // .catch(function (error) {
        //     console.log(error);
        // });
    
    }

    function discordHookTest() {

        console.log("Discord Hook Test called")

        axios.post(`/api/discord/message`, {
            // username: "Articles Hook",
            // avatar_url: "https://cdn.articles.media/email/logo.jpg",
            // content: `Testing the hook from /admin on the website!`
          }
        )
        .then(function (response) {
            // console.log(JSON.stringify(response.data))
            console.log(response)
        })
        .catch(function (error) {
            // console.log(JSON.stringify(error))
            console.log(error);
        });
    }
  
    return(
        <section className="admin-page">

            <Head>
                <title>Admin Dashboard - Articles</title>
            </Head>

            <div className="side-panel">

                <div className="card mb-3">
                    <div className="card-header">Current Message</div>
                    <div className="card-body">
                        <div>"Almost done!"</div>
                        <hr/>
                        <b>- Joey 04/21/21</b>
                    </div>
                </div>

                <div className="card mb-3">
                    <div className="card-header">Monitors</div>
                    <div className="card-body">
                        <div>User Reports: 0</div>
                        <div>Comments Reports: 0</div>
                        <div>Expense Reports: 0</div>
                    </div>
                </div>

                <div className="card">
                    <div className="card-header">Services</div>
                    <div className="card-body">
                        <div>Socket Server: <span className="badge badge-danger">Offline</span> </div>
                    </div>
                </div>

            </div>

            <div className="main-panel">
                <div className="container">
    
                    {/* API Controls */}
                    <div className="card border border-dark mb-3">

                        <div className="card-header">API Controls</div>
        
                        <div className="card-body py-2 px-2 d-flex flex-wrap justify-content-center">
                            {/* Stripe */}
                            <DropdownButton variant={config.stripe.mode === 'Test' ? 'primary' : 'success'} style={{verticalAlign: 'middle'}} className="d-inline-block " id="dropdown-basic-button" title={`Stripe: ${config.stripe?.mode}`}>
                                <Dropdown.Item onClick={() => this.setStripeMode('Live')}>Live</Dropdown.Item>
                                <Dropdown.Item onClick={() => this.setStripeMode('Test')}>Test</Dropdown.Item>
                            </DropdownButton>
        
                            {/* Banner */}
                            <SetBannerModal config={config} setConfig={setConfigServer()} />
        
                            {/* Store */}
                            <DropdownButton variant={config.store.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Store: ${(config.store.enabled ? 'Enabled' : 'Disabled')}`}>
            
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    store: {
                                    enabled: true
                                    }
                                })} href="">Enable</Dropdown.Item>
            
                                <Dropdown.Item onClick={() => setConfigServer({
                                    ...config,
                                    store: {
                                    enabled: false
                                    }
                                })} href="">Disable</Dropdown.Item>
        
                            </DropdownButton>
        
                            {/* Submissions */}
                            <DropdownButton variant={config.submissions.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Submissions: ${(config.submissions.enabled ? 'Enabled' : 'Disabled')}`}>
        
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    submissions: {
                                    enabled: true
                                    }
                                })} href="">Enable</Dropdown.Item>
            
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    submissions: {
                                    enabled: false
                                    }
                                })} href="">Disable</Dropdown.Item>
        
                            </DropdownButton>
        
                            {/* Sign Up */}
                            <DropdownButton variant={config.signup.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Sign Up: ${(config.signup.enabled ? 'Enabled' : 'Disabled')}`}>
            
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    signup: {
                                    enabled: true,
                                    limitIP: false
                                    }
                                })} href="">Enable</Dropdown.Item>
            
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    signup: {
                                    enabled: false,
                                    limitIP: false
                                    }
                                })} href="">Disable</Dropdown.Item>
        
                            </DropdownButton>
        
                            {/* Donations */}
                            <DropdownButton variant={config.donations.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Donations: ${(config.donations.enabled ? 'Enabled' : 'Disabled')}`}>
        
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    donations: {
                                    enabled: true
                                    }
                                })} href="">Enable</Dropdown.Item>
            
                                <Dropdown.Item onClick={() => this.setConfig({
                                    ...config,
                                    donations: {
                                    enabled: false
                                    }
                                })} href="">Disable</Dropdown.Item>
        
                            </DropdownButton>
                        </div>

                        <div className="card-body">
                            <button onClick={ () => discordHookTest() } className="btn btn-articles-light btn-sm">Test Discord</button>
                        </div>

                    </div>
        
                    <div className="charts mb-3">
        
                        <div className="row">

                            <div className="col-lg-6 mb-2 pr-lg-1">
                                <div className="card border border-dark ">
                                    <div className="card-header">Online Users</div>
                                    <div className="px-3 py-2">
                                        <Bar
                                            data={chartConfig.data}
                                            options={chartConfig.options}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2 pl-lg-1">
                                <div className="card border border-dark ">
                                    <div className="card-header">Store Sales</div>
                                    <div className="px-3 py-2">
                                        <Bar
                                            data={chartConfig.data}
                                            options={chartConfig.options}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2 pr-lg-1">
                                <div className="card border border-dark ">
                                    <div className="card-header">New Users</div>
                                    <div className="px-3 py-2">
                                        <Bar
                                            data={chartConfig.data}
                                            options={chartConfig.options}
                                        />
                                    </div>
                                </div>
                            </div>

                            <div className="col-lg-6 mb-2 pl-lg-1">
                                <div className="card border border-dark ">
                                    <div className="card-header">News Views</div>
                                    <div className="px-3 py-2">
                                        <Bar
                                            data={chartConfig.data}
                                            options={chartConfig.options}
                                        />
                                    </div>
                                </div>
                            </div>

                        </div>
        
                        {/* <div className="card chart-container">
                            <canvas ref={chartContainer} />
                        </div> */}
        
                        {/* <div className="card chart-container">
                            <canvas className="chart" id="chartSales"></canvas>
                        </div> */}
        
                    </div>

                </div>

            </div> 

        </section>
    )
}

function SetBannerModal(props) {
    const [show, setShow] = useState(false);
    const [value, setValue] = useState(props.config?.banner?.text);
  
    const handleClose = () => setShow(false);
    const handleShow = () => setShow(true);
  
    const handleSubmit = () => {
      console.log(props.config.banner.text)
  
      props.setConfig({
        ...props.config,
        banner: {
          enabled: true,
          text: value,
          last_change: new Date()
        }
      });
  
      // TODO - Call these from a callback function on success of props.setConfig
      handleClose();
      setValue('');
    }
  
    useEffect(() => {
      // Update the document title using the browser API
      console.log('setValue')
      setValue(props.config?.banner?.text)
    }, [props.config?.banner?.text]);
  
    // console.log(props.config.banner.text)
  
    return (
      <>
            <button onClick={handleShow} className="btn btn-primary ml-1">Set Banner <span className="badge badge-warning">Off</span></button>
    
            <Modal className="articles-modal" show={show} onHide={handleClose} centered>
                <Modal.Header closeButton>
                    <Modal.Title>Site Banner</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    You better have something important to say! This will activate a site wide banner that will show up immediately.
                    <div className="form-group articles mt-3">
                    <label for="bannerText">Banner Text</label>
                    <input className="form-control with-label" onChange={e => setValue(e.target.value)} name="bannerText" id="bannerText" type="text" value={value}/>
                    </div>
                </Modal.Body>
                <Modal.Footer>
                    <Button variant="secondary" onClick={handleClose}>
                    Close
                    </Button>
                    <Button variant="primary" onClick={handleSubmit}>
                    Save Changes
                    </Button>
                </Modal.Footer>
            </Modal>
      </>
    );
}

AdminHomePage.Layout = AdminLayout;
export default AdminHomePage;