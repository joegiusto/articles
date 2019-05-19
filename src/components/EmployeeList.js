import React, { useState, useEffect } from 'react';
import database, { firebase } from '../firebase/firebase';
import { Link } from "react-router-dom";

// let employeeList = [];

// function Listofall(props) {
//   const [employeeList, setEmployeeList] = useState(false);

//   useEffect(() => {
//     database.ref('employees')
//     .once('value')
//     .then((snapshot) => {
//       const val = snapshot.val();
//       // console.log(val);
//       setEmployeeList(val);
//     })
//     .catch((e) => {
//       console.log('Error fetching data', e);
//     }); 
//   });

//   return ( 
//     <div>
//       {console.log(Object.keys(employeeList))}
//     </div> 
//   )
// }

function List() {

  var [list, setList] = useState([]);
  const [count, setCount] = useState(0);

    list.push ({nameFirst: 'test', nameLast: 'yes'})

    // if (count < 2) {

    database.ref('employees').once('value').then((snapshot) => {
  
    snapshot.forEach((childSnapshot) => {

      // setList( [ ...list, {...childSnapshot.val() } ] );

      // console.log(list);

      list.push ({
        name: 'hi'
      });

    });
  
    list.map((employee) => {
      console.log(employee.nameFirst + ' ' + employee.nameLast);
      // console.log(employee.bio);
    });
  
  });

  useEffect(() => {
    console.log(list.length)
    // document.title = `You clicked ${count} times`;
  });

  // setCount(3);

  // }
  
  return (
  <div className='container text-center'>
    <div className="mb-2">

      List Here

      {console.log(list.length)}
      {console.log(list)}

      {list.map((employee) => {
        return <Link className="d-block" to={'employees/' + employee.id}>{employee.nameFirst + ' ' + employee.nameLast}</Link>;
      })}

      {count}

      <br/>

      End Here

    </div>
  </div>
  );
}



const EmployeePage = ({match}) => (
  <div className='container'>
    <h3>Employee Directory</h3>

    <List/>

  </div>
);

export default EmployeePage;