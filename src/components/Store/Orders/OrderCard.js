import React from 'react'
import moment from 'moment';

function OrderCard(props) {

const {order} = props;

  return (
    <div className="card">
      <div className="card-body">

        <div className="details">

          <div className="item">
            <div className="left">Order Date:</div>
            <div className="right">{moment.unix(order.order_date).format('LLL')}</div>
          </div>

          <div className="item">
            <div className="left">Order Product:</div>
            <div className="right">{order.order_title}</div>
          </div>

          <div className="item">
            <div className="left">Order Date:</div>
            <div className="right">{moment.unix(order.order_date).format('LLL')}</div>
          </div>

          <div className="item">
            <div className="left">Order Total:</div>
            <div className="right">${(order.order_total / 100).toFixed(2)}</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderCard;