import React, {Component} from 'react';
import axios from 'axios';
import moment from 'moment';
import { Link } from "react-router-dom";
import { Manager, Reference, Popper } from 'react-popper';

// import { employeeList } from "../../../sample_data/sampleData";
import * as ROUTES from "../../../../../constants/routes"

class EmployeePageDetails extends Component {
  constructor(props) {
    super(props);

    this.state = {
      employee: {},
      employeeAgr: [],

      // Can be 'stubs' or 'charts' 
      filter: 'stubs',

      expandedPhoto: false
    }
  }

  componentDidMount() {
    const self = this;

    axios.get('/api/getEmployee', {
      params: {
        _id: this.props.match.params.id
      }
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        employee: response.data
      })

    })
    .catch(function (error) {
      console.log(error);
    });

    axios.get('/api/getEmployeeAgr', {
      params: {
        _id: this.props.match.params.id
      }
    })
    .then(function (response) {

      console.log(response);

      self.setState({
        employeeAgr: response.data
      })

    })
    .catch(function (error) {
      console.log(error);
    });

  }

  render(props) {

    let { employee } = this.state;

    return (

      Object.keys(employee).length > 0 && employee.constructor === Object ?
      <div className=''>

        <div className="employee-header mt-3">

         <div className="d-flex flex-column flex-grow-1">

            <div className="top d-flex flex-row">
              <div className="employee-header-image-and-socials">
    
                <div onClick={() => this.setState({expandedPhoto: true})} className="employee-image">
    
                  <div data-toggle="modal" data-target="#employeePhoto" className="employee-image-zoom">
    
                    <img src={`https://articles-website.s3.amazonaws.com/profile_photos/${employee._id}.jpg`} alt=""/>
    
                    <div className="employee-image-zoom-icon">
                      <i className="fas fa-search-plus"></i>
                    </div>
    
                  </div>
    
                </div>
    
              </div>
    
              <div className="employee-header-info">
    
                <div className='employee-name'>{employee.first_name + ' ' + employee.last_name}</div>
    
                <Link to={ROUTES.MESSAGES + '/?startMsg=5e90cc96579a17440c5d7d52'}><div className='employee-action-button btn'>+ MESSAGE</div></Link>
    
                <div className='employee-social'>
                  <SharedSocials socials={employee.employee.socials}/>
                </div>
                
              </div>
            </div>

            <div className="bio">
              <div className='employee-bio'>{employee.employee?.bio.replace('<age></age>', moment().from(employee.birth_date, 'years') )}</div>
            </div>

         </div>


          <div className='employee-header-traits'>
            <p className="employee-header-traits-title">Location</p>
            <p className="employee-header-traits-details">{employee.address.city + ', ' + employee.address.state}</p>
            <p className="employee-header-traits-title">Role</p>
            <p className="employee-header-traits-details">{employee.employee?.role.map((role) => <span className="badge badge-dark mr-1">{role}</span>) || 'NONE'}</p>
            <p className="employee-header-traits-title">Joined</p>
            <p className="employee-header-traits-details">{moment.unix(employee.sign_up_date).format('LL') || 'ERROR'}</p>
          </div>

        </div>

        <div className="employee-details">

          <div className="filters noselect">
            <div onClick={() => this.setState({filter: 'stubs'})} className={"filter " + ( this.state.filter === 'stubs' ? 'active' : '' ) }>Pay Stubs</div>
            <div onClick={() => this.setState({filter: 'charts'})} className={"filter " + ( this.state.filter === 'charts' ? 'active' : '' ) }>Data Charts</div>
          </div>

          <div className="details">
            {this.state.filter === 'stubs' ? 

            <div className="payrole-stubs">
              {this.state.employee.employee.payrole.stubs.map((stub) => {

                let isFirstOfMonth = false;

                return (
                  <div className="stub">

                    <div>
                      <div>Week of {moment(stub.date).format("LL")}</div>
                      <div className="bold">${(stub.amount / 100).toFixed(2)}</div>
                    </div>

                    <div className="btn btn-articles-light">
                      View
                    </div>

                  </div>
                )
              })}

              <div className="total text-center mt-2">Total ${(this.state.employeeAgr[0]?.total / 100).toFixed(2)}</div>
            </div>

            :
            <div className="">
              Data Charts will appear here once this feature is done.
            </div>
            }
          </div>

        </div>

        

      </div>

      :

      <div className="mt-3">
        This employee could not be found, please visit the <Link to={ROUTES.EMPLOYEES}><span style={{textDecoration: 'underline'}}>directory</span></Link>
      </div>
    )
  }
}

const SharedSocials= (props) => (
  <div>
    {props.socials?.instagram !== '' && props.socials?.instagram !== undefined ? <a href={props.socials?.instagram} target="_blank" rel="noopener noreferrer" ><i className="fab fa-instagram"></i></a> : ''}
    {props.socials?.facebook !== '' && props.socials?.facebook !== undefined ? <a href={props.socials?.facebook} target="_blank" rel="noopener noreferrer" ><i className="fab fa-facebook"></i></a> : ''}
    {props.socials?.github !== '' && props.socials?.github !== undefined ? <a href={props.socials?.github} target="_blank" rel="noopener noreferrer" ><i className="fab fa-github-square"></i></a> : ''}
  </div>
);

export default EmployeePageDetails;