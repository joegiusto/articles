import React from 'react';
import { Link } from 'react-router-dom';
import moment from 'moment';

const letterToSize = {
 S: 'Small',
 M: 'Medium',
 L: 'Large',
};

const ExpenseListItem = ({ id, description, size, amount, createdAt }) => (

    <li className="list-group-item d-flex justify-content-between lh-condensed">
      <div>
        <h6 className="my-0">{description}</h6>
        <small className="text-muted">{letterToSize[size]}</small>
      </div>
      <span className="text-muted">${amount / 100}</span>
    </li>

);

export default ExpenseListItem;