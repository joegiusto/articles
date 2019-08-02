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
    <div>Modal testing grounds for now.</div>
    <App message="15% Sale" getContent="1"/>
    <App message="Mueller Report Highlights" getContent="2"/>
    <App message="Flint Water Cleanup" getContent="3"/>
    <App message="Gun Laws" getContent="4"/>
  </div>
)

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

class App extends React.Component {
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
          

          {/* <div className="close-reminder d-none" onClick={this.closeModal}>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
            Click anywhere to close! &bull; Click anywhere to close! &bull; Click anywhere to close! <br/>
          </div> */}

          {/* <div>I am a modal, I am getting content from {this.props.getContent}</div> */}
          <div>{modalContent[this.props.getContent].message}</div>

          {/* <form>
            <input />
            <button>tab navigation</button>
            <button>stays</button>
            <button>inside</button>
            <button>the modal</button>
          </form> */}

        </Modal>
      </div>
    );
  }
}

export default Component