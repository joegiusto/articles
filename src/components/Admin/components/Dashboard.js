import React, {Component} from 'react'
import axios from 'axios'
import DayPickerInput from 'react-day-picker/DayPickerInput';
import { formatDate, parseDate } from 'react-day-picker/moment';

class Dashboard extends Component {
  constructor(props) {
  super(props);
  
    this.state = {
      start_date: new Date(),
      end_date: new Date()
    };

    this.handleDateChange = this.handleDateChange.bind(this);
  }

  componentDidMount() {
    const self = this;
    this.props.setLocation(this.props.tabLocation);
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

        </div>

        <div className="main-panel">

          <button className="btn btn-danger mb-3">Freeze Store</button>
          <button className="btn btn-danger mb-3 ml-1">Freeze Sign Ups</button>
          <button className="btn btn-danger mb-3 ml-1">Freeze Comments</button>
          <button className="btn btn-danger mb-3 ml-1">Freeze Donations</button>
          <button className="btn btn-danger mb-3 ml-1">Freeze Google Maps API</button>
          <button className="btn btn-danger mb-3 ml-1">Freeze SendGrid</button>
          <button className="btn btn-primary mb-3 ml-1">Unfreeze Submissions</button>

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