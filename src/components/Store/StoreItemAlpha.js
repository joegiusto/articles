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
                  <span>{props.banner || '?'}</span>
              </div>
              {props.sale ? (<div className={"menu-catalog-item-sale px-4"}><span>${(props.price / 100).toFixed(2)}</span></div>) : (<span></span>)}

              <h5 className="mb-0 pb-1" >{props.title || <div>&nbsp;</div>}</h5>

              <div className="menu-catalog-item-photo">
                <img className={slide === 1 ? '' : 'd-none'} src={props.product?.photos?.one} alt=""/>
                <img className={slide === 2 ? '' : 'd-none'} src={props.product?.photos?.two} alt=""/>
                <img className={slide === 3 ? '' : 'd-none'} src={props.product?.photos?.three} alt=""/>
                <img className={slide === 4 ? '' : 'd-none'} src={props.product?.photos?.four} alt=""/>
                <img className={slide === 5 ? '' : 'd-none'} src={props.product?.photos?.five} alt=""/>
                <img className={slide === 6 ? '' : 'd-none'} src={props.product?.photos?.six} alt=""/>
                {/* <img src="https://cdn.articles.media/store/old_sheep_mockup_back.jpg" alt=""/> */}
                {/* <img src="https://cdn.articles.media/store/old_wolf_mockup_front.jpg" alt=""/> */}
                {/* <img src="https://cdn.articles.media/store/old_wolf_mockup_back.jpg" alt=""/> */}
              </div>

              <div className={"menu-catalog-item-photo-experimental-background backdrop-" + (color)}>
                {/* <img src="https://i.pinimg.com/originals/c3/88/85/c388856f7e8781ab2e33cd889305cecb.jpg" alt=""/> */}
              </div>

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
                <p>Material: {props.material}</p>
                <p>Manufacture Cost: ${(props.ourCost / 100).toFixed(2)}</p>
                <p className="mb-0">Sale Amount: ${(props.price / 100).toFixed(2)}</p>
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
