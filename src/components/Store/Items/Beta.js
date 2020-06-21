import React, {useState} from 'react';

import { connect } from 'react-redux';
import { addExpense } from '../../../actions/expenses';
import moment from 'moment';

import * as ROUTES from '../../../constants/routes';
import { Link } from 'react-router-dom';

const StoreItem = (props) => {

  const [slide, changeSlide] = useState(1);
  const [flipped, changeFlipped] = useState(false);
  const [size, changeSize] = useState('S');
  const [added, changeAdded] = useState(false);
  const [addedButtonDisabled, changeAddedButtonDisabled] = useState(false);

  const {color, sale, product} = props;

  if (added === true) {
    setTimeout(() => {
      changeAdded(false)
      changeAddedButtonDisabled(false)
    }, 2500);
  }

    return (
        <div className={"store-item store-item-beta " + (flipped ? 'flip' : '')}>

          <div className="front menu-catalog-item">

              <div className={"type btn-outline-" + (color + ' ' + props.product?.type)}>
                  <span>{props.product?.type || '?'}</span>
              </div>

              <div className={"price"}>
                <span>${(props.product?.price / 100).toFixed(2)}</span>
              </div>

              <h5 className="title">{props.product?.title || <div>&nbsp;</div>}</h5>

              <div className="item-photos noselect">

                <div onClick={() => (slide !== 6 ? changeSlide(slide + 1) : changeSlide(1))} className="next">
                  <i className="fas fa-angle-double-right mr-0"></i>
                </div>

                {slide !== 1 ? 
                <div onClick={() => (slide !== 1 ? changeSlide(slide - 1) : changeSlide(6))} className="prev">
                  <i className="fas fa-angle-double-left mr-0"></i>
                </div>
                : 
                null}

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

              {/* <div className={"menu-catalog-item-photo-experimental-background backdrop-" + (color)}>

              </div> */}

              {/* <div className={"menu-catalog-item-photo-experimental floor-" + (color)}></div> */}

              {/* <div className="menu-catalog-item-number">{slide}</div> */}

              <div className="photo-gallery">
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
                    console.log(props.product.photos.one)
                    changeAdded(true)
                    changeAddedButtonDisabled(true)
                    props.dispatch(addExpense({
                      description: props.product.title,
                      note: props.product._id,
                      amount: props.product.price,
                      preview: props.product.photos.one,
                      size: size,
                      createdAt: moment()
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

          <div className="back menu-catalog-item-back pt-3">
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
