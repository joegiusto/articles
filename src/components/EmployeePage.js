import React from 'react';

const employeeList = [
  {
    id: '1',
    redact: false,
    nameFirst: "Joey",
    nameLast: "Giusto",
    total: 203.45,
    department: "Admin",
    startDate: "04/2019",
    endDate: ""
  },
  {
    id: '2',
    redact: false,
    nameFirst: "John",
    nameLast: "Doe",
    total: 75.00,
    department: "IT",
    startDate: "04/2019",
    endDate: ""
  },
  {
    id: '3',
    redact: true,
    nameFirst: "Redacted",
    nameLast: "Example",
    total: 300.10,
    department: "Finance",
    startDate: "04/2019",
    endDate: ""
  }
];

var employeeNumber = "";
var employee = {};

// alert(list[1].date);
console.log(employeeList);

const EmployeePage = ({match}) => (
  <div className='container'>
    <h3>Looking up ID: {match.params.id}</h3>
    
    <span>Array Placement </span>
    {employeeNumber = employeeList.findIndex(x => x.id === match.params.id)}

    <br/>

    {employeeNumber > 0 ? "Employee Found" : "No Employee Found"}
    {employeeNumber >= 0 ? <Yes employeeNumber = {employeeNumber}/> : <No/>}

    {console.log(employeeList[employeeNumber])}

  </div>
);

const Yes = ({employeeNumber, employee}) => (
  <div className="mt-3">
    <h3>Yes</h3>
    {employeeList[employeeNumber].redact === false ? <h1>{employeeList[employeeNumber].nameFirst +' '+ employeeList[employeeNumber].nameLast}</h1> : <div><h1>Employee chooses to stay anonymous</h1><AnonNote/></div>}

    <p>Total Earned: ${employeeList[employeeNumber].total}</p>
    <p>Department: {employeeList[employeeNumber].department}</p>
    <p>Involvement: {employeeList[employeeNumber].startDate + ' - ' + employeeList[employeeNumber].endDate}</p>
    
  </div>
);

const No = () => (
  <div className="mt-3">
    <h3>No record of this employee</h3>
    <p>We never delete employee data but if an employee chooses to stay anonymous we will redact thier name and any other identifying info from the record. You are most likly seeing this error because you have incorrecly typed in the employees pin, please refer to the pin and search again.</p>
  </div>
);

const AnonNote = () => (
  <p>Employees may choose to hide thier name for privacy reasons, while we do not encourage this we beileve it is everyones right to keep that info private. We still track this info as a way to remain open with the public and share just how much we are paying people in thier respective departments and time worked here.</p>
);

export default EmployeePage;