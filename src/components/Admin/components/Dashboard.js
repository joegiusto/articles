import React, {Component} from 'react'
import axios from 'axios'
import moment from 'moment'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

import Chart from 'chart.js';
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Dashboard extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      start_date: new Date(moment().subtract(30, 'days')),
      end_date: new Date(),
      config: {
        stripe: {
          mode: ''
        }
      }
    };

    this.handleStartChange = this.handleStartChange.bind(this);
    this.handleEndChange = this.handleEndChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

    this.renderChartUsers();
    this.renderChartSales();

    axios.get('/api/mongoConfig')
    .then((response) => {
      console.log(response)
      this.setState({ config: response.data[0] })
    })
    .catch(function (error) {
      console.log(error);
    });
  }

  setStripeMode(mode) {
    this.setState({
      config: {
        ...this.state.config,
        stripe: {
          ...this.state.config.stripe,
          mode: mode
        }
      }
    })
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
    // let renderedData = [ '0', '5', '10', '15', '20', '25', '30', '35', '40', '45', '50', '55' ];
    let renderedData = [ 1,1,1,1,1,1,2,1,1,1,3,1,2,1,1,1,1,1,1,1,1,1,1,2,1,1,1,1,1,2 ];
    var i;
    for (i = 0; i < amountOfDays; i++) {
      renderedLabels.push( moment().subtract( (amountOfDays - 1) - i, 'days' ).format("MM/DD") );
    }

    new Chart(chartElement, {
        type: 'line',
        data: {
            labels: renderedLabels,
            datasets: [{
                label: 'Users Online',
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

          <div className="site-config">

            {/* <div className="d-flex justify-content-between">
              <div className="badge badge-warning">Dev</div>
            </div> */}

            <div className="d-flex justify-content-center mb-2 py-3 bg-dark">
                <DropdownButton variant={this.state.config.stripe.mode === 'Test' ? 'warning' : 'success'} style={{verticalAlign: 'middle'}} className="d-inline-block " id="dropdown-basic-button" title={`Stripe: ${this.state.config.stripe?.mode}`}>
                  <Dropdown.Item onClick={() => this.setStripeMode('Live')}>Live</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setStripeMode('Test')}>Test</Dropdown.Item>
                </DropdownButton>

                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title="Store: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
      
                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title="Submissions: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
      
                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title="Sign Up: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
      
                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block ml-1" id="dropdown-basic-button" title="Donations: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
            </div>

          </div>

          <div className="charts mb-3 d-flex">
            <div className="chart-container" style={{height: '300px', width: '50%'}}>
              <canvas className="chart" id="chartUsers"></canvas>
            </div>
  
            <div className="chart-container" style={{height: '300px', width: '50%'}}>
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

export default Dashboard