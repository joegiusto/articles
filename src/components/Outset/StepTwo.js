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

const NewShoeTag = (props) => (
  <div onClick={() => (props.changeShoeSize(props.size))} className={"size " + (props.shoeSize === (props.clothingCut === 'female' ? props.femaleSize : props.maleSize) ? 'active' : '')}>

    {props.clothingCut === 'female' ? props.femaleSize : ''}
    {props.clothingCut === 'male' ? props.maleSize : ''}
    {props.clothingCut === '' ? 'Please select a clothing cut first' : ''}

  </div>
)

const StepTwo = (props) => (
  
  <div className="outset-details-scroll">

    <div className="cut-section">
      <h5 className="intro-title" style={{fontSize: '1rem', lineHeight: '1rem'}}>Clothing Cut</h5>

      <div className="cut-container">

        <div className="sign-container">

           {/* Joey Giusto - I did question which should go first after putting Male here first and wondering why I did that. Alphabetical is the way for me */}

          <div onClick={() => (props.changeCut('female'))} className={"female-sign" + (props.clothingCut === 'female' ? ' active' : '') + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? '' : ' collapsed')}>
            <div className="text">Female</div>
            <div className="shape">
              <div className="icon"><i className="fas fa-female"></i></div>
            </div>
          </div>
  
          <div onClick={() => (props.changeCut('male'))} className={"male-sign" + (props.clothingCut === 'male' ? ' active' : '') + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? '' : ' collapsed')}>
            <div className="text">Male</div>
            <div className="shape">
              <div className="icon"><i className="fas fa-male"></i></div>
            </div>
          </div>
          
        </div>
  
        <div onClick={() => (props.changeCut('skip'))} className={"skip-sign" + (props.clothingCut === 'skip' ? ' active' : '') + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? '' : ' collapsed')}>
          <div className="text">Skip</div>
          <div className="shape">
            <div className="icon"><i className="far fa-arrow-alt-circle-right"></i></div>
          </div>
        </div>

      </div>

      <div className={"mt-3 oddball-explanation intro-message" + (props.clothingCut === '' ? '' : props.clothingCut === 'skip' ? '' : ' d-none')}>
        You can always change this later in your settings!
      </div>

    </div>

    <div className={"shirt-section" + (props.clothingCut === '' ? '' : props.clothingCut === 'other' ? '' : props.clothingCut === 'skip' ? ' d-none' : '')}>
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

    </div>

    <div className={"shoe-section mb-5" + (props.clothingCut === '' ? ' d-none' : props.clothingCut === 'other' ? ' d-none' : props.clothingCut === 'skip' ? ' d-none' : '')}>
      <h5 className="intro-title mt-4" style={{fontSize: '1rem', lineHeight: '1rem'}}>Shoe Size (US)</h5>

      <div className="sizes">
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={37.5} shoeSize={props.shoeSize} femaleSize={6.5} maleSize={5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={38} shoeSize={props.shoeSize} femaleSize={7} maleSize={5.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={38.5} shoeSize={props.shoeSize} femaleSize={7.5} maleSize={6}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={39.5} shoeSize={props.shoeSize} femaleSize={8} maleSize={6.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={40} shoeSize={props.shoeSize} femaleSize={8.5} maleSize={7}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={40.5} shoeSize={props.shoeSize} femaleSize={9} maleSize={7.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={41.5} shoeSize={props.shoeSize} femaleSize={9.5} maleSize={8}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={42} shoeSize={props.shoeSize} femaleSize={10} maleSize={8.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={42.5} shoeSize={props.shoeSize} femaleSize={10.5} maleSize={9}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={43} shoeSize={props.shoeSize} femaleSize={11} maleSize={9.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={44} shoeSize={props.shoeSize} femaleSize={11.5} maleSize={10}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={44.5} shoeSize={props.shoeSize} femaleSize={12} maleSize={10.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={45} shoeSize={props.shoeSize} femaleSize={12.5} maleSize={11}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={45.5} shoeSize={props.shoeSize} femaleSize={13} maleSize={11.5}/>
        <NewShoeTag clothingCut={props.clothingCut} changeShoeSize={props.changeShoeSize} mondoSize={46.5} shoeSize={props.shoeSize} femaleSize={13.5} maleSize={12}/>
      </div>

    </div>

  </div>
)

export default StepTwo;