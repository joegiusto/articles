import React from 'react'
import moment from 'moment';

function OrderCard(props) {

const {order} = props;

  return (
    <div className="single-order card">
      <div className="card-body">

        <div className="preview">

        </div>

        <div className="details">

          <div className="item">
            <div className="title">Order Date:</div>
            <div className="detail">{moment.unix(order.order_date).format('LLL')}</div>
          </div>

          <div className="item">
            <div className="title">Order Product:</div>
            <div className="detail">{order.order_title}</div>
          </div>

          <div className="item">
            <div className="title">Order Date:</div>
            <div className="detail">{moment.unix(order.order_date).format('LLL')}</div>
          </div>

          <div className="item">
            <div className="title">Order Total:</div>
            <div className="detail">${(order.order_total / 100).toFixed(2)}</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderCard;