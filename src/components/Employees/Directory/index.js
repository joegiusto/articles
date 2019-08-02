import React, {Component} from 'react';
import moment from 'moment';
import Tilt from 'react-tilt';
import { Link } from "react-router-dom";
import { employeeList } from "../../../sample_data/sampleData";
// import Popper from 'popper.js'
import { Manager, Reference, Popper } from 'react-popper';

const EmployeePageDetails = ({match}) => (
  <div className='container-fluid container-custom'>

    <div className="d-none">{isLetter = filterItems(letters, match.params.id)}</div>
    {isLetter.length > 0 ? <IsLetterSearch match={match}/> : <IsIdSearch match={match}/>}

  </div>
);

var employeeNumber = "";
// var employee = {};
var letterBreadcrumb = "";
const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
// const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var isLetter = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '⛔'];

function filterItems(arr, query) {
  return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  })
}

function filterByValue(array, string) {
  // Filter all objects that match are returned in the function

  // TODO What needs to be changed here before we send the data to the User, this will be server side before we use it so do not worry about security.
  return array.filter( object => (object.redact === false ? true : (
                        object.nameLast = '⛔',
                        object.nameMiddle = '',
                        object.nameFirst = 'Anonymous',
                        object.bio = 'This employee chooses to stay anonymous. Records are still tracked that way other employees in the department can compare pay and for the public, so they can use this data how they want and ask questions. We respect the right for an employee to keep this information private and ask you respect this right as well.')
                        ) 
                      )
    .filter(obj =>
      Object
      
      // Get all keys that are a product of that. THIS HAPPENS FIRST, WE PASS THIS DOWN
      .keys(obj)

      // Now .some has access to these keys and will only return 
      
      //Get all keys that are filterd... explain this better when I am not tired, was a little tricky to figure out
      .some(element => obj['nameLast']
        // First letter is lowercase when returened to .some
        .toLowerCase()
        // First letter of that string
        .charAt(0)
        // Includes a string
        .includes(string)
      )

      );
};

// function filterByValueTeardown(array, string) {
//   return array.filter(o =>
//       Object
//       .keys(o)
//       .filter(key => 'nameLast')
//       // .some(k => o[k]
//       //   .toString()
//       //   .toLowerCase()
//       //   .charAt(0)
//       //   .includes(string.toLowerCase())
//       // )
//       );
// };

// const arrayOfObject = [{ name: 'Paul', country: 'Canada', }, { name: 'Lea', country: 'Italy', }, { name: 'John', country: 'Italy' }];

// console.log('Teardown');
// console.log(filterByValueTeardown(employeeList, 'V'));
// console.log('Teardown End');

const IsLetterSearch = ({match}) => (
  <div>
    <div className="d-none">{employeeNumber = employeeList.findIndex(x => x.nameLast.charAt(0) === match.params.id)}</div>
    {/* {alert(employeeNumber)} */}

    {/* {employeeList.findIndex(x => x.nameLast.charAt(0) === match.params.id).map((test) => {
      return <div>Number of people found {test} </div>;
    })} */}

    {console.log(filterByValue(employeeList, match.params.id)) /* [{name: 'Lea', country: 'Italy'}, {name: 'John', country: 'Italy'}] */}

    <div className="d-none">{letterBreadcrumb = match.params.id}</div>

    <div className="employee-directory">
      <Link className='employee-a' to='⛔'> <span className={letterBreadcrumb === '⛔' ? 'active' : ''}><i class="fas fa-eye-slash"></i></span></Link>
      {alphabet.map((letter) => {
        return <Link className="employee-a employee-letter" to={letter}><span className={letterBreadcrumb === letter ? 'active' : ''}>{letter}</span></Link>;
      })}
    </div>

    <div className="row mt-5">
      {filterByValue(employeeList, match.params.id).map((employee) => {
        // return <span>Test {employee.id}</span>
        return <div className="col-6">
          <Link className="employee-a" to={employee.id}> <Tilt options={{ max: "20", scale: '1.025' }} className="Tilt employee-directory-card"> <div className="bg-white p-5">
            <div>{employee.nameLast + (employee.nameFirst != 'Anonymous' ? ', ' + employee.nameFirst : ' Anonymous')}</div>
          </div> </Tilt> </Link>
        </div>
      })}
      {filterByValue(employeeList, match.params.id).length === 0 ? <h3 className="col-12 page-subtitle text-muted">No employees match that search.</h3> : ''}
    </div>

  </div>
);

// const EmployeeDirectory = ({match}) => (
//   <div className="col-6 w-100 bg-white shadow-sm p-5">
//     <Link to={employeeList[employeeNumber].id}><div>{employeeList[employeeNumber].nameLast + ', ' + employeeList[employeeNumber].nameFirst}</div></Link>
//   </div>
// );

