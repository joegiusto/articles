import React, {useState} from 'react';

import { connect } from 'react-redux';
import { addExpense } from '../actions/expenses';
import moment from 'moment';

const StoreItem = (props) => {

  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     currentSlide: 1,
  //     moreDetails: true
  //   };
  // }

  // goTo = ( slideNum ) => {
  //   this.setState(() => ({ currentSlide: slideNum }));
  // };

  // handleClick(e, num) {
  //   // console.log('this is:', this, num);
  //   this.setState(() => ({ currentSlide: num }));
  // };

  // render() {

  // Fuck all that, lets hope hooks can do everything 

    const [slide, changeSlide] = useState(1);
    const [flipped, changeFlipped] = useState(false);
    const [size, changeSize] = useState('S');
    const [added, changeAdded] = useState(false);
    const [addedButtonDisabled, changeAddedButtonDisabled] = useState(false);

    if (added === true) {
      setTimeout(() => {
        changeAdded(false)
        changeAddedButtonDisabled(false)
      }, 2500);
  }

    return (
        <div className={"slick-slide d-inline-block " + (flipped ? 'flip' : '')} style={{width: '200px'}}>
          <div className="menu-catalog-item">
              <div className={"menu-catalog-item-banner btn-outline-" + (props.color)}>
                  <span>{props.banner}</span>
              </div>
              <h5 className="mb-0 pb-1" >{props.title}</h5>
              {/* <!-- <div className="menu-catalog-item-photo"></div> --> */}
              <div className={"menu-catalog-item-photo-experimental-background backdrop-" + (props.color)}></div>
              <div className={"menu-catalog-item-photo-experimental floor-" + (props.color)}></div>

              <div className="menu-catalog-item-number">{slide}</div>

              <div className="menu-catalog-item-photo-gallery">
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 1 ? 'active' : '')} onClick={() => changeSlide(1)}>1</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 2 ? 'active' : '')} onClick={() => changeSlide(2)}>2</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 3 ? 'active' : '')} onClick={() => changeSlide(3)}>3</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 4 ? 'active' : '')} onClick={() => changeSlide(4)}>4</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 5 ? 'active' : '')} onClick={() => changeSlide(5)}>5</button>
                  <button className={"btn btn-" + (props.color) + ' ' + (slide === 6 ? 'active' : '')} onClick={() => changeSlide(6)}>6</button>
              </div>

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
// }
