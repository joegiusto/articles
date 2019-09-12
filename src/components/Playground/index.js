// import React from 'react';

// const Page = () => (
//   <div style={{height: '100vh', marginTop: '-50px'}} className="container">
//     <div class="row h-100 justify-content-center">
//     <div class="col-sm-6 my-auto">
//       <div class="card card-block p-5">
//         <h1>Party</h1>
//         <p>Fill out a description.</p>
//       </div>
//     </div>
//   </div>
//   </div>
// );

import React from 'react';
import Modal from 'react-modal';

const modalContent = [
  {
    // 0
    message: "Hello!"
  },
  {
    // 1
    message: "All Originals in our store now 15% Off!"
  },
  {
    // 2
    message: "Example content of what would show up when a big story is developing. This component still needs to be styled and worked on. Putting this here for presentation/functionality purposes though."
  },
  {
    // 3
    message: "Hello!"
  },
  {
    // 4
    message: "Hello!"
  }
]

const Component = () => (
  <div>

    {<Outset/>}

    {/* <div>Modal testing grounds for now.</div>
    <ReactModal message="15% Sale" getContent="1"/>
    <ReactModal message="Mueller Report Highlights" getContent="2"/>
    <ReactModal message="Flint Water Cleanup" getContent="3"/>
    <ReactModal message="Gun Laws" getContent="4"/>
    <div>Email testing grounds for now</div> */}
  </div>
)

class Outset extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      step: 0,
      totalSteps: 5,
      triedToSubmit: false,
      size: 'Testing',
      focus: '',

      // Step One States
      nameFirst: '',
      nameLast: '',
      state: '',

      // Step Two States
      size: '',

      // Step Three States
      subscribitions: [],

      // Step Four States
      partyAffiliation: '',

      // Step Five States


    };

    this.changeFocus = this.changeFocus.bind(this);

  }

  onChange = event => {
    console.log(event);
    // console.log(event.target.value)
    this.setState({ [event.target.name]: event.target.value });
  };

  changeSize = size => {
    this.setState({ size: size });
  };

  changeParty = party => {
    this.setState({ partyAffiliation: party });
  };

  increment() {
    this.setState({step: this.state.step + 1 })
  }

  decrement() {
    this.setState({step: this.state.step - 1 })
  }

  changeFirst(newValue) {
    this.setState({
      nameFirst: newValue,
    });
  }

  log(string) {
    console.log(string);
  }

  changeFocus(focus) {
    this.setState({
      focus: focus,
    });
  }

  outputReason(focus) {
    switch(focus) {
      case 'firstName':
        return "We use this information to address you across the site and in emails"
      case 'lastName':
        return "Again, we use this information to address you across the site and in emails. This one is optional by the way, only boxes with red are required but the more you fill out the better we can talior an experence to you."
      case 'age':
        return "Using your age we can reccomend popular topics amongst others your age and get an idea of our user base."
      case 'zip':
        return "Like age, we use this to reccomend popular stories in your area and so we know more about our users."
      default:
        return "We will display relavent information here"
    }
  }

  renderStep(step) {
    switch(step) {
      case 0: 
        // Start screen, maybe a slideshow going on in background.
        return null;
        break;
      case 1: 
        // General Information
        return <StepOne changeFocus={this.changeFocus}/>
        break;
      case 2:
        // Clothing Information
        return <StepTwo log={this.log} size={this.state.size} changeSize={this.changeSize} action={this.onChange}/>
        break;
      case 3:
        // News Information
        return <StepThree/>
        break;
      case 4:
        // Party Information
        return <StepFour party={this.state.partyAffiliation} changeParty={this.changeParty}/>
        break;
      case 5:
        // Privacy Information
        return <StepFive/>
        break;
      default:
        return 'Error detected, we have automaticlly captured the problem and will check on this soon. Please come back later.'
    }
  }

  render() {
    return (
    <div className="outset-wrapper">
      <div className="container-custom mx-auto h-100">

        <div className="outset-map">

          <div className="map">
            Debug Info (Ignore) &#8628;
          </div>

          <div className="debug">
            <div className="dual-header">
              <span>Step {this.state.step}/{this.state.totalSteps}</span>
              <span className="ml-5"> User: {'EWHLHSvY4OROIHdzsZWKPqwpI322' + '-1'}</span>
            </div>
          </div>

        </div>


        <div className="row row-fullpage justify-content-center">
          <div className="col-12 col-md-6">
            <div className="welcome-col">
              <h1>Welcome to Articles!</h1>
              <h5>Before you start, we ask you answer some quick questions.</h5>

              <h5 className="focus-explanation">{this.outputReason(this.state.focus)}</h5>


              <button className={"btn btn-lg btn-custom-white mt-5" + (this.state.step === 0 ? '' : ' d-none')} onClick={() => (this.increment())}>Start</button>
              
              <button className={"btn btn-lg btn-custom-white mt-5" + (this.state.step > 0 ? '' : ' d-none')} disabled={this.state.step === 1} onClick={() => (this.decrement())}> <span>&#8612;</span> </button>
              <button className={"btn btn-lg btn-custom-white mt-5" + (this.state.step > 0 ? '' : ' d-none')} disabled={this.state.step === this.state.totalSteps} onClick={() => (this.increment())}> <span>&#8614;</span> </button>

            </div>
          </div>

          <div className="col-6">

            {this.renderStep(this.state.step)}

          </div>

        </div>
      </div>
    </div>)
  }
}

