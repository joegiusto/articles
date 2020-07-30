import React, {Component} from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
// import Tilt from 'react-tilt';
import { Link } from "react-router-dom";
import axios from 'axios';

import * as ROUTES from '../../constants/routes';
import { employeeList } from "../../sample_data/sampleData";

const Test = () => {
  return (
    <div>Hello</div>
  )
}

class EmployeesPage extends Component {
  constructor(props) {
    super(props);

    this.state = {
      searchTerm: 'all',
      employees: []
    }
  }

  componentDidMount() {
    const self = this;
    console.log("Mounted!")

    axios.get('/api/getEmployees')
    .then(function (response) {

      console.log(response);

      self.setState({
        employees: response.data
      })

    })
    .catch(function (error) {
      console.log(error);
    });
    
  }

  render() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    return(
      <div className="employees-page">

        <div className="search-bar">

          <span className={"search-letter" + (this.state.searchTerm === "all" ? ' active' : '')} onClick={() => (this.setState({searchTerm: "all"}))}>
            <span>All</span>
          </span>

          <span className={"search-letter" + (this.state.searchTerm === "anonymous" ? ' active' : '')} onClick={() => (this.setState({searchTerm: "anonymous"}))}>
            <i class="fas fa-eye-slash" aria-hidden="true"></i>
          </span>

          {alphabet.map(letter => (
            <span className={"search-letter"  + (this.state.searchTerm === letter ? ' active' : '')} onClick={() => (this.setState({searchTerm: letter}))}>{letter}</span>
          ))}

        </div>

        <div className="employees-list-head card card-block">
          <h1>Employee Directory</h1>
          <p>As part of our transparency efforts we provide a directory of our employees to the public along with some details about them.</p>
        </div>

        <div className="employees-list">
          {this.state.employees
          .filter(
            employee => {
              console.log( employee?.last_name.charAt(0) );
              console.log( this.state.searchTerm.charAt(0).toLowerCase() );

              if (employee.last_name.charAt(0).toLowerCase() === this.state.searchTerm.charAt(0).toLowerCase()) {
                return employee
              } else if (this.state.searchTerm === 'all') {
                return employee
              } else {
                return null
              }
            }
          )
          .map(employee => (
            <Link to={ROUTES.EMPLOYEES + '/' + employee._id}>

              <div className="employee-card">
                <div>{employee.last_name + (employee.first_name !== 'Anonymous' ? ', ' + employee.first_name : ' Anonymous')}</div>
                <div>
                  <span className="badge badge-articles">Founder</span>
                  <span className="badge badge-articles ml-2">Developer</span>
                </div>
              </div>

            </Link>
          ))}
        </div>

        <div className="w-100 text-center mt-2"><small>Showing {employeeList.length} of {employeeList.length} Results</small></div>

      </div>
    )
  }
}

export default EmployeesPage;