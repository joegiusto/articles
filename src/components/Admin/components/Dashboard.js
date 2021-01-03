import React, {Component, useState, useEffect} from 'react'
import axios from 'axios'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

import Chart from 'chart.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';

class Dashboard extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      start_date: new Date(moment().subtract(30, 'days')),
      end_date: new Date(),
      configLoading: false,
      config: {
        stripe: {
          mode: ''
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
      }
    };

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
    this.setConfig = this.setConfig.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    this.renderChartUsers();
    this.renderChartSales();

    this.setState({ configLoading: true })
    
    axios.get('/api/mongoConfig')
    .then((response) => {
      console.log(response)
      this.setState({ config: response.data[0] })
      this.setState({ configLoading: false })
    })
    .catch(function (error) {
      console.log(error);
      this.setState({ configLoading: false })
    });
  }

  renderStripeModeColor(mode) {
    switch (mode) {
      case 'Oranges':
        console.log('Oranges are $0.59 a pound.');
        break;
      case 'Mangoes':
      case 'Papayas':
        console.log('Mangoes and papayas are $2.79 a pound.');
        // expected output: "Mangoes and papayas are $2.79 a pound."
        break;
      default:
        return
    }
  }

  componentWillUnmount() {
    this.props.setLocation('');
  }

  handleStartChange(start_date) {
    this.setState({ 
      ...this.state,
      start_date
    });
  }

  handleEndChange(end_date) {
    this.setState({ 
      ...this.state,
      end_date
    });
  }

  renderChartUsers() {
    console.log("Render")
    var chartElement = document.getElementById('chartUsers');

    let amountOfDays = 30;
    let renderedLabels = [];

    let fakeMemberData = [ 1,1,1,2,1,1,1,1,2,1,1,1,1,1,2,1,1,1,1,2,1,1,1,1,3,1,1,1,2,1 ];
    let fakeNonMemberData = [ 0,2,0,0,0,0,0,0,4,0,0,0,0,0,7,0,0,0,0,1,0,0,0,3,0,0,0,2,3,1 ];
    let fakePremiumData = [ 0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0 ];

    var i;
    for (i = 0; i < amountOfDays; i++) {
      renderedLabels.push( moment().subtract( (amountOfDays - 1) - i, 'days' ).format("MM/DD") );
    }

    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: renderedLabels,
            datasets: [
              {
                label: 'Members Online',
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
              },
              {
                label: 'Non-Members Online',
                data: fakeNonMemberData ,
                backgroundColor: [
                  'rgba(0, 0, 0, 0.2)'
                ],
                borderColor: [
                  'rgba(150, 150, 150, 1)'
                ],
                pointBackgroundColor: 'rgba(150, 150, 150, 1)',
                pointBorderColor: 'rgba(150, 150, 150, 1)',
                borderWidth: 1,
                lineTension: 0.1,
            },
            {
              label: 'Premium-Members Online',
              data: fakePremiumData ,
              backgroundColor: [
                'rgba(255, 215, 0, 0.2)'
              ],
              borderColor: [
                'rgba(255, 215, 0, 1)'
              ],
              pointBackgroundColor: 'rgba(255, 215, 0, 1)',
              pointBorderColor: 'rgba(255, 215, 0, 1)',
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
                    min: 0,
                    max: 20,
                    stepSize: 1,
                  },
                  scaleLabel: {
                    display: true,
                    labelString: 'Number Of Users'
                  }
                }],
                xAxes: [{
                  // display: false,
                  gridLines: {
                    display: false
                  },
                  ticks: {
                    fontFamily: "brandon-grotesque",
                  }
                }]
            }
        }
    });
  }

  renderChartSales() {
    console.log("Render")
    var chartElement = document.getElementById('chartSales');

    let amountOfDays = 30;
    let renderedLabels = [];
    // let renderedData = [ '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55' ];
    let renderedData = [ 0.00, 0.00, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 , 0 , 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0 ];
    var i;
    for (i = 0; i < amountOfDays; i++) {
      renderedLabels.push( moment().subtract( (amountOfDays - 1) - i, 'days' ).format("MM/DD") );
    }

    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: renderedLabels,
            datasets: [{
                label: 'Sales',
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
            responsive: true,
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
                    max: 100,
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
                    callback: function(value, index, values) {
                      return '$' + value;
                    }
                  }
                }]
            }
        }
    });
  }

  setStripeMode(mode) {
    console.log('change')

    axios.post('/api/secure/config/setStripeMode', {
      mode: mode
    })
    .then((response) => {
      console.log(response)

      this.setState(prevState => ({
        config: {
          ...prevState.config, 
          stripe: {
            ...prevState.config.stripe,
            mode: mode  
          }
        }
      }))
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setConfig(config) {
    const self = this;

    console.log(`setConfig was called with the following`)
    console.log(config)

    axios.post('/api/secure/config/setConfig', {
      config
    })
    .then((response) => {
      console.log(response)

      this.setState(prevState => ({
        config: {
          ...config
        }
      }))
    })
    .catch(function (error) {
      console.log(error);
    });

  }

  today() {
    this.setState({ 
      start_date: new Date(moment()),
      end_date: new Date(moment()),
    });
  }

  week() {
    this.setState({ 
      start_date: new Date(moment().startOf('week')),
      end_date: new Date(moment().endOf('week')),
    });
  }

  month() {
    this.setState({ 
      start_date: new Date(moment().startOf('month')),
      end_date: new Date(moment().endOf('month')),
    });
  }

  year() {
    this.setState({ 
      start_date: new Date(moment().startOf('year')),
      end_date: new Date(moment().endOf('year')),
    });
  }

  yesterday() {
    this.setState({ 
      start_date: new Date(moment().subtract(1, 'days')),
      end_date: new Date(moment().subtract(1, 'days')),
    });
  }

  lastWeek() {
    this.setState({ 
      start_date: new Date(moment().subtract(7, 'days').startOf('week')),
      end_date: new Date(moment().subtract(7, 'days').endOf('week')),
    });
  }

  lastMonth() {
    this.setState({ 
      start_date: new Date(moment().subtract(1, 'month').startOf('month')),
      end_date: new Date(moment().subtract(1, 'month').endOf('month')),
    });
  }

  lastYear() {
    this.setState({ 
      start_date: new Date(moment().subtract(1, 'year').startOf('year')),
      end_date: new Date(moment().subtract(1, 'year').endOf('year')),
    });
  }

  render() {

    return (
      <div className="admin-page admin-dashboard">

        <div className="side-panel">

          <div className="card">
            <div className="card-header">Todays Message</div>
            <div className="card-body">
              <div>Hello, one day there will be employees to relay messages and events to!</div>
            </div>
          </div>

          <div className="card mt-3">
            <div className="card-header">Status Overview</div>
            <div className="card-body">

              <div>Stripe: <span className="badge badge-warning">Test</span></div>

              <hr/>

              <div>Sign Up: <span className="badge badge-success">Enabled</span></div>
              <div>IP Limit: <span className="badge badge-danger">Disabled</span></div>

              <hr/>

              <div>Sockets: <span className="badge badge-primary">No Limit</span></div>

              <hr/>

              <div>Store: <span className="badge badge-success">Enabled</span></div>

              <hr/>

              <div>Submissions: <span className="badge badge-success">Enabled</span></div>

            </div>
          </div>

        </div>

        <div className="main-panel">

          <div className={"site-config " + (this.state.configLoading && 'd-none')}>

            <div className="site-config-wrap d-flex justify-content-center mb-2 py-3 bg-dark">

                {/* Stripe */}
                <DropdownButton variant={this.state.config.stripe.mode === 'Test' ? 'primary' : 'success'} style={{verticalAlign: 'middle'}} className="d-inline-block " id="dropdown-basic-button" title={`Stripe: ${this.state.config.stripe?.mode}`}>
                  <Dropdown.Item onClick={() => this.setStripeMode('Live')}>Live</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setStripeMode('Test')}>Test</Dropdown.Item>
                </DropdownButton>

                {/* Banner */}
                <SetBannerModal config={this.state.config} setConfig={this.setConfig} />

                {/* Store */}
                <DropdownButton variant={this.state.config.store.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Store: ${(this.state.config.store.enabled ? 'Enabled' : 'Disabled')}`}>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    store: {
                      enabled: true
                    }
                  })} href="">Enable</Dropdown.Item>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    store: {
                      enabled: false
                    }
                  })} href="">Disable</Dropdown.Item>

                </DropdownButton>
      
                {/* Submissions */}
                <DropdownButton variant={this.state.config.submissions.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Submissions: ${(this.state.config.submissions.enabled ? 'Enabled' : 'Disabled')}`}>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    submissions: {
                      enabled: true
                    }
                  })} href="">Enable</Dropdown.Item>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    submissions: {
                      enabled: false
                    }
                  })} href="">Disable</Dropdown.Item>

                </DropdownButton>
      
                {/* Sign Up */}
                <DropdownButton variant={this.state.config.signup.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Sign Up: ${(this.state.config.signup.enabled ? 'Enabled' : 'Disabled')}`}>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    signup: {
                      enabled: true,
                      limitIP: false
                    }
                  })} href="">Enable</Dropdown.Item>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    signup: {
                      enabled: false,
                      limitIP: false
                    }
                  })} href="">Disable</Dropdown.Item>

                </DropdownButton>
      
                {/* Donations */}
                <DropdownButton variant={this.state.config.donations.enabled ? 'success' : 'danger'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Donations: ${(this.state.config.donations.enabled ? 'Enabled' : 'Disabled')}`}>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    donations: {
                      enabled: true
                    }
                  })} href="">Enable</Dropdown.Item>

                  <Dropdown.Item onClick={() => this.setConfig({
                    ...this.state.config,
                    donations: {
                      enabled: false
                    }
                  })} href="">Disable</Dropdown.Item>

                </DropdownButton>
            </div>

          </div>

          <div className="charts mb-3">

            <div className="card chart-container">
              <canvas className="chart" id="chartUsers"></canvas>
            </div>
  
            <div className="card chart-container">
              <canvas className="chart" id="chartSales"></canvas>
            </div>

          </div>

          <div className="date-selection d-flex flex-column align-items-center justify-content-center">

            <div className="dates">
              <div className="form-group articles d-inline-block">
    
                <label className="label">
                  Start Date
                </label>
    
                <div className="input-group">
    
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-calendar-day mr-0"></i>
                    </div>
                  </div>
      
                  <DayPickerInput 
                    style={{display: 'block'}}
                    onDayChange={this.handleStartChange} 
                    inputProps={{className: 'form-control with-label'}}
                    value={`${formatDate(this.state.start_date)}`}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                      showWeekNumbers: true,
                      todayButton: 'Today',
                    }}
                  />
    
                </div>
    
              </div>
    
              <div className="form-group articles d-inline-block ml-3">
    
                <label className="label">
                  End Date
                </label>
    
                <div className="input-group">
    
                  <div className="input-group-prepend">
                    <div className="input-group-text">
                      <i className="fas fa-calendar-day mr-0"></i>
                    </div>
                  </div>
      
                  <DayPickerInput 
                    style={{display: 'block'}}
                    onDayChange={this.handleEndChange} 
                    inputProps={{className: 'form-control with-label'}}
                    value={`${formatDate(this.state.end_date)}`}
                    formatDate={formatDate}
                    parseDate={parseDate}
                    dayPickerProps={{
                      showWeekNumbers: true,
                      todayButton: 'Today',
                    }}
                  />
    
                </div>
    
              </div>
            </div>
  
            <div className="auto-fill mb-1">
              <button onClick={() => this.today()} className="btn btn-articles-light ml-1">Today</button>
              <button onClick={() => this.week()} className="btn btn-articles-light ml-1">This Week</button>
              <button onClick={() => this.month()} className="btn btn-articles-light ml-1">This Month</button>
              <button onClick={() => this.year()} className="btn btn-articles-light ml-1">This Year</button>
            </div>

            <div className="auto-fill">
              <button onClick={() => this.yesterday()} className="btn btn-dark ml-1">Yesterday</button>
              <button onClick={() => this.lastWeek()} className="btn btn-dark ml-1">Last Week</button>
              <button onClick={() => this.lastMonth()} className="btn btn-dark ml-1">Last Month</button>
              <button onClick={() => this.lastYear()} className="btn btn-dark ml-1">Last Year</button>
            </div>

          </div>

          <div className="tiles d-none">

            <div className="tile">
              <div className="detail">Users</div>
              <div className="stat">0</div>
            </div>

            <div className="tile">
              <div className="detail">Sales</div>
              <div className="stat">0</div>
            </div>

            <div className="tile">
              <div className="detail">Donations</div>
              <div className="stat">0</div>
            </div>

            <div className="tile">
              <div className="detail">Comments</div>
              <div className="stat">0</div>
            </div>

            <div className="tile">
              <div className="detail">Reports</div>
              <div className="stat">0</div>
            </div>

          </div>

        </div>

      </div>
    );
  }
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
      {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}
      <DropdownButton variant={props.config.banner.enabled ? 'success' : 'primary'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title={`Banner: ${props.config.banner.enabled}`}>
        <Dropdown.Item onClick={() => {
          props.setConfig({
            ...props.config,
            banner: {
              enabled: false,
              text: '',
              last_change: new Date()
            }
          });
        }}>Off</Dropdown.Item>
        <Dropdown.Item onClick={handleShow}>On</Dropdown.Item>
      </DropdownButton>

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

export default Dashboard