const IsIdSearch = ({match}) => (
  <div>
    {filterByValue(employeeList)}
    <div className="d-none">{employeeNumber = employeeList.findIndex(x => x.id === match.params.id)}</div>
    <div className="d-none">{letterBreadcrumb = employeeList[employeeNumber].nameLast.charAt(0)}</div>

    <div className="employee-directory">
      <Link className='employee-a' to='⛔'> <span className={letterBreadcrumb === '⛔' ? 'active' : ''}><i class="fas fa-eye-slash"></i></span></Link>
      {alphabet.map((letter) => {
        return <Link className="employee-a" to={letter}><span className={letterBreadcrumb === letter ? 'active' : ''}>{letter}</span></Link>;
      })}
    </div>

    {employeeNumber >= 0 ? <Yes employeeNumber = {employeeNumber}/> : <No/>}
  </div>
);

// const weekBeforeOneStart = moment().subtract(1, 'weeks').startOf('isoWeek');
// const weekBeforeOneEnd = moment().subtract(1, 'weeks').endOfOf('isoWeek');

function weeksAgoStart(weeks) {
  return (
    moment().subtract(weeks, 'weeks').startOf('isoWeek').format('LL')
  )
  
};

function weeksAgoEnd(weeks) {
  return (
    moment().subtract(weeks, 'weeks').endOf('isoWeek').format('LL')
  )
};

function findWithAttr(array, attr, value) {
  for(var i = 0; i < array.length; i += 1) {
      if(array[i][attr] === value) {
          return i;
      }
  }
  return -1;
}

function getPay(year, startRange, endRange) {
  var stubIndex = [];
  var rows = [];

  // Get index of object with key value of year.
  var yearIndex = findWithAttr(employeeList[employeeNumber].payrole, 'year', year)
  console.log(yearIndex);

  if ( yearIndex !== -1 ) {
    
  } else {
    return (<div className="text-muted px-4 py-2">No stubs in {year} for this employee.</div>)
  };

  for(var i = startRange; i <= endRange; i++) {
    var stubi = findWithAttr(employeeList[employeeNumber].payrole[yearIndex].stubs, 'week', i)

    console.log(stubi);

    stubIndex.push(employeeList[employeeNumber].payrole[yearIndex].stubs[stubi])
    rows.push(employeeList[employeeNumber].payrole[yearIndex].stubs[stubi])
  }

  console.log(stubIndex);

 return (
 <>
   {/* <div className="text-muted">I am getting the pay for the year {year}, for the weeks {startRange} to {endRange}</div> */}
   {rows.map(stub => (
    <tr>
     <td>{moment().week(stub.week).format('LL') + ' - ' + moment().week(stub.week).endOf('week').format('LL')}</td>
     <td>{stub.data.type}</td>
     <td>{stub.data.rate}/h</td>
     <td>{stub.data.hours}</td>
     <td>${stub.data.total.toFixed(2)}</td>
    </tr>
   ))}
  </>
  )
}

