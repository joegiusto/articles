import React from 'react';
import * as outsetPhotos from './outsetPhotos';

const Tag = (props) => (
  <div className="col-3">
    <span className="tag-wrap">
      <span onClick={props.changeShirtSize} className={"tag" + (props.propsSize === props.size ? ' active' : '') + (props.isOther ? ' active' : '')}>
        <div className="size">{props.size}</div>
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

const ClothingTag = (props) => (
  <div onClick={() => (props.changeShirtSize(props.size))} className={"clothing-tag-wrap" + (props.isInput ? ' input-tag' : '') + (props.canShow ? ' ' : props.isMore ? ' d-none' : '')}>
    <div className="clothing-tag">
      <div className={"hole" + (props.stateSize === props.size ? ' active' : '')}></div>
      <div className="size">{props.size}</div>
      {props.isInput ? <input></input> : ''}

      {/* <span onClick={props.changeShirtSize} className={"tag" + (props.propsSize === props.size ? ' active' : '')}>
        {props.size}
      </span> */}
      
      {/* <div className={"hole" + (props.propsSize === props.size ? ' active' : '')}></div> */}

    </div>
  </div>
)

const ShoeTag = (props) => (
  <div onClick={() => (props.changeShoeSize(props.size))} className={"shoe-size-item" + (props.propsSize === props.size ? ' active' : '') + (props.show ? '' : ' d-none')}>

    <div className="image" style={{width: '100%'}}>
      <img width="100%" style={{width: props.shoeSize}} src={outsetPhotos.miniShoe} alt=""/>
    </div>

    <div className="size">{ props.size === 'OTHER' ? props.size : props.size.replace(/[M-|F-]/g,'') }</div>

  </div>
)

const StepTwo = (props) => (
  
  <div className="outset-details-scroll">

    <div className="cut-section">
      <h5 className="intro-title" style={{fontSize: '1rem', lineHeight: '1rem'}}>Clothing Cut</h5>

      <div className="cut-container">
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
      </div>

      <div className={"mt-1 oddball-explanation intro-message" + (props.clothingCut === '' ? '' : props.clothingCut === 'skip' ? '' : ' d-none')}>
        You can always change this later in your settings!
      </div>

    </div>

    <div className={"shirt-section" + (props.clothingCut === '' ? ' d-none' : props.clothingCut === 'other' ? ' d-none' : props.clothingCut === 'skip' ? ' d-none' : '')}>
      <h5 className="intro-title mt-4" style={{fontSize: '1rem', lineHeight: '1rem'}}>Shirt Size</h5>
      
      <div className="clothing-tag-container">
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"XS"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"S"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"M"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"L"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"XL"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"2XL"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"3XL"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"MORE"}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"4XL"} isMore={true} canShow={props.canShow}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"SKIP"} isMore={true} canShow={props.canShow}></ClothingTag>
        <ClothingTag changeShirtSize={props.changeShirtSize} stateSize={props.shirtSize} size={"OTHER"} isMore={true} canShow={props.canShow} isInput={true}></ClothingTag>
      </div>
  
      <div className="row pt-2 d-none">
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

    <div className={"shoe-section mb-5" + (props.clothingCut === '' ? ' d-none' : props.clothingCut === 'other' ? ' d-none' : props.clothingCut === 'skip' ? ' d-none' : '')}>
      <h5 className="intro-title mt-4" style={{fontSize: '1rem', lineHeight: '1rem'}}>Shoe Size (US)</h5>
  
      <div className={"shoe-size-container" + (props.clothingCut === 'male' ? '' : props.clothingCut === 'female' ? '' : ' d-none')}>
        <ShoeTag show={props.clothingCut === "male" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="50px" size="M-9"/>
        <ShoeTag show={props.clothingCut === "male" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="60px" size="M-10"/>
        <ShoeTag show={props.clothingCut === "male" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="70px" size="M-11"/>
        <ShoeTag show={props.clothingCut === "male" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="80px" size="M-12"/>
        <ShoeTag show={props.clothingCut === "male" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="90px" size="M-13"/>
        <ShoeTag show={props.clothingCut === "female" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="50px" size="F-6"/>
        <ShoeTag show={props.clothingCut === "female" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="60px" size="F-7"/>
        <ShoeTag show={props.clothingCut === "female" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="70px" size="F-8"/>
        <ShoeTag show={props.clothingCut === "female" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="80px" size="F-9"/>
        <ShoeTag show={props.clothingCut === "female" ? true : false} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="90px" size="F-10"/>

        <ShoeTag show={true} gender={"both"} changeShoeSize={props.changeShoeSize} propsSize={props.shoeSize} shoeSize="90px" size="OTHER"/>
      </div>

      <div className={"shoe-size-container" + (props.clothingCut === 'female' ? '' : ' d-none')}>
        
      </div>

    </div>

  </div>
)

export default StepTwo;