const StepOne = (props) => (
  <>
    <h1>General Information</h1>

    <div className="outset-form-group">
      <div className="name">First Name:</div>
      <input type="text" onFocus={() => (props.changeFocus("firstName"))} placeholder=""/>
    </div>

    <div className="outset-form-group">
      <div className="name">Last Name:</div>
      <input type="text" onFocus={() => (props.changeFocus("lastName"))} placeholder=""/>
    </div>

    <div className="row">

      <div className="col-3">
        <div className="outset-form-group">
          <div className="name">Age:</div>
          <input type="number" onFocus={() => (props.changeFocus("age"))} placeholder=""/>
        </div>
      </div>

      <div className="col-5">
        <div className="outset-form-group">
          <div className="name">Zip Code:</div>
          <input type="text" onFocus={() => (props.changeFocus("zip"))} placeholder=""/>
        </div>
      </div>

      <div className="col-4">
        <div className="outset-form-group">
          <div className="input-guess-explanation"></div>
          <div className="name">State:</div>
          
          <div className="input-guess">
            <input className="input-guess-input" type="text" placeholder="NY"></input>
            <span className="input-guess-explanation">
              ?
              <div className="input-guess-explanation-content">We can explain: <p>We got this info from your IP.</p></div>
            </span>
            
          </div>
        </div>
      </div>

    </div>
  </>
)

class StepFive extends React.Component {
  render() {
      return (
          <>
            <h1></h1>
            {/* The button will execute the handler function set by the parent component */}
            <input 
              name="size"
              type="text" 
              value={this.props.size}
              onChange={this.props.action}
              className="form-control" 
              aria-describedby="emailHelp" 
              // placeholder="String"
              autocorrect="off"
              spellcheck="false"
            />
            <button onClick={() => (this.props.log("Whatever I want"))}>Call Log</button>
          </>
      )
  }
}

const StepTwo = (props) => (
  <div>
    <h2>Clothing: Step 2 - Size: {props.size}</h2>
    <p>Articles makes a significnatn portion of its profits from clothing sales, our clothing sales help keep ads to a minamal and let us continure developemnt.</p>

    <div>
      You said you were a _ in Step One

  
      If F
      Shirt Size
  
      If Undecidede
      You choose undecided last step but we use this info to pre set clothing items to your size when you add them to your cart. If you want to select a cut style and size please do so below or skip. 
    </div>

    <h5>Selected Size: </h5>

    <div className="btn-group btn-group-toggle" data-toggle="buttons">

      <label className={"btn btn-secondary " + (props.size === 'XS' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('XS'))} id="XS" autocomplete="off"/> XS
      </label>

      <label className={"btn btn-secondary " + (props.size === 'S' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('S'))} id="S" autocomplete="off"/> S
      </label>

      <label className={"btn btn-secondary " + (props.size === 'M' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('M'))} id="M" autocomplete="off"/> M
      </label>

      <label className={"btn btn-secondary " + (props.size === 'L' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('L'))} id="L" autocomplete="off"/> L
      </label>

      <label className={"btn btn-secondary " + (props.size === 'XL' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('XL'))} id="XL" autocomplete="off"/> XL
      </label>

      <label className={"btn btn-secondary " + (props.size === '2XL' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('2XL'))} id="2XL" autocomplete="off"/> 2XL
      </label>

      <label className={"btn btn-secondary " + (props.size === 'OTHER' ? "active" : "")}>
        <input type="radio" name="size" onClick={() => (props.changeSize('OTHER'))} id="OTHER" autocomplete="off"/> OTHER
      </label>

      {/* <label class="btn btn-secondary">
        <input type="radio" name="options" {this.props.size === this.id ? 'checked' : ''} id="l" autocomplete="off"/> L
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" {this.props.size === this.id ? 'checked' : ''} id="xl" autocomplete="off"/> XL
      </label>
      <label class="btn btn-secondary">
        <input type="radio" name="options" {this.props.size === this.id ? 'checked' : ''} id="2xl" autocomplete="off"/> 2XL
      </label> */}
    </div>

  </div>
)