const Yes = ({}) => (
  <div>

    <div className="employee-header mt-3">
      <div className="row px-5 pb-5">

        <div className="col-12 col-md-2 mt-3">
          <div className="employee-image">
            <div data-toggle="modal" data-target="#employeePhoto" className="employee-image-zoom">
              <div className="employee-image-zoom-icon">
                <i className="fas fa-search-plus"></i>
              </div>
            </div>
          </div>
          <div className='employee-social'>
            <SharedSocials/>
          </div>
        </div>

        <div className="col-12 col-md-7">
          <div className='employee-name'>{employeeList[employeeNumber].nameFirst + ' ' + employeeList[employeeNumber].nameMiddle +' ' + employeeList[employeeNumber].nameLast}</div>
          <div className='employee-action-button btn'>+ MESSAGE</div>
          <div className='employee-bio'>{employeeList[employeeNumber].bio}</div>
        </div>

        <div className="col-12 col-md-3 mt-3">
          <div className='employee-header-traits'>
            <p className="employee-header-traits-title">Location</p>
            <p className="employee-header-traits-details">{employeeList[employeeNumber].redact === false ? employeeList[employeeNumber].location.city + ', ' + employeeList[employeeNumber].location.state : 'United States'}</p>
            <p className="employee-header-traits-title">Role</p>
            <p className="employee-header-traits-details">{employeeList[employeeNumber].role}</p>
            <p className="employee-header-traits-title">Joined</p>
            <p className="employee-header-traits-details">{moment.unix(employeeList[employeeNumber].startDate).format('LL')}</p>
            {employeeList[employeeNumber].endDate.hasHappened ? <EndDate></EndDate> : ''}
          </div>
        </div>

      </div>

    </div>

    <div className="">
      <div className="row justify-content-between">

        <div className="col-7">
          <div className="row">
            <div className="col-3">
              <div class="input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text bg-dark text-white" htmlFor="inputGroupSelect01">Year</label>
                </div>
                <select class="custom-select" id="inputGroupSelect01">
                  <option>Choose...</option>
                  <option selected value="2019">2019</option>
                </select>
              </div>
            </div>
        
            <div className="col-4">
              <div class="input-group">
                <div class="input-group-prepend">
                  <label class="input-group-text bg-dark text-white" htmlFor="inputGroupSelect02">Month</label>
                </div>
                <select class="custom-select" id="inputGroupSelect02">
                  <option>Choose...</option>
                  <option selected value="07">July</option>
                  <option value="08">August</option>
                  <option disabled value="09">September</option>
                  <option disabled value="10">October</option>
                  <option disabled value="11">November</option>
                  <option disabled value="12">December</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="col-5 text-right">

          <ToggleableExample/>

        </div>

      </div>
    </div>

    <div className="bg-white employee-header py-0 shadow-sm border mt-3">
      {/* <h2 className="px-4 py-2 dual-header"><span>Pay Stub</span><span>Test</span></h2> */}
      <div class="table-responsive">
    <table class="table table-striped mb-0">
      <thead>
        <tr>
          <th>Date</th>
          <th>Type</th>
          <th>Pay Rate</th>
          <th>Hours Worked</th>
          <th>Total Amount</th>
        </tr>
      </thead>
      <tbody>

        {getPay(2019, 27, 30)}

      </tbody>
    </table>
    </div>
    </div>

    <div className="bg-white d-none shadow-sm border">
      <h2 className="px-2 py-2 dual-header"><span>Pay Stub</span><span>Test</span></h2>
      <div class="table-responsive">
          <table class="table table-striped mb-0">
            <thead>
              <tr>
                <th>Date</th>
                <th>Type</th>
                <th>Rate</th>
                <th>Header</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>{weeksAgoStart(1) + ' - ' + weeksAgoEnd(1)}</td>
                <td>Hourly<span className=''> | 70 Hours</span></td>
                <td>RPH - $20</td>
                <td>dolor</td>
                <td>$104.13</td>
              </tr>
              <tr>
                <td>{weeksAgoStart(2) + ' - ' + weeksAgoEnd(2)}</td>
                <td>Salary<span className=''></span></td>
                <td>RPW - $2300</td>
                <td>adipiscing</td>
                <td>elit</td>
              </tr>
              <tr>
                <td>{weeksAgoStart(3) + ' - ' + weeksAgoEnd(3)}</td>
                <td>Hourly<span className=''> | 30 Hours</span></td>
                <td>RPH - $20</td>
                <td>odio</td>
                <td>Praesent</td>
              </tr>
              <tr>
                <td>{weeksAgoStart(4) + ' - ' + weeksAgoEnd(4)}</td>
                <td>Hourly<span className=''> | 7 Hours</span></td>
                <td>RPH - $20</td>
                <td>odio</td>
                <td>Praesent</td>
              </tr>
              <tr>
                <td>{weeksAgoStart(5) + ' - ' + weeksAgoEnd(5)}</td>
                <td>Hourly<span className=''> | 28 Hours</span></td>
                <td>RPH - $20</td>
                <td>odio</td>
                <td>Praesent</td>
              </tr>
            </tbody>
          </table>
        </div>
    </div>
    
  </div>
);

class ToggleableExample extends Component {
  state = {
    isOpen: false,
  }

  handleClick = () => {
    this.setState(prevState => ({
      isOpen: !prevState.isOpen,
    }))
  }

  open = () => {
    this.setState(() => ({
      isOpen: true
    }))
  }

  close = () => {
    this.setState(() => ({
      isOpen: false
    }))
  }

  render() {
    return (
      <div>
        <Manager>
            <Reference>
              {({ ref }) => (
                <button className="btn btn-dark" type="button" onMouseOver={this.open} onMouseOut={this.close} ref={ref}>
                  View Graphs
                </button>
              )}
            </Reference>

            {this.state.isOpen ? (
              <Popper placement="auto">
              {({ ref, style, placement, arrowProps }) => (
                <div className="popper text-left" ref={ref} style={style} data-placement={placement}>
                  <div className="dual-header"><span>Graphs Coming Soon.</span><span><span className="text-muted">September 2019</span></span></div>
                  <br/>
                  <span className="text-muted">Visualize pay between total spending and department employee average.</span>
                  <br/>
                  
                  <div ref={arrowProps.ref} style={arrowProps.style} />
                </div>
              )}
              </Popper>
            ) : (
              <></>
            )}
            

          </Manager>
      </div>
    )
  }
}

const EndDate = ({}) => (
  <div>
    <p className="employee-header-traits-title">{employeeList[employeeNumber].endDate.reason}</p>
    <p className="employee-header-traits-details">{moment.unix(employeeList[employeeNumber].endDate.date).format('LL')}</p>
  </div>
);

const No = () => (
  <div className="mt-3">
    <h3>No record of this employee</h3>
    <p>We never delete employee data but if an employee chooses to stay anonymous we will redact thier name and any other identifying info from the record. You are most likly seeing this error because you have incorrecly typed in the employees pin, please refer to the pin and search again.</p>
  </div>
);

const AnonNote = () => (
  <p>AnonNote.</p>
);

const SharedSocials= () => (
  <div>
    {employeeList[employeeNumber].social.hasInstagram ? <i className="fab fa-instagram"></i> : ''}
    {employeeList[employeeNumber].social.hasFacebook ? <i className="fab fa-facebook"></i> : ''}
    {employeeList[employeeNumber].social.hasGithub ? <i className="fab fa-github-square"></i> : ''}
  </div>
);

export default EmployeePageDetails;