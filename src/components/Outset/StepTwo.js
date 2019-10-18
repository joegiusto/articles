import React from 'react';
import * as outsetPhotos from './outsetPhotos';

const Tag = (props) => (
  <div className="col-3">
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
    <span className="tag-wrap">
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
  
  <div style={{overflowY: 'scroll', height: '360px', paddingRight: '1rem'}}>

    <div className="cut-section">
      <h5 className="intro-title" style={{fontSize: '1rem', lineHeight: '1rem'}}>Clothing Cut</h5>

      <div onClick={() => (props.changeCut('male'))} className={"male-sign" + (props.clothingCut === 'male' ? ' active' : '') + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? '' : ' collapsed')}>
        <div className="text">Male</div>
        <div className="shape">
          <div className="icon"><i class="fas fa-male"></i></div>
        </div>
      </div>

      <div onClick={() => (props.changeCut('female'))} className={"female-sign" + (props.clothingCut === 'female' ? ' active' : '') + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? '' : ' collapsed')}>
        <div className="text">Female</div>
        <div className="shape">
          <div className="icon"><i class="fas fa-female"></i></div>
        </div>
      </div>

      <div onClick={() => (props.changeCut('skip'))} className={"skip-sign" + (props.clothingCut === 'skip' ? ' active' : '') + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? '' : ' collapsed')}>
        <div className="text">Skip</div>
        <div className="shape">
          <div className="icon"><i class="far fa-arrow-alt-circle-right"></i></div>
        </div>
      </div>

      <div className={"mt-1 oddball-explanation intro-message" + (props.clothingCut === '' ? '' : props.clothingCut === 'skip' ? '' : ' d-none')}>
        You can always change this later in your settings!
      </div>

    </div>

    <div className={"shirt-section" + (props.clothingCut === '' ? ' d-none' : props.clothingCut === 'other' ? ' d-none' : props.clothingCut === 'skip' ? ' d-none' : '')}>
      <h5 className="intro-title mt-4" style={{fontSize: '1rem', lineHeight: '1rem'}}>Shirt Size</h5>
  
      <div className="row pt-2">
        <Tag changeShirtSize={() => props.changeShirtSize('XS')} propsSize={props.shirtSize} size="XS"/>
        <Tag changeShirtSize={() => props.changeShirtSize('S')} propsSize={props.shirtSize} size="S"/>
        <Tag changeShirtSize={() => props.changeShirtSize('M')} propsSize={props.shirtSize} size="M"/>
        <Tag changeShirtSize={() => props.changeShirtSize('L')} propsSize={props.shirtSize} size="L"/>
        <Tag changeShirtSize={() => props.changeShirtSize('XL')} propsSize={props.shirtSize} size="XL"/>
        <Tag isOther={props.canShow} changeShirtSize={() => props.changeShirtSize('OTHER')} propsSize={props.shirtSize} size="OTHER"/>

        <div className={"extraShirt" + (props.canShow === true ? '' : ' d-none' )}>
          <SmallTag changeShirtSize={() => props.changeShirtSize('2XL')} propsSize={props.shirtSize} size="2XL"/>
          <SmallTag changeShirtSize={() => props.changeShirtSize('3XL')} propsSize={props.shirtSize} size="3XL"/>
          <SmallTag changeShirtSize={() => props.changeShirtSize('4XL')} propsSize={props.shirtSize} size="4XL"/>
          <SmallTag changeShirtSize={() => props.changeShirtSize('SKIP')} propsSize={props.shirtSize} size="SKIP"/>
        </div>

      </div>

    </div>

    <div className={"shoe-section" + (props.clothingCut === '' ? ' d-none' : props.clothingCut === 'other' ? ' d-none' : props.clothingCut === 'skip' ? ' d-none' : '')}>
      <h5 className="intro-title mt-4" style={{fontSize: '1rem', lineHeight: '1rem'}}>Shoe Size</h5>
  
      <div className={"shoe-size-container" + (props.clothingCut === 'male' ? '' : ' d-none')}>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('9')} propsSize={props.shoeSize} shoeSize="50px" size="9"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('10')} propsSize={props.shoeSize} shoeSize="60px" size="10"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('11')} propsSize={props.shoeSize} shoeSize="70px" size="11"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('12')} propsSize={props.shoeSize} shoeSize="80px" size="12"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('13')} propsSize={props.shoeSize} shoeSize="90px" size="13"/>
      </div>

      <div className={"shoe-size-container" + (props.clothingCut === 'female' ? '' : ' d-none')}>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('6')} propsSize={props.shoeSize} shoeSize="50px" size="6"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('7')} propsSize={props.shoeSize} shoeSize="60px" size="7"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('8')} propsSize={props.shoeSize} shoeSize="70px" size="8"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('9')} propsSize={props.shoeSize} shoeSize="80px" size="9"/>
        <ShoeTag changeShoeSize={() => props.changeShoeSize('10')} propsSize={props.shoeSize} shoeSize="90px" size="10"/>
      </div>

    </div>

  </div>
)

export default StepTwo;