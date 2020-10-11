import React from 'react'
import moment from 'moment';

function OrderCard(props) {

const {order} = props;

  return (
    <div className="single-order card">
      <div className="card-body">

        <div className="date">
          {moment(order.date).format('LLL')}
        </div>

        <div className="status">
          {order.status}
        </div>

        <div className="preview">

          <img className={"" + (order.items[0] === 0 ? 'main' : 'sub')} src={order.items[0].preview}/>

          <div className="extras">
            {order.items.map((item, i) => 
              i < 3 ? <img src={item.preview}/> : ''
            )}
            {order.items.length > 3 ? <div className="item others my-auto badge badge-light border border-dark ml-2">+{order.items.length - 3}</div> : ''}
          </div> 

        </div>

        <div className="details">

          <div className="items mt-2">

            <div className="title">Products ({order.items.length})</div>

            <div className="detail">
              {order.items.map((item, i) => (
                i < 3 ? <div className="item">{item.description}</div> : ''
              ))}
              {order.items.length > 3 ? <div className="item others">+{order.items.length - 3} Other Item{order.items.length - 3 > 1 ? 's' : ''}</div> : ''}
            </div>
            
          </div>

          <div className="item mt-2">
            <div className="title">Order Total:</div>
            <div className="detail">${(order.payment.total / 100).toFixed(2)}</div>
          </div>

          <button className="btn btn-articles-light">View</button>

        </div>

      </div>
    </div>
  )
}

export default OrderCard;