import React, {useState} from 'react';

import { connect } from 'react-redux';
import { addExpense } from '../../actions/expenses';
import moment from 'moment';

import * as ROUTES from '../../constants/routes';
import { Link } from 'react-router-dom';

const StoreItem = (props) => {

  const [slide, changeSlide] = useState(1);
  const [flipped, changeFlipped] = useState(false);
  const [size, changeSize] = useState('S');
  const [added, changeAdded] = useState(false);
  const [addedButtonDisabled, changeAddedButtonDisabled] = useState(false);

  const {color, sale} = props;

  if (added === true) {
    setTimeout(() => {
      changeAdded(false)
      changeAddedButtonDisabled(false)
    }, 2500);
  }

    return (
        <div className={"slick-slide d-inline-block " + (flipped ? 'flip' : '')}>
          <div className="menu-catalog-item">
              <div className={"menu-catalog-item-banner btn-outline-" + (color)}>
                  <span>{props.banner}</span>
              </div>
              {props.sale ? (<div className={"menu-catalog-item-sale px-4"}><span>${(props.price / 100).toFixed(2)}</span></div>) : (<span></span>)}
              <h5 className="mb-0 pb-1" >{props.title}</h5>
              {/* <!-- <div className="menu-catalog-item-photo"></div> --> */}
              <div className={"menu-catalog-item-photo-experimental-background backdrop-" + (color)}></div>
              <div className={"menu-catalog-item-photo-experimental floor-" + (color)}></div>

              <div className="menu-catalog-item-number">{slide}</div>

              <div className="menu-catalog-item-photo-gallery">
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 1 ? 'active' : '')} onMouseEnter={() => changeSlide(1)}>1</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 2 ? 'active' : '')} onMouseEnter={() => changeSlide(2)}>2</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 3 ? 'active' : '')} onMouseEnter={() => changeSlide(3)}>3</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 4 ? 'active' : '')} onMouseEnter={() => changeSlide(4)}>4</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 5 ? 'active' : '')} onMouseEnter={() => changeSlide(5)}>5</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 6 ? 'active' : '')} onMouseEnter={() => changeSlide(6)}>6</button>
              </div>

              <Link to={`${ROUTES.STORE}/view/${props.color}`} onClick={() => props.setPopOutVisible(true, props.product)}><button  className={"mt-1 w-100 btn btn-outline-" + (props.color === "articles" ? 'dark' : props.color)}>View</button></Link>

              <div className="dual-header">
                <select 
                  className={"mt-1 btn btn-outline-" + (props.color === "articles" ? 'dark' : props.color)}
                  onChange={(e) => {
                    if (e.target.value === 'S') {
                      changeSize('S');
                    } else if (e.target.value === 'M') {
                      changeSize('M')
                    } else if (e.target.value === 'L') {
                      changeSize('L')
                    }
                  }}
                >
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                </select>

                <button 
                  style={{flexGrow: '1'}} 
                  className={"m-0 mt-1 ml-1 btn btn-outline-" + (props.color === "articles" ? 'dark' : props.color)}
                  onClick={(expense) => {
                    changeAdded(true)
                    changeAddedButtonDisabled(true)
                    props.dispatch(addExpense({
                      description: props.title,
                      note: props.catalogId,
                      amount: props.price,
                      // amount: 3000,
                      size: size,
                      createdAt: moment().unix()
                    }));
                    // props.history.push('/');
                  }}
                  disabled={addedButtonDisabled}
                >
                  Add
                </button>

                <div className={"added-notification mt-1" + (added === false ? ' not-added btn-outline-' : ' added btn-outline-') + (props.color === "articles" ? 'dark ' : props.color)}>
                  <div className={"added-notification-background " + (added === false ? 'not-added' : ' added')}></div>
                  Added
                </div>

              </div>
              <div className="spacer"></div>
              <div className="footer"><p className="text-muted text-center subheading-font mb-0 pt-1" onClick={() => changeFlipped(!flipped)}>More details</p></div>
          </div>
          <div className="menu-catalog-item-back pt-3">
              <div className="hide-banner"></div>
              <div>
                <p>Material: Cotton</p>
                <p>Manufacture Cost: $21</p>
                <p className="mb-0">Sale Amount: $30</p>
              </div>
              <div className="spacer"></div>
              <div className="footer">
                <p className="text-muted text-center subheading-font mb-0 pt-1" onClick={() => changeFlipped(!flipped)}>Hide details</p>
              </div>
          </div>
        </div>
    )
  }

  export default connect()(StoreItem);
  // export default StoreItem;
// }