const StepThree = () => (
  <div>
    <h2>News: Step 3</h2>
    <p>Judging by your location we can't find any stories that might be of increased interest to you. Here are some other popular stories right now that you can subscibe to in the mean time.</p>
    <div>
      Flint Micigan
      Mulelr Reports
      Green Energy

    </div>
  </div>
)
const StepFour = (props) => (
  <div>
    <h2>Party: Step 4 - {props.party}</h2>
    <p>At Articles we promote independent thoughts and stray away from coportate media control and political biases. While Articles is not a political party we are a movement trying to get people away from in the box thinking. If you do identify with a party thought and wouldn't mind sharing we can use that information.</p>
    
    <div className="party-group mb-3 dual-header">

      <span>
        <button onClick={() => (props.changeParty('Articles'))} className="btn btn-dark">Articles</button>
        <button onClick={() => (props.changeParty('Rebublican'))} className="btn btn-danger ml-1">Rebublican</button>
        <button onClick={() => (props.changeParty('Democrat'))} className="btn btn-primary ml-1">Democrat</button>
      </span>

      <div class="btn-group" role="group">
        <button id="btnGroupDrop1" type="button" className="btn btn-secondary dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          Others
        </button>
        <div className="dropdown-menu" aria-labelledby="btnGroupDrop1">
          <a className="dropdown-item" href="#">Dropdown link</a>
          <a className="dropdown-item" href="#">Dropdown link</a>
        </div>
      </div>

    </div>

  </div>
)

// const StepFive = () => (
//   <div>
//     <h2>Hello, Step 5</h2>
//     <button>Finish</button> 
//   </div> 
// )

// const StepSix = () => (
//   <h2>Hello, Step 6</h2>
// )
// const StepSeven = () => (
//   <h2>Hello, Step 7</h2>
// )
// const StepEight = () => (
//   <h2>Hello, Step 8</h2>
// )
// const StepNine = () => (
//   <h2>Hello, Step 9</h2>
// )
// const StepTen = () => (
//   <h2>Hello, Step 10</h2>
// )

const customStyles = {
  content : {
    top          : '50%',
    left         : '50%',
    right        : 'auto',
    bottom       : 'auto',
    marginRight  : '-50%',
    transform    : 'translate(-50%, -50%)',
    border       : 'initial',
    borderRadius : 'initial',
    maxWidth     : '600px',
    minWidth     : '600px',
    overflow     : 'initial'
  }
};

// Make sure to bind modal to your appElement (http://reactcommunity.org/react-modal/accessibility/)
// Modal.setAppElement('#yourAppElement')

class ReactModal extends React.Component {
  constructor() {
    super();

    this.state = {
      modalIsOpen: false
    };

    this.openModal = this.openModal.bind(this);
    this.afterOpenModal = this.afterOpenModal.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  openModal() {
    this.setState({modalIsOpen: true});
  }

  afterOpenModal() {
    // references are now sync'd and can be accessed.
    // this.subtitle.style.color = '#f00';
  }

  closeModal() {
    this.setState({modalIsOpen: false});
  }

  render() {
    return (
      <div>

        <button style={{fontSize: "1.5rem"}} className="badge badge-black badge-shape-poly top-headline" onClick={this.openModal}>{this.props.message}</button>

        <Modal
          isOpen={this.state.modalIsOpen}
          onAfterOpen={this.afterOpenModal}
          onRequestClose={this.closeModal}
          // TODO Remove this and figure out screenreader error 
          ariaHideApp={false}
          // ENDTODO
          style={customStyles}
          // className="ReactModal__Content_Override"
          contentLabel="Example Modal"
        >
          <button className="close-modal" onClick={this.closeModal}>X</button>

          <h2 ref={subtitle => this.subtitle = subtitle}>{this.props.message}</h2>
          
          <div>{modalContent[this.props.getContent].message}</div>

        </Modal>
      </div>
    );
  }
}

export default Component