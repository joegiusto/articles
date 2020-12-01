import React, {Component} from 'react'
import axios from 'axios'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';

class Dashboard extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      start_date: new Date(),
      end_date: new Date(),
      config: {
        stripe: {
          mode: ''
        }
      }
    };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);

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

  handleDateChange(day) {
    this.setState({ 
      ...this.state,
      start_date: day,
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

          <div className="mongo-config">

            <div className="d-flex justify-content-between">
              <div className="badge badge-warning">Dev</div>
              {/* <button className="btn btn-warning btn-sm">Refresh Config</button> */}
            </div>

            <div className="d-flex justify-content-between mt-2">
              <div>
                <DropdownButton variant={this.state.config.stripe.mode === 'Test' ? 'warning' : 'success'} style={{verticalAlign: 'middle'}} className="d-inline-block mb-3 " id="dropdown-basic-button" title={`Stripe: ${this.state.config.stripe?.mode}`}>
                  <Dropdown.Item onClick={() => this.setStripeMode('Live')}>Live</Dropdown.Item>
                  <Dropdown.Item onClick={() => this.setStripeMode('Test')}>Test</Dropdown.Item>
                </DropdownButton>

                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block mb-3 ml-1" id="dropdown-basic-button" title="Store: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
      
                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block mb-3 ml-1" id="dropdown-basic-button" title="Submissions: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
      
                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block mb-3 ml-1" id="dropdown-basic-button" title="Sign Up: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
      
                <DropdownButton variant={'success'} style={{verticalAlign: 'middle'}} className="d-inline-block mb-3 ml-1" id="dropdown-basic-button" title="Donations: Enabled">
                  <Dropdown.Item href="">Enabled</Dropdown.Item>
                  <Dropdown.Item href="">Disabled</Dropdown.Item>
                </DropdownButton>
              </div>
    

            </div>
          </div>

          <div className="toolbar d-flex align-items-start">

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
                  onDayChange={this.handleDateChange} 
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
                  onDayChange={this.handleDateChange} 
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
  
            <button className="btn btn-articles-light ml-1">Today</button>
            <button className="btn btn-articles-light ml-1">This Week</button>
            <button className="btn btn-articles-light ml-1">This Month</button>
            <button className="btn btn-articles-light ml-1">This Year</button>

          </div>

          <div className="tiles">

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