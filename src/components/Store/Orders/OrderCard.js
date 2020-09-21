import React from 'react'
import moment from 'moment';

function OrderCard(props) {

const {order} = props;

  return (
    <div className="single-order card">
      <div className="card-body">

        <div className="preview">
          {order.items.map(item => 
            <img src={item.preview}/>
          )}
        </div>

        <div className="details">

          <div className="item">
            <div className="title">Date:</div>
            <div className="detail">{moment(order.date).format('LLL')}</div>
          </div>

          <div className="item mt-2">
            <div className="title">Products ({order.items.length})</div>
            <div className="detail">
              {order.items.map(item => 
                <div>{item.description}</div>
              )}
            </div>
          </div>

          <div className="item">
            <div className="title">Order Total:</div>
            <div className="detail">${(order.payment.total / 100).toFixed(2)}</div>
          </div>

        </div>

      </div>
    </div>
  )
}

export default OrderCard;