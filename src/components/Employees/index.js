import React, {Component} from 'react';
import { BrowserRouter as Route, Switch } from 'react-router-dom';
import Tilt from 'react-tilt';
import { Link } from "react-router-dom";

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
      searchTerm: ''
    }
  }

  componentDidMount() {
    console.log("Mounted!")
  }

  render() {
    const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
    
    return(
      <div className="employees-page">

        <div className="search-bar">

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
          {employeeList.map(employee => (
            <Link to={ROUTES.EMPLOYEES + '/' + employee.id}>

                <div className="employee-card">
                  <div>{employee.nameLast + (employee.nameFirst !== 'Anonymous' ? ', ' + employee.nameFirst : ' Anonymous')}</div>
                  <div>
                    <span className="badge badge-articles">Founder</span>
                    <span className="badge badge-articles ml-2">Developer</span>
                  </div>
                </div>

            </Link>
          ))}
        </div>

        <div className="w-100 text-center mt-2"><small>Showing {employeeList.length} of {employeeList.length} Results</small></div>

        <div className="row justify-content-center">

          <div className="col-sm-7 mt-3">
            
          </div>

          <Switch>
            <Route exact path={ROUTES.EMPLOYEES} component={Test}/>
            <Route path={ROUTES.EMPLOYEES_DETAILS} component={Test}/>
          </Switch>

          <div className="col-12">
            
          </div>

        </div>

      </div>
    )
  }
}

export default EmployeesPage;