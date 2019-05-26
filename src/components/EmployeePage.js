import React from 'react';
import moment from 'moment';
import Tilt from 'react-tilt';
import { Link } from "react-router-dom";
import { employeeList } from "./SampleData";

import database, { firebase } from '../firebase/firebase';

// database.ref('employees').set(
//   [ 
//     {
//       id: '1',
//       redact: false,
//       nameFirst: "Joey",
//       nameMiddle: "Vincent",
//       nameLast: "Giusto",
//       location: {
//         city: 'Fishkill',
//         state: 'NY'
//       },
//       bio: 'Thank you for exploring the site, if you have any feedback, suggestions or ideas feel free to message me above so we can make this platform better.',
//       role: "Administration",
//       startDate: 1554091200,
//       endDate: {
//         hasHappened: false,
//         reason: '',
//         date: 0
//       },
//       payrole: {
//         total: 203.45,
//         stubs: [
//           {
//             amount: 100
//           },
//           {
//             amount: 100
//           }
//         ]
  
//       },
//       social: {
//         hasInstagram: true,
//         hasFacebook: true,
//         hasGithub: true
//       }
  
//     },
//     {
//       id: '2',
//       redact: false,
//       nameFirst: "John",
//       nameMiddle: "",
//       nameLast: "Doe",
//       location: {
//         city: 'Wappingers',
//         state: 'NY'
//       },
//       bio: "I don't exist but if I did this is where I would say something!",
  
//       role: "Example Employee",
//       startDate: 1554091200,
//       endDate: {
//         hasHappened: false,
//         reason: '',
//         date: 0
//       },
  
//       payrole: {
//         total: 203.45,
//         stubs: [
//           {
//             amount: 100
//           },
//           {
//             amount: 100
//           }
//         ]
  
//       },
//       social: {
//         hasInstagram: false,
//         hasFacebook: true,
//         hasGithub: false
//       }
  
//     },
//     {
//       id: '3',
//       redact: true,
//       nameFirst: "First Name",
//       nameMiddle: "Name",
//       nameLast: "A - This is an anonymous profile but becaue we are searching the {employeeList.findIndex(x => x.nameLast.charAt(0) === match.params.id} we are pulling the first char at nameLast with no regard to the employee object key redact:true so this needs to be fixed",
//       location: {
//         city: "Shouldn't",
//         state: 'Matter'
//       },
//       bio: 'This is an example of an employee who chooses to stay anonymous. Records are still tracked that way other employees and the public can use this data how they want and ask questions but we respect the right for an employee to keep this information private.',
  
//       role: "Consultant",
//       startDate: 1554091200,
//       endDate: {
//         hasHappened: false,
//         reason: '',
//         date: 0
//       },
  
//       payrole: {
//         total: 203.45,
//         stubs: [
//           {
//             amount: 100
//           },
//           {
//             amount: 100
//           }
//         ]
  
//       },
//       social: {
//         hasInstagram: false,
//         hasFacebook: false,
//         hasGithub: false
//       }
  
//     },
//     {
//       id: '4',
//       redact: false,
//       nameFirst: "Stacey",
//       nameMiddle: "",
//       nameLast: "Doe",
//       location: {
//         city: 'Example',
//         state: 'NY'
//       },
//       bio: "Testing the directory to see if it works for multiple people whose last name start with same letter",
  
//       role: "Example",
//       startDate: 1554091200,
//       endDate: {
//         hasHappened: false,
//         reason: '',
//         date: 0
//       },
  
//       payrole: {
//         total: 203.45,
//         stubs: [
//           {
//             amount: 100
//           },
//           {
//             amount: 100
//           }
//         ]
  
//       },
//       social: {
//         hasInstagram: false,
//         hasFacebook: false,
//         hasGithub: false
//       }
  
//     }
//   ]

// ).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This failed.', e);
// });

// let employeeList = [];

// database.ref('employees')
//   .once('value')
//   .then((snapshot) => {
//     const val = snapshot.val();
//     employeeList = val;
//   })
//   .catch((e) => {
//     console.log('Error fetching data', e);
//   });

// database.ref('employees').set({
//   citizens: {
//     one: {

//       name: 'Joey Giusto',
//       age: 894340800,
//       admin: true,
//       location: {
//         city: 'Philadelphia',
//         country: 'United States'
//       },
//       orders: ['0001','0002','0003','0004'],

//       isEmployee: true,
//       job: {
//         title: 'Software developer',
//         company: 'Google'
//       },
//       payroll: {
//         visibile: true,
//         department: 'Software developer'
//       },

//     }
//   },
//   orders: ['0001','0002','0003','0004'],
//   stories: [ 
//     {
//       date:1,
//       title: 'Test 1'
//     },
//     {
//       date:1,
//       title: 'Test 2'
//     },
//     {
//       date:1,
//       title: 'Test 3'
//     },
//     {
//       date:1,
//       title: 'Test 4'
//     } 
//   ]

// }).then(() => {
//   console.log('Data is saved!');
// }).catch((e) => {
//   console.log('This failed.', e);
// });

var employeeNumber = "";
// var employee = {};
var letterBreadcrumb = "";
const alphabet = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ'.split('');
// const alphabet = 'abcdefghijklmnopqrstuvwxyz'.split('');
var isLetter = '';
var letters = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', '⛔'];

function filterItems(arr, query) {
  return arr.filter(function(el) {
      return el.toLowerCase().indexOf(query.toLowerCase()) !== -1;
  })
}

const EmployeePage = ({match}) => (
  <div className='container-fluid'>

    <div className="d-none">{isLetter = filterItems(letters, match.params.id)}</div>
    {isLetter.length > 0 ? <IsLetterSearch match={match}/> : <IsIdSearch match={match}/>}


  </div>
);

function filterByValue(array, string) {
  // Filter all objects that match are returned in the function
  return array.filter(o =>
      Object
      // Get all keys that are a product of that
      .keys(o)
      // Get all keys that are filterd... explain this better when I am not tired, was a little tricky to figure out
      .some(k => o['nameLast']
        .toString()
        .toLowerCase()
        .charAt(0)
        .includes(string.toLowerCase())
      ));
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
        return <Link className="employee-a" to={letter}><span className={letterBreadcrumb === letter ? 'active' : ''}>{letter}</span></Link>;
      })}
    </div>

    <div className="row mt-5">
      {filterByValue(employeeList, match.params.id).map((employee) => {
        // return <span>Test {employee.id}</span>
        return <div className="col-6">
          <Link className="employee-a" to={employee.id}> <Tilt options={{ max: "20", scale: '1.025' }} className="Tilt"> <div className="bg-white shadow-sm p-5">
            <div>{employee.nameLast + ', ' + employee.nameFirst}</div>
          </div> </Tilt> </Link>
        </div>
      })}
      {filterByValue(employeeList, match.params.id).length === 0 ? <div className="col-12 page-subtitle">No current employees found that match that search</div> : ''}
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
          <div className='employee-name'>{employeeList[employeeNumber].redact === false ? <div>{employeeList[employeeNumber].nameFirst + ' ' + employeeList[employeeNumber].nameMiddle +' ' + employeeList[employeeNumber].nameLast}</div> : <div>Anonymous</div>}</div>
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

    <div className="bg-white shadow-sm border">
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

export default EmployeePage;