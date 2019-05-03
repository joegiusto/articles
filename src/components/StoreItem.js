import React from 'react';

export default class StoreItem extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      currentSlide: 1
    };
  }

  goTo = ( slideNum ) => {
    this.setState(() => ({ currentSlide: slideNum }));
  };

  handleClick(e, num) {
    // console.log('this is:', this, num);
    this.setState(() => ({ currentSlide: num }));
  };

  render() {
    return (
        <div className="slick-slide d-inline-block" style={{width: '200px'}}>
          <div className="menu-catalog-item">
              <div className="menu-catalog-item-banner btn-outline-dark">
                  <span>Original</span>
              </div>
              <h5 className="mb-0 pb-1" >{this.props.title}</h5>
              {/* <!-- <div className="menu-catalog-item-photo"></div> --> */}
              <div className="menu-catalog-item-photo-experimental-background backdrop-articles"></div>
              <div className="menu-catalog-item-photo-experimental floor-articles"></div>

              <div className="menu-catalog-item-number">{this.state.currentSlide}</div>

              <div className="menu-catalog-item-photo-gallery">
                  <button className={"btn btn-articles " + (this.state.currentSlide === 1 ? 'active' : '')} onClick={(e) => this.handleClick(e, 1)}>1</button>
                  <button className={"btn btn-articles " + (this.state.currentSlide === 2 ? 'active' : '')} onClick={(e) => this.handleClick(e, 2)}>2</button>
                  <button className={"btn btn-articles " + (this.state.currentSlide === 3 ? 'active' : '')} onClick={(e) => this.handleClick(e, 3)}>3</button>
                  <button className={"btn btn-articles " + (this.state.currentSlide === 4 ? 'active' : '')} onClick={(e) => this.handleClick(e, 4)}>4</button>
                  <button className={"btn btn-articles " + (this.state.currentSlide === 5 ? 'active' : '')} onClick={(e) => this.handleClick(e, 5)}>5</button>
                  <button className={"btn btn-articles " + (this.state.currentSlide === 6 ? 'active' : '')} onClick={(e) => this.handleClick(e, 6)}>6</button>
              </div>

              {/* <button className="btn btn-outline-dark">View</button>
              <button className="btn btn-outline-dark">+</button> */}

              <div className="dual-header">
                <select className="btn btn-outline-dark mt-1">
                  <option value="S">S</option>
                  <option value="M">M</option>
                  <option value="L">L</option>
                  {/* <option value="L">{this.props.color}</option> */}
                </select>
                <button style={{flexGrow: '1'}} className="btn btn-outline-dark m-0 mt-1 ml-1">Buy</button>
              </div>
              <p className="text-muted text-center subheading-font mb-0 pt-1">More details</p>
          </div>
        </div>
    )
  }
}
