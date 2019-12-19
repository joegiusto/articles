import React from 'react';
import { connect } from 'react-redux';
import { removeExpense } from '../../../actions/expenses';
import moment from 'moment';

// import { Link } from 'react-router-dom';
// import moment from 'moment';

const letterToSize = {
 S: 'Small',
 M: 'Medium',
 L: 'Large',
};

const ExpenseListItem = (props) => {
  return (
    <li className="list-group-item d-flex justify-content-between lh-condensed" onClick={(expense) => {

      props.dispatch(removeExpense({
        id: props.id
      }));
      // props.history.push('/');
    }} >
      <div>
        <h6 className="my-0">{props.description}</h6>
        <small className="text-muted">{letterToSize[props.size]}</small>
      </div>
      <span className="text-muted">${props.amount / 100}</span>
    </li>
  )
}

// const ExpenseListItem = ({ id, description, size, amount, createdAt, props }) => (

//     <li className="list-group-item d-flex justify-content-between lh-condensed" onClick={(expense) => {

//       props.dispatch(removeExpense({
//         id: id
//       }));
//       // props.history.push('/');
//     }} >
//       <div>
//         <h6 className="my-0">{description}</h6>
//         <small className="text-muted">{letterToSize[size]}</small>
//       </div>
//       <span className="text-muted">${amount / 100}</span>
//     </li>

// );

// export default ExpenseListItem;
export default connect()(ExpenseListItem);