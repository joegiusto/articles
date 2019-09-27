import React from 'react';
import * as outsetPhotos from './outsetPhotos';

const Tag = (props) => (
  <div className="col-4">
    <span className="tag-wrap">
      <span onClick={props.changeShirtSize} className={"tag" + (props.propsSize === props.size ? ' active' : '') + (props.isOther ? ' active' : '')}>
        {props.size}
      </span>
      <div className={"hole" + (props.propsSize === props.size ? ' active' : '') + (props.isOther ? ' active' : '')}></div>
    </span>
  </div>
)

const SmallTag = (props) => (
  <div className="col-3">
    <span className="small-tag-wrap">
      <span onClick={props.changeShirtSize} className={"tag" + (props.propsSize === props.size ? ' active' : '')}>
        {props.size}
      </span>
      <div className={"hole" + (props.propsSize === props.size ? ' active' : '')}></div>
    </span>
  </div>
)

const ShoeTag = (props) => (
  <div onClick={props.changeShoeSize} className={"shoe-size-item" + (props.propsSize === props.size ? ' active' : '')}>

    <div className="image" style={{width: props.shoeSize}}>
      <img width="100%" src={outsetPhotos.miniShoe} alt=""/>
    </div>

    <div className="size">{props.size}</div>

  </div>
)

const StepTwo = (props) => (
  <div>

    <div className="dual-header">
      <h2>Clothing Info</h2>
      <h5>Step 2/{props.totalSteps}</h5>
    </div>
    <hr/>

    <p>Articles makes a portion of its profits from clothing sales, our sales help keep ads minimal so we can continuue to operate.</p>

    <div className="shirt-section">
      <h5>Shirt Size:</h5>
  
      <div className="row pt-4">
        <Tag changeShirtSize={() => props.changeShirtSize('XS')} propsSize={props.shirtSize} size="XS"/>
        <Tag changeShirtSize={() => props.changeShirtSize('S')} propsSize={props.shirtSize} size="S"/>
        <Tag changeShirtSize={() => props.changeShirtSize('M')} propsSize={props.shirtSize} size="M"/>
        <Tag changeShirtSize={() => props.changeShirtSize('L')} propsSize={props.shirtSize} size="L"/>
        <Tag changeShirtSize={() => props.changeShirtSize('XL')} propsSize={props.shirtSize} size="XL"/>
        <Tag isOther={props.canShow} changeShirtSize={() => props.changeShirtSize('OTHER')} propsSize={props.shirtSize} size="OTHER"/>
      </div>
  
      <div className={"row extraShirt" + (props.canShow === true ? '' : ' d-none' )}>
        <SmallTag changeShirtSize={() => props.changeShirtSize('2XL')} propsSize={props.shirtSize} size="2XL"/>
        <SmallTag changeShirtSize={() => props.changeShirtSize('3XL')} propsSize={props.shirtSize} size="3XL"/>
        <SmallTag changeShirtSize={() => props.changeShirtSize('4XL')} propsSize={props.shirtSize} size="4XL"/>
        <SmallTag changeShirtSize={() => props.changeShirtSize('SKIP')} propsSize={props.shirtSize} size="SKIP"/>
      </div>
    </div>

    <h3 className="">Shoe Size:</h3>

    <div className="shoe-size-container">
      <ShoeTag changeShoeSize={() => props.changeShoeSize('9')} propsSize={props.shoeSize} shoeSize="50px" size="9"/>
      <ShoeTag changeShoeSize={() => props.changeShoeSize('10')} propsSize={props.shoeSize} shoeSize="60px" size="10"/>
      <ShoeTag changeShoeSize={() => props.changeShoeSize('11')} propsSize={props.shoeSize} shoeSize="70px" size="11"/>
      <ShoeTag changeShoeSize={() => props.changeShoeSize('12')} propsSize={props.shoeSize} shoeSize="80px" size="12"/>
      <ShoeTag changeShoeSize={() => props.changeShoeSize('13')} propsSize={props.shoeSize} shoeSize="90px" size="13"/>
    </div>

  </div>
)

export default StepTwo;